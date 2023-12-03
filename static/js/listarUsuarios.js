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
let userDelId;
function cargarDataUser(usuario) {
    let dataUsuario = document.getElementById('dataUser')
    dataUsuario.innerHTML = " " + usuario.nombre + " " + usuario.apellido;
    userDelId = usuario.id;
    return userDelId;
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
    if (data.mensaje === 'Usuario agregado') {
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
    } else if (data.mensaje === 'Usuario existente') {
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



// document.getElementById('modificarUsuarioForm').addEventListener('submit', function (event) {
//   event.preventDefault();

//   // Obtener datos del formulario
//   const formData = new FormData(this);

//   // Obtener el ID del usuario
//   const userId = formData.get('id');

//   // Enviar solicitud PUT al servidor
//   fetch(`http://127.0.0.1:5000/usuarios/${userId}`, {
//       method: 'PUT',
//       headers: {
//           'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(Object.fromEntries(formData)),
//   })
//   .then(response => response.json())
//   .then(data => {
//       // Manejar la respuesta del servidor
//       console.log(data);
//       // Cerrar el modal después de modificar el usuario
//       $('#modificarUsuarioModal').modal('hide');
//   })
//   .catch(error => console.error('Error:', error));
// });



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


