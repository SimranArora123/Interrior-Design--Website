const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const request = require("request");

const app = express();
app.set('view engine', 'ejs');


app.use(express.static("public"));
app.get('/' , function(req, res){
    res.sendFile(__dirname + "/int.html");
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



app.get("/services", function(req, res){
    res.render("services");
});
app.get("/contact", function(req, res){
    res.render("contact");
});

app.post("/", function(req, res){
 const {firstname, lastname, email, subject} = req.body;
 if(!firstname || !lastname || !email) {
     res.sendFile(__dirname +"/failure.html");
 }



  const data = {
      members: [
          {
              email_address: email,
              status: 'subscribed',
          merge_fields: {
              FNAME: firstname,
              LNAME: lastname,

          }
      }
    ]
  };



    var jsonData = JSON.stringify(data);

    /* API KEY URL AND ID*/
    body: jsonData
    };

request(options, function(error, response, body){
    if(error) {
        res.sendFile(__dirname + "/failure.html");
    }else {
     if(response.statusCode === 200) {
         res.sendFile(__dirname + "/success.html")
     } else {
         res.sendFile(__dirname + "/failure.html");
     }
    }
}); 

});
app.get("/about", function(req, res){
    res.render("about");
});

app.get("/portfolio", function(req, res){
    res.render("portfolio");
});
 app.get("/int", function(req, res){
     res.render("int");
 });
 let port = process.env.PORT;
 if(port == null || port == ""){
   port = 3000;
 }
app.listen(port, function(){
    console.log("Server started on port 3000");
});
