import React, { useState } from "react";
import CreditReportPage from "./CreditReportPage";
import DocumentosPage from "./DocumentosPage";
import PagoPage from "./PagoPage";
import Footer from "./Footer";
import "./MainPage.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

const MainPageRoutes = () => {
  const navigate = useNavigate();
  return (
    <main className="main-content">
      <Routes>
        <Route path="/" element={<CreditReportPage onSiguiente={() => navigate('/documentos')} />} />
        <Route path="/documentos" element={<DocumentosPage onAnterior={() => navigate('/')} onSiguiente={() => navigate('/pago')} />} />
        <Route path="/pago" element={<PagoPage onAnterior={() => navigate('/documentos')} />} />
      </Routes>
    </main>
  );
};

const MainPage = () => {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
              <img src="https://buroecuador.com/wp-content/uploads/2023/08/buro-ecuador-logo.svg" alt="Buró Ecuador Logo" className="main-logo-img" />
            </div>
            <nav className="main-nav">
              <ul>
                <li><a href="#">Inicio Buró Ecuador</a></li>
                <li><a href="#">Alivio Financiero</a></li>
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
                    <li><a href="#">Simulador de crédito</a></li>
                    <li><a href="#">Barómetro Ponzi</a></li>
                  </ul>
                </li>
                <li><a href="#">Consejos</a></li>
                <li><a href="#">Contacto</a></li>
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
            <a href="#">Inicio Buró Ecuador</a>
            <a href="#">Alivio Financiero</a>
            <a href="#">Simuladores</a>
            <a href="#">Consejos</a>
            <a href="#">Contacto</a>
          </nav>
        </div>

        {/* Contenido principal: Score, formulario, etc */}
        <MainPageRoutes />

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default MainPage; 