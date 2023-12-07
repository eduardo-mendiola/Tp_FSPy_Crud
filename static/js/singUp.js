
// |------------------------- Inicio Crear Usuario---------------------------------|
document.getElementById('crearUsuarioForm').addEventListener('submit', function (event) {
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
      document.getElementById('crearUsuarioForm').reset();

      // Mostrar el mensaje de confirmación
      const mensajeConfirmacion = document.getElementById('mensajeConfirmacion');
      mensajeConfirmacion.innerHTML = '¡Usuario creado con éxito!';
      mensajeConfirmacion.style.display = 'block';

       // Redireccionar a la página de login después de 3 segundos (ajusta el tiempo según sea necesario)
       setTimeout(() => {
        window.location.href = 'http://127.0.0.1:5000/login';
      }, 2000);
    } else if (data.mensaje === 'Usuario existente') { // Este texto es lo que puse en el metodo del app.py
      // Mostrar el mensaje de usuario existente sin recargar la página ni limpiar el formulario
      const mensajeConfirmacion = document.getElementById('mensajeConfirmacion');
      mensajeConfirmacion.innerHTML = '¡El usuario ya existe!';
      mensajeConfirmacion.style.display = 'block';
    }
  })
  .catch(error => console.error('Error:', error));
});


// |------------------------- Fin Crear Usuario---------------------------------|

