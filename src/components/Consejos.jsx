import React from "react";
import "./CreditReportPage.css";
import { FaLightbulb, FaCheckCircle, FaPiggyBank, FaChartLine, FaShieldAlt, FaWallet, FaBalanceScale } from "react-icons/fa";

const consejos = [
  {
    titulo: "Ahorra primero, gasta después",
    texto: "Destina al menos el 10% de tus ingresos al ahorro antes de cubrir otros gastos. Automatiza tu ahorro si es posible.",
    color: "#43b324",
    icon: <FaPiggyBank />
  },
  {
    titulo: "Diversifica tus inversiones",
    texto: "No pongas todo tu dinero en un solo producto o plataforma. Diversificar reduce el riesgo y protege tu patrimonio.",
    color: "#2a3eb1",
    icon: <FaChartLine />
  },
  {
    titulo: "Evita el sobreendeudamiento",
    texto: "No comprometas más del 30% de tus ingresos en deudas. Si ya lo hiciste, prioriza pagar las de mayor interés.",
    color: "#b71c1c",
    icon: <FaWallet />
  },
  {
    titulo: "Haz un presupuesto mensual",
    texto: "Lleva un registro de tus ingresos y gastos. Usa apps o una hoja de cálculo para identificar oportunidades de ahorro.",
    color: "#e6a700",
    icon: <FaBalanceScale />
  },
  {
    titulo: "Protege tus datos financieros",
    texto: "No compartas contraseñas ni datos bancarios. Usa autenticación de dos factores y revisa tus movimientos regularmente.",
    color: "#232a31",
    icon: <FaShieldAlt />
  },
  {
    titulo: "Invierte en tu educación financiera",
    texto: "Lee libros, toma cursos y mantente informado sobre productos financieros y tendencias del mercado.",
    color: "#fbc02d",
    icon: <FaLightbulb />
  }
];

const Consejos = () => {
  return (
    <div className="credit-bg" style={{ minHeight: '100vh', width: '100vw' }}>
      <div className="decor-circle"></div>
      <div className="credit-main-layout">
        <div className="main-left">
          <h1 className="form-title" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <FaLightbulb style={{ color: '#e6a700', fontSize: 32 }} /> Consejos Financieros
          </h1>
          <div className="desc" style={{ marginBottom: 18, fontSize: 17 }}>
            <b>Mejora tu salud financiera</b> con estos consejos prácticos y profesionales de Buró Ecuador. Protégete de fraudes, toma mejores decisiones y haz crecer tu patrimonio.
          </div>
          <div className="main-form-block" style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px rgba(60,60,120,0.07)', padding: 32, marginBottom: 36, border: '1.5px solid #e3e6fa', maxWidth: 540 }}>
            <div className="info-title" style={{ fontSize: 19, fontWeight: 700, marginBottom: 10 }}>Consejos destacados</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, justifyContent: 'flex-start' }}>
              {consejos.map((c, i) => (
                <div
                  key={i}
                  style={{
                    background: '#f8f8f8',
                    border: `2px solid ${c.color}`,
                    borderRadius: 14,
                    padding: 18,
                    minWidth: 220,
                    flex: '1 1 220px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: 10,
                    boxShadow: '0 2px 8px rgba(60,60,120,0.06)',
                    transition: 'transform 0.18s, box-shadow 0.18s',
                    cursor: 'pointer',
                    willChange: 'transform',
                    marginBottom: 0
                  }}
                  className="consejo-block"
                  onMouseOver={e => {
                    e.currentTarget.style.transform = 'translateY(-6px) scale(1.03)';
                    e.currentTarget.style.boxShadow = `0 6px 24px ${c.color}22`;
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(60,60,120,0.06)';
                  }}
                >
                  <span style={{ fontSize: 28, color: c.color, marginBottom: 2 }}>{c.icon}</span>
                  <div style={{ fontWeight: 700, fontSize: 16, color: c.color }}>{c.titulo}</div>
                  <div style={{ fontSize: 15, color: '#232a31' }}>{c.texto}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 14, color: '#888', marginTop: 24, textAlign: 'center' }}>
              Pronto encontrarás más consejos, videos y recursos útiles aquí.
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

export default Consejos; 