const mysql = require('mysql');
const session = require('express-session');
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');


let conexion = mysql.createConnection({
    host: 'localhost',
    user : 'root',
    database :'demo',
    password:'admin',
});


conexion.connect((err) => {
    if(!err){
        console.log("conexion exitosa a la base de datos ");
    }else{
        console.log("no conectado ");
    };
});


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/css",express.static(__dirname +'/form/css'));
app.use("/img",express.static(__dirname +'/form/img'));

app.get("/",function(req,res){ 
    var filePath = path.join(__dirname, '/form/index.html');
    res.sendFile(filePath);
});
app.get("/index.html",function(req,res){ 
    var filePath = path.join(__dirname, '/form/index.html');
    res.sendFile(filePath);
});

app.get("/sesion.html",function(req,res){ 
    var filePath = path.join(__dirname, '/form/sesion.html');
    res.sendFile(filePath);
});

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.post("/validar", (req, res)=>{
    let data= req.body;

    const name = data.nombre;
    const ape = data.apellido;
    const dni = data.dni;
    const naci = data.nacimiento;
    const email = data.correo;
    const password = data.password;

    const registro = "INSERT INTO estudiante (nombres,apellido,dni,fechaN,email,password) VALUES('"+ name +"','"+ ape +"','"+ dni +"','"+ naci +"','"+email+"','"+password+"')";

    conexion.query(registro, function (error) {
        if (error) {
          throw error;
        } else {
          console.log("Datos almacenados correctamente")
          console.log(registro);
        }
      });
});

// login 
app.post('/auth', function(request, response) {
	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
	// Ensure the input fields exists and are not empty
	if (username && password) {
// Execute SQL query that'll select the account from the database based on the specified username and password
		conexion.query('SELECT * FROM estudiante WHERE nombres = ? AND password = ?', [username, password], function(error, results, fields) {
            console.log("Consulta de usuario en progreso")
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				request.session.loggedin = true;
				request.session.username = username;
                console.log("Inicio de sesión exitoso para usuario: " + username);
				// Redirect to home page
				response.redirect('/index.html');
			} else {
                console.log("Usuario y/o Contraseña Incorrecta");
				response.send('Usuario y/o Contraseña Incorrecta');
			}			
			response.end();
		});
	} else {
        console.log('Por favor ingresa Usuario y Contraseña!');
		response.send('Por favor ingresa Usuario y Contraseña!');
		response.end();
	}
});




app.listen(3000,(req,res)=>{
    console.log("servidor escuchando el puerto http://localhost:3000");
});