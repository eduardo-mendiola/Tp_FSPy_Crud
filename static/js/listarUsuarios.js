
// |--------------------- Inicio Trear Datos y Crear Tabla de Usuario------------------------|
const URL = "http://127.0.0.1:5000/";

// Realizamos la solicitud GET al servidor para obtener todos los usuarios
fetch(URL + 'usuarios')
  .then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      // Manejar el error de respuesta del servidor
      console.error('Error al obtener los usuarios:', response.status);
      // Mostrar un mensaje de error al usuario
      alert('Error al obtener los usuarios. Intenta nuevamente.');
    }
  })
  .then(function (data) {
    let tablaUsuarios = document.getElementById('tablaUsuarios');

    // Iteramos sobre los usuarios y agregamos filas a la tabla
    for (let usuario of data.usuarios) {
      // Cambia el valor numerico por un string
      let rolUser;
      if (usuario.id_rol == 1) {
        rolUser = "Administrador";
      } else if (usuario.id_rol == 2) {
        rolUser = "Vendedor";
      } else if (usuario.id_rol == 3) {
        rolUser = "Usuario";
      } else {
        rolUser = "Rol no valido";
      }

      // Crea la tabla con los datos de los usuarios
      let fila = document.createElement('tr');
      fila.innerHTML =
        `<td>${usuario.id}</td>
         <td>${usuario.nombre}</td>
         <td>${usuario.apellido}</td>
         <td>${usuario.password}</td>
         <td>${usuario.email}</td>
         <td>${usuario.telefono}</td>
         <td>${rolUser}</td>
         <td>
         <a href='#' data-bs-toggle='modal' data-bs-target='#modificarUsuario' onclick='cargarDatosModal(${JSON.stringify(usuario)})'><i class='bi bi-pencil-fill m-1'></i></a>
            <a href='#' data-bs-toggle='modal' data-bs-target='#delModal' onclick='cargarDataUser(${JSON.stringify(usuario)})'><i class='bi bi-trash-fill m-1'></i></a>
         </td>`;
      tablaUsuarios.appendChild(fila);
    }
  })
  .catch(function (error) {
    // Código para manejar errores de red o de conexión
    console.error('Error de red o de conexión:', error);
    alert('Error de red o de conexión. Verifica tu conexión a Internet.');
  });
// |--------------------- Fin Trear Datos y Crear Tabla de Usuario------------------------|




// |--------------------- Inicio Cargar Datos al Modal Modificar Usuario------------------------|

//Función para cargar datos en el modal
  function cargarDatosModal(usuario) {
    document.getElementById('id_mod').value = usuario.id;
    document.getElementById('nombre_mod').value = usuario.nombre;
    document.getElementById('apellido_mod').value = usuario.apellido;
    document.getElementById('passwordModificar').value = usuario.password;
    document.getElementById('emailModificar').value = usuario.email;
    document.getElementById('telefono_mod').value = usuario.telefono;
    document.getElementById('rol_mod').value = usuario.id_rol;
  }


// // Función alternativa para cargar datos en el modal
//   function cargarDatosModal(usuario) {
//     const modals = document.querySelectorAll('.modal-modificar');
//     modals.forEach((modal) => {
//       modal.querySelector('.id').value = usuario.id;
//       modal.querySelector('.nombre').value = usuario.nombre;
//       modal.querySelector('.apellido').value = usuario.apellido;
//       modal.querySelector('.contrasena').value = usuario.password;
//       modal.querySelector('.email').value = usuario.email;
//       modal.querySelector('.telefono').value = usuario.telefono;
//     });
//   }
  
// |--------------------- Fin Cargar Datos al Modal Modificar Usuario------------------------|





// |--------------------- Inicio Cargar Datos al Modal Eliminar Usuario------------------------|
// Función para cargar datos de usuario a eliminar
let userDelId;
function cargarDataUser(usuario) {
    let dataUsuario = document.getElementById('dataUser')
    dataUsuario.innerHTML = " " + usuario.nombre + " " + usuario.apellido;
    userDelId = usuario.id;
    return userDelId;
}
// |--------------------- Fin Cargar Datos al Modal Eliminar Usuario------------------------|




