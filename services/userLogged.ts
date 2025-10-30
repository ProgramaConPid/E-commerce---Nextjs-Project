interface SendEmailParams {
  email: string;
  asunto: string;
  mensajeHtml: string; 
}

export async function sendEmail({ email, asunto, mensajeHtml }: SendEmailParams) {
  const response = await fetch('/api/sendEmail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, asunto, mensajeHtml }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Error enviando el correo');
  }

  return response.json(); 
}
