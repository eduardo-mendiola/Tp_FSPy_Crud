from flask import Flask, render_template, jsonify, request, session, redirect
from werkzeug.utils import secure_filename
from flask_cors import CORS
import os
import time

from webapp.userCrud import Usuario

app = Flask(__name__)

CORS(app)  # Esto habilitará CORS para todas las rutas

# Configuración de la clave secreta para las sesiones
app.secret_key = 'apolito'

#--------------------------------------------------------------------
# Render Frontend biciTienda
#--------------------------------------------------------------------
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/cita')
def cita():
    return render_template('cita.html')

@app.route('/contacto')
def contacto():
    return render_template('contacto.html')

@app.route('/cv_send')
def cvSend():
    return render_template('cv_send.html')

@app.route('/details')
def details():
    return render_template('details.html')

@app.route('/faq')
def faq():
    return render_template('faq.html')

@app.route('/financiamiento')
def financiamiento():
    return render_template('financiamiento.html')

@app.route('/help')
def help():
    return render_template('help.html')

@app.route('/legal')
def legal():
    return render_template('legal.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/message')
def message():
    return render_template('message.html')

@app.route('/shipping')
def shipping():
    return render_template('shipping.html')

@app.route('/sing_up')
def singUp():
    return render_template('sing_up.html')

@app.route('/size')
def size():
    return render_template('size.html')

@app.route('/stores')
def stores():
    return render_template('stores.html')

@app.route('/trabajo')
def trabajo():
    return render_template('trabajo.html')

@app.route('/user_page')
def userPage():
    return render_template('userPage.html')


#--------------------------------------------------------------------
# Render app biciTienda
#--------------------------------------------------------------------


# @app.route('/inicio_app')
# def inicioApp():
#     return render_template('inicioApp.html')

# @app.route('/usuarios_sistema')
# def usuariosSistema():
#     return render_template('usuariosSistema.html')

@app.route('/login_sistema')
def loginSistema():
    return render_template('loginSistema.html')

@app.route('/login_administracion')
def loginAdministracion():
    return render_template('loginAdministracion.html')



#--------------------------------------------------------------------
# Usuario CRUD
#--------------------------------------------------------------------
# Crear una instancia de la clase Catalogo
usuario = Usuario(host='localhost', user='root', password='', database='biciTienda')
#--------------------------------------------------------------------
@app.route("/usuarios", methods=["GET"])
def listar_usuarios():
    try:
        usuarios = usuario.listar_usuarios()
        return jsonify({"usuarios": usuarios})

    except Exception as e:
        # Manejo de excepción
        print(f"Error en listar_usuarios: {str(e)}")
        return jsonify({"mensaje": "Error al procesar la solicitud"}), 500
#--------------------------------------------------------------------
@app.route("/usuarios/<int:id>", methods=["GET"])
def mostrar_usuario_id(id):
    try: 
        user = usuario.consultar_usuario_id(id)
        if user:
            return jsonify(user), 201
        else:
            return "Usuario no encontrado", 404
        
    except Exception as e:
        # Manejo de excepción
        print(f"Error en listar_usuarios_id: {str(e)}")
        return jsonify({"mensaje": "Error al procesar la solicitud"}), 500
    
#--------------------------------------------------------------------
@app.route("/usuarios/<string:email>", methods=["GET"])
def mostrar_usuario_email(email):
    try: 
        user = usuario.consultar_usuario_email(email)
        if user:
            return jsonify(user), 201
        else:
            return "Usuario no encontrado", 404
        
    except Exception as e:
        # Manejo de excepción
        print(f"Error en listar_usuarios_id: {str(e)}")
        return jsonify({"mensaje": "Error al procesar la solicitud"}), 500

#--------------------------------------------------------------------
@app.route("/usuarios", methods=["POST"])
def alta_usuario():
    try:
        nombre = request.json['nombre']
        apellido = request.json['apellido']
        email = request.json['email']
        telefono = request.json['telefono']  
        password = request.json['password']
        id_rol = request.json['id_rol']
    
        if usuario.alta_usuario(nombre, apellido, email, telefono, password, id_rol):
            return jsonify({"mensaje": "Usuario agregado"}), 201
        else:
            return jsonify({"mensaje": "Usuario existente"}), 400
    
    except Exception as e:
        # Manejo de excepción
        print(f"Error en alta_usuario: {str(e)}")
        return jsonify({"mensaje": "Error al procesar la solicitud"}), 500

