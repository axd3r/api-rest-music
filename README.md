# 🎵 API REST Music

Una API RESTful construida con **Node.js**, **Express**, **TypeScript** y **MongoDB**, diseñada para gestionar usuarios y permitir la subida y visualización de imágenes de perfil.

---

## 🚀 Tecnologías utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB + Mongoose](https://mongoosejs.com/)
- [JWT + bcrypt](https://jwt.io/)
- [Multer](https://github.com/expressjs/multer) para manejo de archivos
- [dotenv](https://www.npmjs.com/package/dotenv) para gestión de variables de entorno

---

## 📁 Estructura del proyecto

api-rest-music/ ├── node_modules/ ├── src/ │ ├── index.ts # Punto de entrada del servidor │ ├── controllers/ # Controladores de rutas │ ├── middlewares/ # Middlewares personalizados │ ├── models/ # Modelos de Mongoose │ ├── routes/ # Definiciones de rutas │ ├── utils/ # Utilidades como helpers ├── image/ │ └── user/ # Carpeta para imágenes de usuarios ├── dist/ # Archivos compilados de TypeScript ├── .env # Variables de entorno (no subir al repo) ├── tsconfig.json # Configuración de TypeScript ├── package.json └── README.md