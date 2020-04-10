// Variables
const listaPensamientos = document.getElementById('lista');

// Event Listeners
eventListeners();

function eventListeners() {
     //Cuando se envia el formulario
     document.querySelector('#formulario').addEventListener('submit', agregarPensamiento);
     // Borrar Tweets
     listaPensamientos.addEventListener('click', borrarPensamiento);
     // Contenido cargado
     document.addEventListener('DOMContentLoaded', SetItemLSListaPensamiento);
}

// Funciones
function agregarPensamiento(e) {
     e.preventDefault();
     
     // leer el valor del textarea
     const pensamiento = document.getElementById('pensamiento').value;
     
     // crear boton de eliminar
     const botonBorrar = document.createElement('a');
     botonBorrar.classList = 'borrar-pensamiento';
     botonBorrar.innerText = 'x';

     // Crear elemento y añadirle el contenido a la lista
     const li = document.createElement('li');
     li.innerText = pensamiento;
     // añade el botón de borrar al pensamiento
     li.appendChild(botonBorrar);
     // añade el pensamiento a la lista
     listaPensamientos.appendChild(li);

     // Añadir a Local Storage
     agregarPensamientoLS(pensamiento);
}

// Elimina el pensamiento del DOM
function borrarPensamiento(e) {
     e.preventDefault();
     if(e.target.className === 'borrar-pensamiento') {               
          //console.log(e.target.parentElement);
          e.target.parentElement.remove();
          borrarPensamientoLS(e.target.parentElement.innerText);
          //console.log(e.target.parentElement.innerText);
     } 
}
// Mostrar datos de LocalStorage en la lista
function SetItemLSListaPensamiento() {
     let pensamientos;
     pensamientos = obtenerPensamientosLS();
     pensamientos.forEach((pensamiento)=> {
          // crear boton de eliminar
          const botonBorrar = document.createElement('a');
          botonBorrar.classList = 'borrar-pensamiento';
          botonBorrar.innerText = 'x';

          // Crear elemento y añadirle el contenido a la lista
          const li = document.createElement('li');
          li.innerText = pensamiento;
          // añade el botón de borrar al pensamiento
          li.appendChild(botonBorrar);
          // añade el pensamiento a la lista
          listaPensamientos.appendChild(li);
     });
}

// Agrega pensamiento a local storage
function agregarPensamientoLS(pensamiento) {
     let pensamientos;
     pensamientos = obtenerPensamientosLS();
     // Añadir el nuevo tweet
     pensamientos.push(pensamiento);
     // Convertir de string a arreglo para local storage
     localStorage.setItem('pensamientos', JSON.stringify(pensamientos) );
}

// Comprobar que haya elementos en localstorage, retorna un arreglo
function obtenerPensamientosLS() {
     let pensamientos;
     // Revisamos los valores de local storage
     // Si clave pensamientos de LS es vacio 
     // incializamos la variable pensamiento como un arreglo vacio
     // caso contrario obtenemos los valores de la clave pensamientos
     // lo preformateamos a un arreglo y guardamos en la variable pensamientos;     
     if(localStorage.getItem('pensamientos') === null) {
          pensamientos = []; 
     } else {
          pensamientos = JSON.parse(localStorage.getItem('pensamientos') );
     }
     // retornamos esta variable tipo array ya sea vacia o con datos
     return pensamientos;
}

function borrarPensamientoLS(argumento) {
     let pensamientos, pensamientoBorrar;

     // Eliminamos la letra x
     pensamientoBorrar = argumento.substring(0, argumento.length - 1);
     pensamientos = obtenerPensamientosLS();

     pensamientos.forEach((pensamiento, index)=> {
          if(pensamientoBorrar === pensamiento) {
               pensamientos.splice(index, 1);
          }
     });

     localStorage.setItem('pensamientos', JSON.stringify(pensamientos));
}

