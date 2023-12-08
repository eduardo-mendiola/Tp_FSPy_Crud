
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


// |------------------------- Inicio Modificar Usuario---------------------------------|
document.getElementById('modificarUser').addEventListener('submit', function (event) {
  event.preventDefault();

  // Obtener datos del formulario
  const formDataUpdateUser = new FormData(this);
  console.log(formDataUpdateUser);

   // Obtener el ID del usuario
   const IdPUTUser = formDataUpdateUser.get('id_modUser');

  // Enviar solicitud PUT al servidor
  fetch(`http://127.0.0.1:5000/usuarios/${IdPUTUser}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(Object.fromEntries(formDataUpdateUser)),
  })
  .then(response => response.json())
  .then(data => {
    // Manejar la respuesta del servidor
    console.log(data);

    // Verificar si el usuario ya existe
    if (data.mensaje === 'Datos de usuario modificados') { // Este texto es lo que puse en el metodo del app.py
      // Limpiar los campos del formulario
      document.getElementById('modificarUser').reset();

      // Mostrar el mensaje de confirmación
      const mensajeUpdateUser = document.getElementById('mensajeUpdateUser');
      mensajeUpdateUser.innerHTML = '¡Datos de Usuario Modificados con Exito!';
      mensajeUpdateUser.style.display = 'block';

      // Recargar la página después de 3 segundos (ajusta el tiempo según sea necesario)
      setTimeout(() => {
        window.location.replace = 'http://127.0.0.1:5000/userPage';
      }, 1000);
    } else if (data.mensaje === 'Usuario no encontrado') { // Este texto es lo que puse en el metodo del app.py
      // Mostrar el mensaje de usuario existente sin recargar la página ni limpiar el formulario
      const mensajeUpdateUser = document.getElementById('mensajeUpdateUser');
      mensajeUpdateUser.innerHTML = '¡No se han Realizado Modificaciones!';
      mensajeUpdateUser.style.display = 'block';
    }
  })
  .catch(error => console.error('Error:', error));
});



// |-------------------------- Fin Modificar Usuario-----------------------------------|


// Validad caracteres password
function validarPassModal(idPass, btn, mens) {
  const buttonPassId = document.getElementById(btn);
  const mensajePassId = document.getElementById(mens);
  const passId = document.getElementById(idPass).value;

  const regExpMin = new RegExp("(?=.*[a-z])");
  const regExpMay = new RegExp("(?=.*[A-Z])");
  const regExpCantChar = new RegExp(".{8,}");

  if (!regExpMin.test(passId)) {
    mensajePassId.innerHTML = "La contraseña debe tener MINÚSCULAS!";
    mensajePassId.className = "alert alert-danger mt-2";
    buttonPassId.disabled = true;  
  } else if (!regExpMay.test(passId)) {
    mensajePassId.innerHTML = "La contraseña debe tener MAYÚSCULAS!";
    mensajePassId.className = "alert alert-danger mt-2";
    buttonPassId.disabled = true;
  } else if (!regExpCantChar.test(passId)) {
    mensajePassId.innerHTML = "La contraseña debe tener más de 8 caracteres";
    mensajePassId.className = "alert alert-danger mt-2";
    buttonPassId.disabled = true;
  } else {
    mensajePassId.innerHTML = "";
    mensajePassId.className = "";
    buttonPassId.disabled = false;
  }
}





// |------------------------- Fin filtro por roles ---------------------------------|



