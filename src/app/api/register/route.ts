import { connectDB } from "@/lib/mongodb";
import User from "@/database/models/Users";
import bcrypt from "bcrypt";
import { registerSchema } from "@/validators/register.schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    await registerSchema.validate(body, { abortEarly: false });

    const { name, email, password } = body;

    await connectDB();

    const exist = await User.findOne({ email });
    if (exist)
      return Response.json({ error: "This user already exists" }, { status: 400 });

    const hashed = await bcrypt.hash(password, 10);

    await User.create({ name, email, password: hashed });

    return Response.json(
      { msg: "User created correctly" },
      { status: 201 }
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.name === "ValidationError") {
      return Response.json(
        {
          message: "Errores de validación",
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    return Response.json(
      { error: error.message || "Error interno del servidor" },
      { status: 500 }
    );
  }
}
