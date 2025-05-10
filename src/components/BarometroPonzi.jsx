import React from "react";
import "./CreditReportPage.css";
import { FaExclamationTriangle, FaCheckCircle, FaSearchDollar } from "react-icons/fa";

const ejemplos = [
  {
    nombre: "Plataforma X",
    riesgo: "Alto",
    color: "#b71c1c",
    motivo: "Promete rendimientos fijos del 10% mensual y requiere invitar a otros para ganar."
  },
  {
    nombre: "Inversión Segura Y",
    riesgo: "Medio",
    color: "#e6a700",
    motivo: "No está regulada y no muestra información clara sobre su modelo de negocio."
  },
  {
    nombre: "Cooperativa Real Z",
    riesgo: "Bajo",
    color: "#43b324",
    motivo: "Regulada por la Superintendencia y no exige referidos ni pagos adelantados."
  }
];

const BarometroPonzi = () => {
  return (
    <div className="credit-bg" style={{ minHeight: '100vh', width: '100vw' }}>
      <div className="decor-circle"></div>
      <div className="credit-main-layout">
        <div className="main-left">
          <h1 className="form-title" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <FaSearchDollar style={{ color: '#b71c1c', fontSize: 32 }} /> Barómetro Ponzi
          </h1>
          <div className="desc" style={{ marginBottom: 18, fontSize: 17 }}>
            <b>¿Dudas de una inversión?</b> Descubre si una plataforma, "negocio" o inversión puede ser un esquema Ponzi o piramidal. El Barómetro Ponzi de Buró Ecuador te ayuda a identificar señales de alerta y riesgos antes de invertir tu dinero.
          </div>
          <div className="main-form-block" style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px rgba(60,60,120,0.07)', padding: 32, marginBottom: 36, border: '1.5px solid #e3e6fa', maxWidth: 480 }}>
            <div className="info-title" style={{ fontSize: 19, fontWeight: 700, marginBottom: 10 }}>¿Qué es un esquema Ponzi?</div>
            <div style={{ fontSize: 15, color: '#232a31', marginBottom: 14 }}>
              Un esquema Ponzi es un fraude de inversión en el que los rendimientos para los inversores antiguos se pagan con el dinero de los nuevos inversores, en vez de con ganancias legítimas. Estos esquemas suelen colapsar cuando no hay suficientes nuevos participantes.
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff4f4', border: '1.5px solid #ffbaba', borderRadius: 10, padding: 14, marginBottom: 16 }}>
              <FaExclamationTriangle style={{ color: '#b71c1c', fontSize: 22 }} />
              <span style={{ fontSize: 15, color: '#b71c1c' }}>
                <b>¡Atención!</b> Si te prometen altos rendimientos sin riesgo, pagos garantizados o te piden invitar a más personas para ganar, podrías estar ante un esquema Ponzi.
              </span>
            </div>
            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 10, color: '#232a31' }}>Ejemplos de riesgo:</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {ejemplos.map((ej, i) => (
                <div key={i} style={{ background: '#f8f8f8', border: `2px solid ${ej.color}`, borderRadius: 10, padding: 14, display: 'flex', alignItems: 'center', gap: 14 }}>
                  <FaCheckCircle style={{ color: ej.color, fontSize: 22 }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{ej.nombre} <span style={{ color: ej.color, fontWeight: 700, fontSize: 14 }}>({ej.riesgo})</span></div>
                    <div style={{ fontSize: 14, color: '#232a31' }}>{ej.motivo}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 14, color: '#888', marginTop: 18 }}>
              Pronto podrás analizar plataformas y recibir alertas automáticas aquí.
            </div>
          </div>
        </div>
      </div>
      <footer style={{ marginTop: 32, textAlign: 'center', color: '#888', fontSize: 13, padding: 24 }}>
        © Copyright 2025 BURÓ ECUADOR
      </footer>
    </div>
  );
};

export default BarometroPonzi; 