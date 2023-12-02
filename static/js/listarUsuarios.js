const URL = "http://127.0.0.1:5000/";

// Realizamos la solicitud GET al servidor para obtener todos los productos
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
      let fila = document.createElement('tr');
      fila.innerHTML =
        `<td>${usuario.id}</td>
         <td>${usuario.nombre}</td>
         <td>${usuario.apellido}</td>
         <td>${usuario.password}</td>
         <td>${usuario.email}</td>
         <td>${usuario.telefono}</td>
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


//Función para cargar datos en el modal
  function cargarDatosModal(usuario) {
    document.getElementById('nombre_mod').value = usuario.nombre;
    document.getElementById('apellido_mod').value = usuario.apellido;
    document.getElementById('contrasena_mod').value = usuario.password;
    document.getElementById('email_mod').value = usuario.email;
    document.getElementById('telefono_mod').value = usuario.telefono;
  }

// Función para cargar datos de usuario a eliminar
function cargarDataUser(usuario) {
    let dataUsuario = document.getElementById('dataUser')
    dataUsuario.innerHTML = " " + usuario.nombre + " " + usuario.apellido;
}

// // Función para cargar datos en el modal
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
  
  