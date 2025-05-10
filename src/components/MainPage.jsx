import React, { useState, useMemo } from "react";
import CreditReportPage from "./CreditReportPage";
import DocumentosPage from "./DocumentosPage";
import PagoPage from "./PagoPage";
import Footer from "./Footer";
import "./MainPage.css";
import { FaBars, FaTimes, FaCheckCircle } from "react-icons/fa";
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import AnalisisPage from "./AnalisisPage";

const MainPageRoutes = ({ score, setScore, scoreLevel }) => {
  const navigate = useNavigate();
  return (
    <main className="main-content">
      <Routes>
        <Route path="/" element={<CreditReportPage score={score} setScore={setScore} scoreLevel={scoreLevel} onSiguiente={() => navigate('/documentos')} />} />
        <Route path="/documentos" element={<DocumentosPage score={score} setScore={setScore} scoreLevel={scoreLevel} onAnterior={() => navigate('/')} onSiguiente={() => navigate('/pago')} />} />
        <Route path="/pago" element={<PagoPage score={score} setScore={setScore} scoreLevel={scoreLevel} onAnterior={() => navigate('/documentos')} onSiguiente={() => navigate('/analisis')} />} />
        <Route path="/analisis" element={<AnalisisPage score={score} setScore={setScore} scoreLevel={scoreLevel} onAnterior={() => navigate('/pago')} onSiguiente={() => alert('¡Formulario enviado!')} />} />
      </Routes>
    </main>
  );
};

const MainPage = () => {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [score, setScore] = useState(900);

  const scoreLevel = useMemo(() => {
    if (score >= 900) {
      return {
        letter: "AA",
        color: "#43b324",
        emoji: <FaCheckCircle style={{ color: '#43b324', verticalAlign: 'middle', fontSize: '1.1em', marginLeft: 2, marginRight: 2 }} />,
        text: "Vas muy bien, pero siempre es bueno mejorar. Llena el formulario y solicita tu análisis de crédito para conocer oportunidades y proteger tu historial financiero."
      };
    } else if (score >= 800) {
      return {
        letter: "A",
        color: "#43b324",
        emoji: <FaCheckCircle style={{ color: '#43b324', verticalAlign: 'middle', fontSize: '1.1em', marginLeft: 2, marginRight: 2 }} />,
        text: "Tu historial crediticio es bueno. Llena el formulario y solicita tu análisis de crédito para conocer oportunidades y proteger tu historial financiero."
      };
    } else if (score >= 700) {
      return {
        letter: "B",
        color: "#ffa500",
        emoji: <FaCheckCircle style={{ color: '#ffa500', verticalAlign: 'middle', fontSize: '1.1em', marginLeft: 2, marginRight: 2 }} />,
        text: "Tu historial crediticio es regular. Llena el formulario y solicita tu análisis de crédito para mejorar tu situación financiera."
      };
    } else if (score >= 600) {
      return {
        letter: "C",
        color: "#ffa500",
        emoji: <FaCheckCircle style={{ color: '#ffa500', verticalAlign: 'middle', fontSize: '1.1em', marginLeft: 2, marginRight: 2 }} />,
        text: "Tu historial crediticio necesita atención. Llena el formulario y solicita tu análisis de crédito para mejorar tu situación financiera."
      };
    } else {
      return {
        letter: "D",
        color: "#ff0000",
        emoji: <FaCheckCircle style={{ color: '#ff0000', verticalAlign: 'middle', fontSize: '1.1em', marginLeft: 2, marginRight: 2 }} />,
        text: "Tu historial crediticio necesita atención inmediata. Llena el formulario y solicita tu análisis de crédito para mejorar tu situación financiera."
      };
    }
  }, [score]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <Router>
      <div className="mainpage-bg">
        {/* Header y menú */}
        <header className="main-header">
          <div className="main-header-inner">
            <div className="main-logo-block">
              <a href="https://buro.vercel.app" target="_blank" rel="noopener noreferrer">
                <img src="https://buroecuador.com/wp-content/uploads/2023/08/buro-ecuador-logo.svg" alt="Buró Ecuador Logo" className="main-logo-img" />
              </a>
            </div>
            <nav className="main-nav">
              <ul>
                <li><a href="https://buro.vercel.app/" target="_blank" rel="noopener noreferrer">Inicio Buró Ecuador</a></li>
                <li><a href="https://buroecuador.com/alivio-financiero/" target="_blank" rel="noopener noreferrer">Alivio Financiero</a></li>
                <li
                  className="has-submenu"
                  onMouseEnter={() => setSubmenuOpen(true)}
                  onMouseLeave={() => setSubmenuOpen(false)}
                  onFocus={() => setSubmenuOpen(true)}
                  onBlur={() => setSubmenuOpen(false)}
                  tabIndex={0}
                >
                  <a href="#">Simuladores</a>
                  <ul className="submenu" style={{ display: submenuOpen ? 'flex' : 'none' }}>
                    <li><a href="https://buroecuador.com/simulador-credito/" target="_blank" rel="noopener noreferrer">Simulador de crédito</a></li>
                    <li><a href="https://buroecuador.com/barometro-ponzi/" target="_blank" rel="noopener noreferrer">Barómetro Ponzi</a></li>
                  </ul>
                </li>
                <li><a href="https://buroecuador.com/blog/" target="_blank" rel="noopener noreferrer">Consejos</a></li>
                <li><a href="https://buro.vercel.app/" target="_blank" rel="noopener noreferrer">Contacto</a></li>
              </ul>
            </nav>
            <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
              <FaBars />
            </button>
          </div>
        </header>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <div className="mobile-menu-header">
            <img src="https://buroecuador.com/wp-content/uploads/2023/08/buro-ecuador-logo.svg" alt="Buró Ecuador Logo" className="main-logo-img" />
            <button className="mobile-menu-close" onClick={toggleMobileMenu}>
              <FaTimes />
            </button>
          </div>
          <nav className="mobile-nav">
            <a href="https://buro.vercel.app/" target="_blank" rel="noopener noreferrer">Inicio Buró Ecuador</a>
            <a href="https://buroecuador.com/alivio-financiero/" target="_blank" rel="noopener noreferrer">Alivio Financiero</a>
            <a href="https://buroecuador.com/simulador-credito/" target="_blank" rel="noopener noreferrer">Simulador de crédito</a>
            <a href="https://buroecuador.com/barometro-ponzi/" target="_blank" rel="noopener noreferrer">Barómetro Ponzi</a>
            <a href="https://buroecuador.com/blog/" target="_blank" rel="noopener noreferrer">Consejos</a>
            <a href="https://buro.vercel.app/" target="_blank" rel="noopener noreferrer">Contacto</a>
          </nav>
        </div>

        {/* Contenido principal: Score, formulario, etc */}
        <MainPageRoutes score={score} setScore={setScore} scoreLevel={scoreLevel} />

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default MainPage; 