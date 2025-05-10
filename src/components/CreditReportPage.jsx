import React, { useState, useRef, useEffect } from "react";
import "./CreditReportPage.css";
import ScoreCircle from "./ScoreCircle";
import { FaInfoCircle, FaUserTie, FaCheckCircle } from "react-icons/fa";

const SCORE_LEVELS = [
  {
    min: 0,
    max: 599,
    letter: "C",
    emoji: "🚫🔥",
    color: "#b71c1c",
    text: "Actualmente es muy difícil acceder a créditos. Haz tu Análisis personalizado para identificar deudas, planificar pagos y trabajar en la recuperación de tu historial financiero."
  },
  {
    min: 600,
    max: 799,
    letter: "B",
    emoji: "😟🔎",
    color: "#e6a700",
    text: "Tu calificación es regular. Solicita un Análisis personalizado para conocer a quién debes, cuánto debes y qué estrategias puedes aplicar para mejorar tus posibilidades de obtener un crédito."
  },
  {
    min: 800,
    max: 899,
    letter: "A",
    emoji: "⚠️📋",
    color: "#fbc02d",
    text: "Estás al límite. Llena el formulario para solicitar tu Análisis personalizado y detectar qué debes mejorar para fortalecer tu perfil crediticio y mantener acceso a nuevos créditos."
  },
  {
    min: 900,
    max: 999,
    letter: "AA",
    emoji: <FaCheckCircle style={{ color: '#43b324', verticalAlign: 'middle', fontSize: '1.1em', marginLeft: 2, marginRight: 2 }} />, // check verde
    color: "#43b324",
    text: "¡Eres excelente! Estás entre los mejores pagadores. Obtén tu análisis de crédito para conocer tus deudas y evitar sorpresas que puedan afectar tu calificación."
  }
];

function getScoreLevel(score) {
  return SCORE_LEVELS.find(l => score >= l.min && score <= l.max) || SCORE_LEVELS[SCORE_LEVELS.length - 1];
}

