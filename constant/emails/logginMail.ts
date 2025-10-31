export const logginMail = `
  <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 5px; border: 1px solid #000;">
    <h2 style="color: #333;">Nuevo Inicio de Sesión Detectado</h2>
    <p>Hola,</p>
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIOrKeSleconpmeUexCVKsBE0TzOwtoH4vCA&s" alt="Gato CR7" style="width: 100%; display: block; border-radius:"6px"; /> 
    <p>Hemos detectado un nuevo inicio de sesión en tu cuenta. Si fuiste tú, puedes ignorar este correo. Si no reconoces esta actividad, te recomendamos cambiar tu contraseña inmediatamente.</p>
    <h3>Detalles del Inicio de Sesión:</h3>
    <ul>
      <li><strong>Fecha y Hora:</strong> {{fechaHora}}</li>
      <li><strong>Ubicación:</strong> {{ubicacion}}</li>
      <li><strong>Dispositivo:</strong> {{dispositivo}}</li>
      <li><strong>Navegador:</strong> {{navegador}}</li>
    </ul>
    <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.</p>
    <p>Saludos,<br/>El equipo de Soporte</p>
  </div>
`;
