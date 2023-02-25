const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { json } = require("express");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/",function(req,res){
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var mail = req.body.email;
    // console.log(firstName,lastName,mail);
    const data = {
        members:[
            {
                email_address : mail,
                status : "subscribed",
                merge_fields:{
                    FNAME : firstName,
                    LNAME : lastName,
                }
            }
        ]
    }
    const jsonData = JSON.stringify(data);
    
    const url = "https://us21.api.mailchimp.com/3.0/lists/9ef8a499a5";
    const options = {
        method: "POST",
        auth: "Ankit1:cf21d040f0e854a624403b99a69cb162-us21",
    }
    const request = https.request(url,options,function(response){
        if(response.statusCode === 200){
           res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
})

app.post(function(req,res){
    res.redirect("/");
})

app.listen(3000,function(req,res){
    console.log("Server is running on port 3000");
})


// api key
// cf21d040f0e854a624403b99a69cb162-us21

// list id
// 9ef8a499a5