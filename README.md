# 🚀 Fundamentos de NestJS

## 📘 Descripción

Este proyecto es una práctica diseñada para aprender los fundamentos de **NestJS**, un potente framework backend para Node.js. El objetivo es comprender cómo estructurar una aplicación con Nest, utilizando módulos, controladores, servicios, DTOs y una base de datos relacional.

## 🎯 Objetivos del Proyecto

Familiarizarse con los conceptos clave del ecosistema NestJS:

- Arquitectura modular
- Inyección de dependencias
- Controladores y servicios
- Uso de DTOs y validaciones con `class-validator`
- Conexión a base de datos relacional con **TypeORM**
- Uso básico de **Docker** para contenedores
- Implementación de **registro y autenticación** de usuarios
- Encriptado de contraseñas con `bcrypt`
- Protección de rutas mediante **guards** personalizados

## 🛠 Tecnologías Utilizadas

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [MySQL](https://www.mysql.com/)
- [Docker](https://www.docker.com/)
- [class-validator](https://github.com/typestack/class-validator)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [JWT](https://jwt.io/)

## 🗂 Estructura del Proyecto

```bash
src/
├── auth/                 # Módulo de autenticación (registro, login, guards, jwt, etc.)
│   ├── constants/        # Constantes para JWT
│   ├── dto/              # DTOs para login y registro
│   ├── guard/            # Guard para proteger rutas privadas
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   ├── auth.service.ts
├── users/                # Módulo de usuarios
├── cats/                 # Módulo de ejemplo
├── breeds/               # Otro módulo de ejemplo
├── app.module.ts         # Módulo raíz
└── main.ts               # Punto de entrada de la aplicación
```

## ⚙️ Configuración y Ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/PovedaMaicol/AuthRoles-Nest.git
cd AuthRoles-Nest
```

### 2. Instalar dependencias

```bash
pnpm install
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env
# Edita el archivo .env con tus credenciales y configuración (como la conexión a MySQL y claves JWT)
```

### 4. (Opcional) Usar Docker para levantar base de datos

```bash
docker-compose up -d
```

> Asegúrate de que los valores de `.env` coincidan con la configuración del contenedor.

### 5. Ejecutar migraciones

```bash
pnpm run typeorm:migrate
```

### 6. Iniciar el servidor en modo desarrollo

```bash
pnpm run start:dev
```

## ✅ Características Implementadas

- CRUD básico para entidades
- Validaciones con DTOs y `class-validator`
- Conexión con MySQL usando TypeORM
- Arquitectura modular y escalable
- Integración con Docker para la base de datos
- Registro de nuevos usuarios
- Inicio de sesión con validación por JWT
- Encriptado seguro de contraseñas con `bcrypt`
- Protección de rutas privadas usando guards

## 🛡️ Próximamente

- Implementación de **roles** para control de acceso más granular (admin, user, etc.)
- Mejoras en la gestión de errores y respuestas
- Tests unitarios y de integración

## 🧪 Proyecto de Aprendizaje

Este repositorio **no está destinado a producción**. Es una base educativa para experimentar con las herramientas y buenas prácticas de desarrollo backend usando NestJS, con un enfoque limpio, mantenible y escalable. Basado principalmente en la documentación oficial de NestJS.

