# Tu Imagen RX - Sistema RIS (Frontend)

Este es el repositorio del frontend del sistema RIS de **Tu Imagen RX**, una institución privada especializada en radiografía dental y maxilofacial. Este proyecto tiene como objetivo proporcionar una interfaz intuitiva y funcional para gestionar el flujo de trabajo de un sistema de información radiológica (RIS), desde la autenticación hasta la administración de usuarios y estudios.

## Tabla de Contenidos
- [Características](#características)
- [Tecnologías](#tecnologías)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Uso](#uso)
- [Variables de Entorno](#variables-de-entorno)

## Características

- **Autenticación**: Manejo del inicio de sesión con almacenamiento seguro del token.
- **Interfaz Adaptativa**: El diseño es responsive y adaptativo, optimizado para pantallas de distintos tamaños.
- **Componentes Reutilizables**: La UI se construye con componentes modulares y reutilizables para mejorar la escalabilidad.
- **Gestión de Contexto**: Utiliza Context API para manejar el estado global de autenticación en toda la aplicación.

## Tecnologías

Este proyecto utiliza las siguientes tecnologías:

- **React**: Librería principal para construir la UI.
- **Next.js**: Framework de React con soporte para SSR y funcionalidades avanzadas.
- **TypeScript**: Superset de JavaScript que añade tipado estático.
- **Tailwind CSS**: Framework de utilidades para estilizar el frontend de forma rápida y eficiente.
- **Radix UI**: Componentes accesibles para mejorar la usabilidad.
- **ESLint & Prettier**: Herramientas para asegurar la calidad y consistencia del código.

## Estructura del Proyecto

```bash
src/
├── public/           # Archivos públicos.
├── app/              # Páginas principales de la aplicación
│   ├── dashboard/    # Página de dashboard protegida
│   └── page.tsx      # Página principal - inicio de sesión
├── components/       # Componentes de la interfaz de usuario (UI)
│   ├── ui/           # Componentes reutilizables como Input, Button, etc.
│   └── layout/       # Componentes de layout, como headers y footers
├── context/          # Contextos de React para manejo de estados globales
│   └── AuthContext.tsx # Contexto de autenticación
├── hooks/            # Hooks personalizados para lógica y manejo de estado
│   └── useLogin.ts   # Hook personalizado para el manejo de inicio de sesión
├── services/         # Servicios para llamadas a la API y lógica de negocio
│   └── authService.ts # Lógica de autenticación para interactuar con la API
├── styles/           # Estilos globales y configuración de Tailwind CSS
│   └── globals.css   # Estilos globales del proyecto
└── utils/            # Utilidades y funciones auxiliares
```

## Instalación
Sigue los pasos a continuación para configurar el proyecto en tu entorno local.

Prerrequisitos
Node.js y pnpm deben estar instalados en tu sistema.

Clonar el Repositorio
Primero, clona el repositorio en tu máquina local:

```bash
git clone https://github.com/JohanTAP/next-client.git
cd next-client
```

Instalación de Dependencias
Usa pnpm para instalar las dependencias:

```bash
pnpm install
```

Configuración de Variables de Entorno
Crea un archivo .env.local en la raíz del proyecto con las siguientes variables:

```bash
NEXT_PUBLIC_API_URL=
```

## Uso
Para iniciar el proyecto en modo de desarrollo:

```bash
pnpm dev
```
El proyecto estará disponible en http://localhost:3000.

Comandos Disponibles
- **pnpm dev:** Inicia el servidor de desarrollo en http://localhost:3000.
- **pnpm build:** Compila el proyecto para producción en la carpeta .next.
- **pnpm start:** Inicia el servidor en modo producción, sirviendo los archivos compilados.
- **pnpm lint:** Ejecuta ESLint para analizar el código en busca de errores y aplicar reglas de estilo.
- **pnpm format:** Formatea el código de acuerdo con las reglas de Prettier.

## Variables de Entorno
Las siguientes variables de entorno son necesarias para que el proyecto funcione correctamente:

NEXT_PUBLIC_API_URL: La URL base de la API, utilizada para la autenticación y demás operaciones. Asegúrate de configurarla correctamente en tu archivo .env.local.