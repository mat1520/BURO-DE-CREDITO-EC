import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreditReportPage.css";

function getToday() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

const AlivioFinancieroPage = () => {
  const [consent, setConsent] = useState(false);
  const [fecha, setFecha] = useState(getToday());
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (consent) {
      navigate('/alivio-financiero/paso-2');
    }
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
          <span className="progress-label" style={{ minWidth: 40, textAlign: 'left' }}>25%</span>
          <div className="progress-bar-outer" style={{ flex: 1 }}>
            <div className="progress-bar-inner" style={{ width: '25%' }}></div>
          </div>
        </div>
        <form className="main-form" style={{ maxWidth: 520, width: '100%', background: 'none', boxShadow: 'none', padding: 0 }} onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Fecha de la solicitud <span className="form-required">*</span></label>
            <input 
              className="form-select" 
              type="date" 
              value={fecha} 
              onChange={e => setFecha(e.target.value)} 
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Producto <span className="form-required">*</span></label>
            <select className="form-select" value="Solicitud Alivio Financiero 2025" disabled>
              <option>Solicitud Alivio Financiero 2025</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Precio</label>
            <div className="input-price-group">
              <span className="input-prefix">$</span>
              <input type="text" className="form-input price-input" value="2.00" readOnly />
              <span className="input-suffix">USD</span>
            </div>
          </div>
          <div style={{ fontSize: 15, margin: '12px 0 18px 0', color: '#232a31', lineHeight: 1.5 }}>
            Por un valor de <b>$ 2.00 USD</b>, obtendrá un PDF diseñado en el formato legalmente correcto según la <b>Resolución N° JPRF-F-2025-0145</b> de "Alivio Financiero 2025", que incluye todos los requisitos normativos; solo deberá imprimirlo, estampar su firma (y las de sus garantes, si aplica) y presentarlo en la entidad financiera.
          </div>
          <div className="form-group" style={{ marginBottom: 18 }}>
            <label className="form-label">Consentimiento <span className="form-required">*</span></label>
            <label className="checkbox-label" style={{ alignItems: 'flex-start', fontWeight: 400 }}>
              <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} />
              <span style={{ marginLeft: 8, fontSize: 14, color: '#232a31', lineHeight: 1.5 }}>
                <b>Declaro que la presente solicitud se formula únicamente para el <u>diferimiento de cuotas por vencer</u>, en el marco de la Resolución N° JPRF-F-2025-0145, y no resulta aplicable a obligaciones ya vencidas. Entiendo que su aprobación queda a criterio de la entidad financiera, por lo que <span style={{ color: '#b71c1c' }}>no asumimos responsabilidad</span> alguna en caso de que no sea aceptada. Asimismo, conforme a la Ley Orgánica de Protección de Datos Personales, autorizo que mis datos sean utilizados <u>solo</u> para la generación de este PDF de solicitud y para cumplir con lo previsto en la normativa citada.</b>
              </span>
            </label>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="siguiente-btn" disabled={!consent} style={{ marginTop: 12, minWidth: 120, fontWeight: 600, fontSize: 16 }}>
              Siguiente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AlivioFinancieroPage; 