import validator from "validator";

interface UserParams {
    userId: string;
}

const findUserValidator = (params: UserParams): boolean => {
    if (!params || typeof params !== "object") {
        throw new Error("Debe ingresar algún dato.");
    }

    if (!params.userId || validator.isEmpty(params.userId)) {
        throw new Error("El parametro de busqueda debe ser obligatorio");
    }

    return true;
};

export default findUserValidator;

