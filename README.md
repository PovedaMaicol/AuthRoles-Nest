# Sistema de Gestión de Usuarios y Autenticación con Roles

## Descripción

Este proyecto es un sistema de autenticación y gestión de usuarios desarrollado con NestJS. Implementa un API RESTful con JWT para autenticación y un sistema completo de roles y permisos.

## Objetivo

Crear un backend robusto que permita comprender los fundamentos de NestJS mientras se implementa un sistema de autenticación seguro con diferentes niveles de acceso según roles (administrador, ingeniero, otros roles personalizables).

## Tecnologías

- **NestJS**: Framework progresivo para crear aplicaciones backend
- **TypeORM**: ORM para TypeScript y JavaScript
- **PostgreSQL**: Base de datos relacional
- **Passport y JWT**: Autenticación y generación de tokens
- **class-validator**: Validación de datos
- **bcrypt**: Encriptación de contraseñas

## Características

- ✅ Autenticación con JWT (JSON Web Tokens)
- ✅ Autorización basada en roles (admin, otros roles)
- ✅ Permisos específicos por roles
- ✅ Registro y administración de usuarios
- ✅ Protección de rutas según roles
- ✅ Hash seguro de contraseñas con bcrypt
- ✅ Estructura de código modular siguiendo principios SOLID

## Estructura del Proyecto

```
src/
├── users/                      # Módulo de usuarios
│   ├── dto/                     # Data Transfer Objects
│   ├── entities/                # Entidades y modelos
│   ├── users.controller.ts      # Controlador REST
│   ├── users.module.ts          # Configuración del módulo
│   └── users.service.ts         # Lógica de negocio
├── auth/                       # Módulo de autenticación
│   ├── dto/                     # DTOs para autenticación
│   ├── guards/                  # Guards de autorización
│   ├── decorators/              # Decoradores personalizados
│   ├── strategies/              # Estrategias de autenticación
│   ├── auth.controller.ts       # Endpoints de autenticación
│   ├── auth.module.ts           # Configuración de autenticación
│   └── auth.service.ts          # Lógica de autenticación
├── permissions/                # Módulo de permisos
│   ├── entities/                # Entidades de permisos
│   ├── permissions.controller.ts
│   ├── permissions.module.ts
│   └── permissions.service.ts
├── app.module.ts              # Módulo principal
└── main.ts                    # Punto de entrada
```

## Instalación

1. Clonar el repositorio
   ```
   git clone https://github.com/tu-usuario/auth-api.git
   cd auth-api
   ```

2. Instalar dependencias
   ```
   npm install
   ```

3. Configurar variables de entorno
   ```
   cp .env.example .env
   ```
   
   Edita el archivo .env con los datos de tu base de datos PostgreSQL

4. Iniciar la base de datos y migraciones
   ```
   npm run typeorm:migrate
   ```

5. Ejecutar el seed para datos iniciales
   ```
   npm run seed
   ```

6. Iniciar en modo desarrollo
   ```
   npm run start:dev
   ```

## Endpoints de la API

### Autenticación
- `POST /auth/login` - Iniciar sesión y obtener token JWT
- `GET /auth/permissions` - Obtener permisos del usuario actual

### Usuarios
- `GET /users` - Obtener todos los usuarios (solo admin)
- `GET /users/:id` - Obtener usuario por ID (solo admin)
- `POST /users` - Crear nuevo usuario (solo admin)
- `DELETE /users/:id` - Eliminar usuario (solo admin)
- `GET /users/profile` - Obtener perfil del usuario actual

### Permisos
- `GET /permissions` - Obtener todos los permisos (solo admin)
- `POST /permissions` - Crear nuevo permiso (solo admin)
- `POST /permissions/role/:roleId/permission/:permissionId` - Asignar permiso a rol
- `DELETE /permissions/role/:roleId/permission/:permissionId` - Quitar permiso de rol

## Uso de la API

### Autenticación

```bash
# Login (usuario admin creado por defecto en el seed)
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### Uso del token JWT

```bash
# Obtener lista de usuarios (requiere token y rol admin)
curl -X GET http://localhost:3000/users \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1..."
```

## Roles y Permisos

El sistema incluye varios roles por defecto que pueden personalizarse según las necesidades:

1. **Administrador**: Acceso completo al sistema
2. **Otros roles**: Con permisos específicos para cada módulo

Cada rol tiene asignados permisos específicos que determinan las acciones que puede realizar.

## Proyecto de Aprendizaje

Este proyecto está orientado al aprendizaje de NestJS, específicamente:

- Estructura modular de NestJS
- Inyección de dependencias
- Guards y decoradores personalizados
- Autenticación con Passport y JWT
- Uso de TypeORM con entidades y relaciones
- Estrategias de autorización
- Buenas prácticas en APIs RESTful

## Próximos pasos

- [ ] Implementar refresh tokens
- [ ] Añadir logging y monitoreo
- [ ] Implementar tests unitarios y de integración
- [ ] Documentación con Swagger
- [ ] Implementar caché
- [ ] Despliegue con Docker

## Contribuir

Este es un proyecto de aprendizaje, pero cualquier sugerencia o contribución es bienvenida.

## Licencia

MIT

---

*Este proyecto fue desarrollado como parte de mi aprendizaje de NestJS y no está destinado para uso en producción sin revisiones adicionales de seguridad.*