// |------------------------- Inicio Crear Usuario---------------------------------|
document.getElementById('agregarUsuarioForm').addEventListener('submit', function (event) {
  event.preventDefault();

  // Obtener datos del formulario
  const formData = new FormData(this);
  console.log(formData);

  // Enviar solicitud POST al servidor
  fetch('http://127.0.0.1:5000/usuarios', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  })
  .then(response => response.json())
  .then(data => {
    // Manejar la respuesta del servidor
    console.log(data);

    // Verificar si el usuario ya existe
    if (data.mensaje === 'Usuario agregado') { // Este texto es lo que puse en el metodo del app.py
      // Limpiar los campos del formulario
      document.getElementById('agregarUsuarioForm').reset();

      // Mostrar el mensaje de confirmación
      const mensajeConfirmacion = document.getElementById('mensajeConfirmacion');
      mensajeConfirmacion.innerHTML = '¡Usuario agregado con éxito!';
      mensajeConfirmacion.style.display = 'block';

      // Recargar la página después de 3 segundos (ajusta el tiempo según sea necesario)
      setTimeout(() => {
        location.reload();
      }, 1000);
    } else if (data.mensaje === 'Usuario existente') { // Este texto es lo que puse en el metodo del app.py
      // Mostrar el mensaje de usuario existente sin recargar la página ni limpiar el formulario
      const mensajeConfirmacion = document.getElementById('mensajeConfirmacion');
      mensajeConfirmacion.innerHTML = '¡El usuario ya existe!';
      mensajeConfirmacion.style.display = 'block';
    }
  })
  .catch(error => console.error('Error:', error));
});

// Obtén la referencia al modal
const myModal = new bootstrap.Modal(document.getElementById('agregarUsuario'));

// Añade un evento para que se ejecute cuando el modal se cierre
myModal._element.addEventListener('hidden.bs.modal', function () {
    // Limpia los datos del formulario
    document.getElementById('agregarUsuarioForm').reset();
});

// |------------------------- Fin Crear Usuario---------------------------------|




// |------------------------- Inicio Modificar Usuario---------------------------------|
document.getElementById('modificarUsuarioForm').addEventListener('submit', function (event) {
  event.preventDefault();

  // Obtener datos del formulario
  const formDataUpdate = new FormData(this);
  console.log(formDataUpdate);

   // Obtener el ID del usuario
   const userIdPUT = formDataUpdate.get('id');

  // Enviar solicitud PUT al servidor
  fetch(`http://127.0.0.1:5000/usuarios/${userIdPUT}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(Object.fromEntries(formDataUpdate)),
  })
  .then(response => response.json())
  .then(data => {
    // Manejar la respuesta del servidor
    console.log(data);

    // Verificar si el usuario ya existe
    if (data.mensaje === 'Datos de usuario modificados') { // Este texto es lo que puse en el metodo del app.py
      // Limpiar los campos del formulario
      document.getElementById('modificarUsuarioForm').reset();

      // Mostrar el mensaje de confirmación
      const mensajeConfirmacionUpdate = document.getElementById('mensajeConfirmacionUpdate');
      mensajeConfirmacionUpdate.innerHTML = '¡Datos de Usuario Modificados con Exito!';
      mensajeConfirmacionUpdate.style.display = 'block';

      // Recargar la página después de 3 segundos (ajusta el tiempo según sea necesario)
      setTimeout(() => {
        location.reload();
      }, 1000);
    } else if (data.mensaje === 'Usuario no encontrado') { // Este texto es lo que puse en el metodo del app.py
      // Mostrar el mensaje de usuario existente sin recargar la página ni limpiar el formulario
      const mensajeConfirmacionUpdate = document.getElementById('mensajeConfirmacionUpdate');
      mensajeConfirmacionUpdate.innerHTML = '¡No se han Realizado Modificaciones!';
      mensajeConfirmacionUpdate.style.display = 'block';
    }
  })
  .catch(error => console.error('Error:', error));
});

// |-------------------------- Fin Modificar Usuario-----------------------------------|



// |------------------------- Inicio Eliminar Usuario---------------------------------|
document.getElementById('eliminarUsuario').addEventListener('click', function (event) {
  // Evitar que el enlace actúe como un formulario y cause un envío
  event.preventDefault();

  // Obtener el ID del usuario
  const userId = userDelId;

  // Enviar solicitud DELETE al servidor
  fetch(`http://127.0.0.1:5000/usuarios/${userId}`, {
      method: 'DELETE',
  })
  .then(response => response.json())
  .then(data => {
      // Mostrar el mensaje de confirmación
      const mensajeConfirmacionDel = document.getElementById('mensajeConfirmacionDel');
      mensajeConfirmacionDel.innerHTML = '¡Usuario eliminado con éxito!';
      mensajeConfirmacionDel.style.display = 'block';

      setTimeout(() => {
        location.reload();
      }, 1000);
  })
  .catch(error => console.error('Error:', error));
});
// |------------------------- Fin Eliminar Usuario---------------------------------|





