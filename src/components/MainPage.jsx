import React, { useState } from "react";
import CreditReportPage from "./CreditReportPage";
import Footer from "./Footer";
import "./MainPage.css";
import { FaBars, FaTimes } from "react-icons/fa";

const MainPage = () => {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
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
      <main className="main-content">
        <CreditReportPage />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainPage; 