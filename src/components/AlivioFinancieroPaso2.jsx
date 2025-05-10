import React, { useState } from "react";
import "./CreditReportPage.css";

const bancos = [
  "Banco Bolivariano",
  "Banco Cofiec",
  "Banco de Guayaquil",
  "Banco de Machala",
  "Banco del Austro",
  "Banco del Pacífico",
  "Banco Pichincha",
  "Banco Delbank",
  "Banco General Rumiñahui",
  "Banco Internacional",
  "Banco Finca",
  "ProCredit Bank",
  "Produbanco",
  "Banco Solidario",
  "Banco Sudamericano",
  "Citibank Ecuador",
  "Banco Promérica",
  "Banco Coopnacional",
  "Banco D‑Miro",
  "Banco Capital"
];

const AlivioFinancieroPaso2 = ({ onAnterior, onSiguiente }) => {
  const [institucionLista, setInstitucionLista] = useState(true);
  const [banco, setBanco] = useState("");
  const [nombreInstitucion, setNombreInstitucion] = useState("");
  const [tipoOperacion, setTipoOperacion] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [pais, setPais] = useState("Ecuador");
  const [numeroTarjeta, setNumeroTarjeta] = useState("0000XXXXXXXX0000");
  const [tocado, setTocado] = useState(false);
  const [errores, setErrores] = useState({});
  const [nroOperacion, setNroOperacion] = useState("");

  const isValid = (
    (institucionLista ? banco : nombreInstitucion) &&
    tipoOperacion &&
    ciudad &&
    pais &&
    (tipoOperacion !== 'tarjeta de crédito' || numeroTarjeta.length === 16) &&
    (tipoOperacion !== 'crédito' || nroOperacion)
  );

  const validar = () => {
    const nuevosErrores = {};
    if (institucionLista && !banco) nuevosErrores.banco = 'Selecciona un banco';
    if (!institucionLista && !nombreInstitucion) nuevosErrores.nombreInstitucion = 'Ingresa el nombre de la institución';
    if (!tipoOperacion) nuevosErrores.tipoOperacion = 'Selecciona el tipo de operación';
    if (!ciudad) nuevosErrores.ciudad = 'Ingresa la ciudad';
    if (!pais) nuevosErrores.pais = 'Selecciona el país';
    if (tipoOperacion === 'tarjeta de crédito' && numeroTarjeta.length !== 16) nuevosErrores.numeroTarjeta = 'Completa el número de tarjeta';
    if (tipoOperacion === 'crédito' && !nroOperacion) nuevosErrores.nroOperacion = 'Ingresa el número de operación';
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

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
          <span className="progress-label" style={{ minWidth: 40, textAlign: 'left' }}>50%</span>
          <div className="progress-bar-outer" style={{ flex: 1 }}>
            <div className="progress-bar-inner" style={{ width: '50%' }}></div>
          </div>
        </div>
        <form className="main-form" style={{ maxWidth: 520, width: '100%', background: 'none', boxShadow: 'none', padding: 0 }}
          onSubmit={e => {
            e.preventDefault();
            setTocado(true);
            if (validar() && isValid) {
              // Guardar datos en localStorage
              const datos = {
                institucionLista,
                banco,
                nombreInstitucion,
                tipoOperacion,
                ciudad,
                pais,
                numeroTarjeta,
                nroOperacion
              };
              localStorage.setItem('alivioFinancieroDatos', JSON.stringify(datos));
              if (onSiguiente) onSiguiente();
            }
          }}>
          <div className="form-group">
            <label className="form-label">Instituciones Disponibles <span className="form-required">*</span></label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 2 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 500, color: '#232a31', fontSize: 15 }}>
                <input type="radio" checked={institucionLista} onChange={() => setInstitucionLista(true)} />
                Buscar en la lista de Bancos
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 500, color: '#232a31', fontSize: 15 }}>
                <input type="radio" checked={!institucionLista} onChange={() => setInstitucionLista(false)} />
                No se encuentra en la lista
              </label>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Nombre de la Institución <span className="form-required">*</span></label>
            {institucionLista ? (
              <>
                <select className={`form-select${tocado && errores.banco ? ' input-error-v2' : ''}`} value={banco} onChange={e => setBanco(e.target.value)} required={institucionLista}>
                  <option value="">Seleccionar</option>
                  {bancos.map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
                {tocado && errores.banco && <div className="form-error-v2">{errores.banco}</div>}
              </>
            ) : (
              <>
                <div style={{ fontSize: 13, color: '#888', marginBottom: 4 }}>Escribe bien el nombre del Banco o Cooperativa</div>
                <input
                  type="text"
                  className={`form-select${tocado && errores.nombreInstitucion ? ' input-error-v2' : ''}`}
                  value={nombreInstitucion}
                  onChange={e => setNombreInstitucion(e.target.value)}
                  placeholder="Ejemplo: COOPERATIVA JEP"
                />
                {tocado && errores.nombreInstitucion && <div className="form-error-v2">{errores.nombreInstitucion}</div>}
              </>
            )}
          </div>
          <div className="form-group">
            <label className="form-label">Tipo de operación <span className="form-required">*</span></label>
            <div style={{ display: 'flex', gap: 18, marginTop: 2 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 500, color: '#232a31', fontSize: 15 }}>
                <input type="radio" name="tipoOperacion" value="crédito" checked={tipoOperacion === 'crédito'} onChange={e => setTipoOperacion(e.target.value)} />
                crédito
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 500, color: '#232a31', fontSize: 15 }}>
                <input type="radio" name="tipoOperacion" value="tarjeta de crédito" checked={tipoOperacion === 'tarjeta de crédito'} onChange={e => setTipoOperacion(e.target.value)} />
                tarjeta de crédito
              </label>
            </div>
            {tocado && errores.tipoOperacion && <div className="form-error-v2">{errores.tipoOperacion}</div>}
          </div>
          {tipoOperacion === 'tarjeta de crédito' && (
            <div className="form-group">
              <label className="form-label">Número de la tarjeta de crédito <span className="form-required">*</span></label>
              <input
                type="text"
                className={`form-select${tocado && errores.numeroTarjeta ? ' input-error-v2' : ''}`}
                maxLength={16}
                value={numeroTarjeta}
                onChange={e => setNumeroTarjeta(e.target.value)}
                placeholder="0000XXXXXXXX0000"
              />
              {tocado && errores.numeroTarjeta && <div className="form-error-v2">{errores.numeroTarjeta}</div>}
              <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>
                Por seguridad solo reemplaza los 4 ceros al inicio y al final
              </div>
              <div style={{ fontSize: 12, color: '#888', textAlign: 'right' }}>{numeroTarjeta.length} / 16</div>
            </div>
          )}
          {tipoOperacion === 'crédito' && (
            <div className="form-group">
              <label className="form-label">Nro operación <span className="form-required">*</span></label>
              <input
                type="text"
                className={`form-select${tocado && errores.nroOperacion ? ' input-error-v2' : ''}`}
                value={nroOperacion}
                onChange={e => setNroOperacion(e.target.value)}
                placeholder="Ejemplo: 686"
              />
              <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>
                Nro Pagaré u Operación (Pregúntale a tu oficial de crédito o revisa tu tabla de amortización)
              </div>
              {tocado && errores.nroOperacion && <div className="form-error-v2">{errores.nroOperacion}</div>}
            </div>
          )}
          <div className="form-group">
            <label className="form-label">Ciudad <span className="form-required">*</span></label>
            <input className={`form-select${tocado && errores.ciudad ? ' input-error-v2' : ''}`} placeholder="Ejemplo: Quito" value={ciudad} onChange={e => setCiudad(e.target.value)} required />
            {tocado && errores.ciudad && <div className="form-error-v2">{errores.ciudad}</div>}
          </div>
          <div className="form-group">
            <label className="form-label">País <span className="form-required">*</span></label>
            <select className={`form-select${tocado && errores.pais ? ' input-error-v2' : ''}`} value={pais} onChange={e => setPais(e.target.value)} required>
              <option value="Ecuador">Ecuador</option>
            </select>
            {tocado && errores.pais && <div className="form-error-v2">{errores.pais}</div>}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
            <button type="button" className="siguiente-btn anterior-btn-disabled" onClick={onAnterior} style={{ background: '#e9ecef', color: '#b1b1b1' }}>Anterior</button>
            <button type="submit" className="siguiente-btn" disabled={!isValid} style={{ background: '#9f1b32' }}>Siguiente</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AlivioFinancieroPaso2; 