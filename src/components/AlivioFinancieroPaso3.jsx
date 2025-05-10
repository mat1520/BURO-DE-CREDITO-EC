import React, { useState } from "react";
import "./CreditReportPage.css";

const AlivioFinancieroPaso3 = ({ onAnterior, onSiguiente }) => {
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [tipoIdentificacion, setTipoIdentificacion] = useState("cédula de identidad");
  const [identificacion, setIdentificacion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [tocado, setTocado] = useState(false);
  const [errores, setErrores] = useState({});

  const isValid = nombres && apellidos && tipoIdentificacion && identificacion && telefono && correo;

  const validar = () => {
    const nuevosErrores = {};
    if (!nombres) nuevosErrores.nombres = 'Ingresa los nombres';
    if (!apellidos) nuevosErrores.apellidos = 'Ingresa los apellidos';
    if (!tipoIdentificacion) nuevosErrores.tipoIdentificacion = 'Selecciona el tipo de identificación';
    if (!identificacion) {
      nuevosErrores.identificacion = 'Ingresa la identificación';
    } else if (!/^\d{10}$/.test(identificacion)) {
      nuevosErrores.identificacion = 'La cédula debe tener exactamente 10 números';
    }
    if (!telefono) {
      nuevosErrores.telefono = 'Ingresa el teléfono';
    } else if (!/^\d{10}$/.test(telefono)) {
      nuevosErrores.telefono = 'El teléfono debe tener exactamente 10 números';
    }
    if (!correo) {
      nuevosErrores.correo = 'Ingresa el correo electrónico';
    } else if (!/^\S+@\S+\.\S+$/.test(correo)) {
      nuevosErrores.correo = 'Ingresa un correo electrónico válido';
    }
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
          <span className="progress-label" style={{ minWidth: 40, textAlign: 'left' }}>75%</span>
          <div className="progress-bar-outer" style={{ flex: 1 }}>
            <div className="progress-bar-inner" style={{ width: '75%' }}></div>
          </div>
        </div>
        <form className="main-form" style={{ maxWidth: 520, width: '100%', background: 'none', boxShadow: 'none', padding: 0 }}
          onSubmit={e => {
            e.preventDefault();
            setTocado(true);
            if (validar() && isValid) {
              const datos = {
                nombres,
                apellidos,
                tipoIdentificacion,
                identificacion,
                telefono,
                correo
              };
              localStorage.setItem('alivioFinancieroPaso3', JSON.stringify(datos));
              if (onSiguiente) onSiguiente();
            }
          }}>
          <div className="form-row" style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">Nombres <span className="form-required">*</span></label>
              <div style={{ fontSize: 13, color: '#888', marginBottom: 2 }}>Solo los nombres</div>
              <input className={`form-select${tocado && errores.nombres ? ' input-error-v2' : ''}`} placeholder="Ejemplo: Juan Carlos" value={nombres} onChange={e => setNombres(e.target.value)} />
              {tocado && errores.nombres && <div className="form-error-v2">{errores.nombres}</div>}
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">Apellidos <span className="form-required">*</span></label>
              <div style={{ fontSize: 13, color: '#888', marginBottom: 2 }}>Solo los apellidos</div>
              <input className={`form-select${tocado && errores.apellidos ? ' input-error-v2' : ''}`} placeholder="Ejemplo: Pérez Galarza" value={apellidos} onChange={e => setApellidos(e.target.value)} />
              {tocado && errores.apellidos && <div className="form-error-v2">{errores.apellidos}</div>}
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Tipo de identificación <span className="form-required">*</span></label>
            <select className={`form-select${tocado && errores.tipoIdentificacion ? ' input-error-v2' : ''}`} value={tipoIdentificacion} onChange={e => setTipoIdentificacion(e.target.value)}>
              <option value="cédula de identidad">cédula de identidad</option>
              <option value="pasaporte">pasaporte</option>
            </select>
            {tocado && errores.tipoIdentificacion && <div className="form-error-v2">{errores.tipoIdentificacion}</div>}
          </div>
          <div className="form-group">
            <label className="form-label">Identificación <span className="form-required">*</span></label>
            <div style={{ fontSize: 13, color: '#888', marginBottom: 2 }}>Cédula o Pasaporte</div>
            <input className={`form-select${tocado && errores.identificacion ? ' input-error-v2' : ''}`} placeholder="Ejemplo: 17045550044" value={identificacion} onChange={e => setIdentificacion(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))} maxLength={10} />
            <div style={{ fontSize: 12, color: '#888', textAlign: 'right' }}>{identificacion.length} / 10</div>
            {tocado && errores.identificacion && <div className="form-error-v2">{errores.identificacion}</div>}
          </div>
          <div className="form-row" style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">Teléfono <span className="form-required">*</span></label>
              <input className={`form-select${tocado && errores.telefono ? ' input-error-v2' : ''}`} placeholder="Ejemplo: 0990446644" value={telefono} onChange={e => setTelefono(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))} />
              {tocado && errores.telefono && <div className="form-error-v2">{errores.telefono}</div>}
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">Correo electrónico <span className="form-required">*</span></label>
              <input className={`form-select${tocado && errores.correo ? ' input-error-v2' : ''}`} placeholder="Ej .: nombre@correo.com" value={correo} onChange={e => setCorreo(e.target.value)} />
              {tocado && errores.correo && <div className="form-error-v2">{errores.correo}</div>}
            </div>
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

export default AlivioFinancieroPaso3; 