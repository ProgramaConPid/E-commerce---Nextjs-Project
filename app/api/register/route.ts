import { connectDB } from "@/lib/mongodb";
import User from "@/database/models/Users";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password)
      return Response.json({ error: "Todos los campos son requeridos" }, { status: 400 });

    await connectDB();

    const exist = await User.findOne({ email });
    if (exist)
      return Response.json({ error: "El usuario ya existe" }, { status: 400 });

    const hashed = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashed });

    return Response.json({ msg: "Usuario creado correctamente" }, { status: 201 });
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
