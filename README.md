Objetivos de Aprendizaje
- Repasar el uso de la función fetch.
- Repasar cómo interpretar la información proveniente de un servidor en formato JSON (JavaScript Object Notation).
- Profundizar en el uso de componentes de Bootstrap, tales como Offcanvas y Dropdowns. Esto nos permitirá crear interfaces de usuario mucho más atractivas sin invertir un gran tiempo en crear estilos específicos en CSS y en desarrollar lógica en JS.
- Aprender a agregar íconos a nuestras página, como lo pueden ser estrellas. Esto permitirá mejorar la experiencia de usuario de nuestras páginas web.
- Aplicar el uso de for, if, y otras estructuras de JavaScript a crear elementos del DOM, lo que nos va a permitir crear una interfaz de usuario adaptativa a determinadas condiciones, como por ejemplo una valoración en estrellas, donde las estrellas se muestren en un color si cumplen una condición y en otro color si no se cumple.

Pautas:
Modificar el sitio web adjunto para lograr cumplir con las siguientes pautas:

1. Cuando la página cargue, deberá traer el listado de información sobre películas disponible en https://japceibal.github.io/japflix_api/movies-data.json, pero no mostrarlo al usuario.
2. Cuando el usuario presiona el botón buscar, y si previamente ingresó algún valor en el campo de búsqueda, deberá mostrar un listado con las películas que coincidan con dicha búsqueda en sus atributos de title o genres o tagline u overview. La información a mostrar en este punto será: title, tagline, y vote_average (en formato de "estrellas").
3. Cuando el usuario pulse en alguna de las películas mostradas, se deberá desplegar un contenedor superior con la siguiente información de dicha película: title, overview y lista de genres.
4. Añadir en lo anterior un botón con un desplegable que contenga el año de lanzamiento (sin el mes ni el día), la duración del largometraje, el presupuesto con el que contó y las ganancias obtenidas.