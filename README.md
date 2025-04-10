
# 🎵 API REST Music

Una API RESTful construida con **Node.js**, **Express**, **TypeScript** y **MongoDB**, diseñada para gestionar información sobre artistas, álbumes y canciones. La API permite realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) sobre artistas, álbumes y canciones, además de permitir la subida de archivos de imágenes para los artistas y álbumes, y de canciones en formato MP3.

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
│   └── storage/          # Carpeta para archivos subidos (imágenes, canciones)
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

| Script           | Descripción                                               |
|------------------|-----------------------------------------------------------|
| `npm run dev`    | Inicia el servidor en modo desarrollo con ts-node        |
| `npm run build`  | Compila el proyecto a JavaScript en la carpeta `/dist`   |
| `npm start`      | Ejecuta la versión compilada (`node dist/index.js`)      |
| `npm run clean`  | Elimina la carpeta `/dist`                                |

---

## 🔐 Funcionalidades

- Registro y login de usuarios con JWT.
- Gestión de artistas, álbumes y canciones.
- Subida y gestión de imágenes de artistas y álbumes.
- Subida y gestión de archivos de canciones.
- Protección de rutas mediante tokens de autenticación (JWT).
- Validaciones con validator.

---

## 🧑‍🎤 Endpoints principales

### Artistas (`/artists`)

| Método | Ruta                | Descripción                                   |
|--------|---------------------|-----------------------------------------------|
| GET    | /prueba-artist      | Prueba para verificar si el controlador funciona |
| POST   | /save               | Crear un nuevo artista                        |
| GET    | /get-artist/:id     | Obtener un artista por su ID                  |
| GET    | /list               | Obtener la lista de artistas                  |
| GET    | /list/:page         | Obtener la lista paginada de artistas         |
| PUT    | /update/:id         | Actualizar la información de un artista       |
| DELETE | /delete/:id         | Eliminar un artista                           |
| POST   | /upload/:file       | Subir una imagen para un artista              |
| DELETE | /remove/:id         | Eliminar un artista junto con sus álbumes     |

### Álbumes (`/albums`)

| Método | Ruta                        | Descripción                                 |
|--------|-----------------------------|---------------------------------------------|
| GET    | /prueba-album               | Prueba para verificar si el controlador funciona |
| POST   | /save                       | Crear un nuevo álbum                        |
| GET    | /get-album/:id              | Obtener un álbum por su ID                  |
| GET    | /get-all-album/:artistId    | Obtener todos los álbumes de un artista     |
| PUT    | /update/:albumId            | Actualizar un álbum                         |
| POST   | /upload/:albumId            | Subir una imagen para un álbum              |
| DELETE | /remove/:albumId            | Eliminar un álbum y sus canciones asociadas |

### Canciones (`/songs`)

| Método | Ruta                         | Descripción                                |
|--------|------------------------------|--------------------------------------------|
| GET    | /prueba-song                 | Prueba para verificar si el controlador funciona |
| POST   | /save                        | Crear una nueva canción. Requiere archivo MP3 |
| GET    | /get-song/:songId            | Obtener una canción por su ID              |
| GET    | /get-all-song/:albumId       | Obtener todas las canciones de un álbum    |
| PUT    | /update/:songId              | Actualizar una canción                     |
| DELETE | /delete-song/:songId         | Eliminar una canción                       |
| POST   | /upload/:songId              | Subir un archivo de canción                |

---

## 📂 Manejo de archivos

- Las imágenes de los artistas y álbumes se almacenan en:  
  `src/storage/image/`

- Los archivos de las canciones se almacenan en:  
  `src/storage/media/song/`

---

## 🌱 Contribuciones

Las contribuciones son bienvenidas. Si tienes alguna idea para mejorar este proyecto:

1. Haz un fork del repositorio
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`)
3. Realiza tus cambios y haz commit (`git commit -m 'Añadir nueva funcionalidad'`)
4. Haz push a tu rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---

## ⚠️ Notas

No olvides crear y configurar tu archivo `.env` con las variables necesarias para la conexión a la base de datos y otros parámetros de configuración.

---

¡Gracias por usar esta API REST Music! 🎶