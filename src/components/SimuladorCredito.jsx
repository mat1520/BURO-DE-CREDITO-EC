import React, { useState } from "react";
import "./CreditReportPage.css";
import { FaInfoCircle } from "react-icons/fa";
import ScoreCircle from "./ScoreCircle";

const SCORE_LEVELS = [
  {
    min: 0,
    max: 599,
    letter: "C",
    color: "#b71c1c",
    text: "Actualmente es muy difícil acceder a créditos. Haz tu Análisis personalizado para identificar deudas, planificar pagos y trabajar en la recuperación de tu historial financiero."
  },
  {
    min: 600,
    max: 799,
    letter: "B",
    color: "#e6a700",
    text: "Tu calificación es regular. Solicita un Análisis personalizado para conocer a quién debes, cuánto debes y qué estrategias puedes aplicar para mejorar tus posibilidades de obtener un crédito."
  },
  {
    min: 800,
    max: 899,
    letter: "A",
    color: "#fbc02d",
    text: "Estás al límite. Llena el formulario para solicitar tu Análisis personalizado y detectar qué debes mejorar para fortalecer tu perfil crediticio y mantener acceso a nuevos créditos."
  },
  {
    min: 900,
    max: 999,
    letter: "AA",
    color: "#43b324",
    text: "Vas muy bien, pero siempre es bueno mejorar. Llena el formulario y solicita tu análisis de crédito para conocer oportunidades y proteger tu historial financiero."
  }
];

function getScoreLevel(score) {
  return SCORE_LEVELS.find(l => score >= l.min && score <= l.max) || SCORE_LEVELS[SCORE_LEVELS.length - 1];
}

const SimuladorCredito = () => {
  const [score, setScore] = useState(500);
  const SCORE_LEVEL = getScoreLevel(score);

  return (
    <div className="credit-bg" style={{ minHeight: '100vh', width: '100vw' }}>
      <div className="decor-circle"></div>
      <div className="credit-main-layout">
        <div className="main-left">
          <h1 className="form-title">Simulador de Riesgo de Crédito (Beta)</h1>
          <div className="desc" style={{ marginBottom: 18 }}>
            Descubre cómo los bancos evalúan tu capacidad crediticia con nuestro Simulador de Riesgo de Crédito. Si aún no conoces tu score de crédito, obténlo fácilmente en Buró Ecuador y regresa para una evaluación rápida y precisa. Esta herramienta referencial, desarrollada por Buró Ecuador, te brinda una visión clara de tu elegibilidad para créditos, ayudándote a planificar mejor tus finanzas y decisiones crediticias.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 32, marginBottom: 24 }}>
            <div style={{ minWidth: 180 }}>
              <ScoreCircle score={score} color={SCORE_LEVEL.color} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>Score de Crédito:</div>
              <div style={{ height: 120, width: 24, background: '#f3f3f3', borderRadius: 12, position: 'relative', marginBottom: 8 }}>
                <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: `${(score / 999) * 100}%`, background: SCORE_LEVEL.color, borderRadius: 12 }}></div>
              </div>
              <div style={{ fontWeight: 600, fontSize: 15 }}>{score} - {SCORE_LEVEL.letter}</div>
            </div>
          </div>
          <div className="form-group" style={{ maxWidth: 340, marginBottom: 18 }}>
            <label className="form-label" style={{ fontWeight: 700, fontSize: 16 }}>Formulario de simulación</label>
            <input
              type="range"
              min={1}
              max={999}
              value={score}
              onChange={e => setScore(Number(e.target.value))}
              style={{ width: '100%', margin: '12px 0' }}
            />
            <div style={{ fontSize: 14, color: '#b71c1c', background: '#fff4f4', borderRadius: 8, padding: 10, marginTop: 8 }}>
              <FaInfoCircle style={{ marginRight: 6, verticalAlign: 'middle' }} />
              {score < 600 && (
                <>Con tu score de crédito de <b>{score}</b> puntos eres un cliente tipo <b>{SCORE_LEVEL.letter}</b>, por lo cual no podrías acceder a un préstamo. Debes mejorar tu calificación de crédito.</>
              )}
              {score >= 600 && score < 800 && (
                <>Con tu score de crédito de <b>{score}</b> puntos eres un cliente tipo <b>{SCORE_LEVEL.letter}</b>. Podrías acceder a algunos productos, pero tu acceso es limitado.</>
              )}
              {score >= 800 && score < 900 && (
                <>Con tu score de crédito de <b>{score}</b> puntos eres un cliente tipo <b>{SCORE_LEVEL.letter}</b>. Tienes buen acceso, pero cuida tu historial.</>
              )}
              {score >= 900 && (
                <>¡Excelente! Con tu score de crédito de <b>{score}</b> puntos eres un cliente tipo <b>{SCORE_LEVEL.letter}</b>. Tienes acceso preferente.</>
              )}
            </div>
          </div>
          <div className="main-form-block" style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px rgba(60,60,120,0.07)', padding: 32, marginBottom: 36, border: '1.5px solid #e3e6fa', maxWidth: 420 }}>
            <div className="info-title">Tu Score Crediticio</div>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>Puntaje simulado: {score}</div>
            <div style={{ fontWeight: 700, color: SCORE_LEVEL.color, fontSize: 16, marginBottom: 8 }}>Cliente {SCORE_LEVEL.letter}</div>
            <div style={{ fontSize: 15, color: '#232a31', marginBottom: 8 }}>{SCORE_LEVEL.text}</div>
          </div>
        </div>
      </div>
      <footer style={{ marginTop: 32, textAlign: 'center', color: '#888', fontSize: 13, padding: 24 }}>
        © Copyright 2025 BURÓ ECUADOR
      </footer>
    </div>
  );
};

export default SimuladorCredito; 