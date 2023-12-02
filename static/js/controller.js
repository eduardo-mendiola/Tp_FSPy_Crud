document.getElementById('agregarUsuarioForm').addEventListener('submit', function (event) {
  event.preventDefault();

  // Obtener datos del formulario
  const formData = new FormData(this);

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
      // Manejar la respuesta del servidor (puede ser una alerta, actualización de la tabla, etc.)
      console.log(data);
      // Cerrar el modal después de agregar el usuario
      $('#agregarUsuarioModal').modal('hide');
  })
  .catch(error => console.error('Error:', error));
});





document.getElementById('modificarUsuarioForm').addEventListener('submit', function (event) {
  event.preventDefault();

  // Obtener datos del formulario
  const formData = new FormData(this);

  // Obtener el ID del usuario
  const userId = formData.get('id');

  // Enviar solicitud PUT al servidor
  fetch(`http://127.0.0.1:5000/usuarios/${userId}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(Object.fromEntries(formData)),
  })
  .then(response => response.json())
  .then(data => {
      // Manejar la respuesta del servidor
      console.log(data);
      // Cerrar el modal después de modificar el usuario
      $('#modificarUsuarioModal').modal('hide');
  })
  .catch(error => console.error('Error:', error));
});




document.getElementById('eliminarUsuarioForm').addEventListener('submit', function (event) {
  event.preventDefault();

  // Obtener datos del formulario
  const formData = new FormData(this);

  // Obtener el ID del usuario
  const userId = formData.get('idUser');

  // Enviar solicitud DELETE al servidor
  fetch(`http://127.0.0.1:5000/usuarios/${userId}`, {
      method: 'DELETE',
  })
  .then(response => response.json())
  .then(data => {
      // Manejar la respuesta del servidor
      console.log(data);
      // Cerrar el modal después de eliminar el usuario
      $('#eliminarUsuarioModal').modal('hide');
  })
  .catch(error => console.error('Error:', error));
});
