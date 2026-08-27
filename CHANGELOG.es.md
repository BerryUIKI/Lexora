# Registro de cambios

[English](CHANGELOG.md) · [简体中文](CHANGELOG.zh-CN.md) · [繁體中文](CHANGELOG.zh-TW.md) · [日本語](CHANGELOG.ja.md) · [한국어](CHANGELOG.ko.md) · [Deutsch](CHANGELOG.de.md) · [Français](CHANGELOG.fr.md) · [Русский](CHANGELOG.ru.md)

## [Sin publicar]

### Añadido
- Enlaces al sitio web oficial en la barra de título, el menú Ayuda y el diálogo Acerca de.
- Navegación no destructiva a la pantalla de inicio mediante el icono de Lexora de la barra de título.
- Renderizado Markdown de HTML en bloque y en línea, incluido HTML dentro de encabezados.

### Cambiado
- La comprobación manual muestra inmediatamente el progreso y mantiene abierto el diálogo Acerca de.
- Las notas de actualización de la aplicación proceden de los diccionarios de traducción de nueve idiomas de Lexora; las descripciones de GitHub permanecen en inglés.
- Una marca verde confirma que la versión está actualizada.

## [0.1.4] - 2026-08-27

### Añadido
- Actualizaciones firmadas dentro de la aplicación para Windows, macOS y Linux, con progreso de descarga y confirmación antes de instalar.
- Comprobación diaria del canal estable con demora aleatoria al iniciar y opción para desactivarla.
- Notas de versión localizadas para los nueve idiomas compatibles.

### Cambiado
- Se muestra una advertencia explícita antes de instalar si alguna pestaña abierta contiene cambios sin guardar.
- La versión de la aplicación se obtiene de `package.json` y CI comprueba que coincida con Cargo y la etiqueta de publicación.

Las versiones anteriores están en el [registro completo en inglés](CHANGELOG.md).
