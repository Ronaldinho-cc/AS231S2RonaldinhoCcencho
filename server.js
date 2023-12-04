const mysql = require('mysql');
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
})

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



app.listen(3000,(req,res)=>{
    console.log("servidor escuchando el puerto http://localhost:3000");
});