#--------------------------------------------------------------------
@app.route("/usuarios/<int:id>", methods=["PUT"])
def modificar_usuario(id):
    try:
        nuevo_nombre = request.json['nombre']
        nuevo_apellido = request.json['apellido']
        nuevo_email = request.json['email']
        nuevo_telefono = request.json['telefono']
        nuevo_password = request.json['password']
        nuevo_id_rol = request.json['id_rol']
        
        if usuario.modificar_usuario(id, nuevo_nombre, nuevo_apellido, nuevo_email, nuevo_telefono, nuevo_password, nuevo_id_rol):
            return jsonify({"mensaje": "Datos de usuario modificados"}), 200
        else:
            return jsonify({"mensaje": "Usuario no encontrado"}), 403
    
    except Exception as e:
        # Manejo de excepción
        print(f"Error en modificar_usuario: {str(e)}")
        return jsonify({"mensaje": "Error al procesar la solicitud"}), 500


#--------------------------------------------------------------------
@app.route("/usuarios/<int:id>", methods=["DELETE"])
def eliminar_usuario(id):
    try:
        # Elimina el usuario 
        if usuario.eliminar_usuario(id):
            return jsonify({"mensaje": "Usuario eliminado"}), 200
        else:
            return jsonify({"mensaje": "Error al eliminar al usuario"}), 500
        
    except Exception as e:
        # Manejar de excepción
        print(f"Error en eliminar_usuario: {str(e)}")
        return jsonify({"mensaje": "Error al procesar la solicitud"}), 500
    
#--------------------------------------------------------------------


# @app.route('/prueba_login')
# def pruebaLogin():
#     return render_template('PRUEBA_LOGIN_BORRAR.html')
#--------------------------------------------------------------------
# Login
#--------------------------------------------------------------------
# Configuración de la base de datos (puedes mantener esta configuración para referencia)
# db_config = {
#     'host': 'localhost',
#     'user': 'root',
#     'password': '',
#     'database': 'login'
# }

# Crea una instancia de la clase Usuario con la conexión a la base de datos
# usuario_db = Usuario(**db_config)

# @app.route('/login', methods=["GET", "POST"])
# def accesoLogin():
#     if request.method == 'POST' and 'textUser' in request.form and 'textPassword' in request.form:
#         _email = request.form['textUser']
#         _password = request.form['textPassword']

#         # Utiliza la conexión a la base de datos desde la instancia de Usuario
#         account = usuario.consultar_usuario_login(_email, _password)

#         if account:
#             session['logueado'] = True
#             session['id'] = account['id']
#             session['id_rol'] = account['id_rol']

#             if session['id_rol'] == 1:
#                 user_info = usuario.consultar_usuario_email(_email)
#                 return render_template("inicioApp.html", user_info=user_info)        
#             elif session['id_rol'] == 2:
#                 return render_template("inicioApp.html")
#             elif session['id_rol'] == 3:
#                 user_info = usuario.consultar_usuario_email(_email)
#                 return render_template("userPage.html", user_info=user_info)
#         else:
#             return render_template('login.html', mensajeErrorLogin="Usuario o Contraseña Incorrectas")
         

#--------------------------------------------------------------------



@app.route('/login', methods=["GET", "POST"])
def accesoLogin():
    if request.method == 'POST' and 'textUser' in request.form and 'textPassword' in request.form:
        _email = request.form['textUser']
        _password = request.form['textPassword']

        # Utiliza la conexión a la base de datos desde la instancia de Usuario
        account = usuario.consultar_usuario_login(_email, _password)

        if account:
            session['logueado'] = True
            session['id'] = account['id']
            session['id_rol'] = account['id_rol']

            # Almacenamos la información del usuario en la sesión
            user_info = usuario.consultar_usuario_email(_email)
            session['user_info'] = user_info

            if session['id_rol'] == 1: 
                return render_template("inicioApp.html", user_info=user_info)
            elif session['id_rol'] == 2:
                return render_template("inicioApp.html", user_info=user_info) 
            elif session['id_rol'] == 3:
                return render_template("userPage.html", user_info=user_info) 
        else:
            return render_template('login.html', mensajeErrorLogin="Usuario o Contraseña Incorrectas")


@app.route('/usuarios_sistema')
def usuariosSistema():
    user_info = session.get('user_info')
    if not user_info:
        return redirect('/login')  
    return render_template('usuariosSistema.html', user_info=user_info)

@app.route('/inicio_app')
def inicioApp():
    user_info = session.get('user_info')
    if not user_info:
        return redirect('/inicioApp')  
    return render_template('inicioApp.html', user_info=user_info)






if __name__ == "__main__":
    app.run(debug=True)