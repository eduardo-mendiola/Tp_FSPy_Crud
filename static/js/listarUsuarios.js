const URL = "http://127.0.0.1:5000/"
// const URL = "https://ezequielmz.pythonanywhere.com/"

// Realizamos la solicitud GET al servidor para obtener todos los productos
fetch(URL + 'usuarios')
    .then(function (response) {
        if (response.ok) {return response.json(); }
    })
    .then(function (data) {
        let tablaUsuarios = document.getElementById('tablaUsuarios');

        // Iteramos sobre los usuarios y agregamos filas a la tabla
        for (let usuario of data) {
            let fila = document.createElement('tr');
            fila.innerHTML = 
                '<td>' + usuario.id + '</td>' +
                '<td>' + usuario.nombre + '</td>' +
                '<td>' + usuario.apellido + '</td>' +
                '<td>' + usuario.password + '</td>' +
                '<td>' + usuario.email + '</td>' +
                '<td>' + usuario.telefono + '</td>';
            tablaUsuarios.appendChild(fila);
        }
    })
    .catch(function (error) {
        // Código para manejar errores
        //alert('Error al obtener los usuarios.');
    });



								// 	<td>{{ usuario.id }}</td>
								// 	<td>{{ usuario.nombre }}</td>
								// 	<td>{{ usuario.apellido }}</td>
								// 	<td>{{ usuario.password }}</td>
								// 	<td>{{ usuario.email }}</td>
								// 	<td>{{ usuario.telefono }}</td>
								// 	<td>

								// 	<a href='#' data-bs-toggle='modal' data-bs-target='#modificarUsuario'><i class='bi bi-pencil-fill m-1'></i></a>

								// 	<a href='#' @click="eliminar_usuario(usuario.id)" data-bs-toggle='modal' data-bs-target='#delModal'><i class='bi bi-trash-fill m-1'></i></a>
								// </td>
						
































// URL = "http://127.0.0.1:5000/";
// // appTabla
// const app = new Vue({
//   el: "#app",
//   data: {
//     usuarios: [],
//   },
//   mounted() {
//     // Al cargar la página, obtenemos la lista de usuarios
//     this.listarUsuarios();
//   },
//   methods: {
//     async listarUsuarios() {
//       try {
//         const response = await fetch(URL + "usuarios");
//         const data = await response.json();
//         this.usuarios = data.usuarios;
//       } catch (error) {
//         console.error("Error:", error);
//         alert("Error al obtener la lista de usuarios.");
//       }
//     },
//   },

//   template: `
      // <div>
      //     <table class="table table-striped text-center">
      //         <thead class="table-dark">
      //             <tr>
      //                 <th scope="col">#ID</th>
      //                 <th scope="col">Nombre</th>
      //                 <th scope="col">Apellido</th>
      //                 <th scope="col">Password</th>
      //                 <th scope="col">Email</th>
      //                 <th scope="col">Teléfono</th>
      //             </tr>
      //         </thead>
      //         <tbody>
      //             <tr v-for="usuario in usuarios" :key="usuario.id">
      //                 <td>{{ usuario.id }}</td>
      //                 <td>{{ usuario.nombre }}</td>
      //                 <td>{{ usuario.apellido }}</td>
      //                 <td>{{ usuario.password }}</td>
      //                 <td>{{ usuario.email }}</td>
      //                 <td>{{ usuario.telefono }}</td>
      //                 <td>

      //                 <a href='#' data-bs-toggle='modal' data-bs-target='#modificarUsuario'><i class='bi bi-pencil-fill m-1'></i></a>

      //                 <a href='#' @click="eliminar_usuario(usuario.id)" data-bs-toggle='modal' data-bs-target='#delModal'><i class='bi bi-trash-fill m-1'></i></a>
      //               </td>
      //             </tr>
      //         </tbody>
      //     </table>
      // </div>
//   `,
// });

// id = 2;
// //appMod
// const appmod = new Vue({
//   el: "#appMod",
//   data: {
//     usuario_id: {},
//   },
//   mounted() {
//     // Al cargar el modal, obtenemos el  usuario por id
//     this.consultar_usuario_id(id);
//   },
//   methods: {
//     async consultar_usuario_id(id) {
//       try {
//         const response = await fetch(`${URL}usuarios/${id}`);
//         const data = await response.json();
//         this.usuario_id = data;
//       } catch (error) {
//         console.error("Error:", error);
//         alert("Error al obtener la lista de usuarios.");
//       }
//     },
//   },
//   template: `
// 					// <div class="form-floating mb-3">
// 					// 	<div id="appmod"></div>
// 					// 	<input type="hidden" name="id" v-model="usuario_id.id">
// 					// 	<div class="form-floating mb-3">
// 					// 		<input type="text" name="name" class="form-control rounded-3" id="name" placeholder="Nombre"
// 					// 			v-model="usuario_id.nombre" required>
// 					// 		<label for="name">Nombre</label>
// 					// 	</div>
// 					// 	<div class="form-floating mb-3">
// 					// 		<input type="text" name="lastname" class="form-control rounded-3" id="lastname" placeholder="Apellido"
// 					// 			v-model="usuario_id.apellido" required>
// 					// 		<label for="lastname">Apellido</label>
// 					// 	</div>
// 					// 	<div class="form-floating mb-3">
// 					// 		<input type="text" name="email" class="form-control rounded-3" id="email" placeholder="Email"
// 					// 			v-model="usuario_id.email" required>
// 					// 		<label for="email">Email</label>
// 					// 	</div>
// 					// 	<div class="form-floating mb-3">
// 					// 		<input type="text" name="tel" class="form-control rounded-3" id="tel" placeholder="Teléfono movil"
// 					// 			v-model="usuario_id.telefono" required>
// 					// 		<label for="tel">Teléfono</label>
// 					// 	</div>
// 					// 	<div class="form-floating mb-3">
// 					// 		<input type="text" name="tema" class="form-control rounded-3" id="tema" placeholder="Tema"
// 					// 			v-model="usuario_id.password" required>
// 					// 		<label for="tema">Contraseña</label>
// 					// 	</div>
//           <div>ESTOY EN JS CON VUE</div>
//   `,
// });