const CreditReportPage = ({ score, setScore, onSiguiente }) => {
  const [selectedHistory, setSelectedHistory] = useState("");
  const [source, setSource] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const scoreBarRef = useRef(null);
  const [price, setPrice] = useState("0.00");
  const [errors, setErrors] = useState({});

  const level = getScoreLevel(score);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    updateScore(e);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      updateScore(e);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const updateScore = (e) => {
    if (!scoreBarRef.current) return;
    
    const rect = scoreBarRef.current.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const percentage = Math.max(0, Math.min(1, 1 - (y / rect.height)));
    const newScore = Math.round(percentage * 999);
    setScore(newScore);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  useEffect(() => {
    if (selectedHistory === "repote360") setPrice("6.99");
    else if (selectedHistory === "analisis-personalizado") setPrice("19.99");
    else setPrice("0.00");
  }, [selectedHistory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!selectedHistory) newErrors.historial = 'Selecciona una opción.';
    if (!source) newErrors.source = 'Selecciona una opción.';
    if (!confirmed) newErrors.confirmed = 'Debes confirmar que eres el titular.';
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      // Aquí iría el envío real del formulario
      if (onSiguiente) onSiguiente();
      // alert('Formulario enviado correctamente');
    }
  };

  return (
    <div className="credit-bg">
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
              <span className="progress-label">25%</span>
              <div className="progress-bar-outer">
                <div className="progress-bar-inner" style={{ width: '25%' }}></div>
              </div>
            </div>
          </div>
          <form className="main-form" onSubmit={handleSubmit}>
            <div className="info-title">Información</div>
            <div className="desc" style={{ marginTop: 16, marginBottom: 0 }}>
              Nuestra responsabilidad es evitar que terceros accedan a tu información sin tu autorización. Para validar esto, <b>al final del formulario te solicitaremos lo siguiente:</b>
            </div>
            <div className="form-group">
              <label htmlFor="historial" className="form-label">Historial Financiero <span className="form-required">*</span></label>
              <select
                id="historial"
                name="historial"
                className="form-select"
                value={selectedHistory}
                onChange={e => setSelectedHistory(e.target.value)}
              >
                <option value="">Seleccionar</option>
                <option value="repote360">Reporte 360 PDF Buró Ecuador</option>
                <option value="analisis-personalizado">Análisis Personalizado 360 + PDF</option>
              </select>
              {errors.historial && <div className="form-error-v2">{errors.historial}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="precio" className="form-label">Precio del producto</label>
              <div className="input-price-group">
                <span className="input-prefix">$</span>
                <input
                  type="text"
                  id="precio"
                  name="precio"
                  className="form-input price-input"
                  value={price}
                  readOnly
                />
                <span className="input-suffix">USD</span>
              </div>
              <div className="form-hint">El precio incluye IVA</div>
            </div>
            <div className="form-group">
              <label className="form-label">¿Cómo conociste a Buró Ecuador? <span className="form-required">*</span></label>
              <div className="radio-group">
                <label><input type="radio" name="conociste" value="Facebook" checked={source === 'Facebook'} onChange={e => setSource(e.target.value)} /> Facebook</label>
                <label><input type="radio" name="conociste" value="TikTok" checked={source === 'TikTok'} onChange={e => setSource(e.target.value)} /> TikTok</label>
                <label><input type="radio" name="conociste" value="Google" checked={source === 'Google'} onChange={e => setSource(e.target.value)} /> Google</label>
                <label><input type="radio" name="conociste" value="Otro" checked={source === 'Otro'} onChange={e => setSource(e.target.value)} /> Otro</label>
              </div>
              {errors.source && <div className="form-error-v2">{errors.source}</div>}
            </div>
            <div className="form-group">
              <label className="form-label">
                Confirmación <span className="form-required">*</span>
              </label>
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input type="checkbox" name="confirmacion" checked={confirmed} onChange={e => setConfirmed(e.target.checked)} />
                  <span className="checkbox-custom"></span>
                  <span>
                    <b>Certifico ser el titular de la información que voy a suministrar.</b> Se requerirá una fotografía de la Cédula de Identidad para verificar la titularidad de la información proporcionada. Soy consciente de que este formulario registrará las direcciones IP de envío como respaldo.
                  </span>
                </label>
              </div>
              {errors.confirmed && <div className="form-error-v2">{errors.confirmed}</div>}
            </div>
            <button type="submit" className="siguiente-btn">Siguiente</button>
          </form>
        </div>
        <div className="main-right">
          <section className="score-section score-section-v2">
            <div className="score-top-block-v2">
              <div className="score-circle-block">
                <ScoreCircle score={score} color={level.color} />
              </div>
              <div className="score-bar-block-v2">
                <div className="score-bar-label">Score de Crédito:</div>
                <div 
                  className="score-bar-vertical" 
                  ref={scoreBarRef}
                  onMouseDown={handleMouseDown}
                  style={{ cursor: 'pointer' }}
                >
                  <div 
                    className="score-bar-indicator" 
                    style={{ 
                      top: `${100 - (score / 999) * 100}%`, 
                      background: level.color,
                      cursor: 'grab'
                    }}
                  ></div>
                </div>
                <div className="score-bar-value">{score} - {level.letter === 'AA' ? 'AAA' : level.letter}</div>
              </div>
            </div>
            <div className="score-info score-info-v2" style={{ borderColor: level.color }}>
              <div className="score-info-badge" style={{ background: level.color }}>{level.letter === 'AA' ? 'AAA' : level.letter}</div>
              <h3>Tu Score Crediticio</h3>
              <p>Puntaje simulado: <b>{score}</b></p>
              <p><b>Cliente {level.letter === 'AA' ? 'AAA' : level.letter}</b> {level.emoji} {level.text}</p>
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

export default CreditReportPage; 