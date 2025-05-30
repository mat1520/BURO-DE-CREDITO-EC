import React, { useState, useMemo } from "react";
import CreditReportPage from "./CreditReportPage";
import DocumentosPage from "./DocumentosPage";
import PagoPage from "./PagoPage";
import Footer from "./Footer";
import "./MainPage.css";
import { FaBars, FaTimes, FaCheckCircle } from "react-icons/fa";
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from 'react-router-dom';
import AnalisisPage from "./AnalisisPage";
import AlivioFinancieroPage from "./AlivioFinancieroPage";
import AlivioFinancieroPaso2 from "./AlivioFinancieroPaso2";
import AlivioFinancieroPaso3 from "./AlivioFinancieroPaso3";
import AlivioFinancieroResumenPago from "./AlivioFinancieroResumenPago";
import SimuladorCredito from "./SimuladorCredito";
import BarometroPonzi from "./BarometroPonzi";
import Consejos from "./Consejos";
import Contacto from "./Contacto";

const MainPageRoutes = ({ score, setScore, scoreLevel }) => {
  const navigate = useNavigate();
  return (
    <main className="main-content">
      <Routes>
        <Route path="/" element={<CreditReportPage score={score} setScore={setScore} scoreLevel={scoreLevel} onSiguiente={() => navigate('/documentos')} />} />
        <Route path="/documentos" element={<DocumentosPage score={score} setScore={setScore} scoreLevel={scoreLevel} onAnterior={() => navigate('/')} onSiguiente={() => navigate('/pago')} />} />
        <Route path="/pago" element={<PagoPage score={score} setScore={setScore} scoreLevel={scoreLevel} onAnterior={() => navigate('/documentos')} onSiguiente={() => navigate('/analisis')} />} />
        <Route path="/analisis" element={<AnalisisPage score={score} setScore={setScore} scoreLevel={scoreLevel} onAnterior={() => navigate('/pago')} onSiguiente={() => alert('¡Formulario enviado!')} />} />
        <Route path="/alivio-financiero" element={<AlivioFinancieroPage />} />
        <Route path="/alivio-financiero/paso-2" element={<AlivioFinancieroPaso2 onSiguiente={() => navigate('/alivio-financiero/paso-3')} />} />
        <Route path="/alivio-financiero/paso-3" element={<AlivioFinancieroPaso3 onSiguiente={() => navigate('/alivio-financiero/resumen')} />} />
        <Route path="/alivio-financiero/resumen" element={<AlivioFinancieroResumenPago />} />
        <Route path="/simulador-credito" element={<SimuladorCredito />} />
        <Route path="/barometro-ponzi" element={<BarometroPonzi />} />
        <Route path="/consejos" element={<Consejos />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </main>
  );
};

const MainPage = () => {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [score, setScore] = useState(900);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                <li><a href="/alivio-financiero">Alivio Financiero</a></li>
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
                    <li><Link to="/simulador-credito">Simulador de Crédito</Link></li>
                    <li><Link to="/barometro-ponzi">Barómetro Ponzi</Link></li>
                  </ul>
                </li>
                <li><Link to="/consejos">Consejos</Link></li>
                <li><Link to="/contacto">Contacto</Link></li>
              </ul>
            </nav>
            <button
              className="mobile-menu-btn"
              onClick={toggleMobileMenu}
              style={{ display: mobileMenuOpen ? 'none' : 'block' }}
            >
              <FaBars />
            </button>
          </div>
        </header>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <>
            {/* Overlay */}
            <div
              className="mobile-menu-overlay"
              onClick={toggleMobileMenu}
              style={{
                position: 'fixed',
                top: 0, left: 0, width: '100vw', height: '100vh',
                background: 'rgba(0,0,0,0.18)',
                zIndex: 99
              }}
            />
            {/* Drawer */}
            <div className="mobile-menu active" style={{
              borderTopRightRadius: 40,
              borderBottomRightRadius: 40,
              width: '85vw',
              maxWidth: 340,
              minWidth: 260,
              height: '100vh',
              position: 'fixed',
              top: 0,
              left: 0,
              background: '#fff',
              zIndex: 100,
              boxShadow: '0 0 32px #0002',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '18px 22px 8px 18px'
              }}>
                <img src="https://buroecuador.com/wp-content/uploads/2023/08/buro-ecuador-logo.svg" alt="Buró Ecuador Logo" style={{ height: 38 }} />
                <button
                  className="mobile-menu-btn"
                  onClick={toggleMobileMenu}
                  aria-label="Cerrar menú"
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: 28,
                    color: '#b71c1c',
                    cursor: 'pointer',
                    marginLeft: 8
                  }}
                >
                  <FaTimes />
                </button>
              </div>
              <nav className="mobile-nav">
                <a href="https://buro.vercel.app/" target="_blank" rel="noopener noreferrer" onClick={toggleMobileMenu}>Inicio Buró Ecuador</a>
                <a href="/alivio-financiero" onClick={toggleMobileMenu}>Alivio Financiero</a>
                <Link to="/simulador-credito" onClick={toggleMobileMenu}>Simulador de Crédito</Link>
                <Link to="/barometro-ponzi" onClick={toggleMobileMenu}>Barómetro Ponzi</Link>
                <Link to="/consejos" onClick={toggleMobileMenu}>Consejos</Link>
                <Link to="/contacto" onClick={toggleMobileMenu}>Contacto</Link>
              </nav>
            </div>
          </>
        )}

        {/* Contenido principal: Score, formulario, etc */}
        <MainPageRoutes score={score} setScore={setScore} scoreLevel={scoreLevel} />

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default MainPage; 