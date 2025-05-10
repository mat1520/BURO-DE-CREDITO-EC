import React, { useState, useEffect, useRef } from "react";
import "./CreditReportPage.css";
import ScoreCircle from "./ScoreCircle";
import { FaCheckCircle, FaInfoCircle } from "react-icons/fa";

const SCORE_LEVELS = [
  {
    min: 0,
    max: 599,
    letter: "C",
    emoji: "🚫🔥",
    color: "#b71c1c",
    text: "Actualmente es muy difícil acceder a créditos. Haz tu Análisis personalizado para identificar deudas, planificar pagos y trabajar en la recuperación de tu historial financiero."
  },
  {
    min: 600,
    max: 799,
    letter: "B",
    emoji: "😟🔎",
    color: "#e6a700",
    text: "Tu calificación es regular. Solicita un Análisis personalizado para conocer a quién debes, cuánto debes y qué estrategias puedes aplicar para mejorar tus posibilidades de obtener un crédito."
  },
  {
    min: 800,
    max: 899,
    letter: "A",
    emoji: "⚠️📋",
    color: "#fbc02d",
    text: "Estás al límite. Llena el formulario para solicitar tu Análisis personalizado y detectar qué debes mejorar para fortalecer tu perfil crediticio y mantener acceso a nuevos créditos."
  },
  {
    min: 900,
    max: 999,
    letter: "AA",
    emoji: <FaCheckCircle style={{ color: '#43b324', verticalAlign: 'middle', fontSize: '1.1em', marginLeft: 2, marginRight: 2 }} />, // check verde
    color: "#43b324",
    text: "Vas muy bien, pero siempre es bueno mejorar. Llena el formulario y solicita tu análisis de crédito para conocer oportunidades y proteger tu historial financiero."
  }
];

function getScoreLevel(score) {
  return SCORE_LEVELS.find(l => score >= l.min && score <= l.max) || SCORE_LEVELS[SCORE_LEVELS.length - 1];
}

