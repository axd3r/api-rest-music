# 🎵 API REST Music

Una API RESTful construida con **Node.js**, **Express**, **TypeScript** y **MongoDB**, diseñada para gestionar usuarios, permitir la subida y visualización de imágenes de perfil.

---

## 🚀 Tecnologías utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB + Mongoose](https://mongoosejs.com/)
- [JWT + bcrypt](https://jwt.io/)
- [Multer](https://github.com/expressjs/multer) - Manejo de archivos
- [dotenv](https://www.npmjs.com/package/dotenv) - Variables de entorno
- [validator](https://www.npmjs.com/package/validator) - Validaciones de datos

---

## 📁 Estructura del proyecto

```bash
api-rest-music/
├── node_modules/
├── src/
│   ├── index.ts          # Punto de entrada del servidor
│   ├── controllers/      # Controladores de rutas
│   ├── middlewares/      # Middlewares personalizados
│   ├── models/           # Modelos de Mongoose
│   ├── routes/           # Definiciones de rutas
│   └── utils/            # Utilidades como helpers
├── image/
│   └── user/             # Carpeta para imágenes de usuarios
├── dist/                 # Archivos compilados de TypeScript
├── .env                  # Variables de entorno (no subir al repo)
├── tsconfig.json         # Configuración de TypeScript
├── package.json
└── README.md
```

---

## ⚙️ Instalación

```bash
# Clona el proyecto
git clone https://github.com/tu-usuario/api-rest-music.git

# Entra al directorio del proyecto
cd api-rest-music

# Instala las dependencias
npm install
```

---

## 📜 Scripts disponibles

| Script          | Descripción                                             |
|-----------------|---------------------------------------------------------|
| `npm run dev`   | Inicia el servidor en modo desarrollo con ts-node       |
| `npm run build` | Compila el proyecto a JavaScript en la carpeta `/dist`  |
| `npm start`     | Ejecuta la versión compilada (`node dist/index.js`)     |
| `npm run clean` | Elimina la carpeta `/dist`                              |

---

## 🔐 Funcionalidades

- Registro y login de usuarios con JWT.
- Subida de imágenes de perfil.
- Servir imágenes de usuario por nombre de archivo.
- Validaciones con `validator`.
- Protección de rutas mediante tokens.

---

## 📂 Manejo de imágenes

- Las imágenes se guardan en la carpeta `/image/user/`.
- Solo se permiten archivos `.png`, `.jpg`, `.jpeg`, `.gif`.
- Si se sube una nueva imagen, puede reemplazar la anterior (según lógica de negocio).
- Las imágenes se pueden acceder públicamente mediante la ruta:

```http
GET /avatar/:file
```

---

## 🧪 Endpoints principales

| Método | Ruta         | Descripción                                  |
|--------|--------------|----------------------------------------------|
| POST   | /register     | Crear nuevo usuario                          |
| POST   | /login        | Iniciar sesión y recibir JWT                 |
| POST   | /upload       | Subir imagen de perfil (requiere token)      |
| GET    | /avatar/:file | Obtener imagen del usuario por nombre de archivo |