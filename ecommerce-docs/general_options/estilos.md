---
sidebar_position: 2
---

# Guía de estilos

Este documento describe las convenciones de nomenclatura, estructura de carpetas y estilo de código que el equipo debe seguir para mantener la consistencia en el proyecto. Todos los nombres de variables, funciones y carpetas deben estar en inglés.

## Requisitos Especiales
- **Compatibilidad con Next.js 14**: Todas las implementaciones deben considerar las mejores prácticas de esta versión.
- **Soporte Multi-idioma**: El proyecto debe estar preparado para soportar múltiples idiomas usando `next-intl` u otra biblioteca preferida para la internacionalización.

## Estructura de Carpetas

- **`app/`**: Define las rutas principales del proyecto usando el App Router. Cada subcarpeta en `app` se convierte en una ruta.
- **`components/`**: Contiene componentes reutilizables, cada uno en su propia carpeta que agrupa el archivo del componente y sus estilos.
- **`config/`**: Archivos de configuración, como los archivos JSON para la personalización por cliente.
- **`styles/`**: Archivos de estilos globales y otros estilos relacionados con el diseño de la aplicación.
- **`utils/`**: Funciones de utilidad reutilizables en todo el proyecto.

### Ejemplo de estructura de carpetas

### Ejemplo de estructura de carpetas

```
project-root/
│
├── app/
│   ├── page.tsx         # Ruta principal ("/")
│   ├── about/
│   │   └── page.tsx     # Ruta secundaria ("/about")
│   └── [pageId]/
│       └── page.tsx     # Ruta dinámica ("/:pageId")
│
├── components/
│   ├── Header/
│   │   ├── Header.tsx
│   │   └── Header.module.css
│   ├── Footer/
│   │   ├── Footer.tsx
│   │   └── Footer.module.css
│   └── ContactForm/
│       ├── ContactForm.tsx
│       └── ContactForm.module.css
│
├── config/
│   └── clientConfig.json
│
├── styles/
│   └── globals.css
│
└── utils/
    └── helpers.ts
```

## Nomenclatura

1. **Variables**: Usa `camelCase` para variables, y deben ser descriptivas.
    - Ejemplo: `primaryColor`, `headerBackgroundColor`

2. **Funciones**: Usa `camelCase` para funciones y verbos en el nombre para indicar la acción que realizan.
    - Ejemplo: `fetchData`, `handleSubmit`, `renderHeader`

3. **Componentes**: Usa `PascalCase` para el nombre de cada componente y coloca el componente en una carpeta que agrupe el archivo `.tsx` y el archivo de estilos `.module.css`.
    - Ejemplo: `Header`, `ContactForm`

4. **Archivos de Estilos**: Nombra cada archivo de estilos con el nombre del componente y utiliza `.module.css` para aprovechar el CSS modular.
    - Ejemplo: `Header.module.css`, `Footer.module.css`

5. **Constantes**: Usa `UPPER_CASE` con palabras separadas por guiones bajos.
    - Ejemplo: `API_BASE_URL`, `DEFAULT_THEME_COLOR`

## Convenciones de Código

1. **Uso de Funciones de Flecha**: Todas las funciones deben ser funciones de flecha, salvo los componentes de React que se exporten directamente.

2. **Destructuración de Props y State**: Usa destructuración de objetos para las props y el state de los componentes.
    - Ejemplo:
      ```typescript
      function Header({ title, logo }: { title: string; logo: string }) {
        return <header>{title}</header>;
      }
      ```

3. **Estructura de Archivos**: Cada componente debe tener su propio archivo `.tsx` y un archivo de estilos `.module.css` correspondiente.

4. **Espaciado**: Usa 2 espacios para la indentación y asegúrate de que no haya espacios en blanco innecesarios.

5. **Comentarios**: Documenta secciones complejas del código en español, usando comentarios que expliquen el propósito y funcionamiento.

6. **Manejo de Errores**: Todas las funciones de llamada a APIs deben manejar errores con un `try-catch` y devolver un mensaje de error amigable en caso de fallo.

7. **Uso de `useEffect` y `useState`**: Usa estos hooks de React de forma cuidadosa, documentando cada caso de uso para que el flujo de datos sea claro para todos.

## Ejemplo de Componente

Aquí tienes un ejemplo de cómo debe verse un componente siguiendo estas reglas.

```typescript
// components/Header/Header.tsx
import { useClientConfig } from '../../pages/_app';
import styles from './Header.module.css';

export default function Header() {
  const { layout: { sections: { header } } } = useClientConfig();

  if (!header.visible) return null;

  return (
    <header className={styles.header} style={{ backgroundColor: header.backgroundColor }}>
      <img src={header.logo} alt="Logo" className={styles.logo} />
    </header>
  );
}
```

**Archivo de Estilos**

```css
/* components/Header/Header.module.css */
.header {
  display: flex;
  align-items: center;
  padding: 10px;
}

.logo {
  width: 100px;
  height: auto;
}
```

## Buenas Prácticas

- Mantén las funciones cortas y con un solo propósito.
- Usa `console.log` solo para depuración temporal; elimina todos los `console.log` antes de hacer un commit.
- Usa ESLint y Prettier para mantener un formato de código uniforme.

### Instalación de ESLint y Prettier

Para asegurarse de que todo el equipo sigue el mismo formato, instala y configura ESLint y Prettier en tu proyecto.

1. Instala las dependencias:

   ```bash
   npm install eslint prettier eslint-config-prettier eslint-plugin-prettier --save-dev
   ```

2. Configura ESLint y Prettier en los archivos `.eslintrc.json` y `.prettierrc`.

3. Añade un script en `package.json` para verificar el formato:

   ```json
   "scripts": {
     "lint": "eslint .",
     "format": "prettier --write ."
   }
   ```