// |------------------------- Inicio Busqueda Usuarios por entrada---------------------------------|
function buscarUsuarios() {
  // Obtiene el texto ingresado en el campo de búsqueda
  let searchTerm = document.getElementById("searchTerm").value.toLowerCase();

  // Obtiene todos los elementos de usuarios
  let filasUsuarios = document.querySelectorAll("#tablaUsuarios tr");

  filasUsuarios.forEach(function (fila) {
    // Ignorar la primera fila (encabezados)
    if (!fila.classList.contains("table-dark")) {
      let columnas = fila.querySelectorAll("td");

      let alMenosUnoVisible = false;

      columnas.forEach(function (columna) {
        let textoColumna = columna.textContent.toLowerCase();

        if (textoColumna.includes(searchTerm)) {
          fila.style.display = "table-row"; // Muestra la fila
          alMenosUnoVisible = true;
        } else {
          fila.style.display = "none"; // Oculta la fila
        }
      });

      // Muestra la fila si al menos una columna coincide
      if (alMenosUnoVisible) {
        fila.style.display = "table-row";
      } else {
        fila.style.display = "none";
      }
    }
  });
}

// Agrega un event listener al input de búsqueda
document.getElementById("searchTerm").addEventListener("input", function () {
  buscarUsuarios();
});
// |------------------------- Fin Busqueda Usuarios por entrada---------------------------------|



// |------------------------- Inicio filtro por roles ---------------------------------|
document.getElementById('selectRol').addEventListener('change', function () {
  filterTableByRol(this.value);
});

function filterTableByRol(selectedRol) {
  // Obtén todas las filas de la tabla
  let filasUsuarios = document.querySelectorAll('#tablaUsuarios tr');

  // Itera sobre cada fila y muestra u oculta según el tipo de rol seleccionado
  filasUsuarios.forEach(function (fila) {

      // Obtén el valor del tipo de rol de la celda correspondiente
      let tipoRol = fila.cells[6].textContent.trim().toLowerCase();

      // Muestra u oculta la fila según la opción seleccionada
      if (selectedRol === 'todos' || tipoRol === selectedRol) {
          fila.style.display = 'table-row';
      } else {
          fila.style.display = 'none';
      }
  });
}

// Al cargar la pagina marca por defecto Todos los Roles
document.addEventListener('DOMContentLoaded', function () {
  // Obtén el elemento select por su ID
  const selectRol = document.getElementById('selectRol');

  // Establece la opción "Todos los Roles" como seleccionada
  selectRol.value = 'todos';
});

// |------------------------- Fin filtro por roles ---------------------------------|



