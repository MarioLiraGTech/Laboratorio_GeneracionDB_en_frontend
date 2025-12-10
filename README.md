# 🚀 Dynamic Data Manager (Meta-Model System)

Un sistema avanzado de gestión de datos dinámicos que permite a los usuarios crear sus propias bases de datos, tablas y relaciones visualmente, sin escribir código. Construido con una arquitectura **Entity-Attribute-Value (EAV)** moderna y optimizada.

![Project Status](https://img.shields.io/badge/Status-Development-green)
![Tech Stack](https://img.shields.io/badge/Stack-Next.js%20%7C%20Convex%20%7C%20Shadcn-blue)

## ✨ Características Principales

Este proyecto permite definir estructuras de datos "al vuelo" y generar interfaces de usuario dinámicas automáticamente.

* **🏗️ Gestión de Proyectos (Schemas):** Crea múltiples espacios de trabajo independientes.
* **📊 Constructor de Tablas Dinámicas:**
    * Crea tablas personalizadas en tiempo real.
    * Soporte para **Borrado Lógico (Soft Delete)**.
* **🧩 Tipos de Datos Soportados:**
    * Texto, Números, Fechas, Booleanos.
    * **Select/Dropdowns** (Opciones configurables).
    * **🔗 Relaciones:** Conecta registros entre tablas diferentes (ej: Producto -> Categoría).
* **⚡ Data Grid Dinámico:**
    * Visualización automática basada en la estructura.
    * Validación de tipos estricta en el backend.
    * **Populate Inteligente:** Visualiza los datos relacionados (objetos completos) o solo sus referencias.
* **🎨 UI Moderna:** Interfaz limpia construida con **Shadcn/UI** y **Tailwind CSS**.

## 🛠️ Tecnologías Utilizadas

* **Frontend:** [Next.js 14+](https://nextjs.org/) (App Router), TypeScript, Tailwind CSS.
* **Backend & Base de Datos:** [Convex](https://www.convex.dev/) (Real-time, Serverless).
* **Componentes UI:** [Shadcn/UI](https://ui.shadcn.com/) + [Lucide Icons](https://lucide.dev/).
* **Lenguaje:** TypeScript (Tipado estricto end-to-end).

## 🚀 Instalación y Configuración

Sigue estos pasos para correr el proyecto localmente:

### 1. Clonar el repositorio
```Bash
git clone [https://github.com/tu-usuario/nombre-del-repo.git](https://github.com/tu-usuario/nombre-del-repo.git)
cd nombre-del-repo
```
### 2. Instalar dependencias
```Bash
npm install
# o si usas pnpm
pnpm install
```
### 3. Configurar Convex
Necesitas una cuenta en Convex.dev. Luego, inicia el proyecto y conéctalo:

```Bash
npx convex dev
```
Esto te pedirá loguearte y creará un proyecto en tu dashboard de Convex.

### 4. Iniciar el servidor de desarrollo
En otra terminal (manteniendo npx convex dev corriendo), ejecuta:

```Bash
npm run dev
```
Abre http://localhost:3000 en tu navegador.