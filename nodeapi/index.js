var express = require('express'); 
var cors = require('cors');
var mysql = require('mysql');
var bodyparser = require('body-parser');
var app = express();
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.listen(3300,()=>console.log("node app is running on port 3300."));

var cors = require('cors');
const { response } = require('express');
app.use(cors());

var connection = mysql.createConnection({
    host: 'localhost:8000',
    user:'root',
    password:'',
    database:'ionic_monuments'
})

//insertion de l'api
app.post('/insertuser',function(req,res)
{
    var data = JSON.parse(req.body.data);
    var nom = data.nom;
    var prenom = data.prenom;
    var email = data.email;
    var password = data.password;
    connection.connect(function()
    {
       var query = "insert into users (nom,prenom,email,password) values('"+nom+"','"+prenom+"','"+email+"','"+password+"') " ;
       connection.query(query, function(err,result,field){
           if(err){
               res.end(JSON.stringify(err));
           }
           else{
               if(result.affectedRows >0){
                   res.end("successfully inserted.")
               }else{
                   res.end("please try again.")
               }

           }

       }
       )
    }
    )
});
app.post('/auth', function(request, response) {
	var email = request.body.email;
	var password = request.body.password;
    connection.connect(function(){
        if (email && password) {
            var query='SELECT * FROM users WHERE email = ? AND password = ?';
            connection.query(query, function(err,result,field){
                if (results.length > 0) {
                    request.session.loggedin = true;
                    request.session.email = email;
                    response.redirect('/homePage');
                } else {
                    response.send('Incorrect Email and/or Password!');
                }			
                response.end();
            });
        } else {
            response.send('Please enter Email and Password!');
            response.end();
        }

    })
	 
});

app.get('/home',function(req, res)  {
    // res.send('CRUD Operation using NodeJS / ExpressJS / MySQL');
    let sql = "SELECT * FROM monuments";
    let query = connection.query(sql, (err, rows) => {
        if(err) response.send('monuments n existe pas');
    
    });
});
 
    
