import { NextResponse } from 'next/server';
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email, mensajeHtml, asunto } = await req.json();

    const userMail = process.env.MAIL_USER;
    const passMail = process.env.MAIL_PASS;

    if (!userMail || !passMail) {
      return NextResponse.json(
        { error: 'Faltan credenciales de correo en variables de entorno' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, 
      auth: {
        user: userMail,
        pass: passMail.replace(/\s/g, ''), 
      },
    });

    await transporter.sendMail({
      from: '"Pidcommerce" <no-reply@appmetrofem.com>', 
      to: email,
      subject: asunto,
      html: mensajeHtml, 
    });

    return NextResponse.json({ res: 'Mensaje enviado' }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || 'Error desconocido' },
      { status: 500 }
    );
  }
}
