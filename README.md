# 🏨 Hotel-Manager Backend API

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens" alt="JWT" />
  <img src="https://img.shields.io/badge/Argon2-blue?style=for-the-badge" alt="Argon2" />
</p>

## 📌 Descripción del Proyecto

API RESTful desarrollada para la gestión integral de plataformas hoteleras (**QuickStay**). Permite la administración centralizada de cadenas hoteleras, habitaciones, reservaciones, eventos, facturación automatizada y servicios adicionales, con control de acceso basado en roles (RBAC).

> 👥 **Proyecto Colaborativo / En Equipo**  
> Desarrollado y mejorado como trabajo de equipo por **Rafael Castro** y **Cristian Lima**.  
> Repositorio base original: [CristiannLimaR/Hotel-manager-Backend](https://github.com/CristiannLimaR/Hotel-manager-Backend).

---

## ✨ Características Principales

- **Gestión de Hoteles:** Registro, actualización, listado y filtrado de sucursales hoteleras y asignación de administradores/managers.
- **Control de Habitaciones:** Disponibilidad en tiempo real, tipos de habitación, tarifas y estado (disponible/ocupada).
- **Sistema de Reservas:** Creación, validación de fechas, cálculo de noches y prevención de solapamiento.
- **Eventos:** Organización y gestión de salones y eventos vinculados a cada hotel.
- **Servicios Adicionales:** Catálogo de amenidades y servicios extra aplicables a estadías y facturas.
- **Facturación Electrónica:** Generación y liquidación automática de facturas detalladas en formato PDF/JSON.
- **Autenticación y Autorización:** Cifrado seguro con Argon2, autenticación basada en tokens JWT y roles jerárquicos (`ADMIN`, `HOTEL_MANAGER`, `CLIENT`).

---

## 🛠️ Tecnologías y Librerías

- **Entorno:** Node.js (ES Modules)
- **Framework:** Express.js
- **Base de Datos:** MongoDB con ODM Mongoose
- **Seguridad:** Helmet, CORS, Argon2, JSON Web Tokens (JWT)
- **Validaciones:** Express-Validator
- **Logs y Monitoreo:** Morgan
- **Semillas de Datos:** Scripts de inicialización y seeding automatizado

---

## 🚀 Instalación y Puesta en Marcha

### Prerrequisitos
- Node.js (v18 o superior)
- MongoDB (local o MongoDB Atlas)
- Gestor de paquetes `npm` o `yarn`

### 1. Clonar el repositorio
```bash
git clone git@github.com:RafaelCastroRR/Hotel-manager-Backend.git
cd Hotel-manager-Backend
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto tomando como referencia:
```env
PORT=3000
URI_MONGO=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/<database>
JWT_SECRET=tu_secreto_super_seguro
```

### 4. Semillas de datos (Opcional)
```bash
node seed_guatemala.js
```

### 5. Iniciar la aplicación
```bash
# Modo desarrollo con nodemon
npm run dev

# Modo producción
npm start
```

---

## 📂 Estructura del Proyecto

```text
├── configs/            # Configuración de servidor, base de datos y cors
├── src/
│   ├── event/          # Módulo de eventos y salones
│   ├── hotels/         # Módulo de administración de hoteles
│   ├── invoices/       # Módulo de facturación
│   ├── reservations/   # Módulo de reservaciones
│   ├── rooms/          # Módulo de habitaciones
│   ├── services/       # Módulo de servicios hoteleros
│   ├── users/          # Autenticación, roles y usuarios
│   └── middlewares/    # Validaciones, autenticación y manejo de errores
├── seeds/              # Scripts de poblamiento inicial
└── README.md
```

---

## 👥 Equipo de Desarrollo

- **Rafael Castro** ([@RafaelCastroRR](https://github.com/RafaelCastroRR))
- **Cristian Lima** ([@CristiannLimaR](https://github.com/CristiannLimaR))

## 📄 Licencia
Este proyecto es desarrollado con fines educativos y de demostración técnica.
