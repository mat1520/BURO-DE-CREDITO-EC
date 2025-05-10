import React, { useState, useRef, useEffect } from "react";
import "./CreditReportPage.css";
import ScoreCircle from "./ScoreCircle";
import { FaCheckCircle, FaInfoCircle } from "react-icons/fa";

const DocumentosPage = ({ onAnterior, onSiguiente, score, setScore, scoreLevel }) => {
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const scoreBarRef = useRef(null);

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

  const handleSiguiente = (e) => {
    e.preventDefault();
    if (!confirmed) {
      setError("Debes aceptar la confirmación para continuar.");
      return;
    }
    setError("");
    if (onSiguiente) onSiguiente();
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
              <span className="progress-label">50%</span>
              <div className="progress-bar-outer">
                <div className="progress-bar-inner" style={{ width: '50%' }}></div>
              </div>
            </div>
          </div>
          <form className="main-form" onSubmit={handleSiguiente}>
            <div className="info-title">Información</div>
            <div className="desc" style={{ marginTop: 0, marginBottom: 0, textAlign: 'left' }}>
              Nuestra responsabilidad es evitar que terceros accedan a tu información sin tu autorización. Para validar esto, <b>al final del formulario te solicitaremos lo siguiente:</b>
            </div>
            <ul className="info-list" style={{ textAlign: 'left', paddingLeft: 18 }}>
              <li><b>Foto 1:</b> Anverso Cédula</li>
              <li><b>Foto 2:</b> Reverso Cédula</li>
              <li><b>Foto 3:</b> Selfie sosteniendo la cédula</li>
            </ul>
            <div className="ejemplos-label" style={{ textAlign: 'left' }}><b>Ejemplos:</b></div>
            <div className="ejemplo-img-block" style={{ textAlign: 'left' }}>
              <img
                src="https://buroecuador.com/wp-content/uploads/2024/06/ejemplo-fotos-selfie-cedula.png"
                alt="Ejemplo fotos cédula y selfie"
                className="ejemplo-img"
                style={{ maxWidth: "100%", borderRadius: 8, margin: "12px 0" }}
              />
            </div>
            <div className="form-group" style={{ textAlign: 'left' }}>
              <label className="form-label">
                Confirmación <span className="form-required">*</span>
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={e => setConfirmed(e.target.checked)}
                />
                <span style={{ marginLeft: 8 }}>
                  <b>Entiendo y acepto que proporcionaré esta información para verificar que soy el titular que solicita el servicio de Buró Ecuador.</b>
                </span>
              </label>
              {error && <div className="form-error-v2">{error}</div>}
            </div>
            <div className="form-buttons" style={{ display: "flex", justifyContent: 'space-between', marginTop: 24 }}>
              <button type="button" className="siguiente-btn" onClick={onAnterior} style={{ background: "#ccc", color: "#222" }}>Anterior</button>
              <button type="submit" className="siguiente-btn">Siguiente</button>
            </div>
          </form>
        </div>
        <div className="main-right">
          <section className="score-section score-section-v2">
            <div className="score-top-block-v2">
              <div className="score-circle-block">
                <ScoreCircle score={score} color={scoreLevel.color} />
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
                      background: scoreLevel.color,
                      cursor: 'grab'
                    }}
                  ></div>
                </div>
                <div className="score-bar-value">{score} - {scoreLevel.letter === 'AA' ? 'AAA' : scoreLevel.letter}</div>
              </div>
            </div>
            <div className="score-info score-info-v2" style={{ borderColor: scoreLevel.color }}>
              <div className="score-info-badge" style={{ background: scoreLevel.color }}>{scoreLevel.letter === 'AA' ? 'AAA' : scoreLevel.letter}</div>
              <h3>Tu Score Crediticio</h3>
              <p>Puntaje simulado: <b>{score}</b></p>
              <p><b>Cliente {scoreLevel.letter === 'AA' ? 'AAA' : scoreLevel.letter}</b> {scoreLevel.emoji} {scoreLevel.text}</p>
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

export default DocumentosPage; 