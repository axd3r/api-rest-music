import validator from "validator";

interface UserParams {
  name: string;
  nick: string;
  email: string;
  password: string;
  role?: "user" | "admin";
  image?: string;
}

const userValidator = (params: UserParams): boolean => {
  if (!params || typeof params !== "object") {
    throw new Error("Debe proporcionar un objeto válido con los datos del usuario.");
  }

  if (!params.name || validator.isEmpty(params.name)) {
    throw new Error("El nombre es obligatorio.");
  }

  if (!validator.isLength(params.name, { min: 3, max: 50 })) {
    throw new Error("El nombre debe tener entre 3 y 50 caracteres.");
  }

  if (!params.nick || validator.isEmpty(params.nick)) {
    throw new Error("El apodo (nick) es obligatorio.");
  }

  if (!validator.isLength(params.nick, { min: 3 })) {
    throw new Error("El apodo (nick) debe tener al menos 3 caracteres.");
  }

  if (!params.email || validator.isEmpty(params.email)) {
    throw new Error("El email es obligatorio.");
  }

  if (!validator.isEmail(params.email)) {
    throw new Error("El formato del email no es válido.");
  }

  if (!params.password || validator.isEmpty(params.password)) {
    throw new Error("La contraseña es obligatoria.");
  }

  if (!validator.isLength(params.password, { min: 6 })) {
    throw new Error("La contraseña debe tener al menos 6 caracteres.");
  }

  if (params.role && !["user", "admin"].includes(params.role)) {
    throw new Error("El rol debe ser 'user' o 'admin'.");
  }

  return true;
};

export default userValidator;
