# Fundamentos de NestJS

## 📘 Descripción

Este proyecto es una práctica para aprender los fundamentos de **NestJS**, el framework backend para Node.js. El enfoque principal es entender la estructura de una aplicación Nest, el uso de módulos, controladores y servicios.

## 🎯 Objetivo

Familiarizarse con los conceptos clave de NestJS:

- Arquitectura modular
- Inyección de dependencias
- Controladores y servicios
- Uso de DTOs y validaciones
- Conexión con base de datos usando TypeORM

## 🛠 Tecnologías Usadas

- **NestJS**
- **TypeORM**
- **PostgreSQL**
- **class-validator**
- **dotenv** para configuración de entorno

## 🗂 Estructura básica

```bash
src/
├── modules/            # Módulos de dominio (ej: users, products, etc)
│   └── ejemplo/        # Ejemplo de módulo con controlador y servicio
├── app.module.ts       # Módulo raíz
└── main.ts             # Punto de entrada
```

## 🚀 Cómo ejecutar

1. Clona el repositorio:

   ```bash
   git clone https://github.com/PovedaMaicol/AuthRoles-Nest.git
   cd nest-fundamentos
   ```

2. Instala las dependencias:

   ```bash
   pnpm install
   ```

3. Configura las variables de entorno:

   ```bash
   cp .env.example .env
   # Edita el archivo .env con tu configuración (por ejemplo, la URL de la base de datos)
   ```

4. Ejecuta migraciones si las hay:

   ```bash
   pnpm run typeorm:migrate
   ```

5. Inicia el proyecto:

   ```bash
   pnpm run start:dev
   ```

## ✅ Características actuales

- CRUD básico de entidades
- Validaciones con DTOs
- Conexión con PostgreSQL usando TypeORM
- Estructura clara y escalable con módulos

## 🧪 Proyecto de Aprendizaje

Este proyecto no está destinado a producción. Es simplemente una base para explorar cómo funciona NestJS y cómo estructurar un backend de forma limpia y mantenible.
