# Página de Aniversario 💕

Una hermosa página web que muestra el timeline de tu relación, con fotos organizadas por semanas.

## Características

- 📅 Timeline interactivo con semanas Pre y Post noviazgo
- 🖼️ Galería de fotos con lightbox
- 📱 Diseño responsive
- 🎨 Interfaz elegante y moderna
- ⚡ Carga rápida y optimizada

## Estructura del Proyecto

```
├── site/                 # Archivos de la página web
│   ├── index.html       # Página principal
│   ├── pre.html         # Timeline Pre noviazgo
│   ├── post.html        # Timeline Post noviazgo
│   ├── styles.css       # Estilos
│   ├── landing.js       # Script de la página principal
│   └── timeline.js      # Script del timeline
├── Pre/                 # Fotos Pre noviazgo (W1, W2, etc.)
├── Post/                # Fotos Post noviazgo (W1, W2, etc.)
├── Aniversario.xlsx     # Datos del timeline
├── build_timeline.py    # Script para generar timeline.json
└── timeline.json        # Datos generados (se crea automáticamente)
```

## Despliegue en GitHub Pages

### Configuración Automática

1. **Sube tu código a GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Habilita GitHub Pages:**
   - Ve a Settings > Pages en tu repositorio
   - En "Source", selecciona "GitHub Actions"
   - El workflow se ejecutará automáticamente

3. **¡Listo!** Tu página estará disponible en:
   `https://tu-usuario.github.io/nombre-del-repo`

### Configuración Manual

Si prefieres configurar manualmente:

1. **Genera el timeline:**
   ```bash
   pip install -r requirements.txt
   python build_timeline.py
   ```

2. **Sube los archivos:**
   - Sube todo el contenido de la carpeta `site/` a la raíz de tu repositorio
   - Sube las carpetas `Pre/` y `Post/` con las fotos
   - Sube `timeline.json`

3. **Configura GitHub Pages:**
   - Ve a Settings > Pages
   - Selecciona "Deploy from a branch"
   - Elige la rama `main` y carpeta `/ (root)`

## Personalización

### Agregar Nuevas Fotos

1. Coloca las fotos en las carpetas `Pre/WX/` o `Post/WX/` (donde X es el número de semana)
2. Actualiza `Aniversario.xlsx` con los datos de la semana
3. Ejecuta `python build_timeline.py` para regenerar `timeline.json`
4. Haz commit y push de los cambios

### Modificar el Diseño

- Edita `site/styles.css` para cambiar colores, fuentes, etc.
- Modifica `site/index.html` para cambiar el contenido de la página principal
- Ajusta `site/timeline.js` para cambiar la funcionalidad del timeline

## Requisitos

- Python 3.7+
- pandas
- openpyxl

## Licencia

Este proyecto es personal y privado. 💕