const PagoPage = ({ score, setScore, onAnterior, onSiguiente }) => {
  const [form, setForm] = useState({
    pago: "",
    nombre: "",
    apellidos: "",
    cedula: "",
    huella: "",
    edad: "",
    email: "",
    whatsapp: ""
  });
  const [errors, setErrors] = useState({});
  const SCORE_LEVEL = getScoreLevel(score);
  const [isDragging, setIsDragging] = useState(false);
  const scoreBarRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('pagoForm');
    if (saved) setForm(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('pagoForm', JSON.stringify(form));
  }, [form]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Score bar handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    updateScore(e);
  };
  const handleMouseMove = (e) => {
    if (isDragging) updateScore(e);
  };
  const handleMouseUp = () => setIsDragging(false);
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

  const handleSubmit = e => {
    e.preventDefault();
    const newErrors = {};
    if (!form.pago) newErrors.pago = "Selecciona una forma de pago";
    if (!form.nombre) newErrors.nombre = "Campo requerido";
    if (!form.apellidos) newErrors.apellidos = "Campo requerido";
    if (!form.cedula) newErrors.cedula = "Campo requerido";
    if (!form.huella) newErrors.huella = "Campo requerido";
    if (!form.edad) newErrors.edad = "Campo requerido";
    else if (!/^\d+$/.test(form.edad) || Number(form.edad) < 18 || Number(form.edad) > 100) newErrors.edad = "Edad debe ser un número entre 18 y 100";
    if (!form.email) newErrors.email = "Campo requerido";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = "Correo electrónico inválido";
    if (!form.whatsapp) newErrors.whatsapp = "Campo requerido";
    else if (!/^0[0-9]{9}$/.test(form.whatsapp)) newErrors.whatsapp = "Debe ingresar el número completo (ej: 0998765432)";
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      if (onSiguiente) onSiguiente();
    }
  };

  return (
    <div className="credit-bg" style={{ paddingTop: 0 }}>
      <div className="decor-circle"></div>
      <div className="credit-main-layout">
        <div className="main-left">
          <div className="form-intro">
            <h1 className="form-title">Pago y Datos</h1>
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
              <span className="progress-label">75%</span>
              <div className="progress-bar-outer">
                <div className="progress-bar-inner" style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>
          <form className="main-form" onSubmit={handleSubmit} autoComplete="off">
            <div className="form-group">
              <label className="form-label">Forma de pago <span className="form-required">*</span></label>
              <select name="pago" className={`form-select${errors.pago ? ' input-error-v2' : ''}`} value={form.pago} onChange={handleChange}>
                <option value="">Seleccionar forma de pago</option>
                <option value="tarjeta">Tarjeta de crédito/débito</option>
              </select>
              {errors.pago && <div className="form-error-v2">{errors.pago}</div>}
            </div>
            <div className="form-row" style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label className="form-label">Nombre <span className="form-required">*</span></label>
                <input name="nombre" className={`form-input form-input-compact${errors.nombre ? ' input-error-v2' : ''}`} placeholder="Ejemplo: Juan" value={form.nombre} onChange={handleChange} />
                {errors.nombre && <div className="form-error-v2">{errors.nombre}</div>}
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label className="form-label">Apellidos <span className="form-required">*</span></label>
                <input name="apellidos" className={`form-input form-input-compact${errors.apellidos ? ' input-error-v2' : ''}`} placeholder="Ejemplo: Pérez" value={form.apellidos} onChange={handleChange} />
                {errors.apellidos && <div className="form-error-v2">{errors.apellidos}</div>}
              </div>
            </div>
            <div className="form-group" style={{ width: '100%', marginBottom: 10 }}>
              <label className="form-label">Cédula <span className="form-required">*</span></label>
              <input name="cedula" className={`form-input form-input-compact${errors.cedula ? ' input-error-v2' : ''}`} placeholder="Ejemplo: 1704555097" maxLength={10} value={form.cedula} onChange={handleChange} style={{ width: '100%' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
                <span></span>
                <span style={{ fontSize: 12, color: '#888' }}>{form.cedula.length} / 10</span>
              </div>
              {errors.cedula && <div className="form-error-v2">{errors.cedula}</div>}
            </div>
            <div className="form-row" style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
              <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                <label className="form-label">Código huella dactilar <span className="form-required">*</span></label>
                <input name="huella" className={`form-input form-input-compact${errors.huella ? ' input-error-v2' : ''}`} placeholder="Ejemplo: V4423I4242" maxLength={12} value={form.huella} onChange={handleChange} />
                {errors.huella && <div className="form-error-v2">{errors.huella}</div>}
              </div>
              <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                <label className="form-label">Edad <span className="form-required">*</span></label>
                <input name="edad" className={`form-input form-input-compact${errors.edad ? ' input-error-v2' : ''}`} placeholder="P.ej. 18" value={form.edad} onChange={handleChange} />
                {errors.edad && <div className="form-error-v2">{errors.edad}</div>}
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2, marginBottom: 8 }}>
              <span style={{ fontSize: 11, color: '#888', textAlign: 'left', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: 8 }}>
                Se encuentra en el reverso de tu cédula de identidad
              </span>
              <span style={{ fontSize: 12, color: '#888', textAlign: 'right', whiteSpace: 'nowrap', flexShrink: 0 }}>
                {form.huella.length} / 12
              </span>
            </div>
            <div className="form-row" style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label className="form-label">Correo electrónico <span className="form-required">*</span></label>
                <input name="email" className={`form-input form-input-compact${errors.email ? ' input-error-v2' : ''}`} placeholder="Ej. : john@doe.com" value={form.email} onChange={handleChange} />
                {errors.email && <div className="form-error-v2">{errors.email}</div>}
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label className="form-label">WhatsApp <span className="form-required">*</span></label>
                <input 
                  name="whatsapp" 
                  className={`form-input form-input-compact${errors.whatsapp ? ' input-error-v2' : ''}`} 
                  placeholder="Ej: 0998765432" 
                  value={form.whatsapp} 
                  onChange={e => {
                    // Solo permitir números
                    const value = e.target.value.replace(/[^0-9]/g, '');
                    setForm({ ...form, whatsapp: value });
                  }}
                  maxLength={10}
                />
                {errors.whatsapp && <div className="form-error-v2">{errors.whatsapp}</div>}
              </div>
            </div>
            <div className="form-buttons" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24 }}>
              <button type="button" className="siguiente-btn anterior-btn-disabled" disabled>Anterior</button>
              <button type="submit" className="siguiente-btn">Siguiente</button>
            </div>
          </form>
        </div>
        <div className="main-right">
          <section className="score-section score-section-v2">
            <div className="score-top-block-v2">
              <div className="score-circle-block">
                <ScoreCircle score={score} color={SCORE_LEVEL.color} />
              </div>
              <div className="score-bar-block-v2">
                <div className="score-bar-label">Score de Crédito:</div>
                <div className="score-bar-vertical" 
                  ref={scoreBarRef}
                  onMouseDown={handleMouseDown}
                  style={{ cursor: 'pointer' }}
                >
                  <div
                    className="score-bar-indicator"
                    style={{
                      top: `${100 - (score / 999) * 100}%`,
                      background: SCORE_LEVEL.color,
                      cursor: 'grab'
                    }}
                  ></div>
                </div>
                <div className="score-bar-value">{score} - {SCORE_LEVEL.letter}</div>
              </div>
            </div>
            <div className="score-info score-info-v2" style={{ borderColor: SCORE_LEVEL.color }}>
              <div className="score-info-badge" style={{ background: SCORE_LEVEL.color }}>{SCORE_LEVEL.letter}</div>
              <h3>Tu Score Crediticio</h3>
              <p>Puntaje simulado: <b>{score}</b></p>
              <p><b>Cliente {SCORE_LEVEL.letter}</b> {SCORE_LEVEL.emoji} {SCORE_LEVEL.text}</p>
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

export default PagoPage; 