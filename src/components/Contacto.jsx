import React, { useState } from "react";
import "./CreditReportPage.css";
import { FaEnvelope, FaUser, FaPhone, FaRegCommentDots, FaCheckCircle } from "react-icons/fa";

const Contacto = () => {
  const [form, setForm] = useState({ nombre: '', correo: '', telefono: '', mensaje: '' });
  const [errors, setErrors] = useState({});
  const [enviado, setEnviado] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.nombre.trim()) errs.nombre = 'Nombre requerido';
    if (!form.correo.match(/^\S+@\S+\.\S+$/)) errs.correo = 'Correo inválido';
    if (!form.telefono.match(/^\d{9,10}$/)) errs.telefono = 'Teléfono inválido';
    if (!form.mensaje.trim()) errs.mensaje = 'Mensaje requerido';
    if (form.mensaje.length > 180) errs.mensaje = 'Máximo 180 caracteres';
    return errs;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setErrors(e => ({ ...e, [name]: undefined }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setEnviado(true);
      setTimeout(() => setEnviado(false), 3500);
      setForm({ nombre: '', correo: '', telefono: '', mensaje: '' });
    }
  };

  return (
    <div className="credit-bg" style={{ minHeight: '100vh', width: '100vw' }}>
      <div className="decor-circle"></div>
      <div className="credit-main-layout">
        <div className="main-left">
          <h1 className="form-title" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <FaEnvelope style={{ color: '#2a3eb1', fontSize: 32 }} /> Contacto
          </h1>
          <div className="desc" style={{ marginBottom: 18, fontSize: 17 }}>
            <b>Analista Buró Ecuador</b> <span style={{ color: '#888', fontWeight: 400, fontSize: 15 }}>agosto 22, 2023</span>
            <br />
            Bienvenido a nuestra página de contacto. Formamos parte del Grupo SOCIORED, respaldados por la empresa de tecnología Soporte Press. Si tienes alguna consulta, inquietud o mensaje para nosotros, te invitamos a llenar el formulario a continuación. Estamos aquí para ayudarte y guiarte en cada paso de tu experiencia crediticia.
          </div>
          <div className="main-form-block" style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px rgba(60,60,120,0.07)', padding: 32, marginBottom: 36, border: '1.5px solid #e3e6fa', maxWidth: 480 }}>
            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="form-group" style={{ marginBottom: 18 }}>
                <label className="form-label" htmlFor="nombre">Nombre *</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <FaUser style={{ color: '#2a3eb1', fontSize: 18 }} />
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    placeholder="Ejemplo: Juan"
                    value={form.nombre}
                    onChange={handleChange}
                    style={{ width: '100%', border: errors.nombre ? '2px solid #b71c1c' : '1.5px solid #e3e6fa', borderRadius: 8, padding: 10, fontSize: 16, transition: 'border 0.18s' }}
                  />
                </div>
                {errors.nombre && <div className="form-error-v2">{errors.nombre}</div>}
              </div>
              <div className="form-group" style={{ marginBottom: 18 }}>
                <label className="form-label" htmlFor="correo">Correo electrónico *</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <FaEnvelope style={{ color: '#2a3eb1', fontSize: 18 }} />
                  <input
                    type="email"
                    id="correo"
                    name="correo"
                    placeholder="Ej: john@doe.com"
                    value={form.correo}
                    onChange={handleChange}
                    style={{ width: '100%', border: errors.correo ? '2px solid #b71c1c' : '1.5px solid #e3e6fa', borderRadius: 8, padding: 10, fontSize: 16, transition: 'border 0.18s' }}
                  />
                </div>
                {errors.correo && <div className="form-error-v2">{errors.correo}</div>}
              </div>
              <div className="form-group" style={{ marginBottom: 18 }}>
                <label className="form-label" htmlFor="telefono">Número de teléfono *</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <FaPhone style={{ color: '#2a3eb1', fontSize: 18 }} />
                  <input
                    type="text"
                    id="telefono"
                    name="telefono"
                    placeholder="Ejemplo: 0990446677"
                    value={form.telefono}
                    onChange={handleChange}
                    style={{ width: '100%', border: errors.telefono ? '2px solid #b71c1c' : '1.5px solid #e3e6fa', borderRadius: 8, padding: 10, fontSize: 16, transition: 'border 0.18s' }}
                  />
                </div>
                {errors.telefono && <div className="form-error-v2">{errors.telefono}</div>}
              </div>
              <div className="form-group" style={{ marginBottom: 18 }}>
                <label className="form-label" htmlFor="mensaje">Mensaje *</label>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <FaRegCommentDots style={{ color: '#2a3eb1', fontSize: 18, marginTop: 8 }} />
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    placeholder="Introduce tu mensaje..."
                    value={form.mensaje}
                    onChange={handleChange}
                    maxLength={180}
                    rows={4}
                    style={{ width: '100%', border: errors.mensaje ? '2px solid #b71c1c' : '1.5px solid #e3e6fa', borderRadius: 8, padding: 10, fontSize: 16, transition: 'border 0.18s', resize: 'vertical' }}
                  />
                </div>
                <div style={{ fontSize: 13, color: form.mensaje.length > 180 ? '#b71c1c' : '#888', textAlign: 'right', marginTop: 2 }}>{form.mensaje.length} / 180</div>
                {errors.mensaje && <div className="form-error-v2">{errors.mensaje}</div>}
              </div>
              <button
                type="submit"
                style={{ width: '100%', background: '#2a3eb1', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 0', fontSize: 17, fontWeight: 700, cursor: 'pointer', transition: 'background 0.18s' }}
              >
                Enviar mensaje
              </button>
              {enviado && (
                <div style={{ background: '#f7fefb', border: '2px solid #43b324', borderRadius: 14, marginTop: 24, padding: 18, textAlign: 'center', color: '#232a31', fontSize: 17, fontWeight: 500, boxShadow: '0 2px 16px rgba(60,60,120,0.10)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  <FaCheckCircle style={{ color: '#43b324', fontSize: 28, marginBottom: 4 }} />
                  ¡Mensaje enviado! Te responderemos pronto.
                </div>
              )}
            </form>
            <div style={{ fontSize: 14, color: '#888', marginTop: 24, textAlign: 'center' }}>
              SOCIORED & Soporte Press · Buró Ecuador 2025
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

export default Contacto; 