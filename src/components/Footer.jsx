import React from "react";
import "./Footer.css";

const Footer = () => (
  <footer className="footer-container">
    <div className="footer-content">
      <div className="footer-left">
        <div className="footer-copyright">
          © Copyright 2025<br />
          <b>BURÓ ECUADOR</b>
        </div>
        <div className="footer-disclaimer">
          <span className="footer-note">(1) Nota de descargo:</span> Por favor, ten en cuenta que Buró Ecuador opera como la plataforma oficial de SOPORTE PRESS. Al solicitar la generación de tu «Reporte Buró Ecuador» estás otorgando tu autorización expresa a esta plataforma para que analice y obtenga tu información crediticia en tu nombre. Asegúrate de comprender y estar de acuerdo con este proceso antes de continuar.
        </div>
      </div>
      <div className="footer-logos">
        <img src="https://buroecuador.com/wp-content/uploads/2023/08/buro-ecuador-logo.svg" alt="Buró Ecuador Logo" className="footer-logo" />
        <img src="https://buroecuador.com/wp-content/uploads/2023/08/soporte-press-fondo-blanco.png" alt="Soporte Press Logo" className="footer-logo" />
        <img src="https://buroecuador.com/wp-content/uploads/2023/08/SOCIORED-BE-e1694203519238-768x175.png" alt="SocioRed Logo" className="footer-logo" />
      </div>
    </div>
  </footer>
);

export default Footer; 