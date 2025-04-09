import validator from "validator";

interface UserParams {
    email: string;
    password: string;
}

const loginUserValidator = (params: UserParams): boolean => {
    if (!params || typeof params !== "object") {
        throw new Error("Debe proporcionar un objeto válido con los datos del usuario.");
    }

    if (!params.email || validator.isEmpty(params.email)) {
        throw new Error("El email es obligatorio.");
    }

    if (!params.password || validator.isEmpty(params.password)) {
        throw new Error("La contraseña es obligatoria.");
    }

    return true;
};

export default loginUserValidator;