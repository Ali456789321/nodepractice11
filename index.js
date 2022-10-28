const express = require("express");
const bodyparser = require('body-parser');
const https = require("https")
const app = express()

app.use(express.static('public'))
app.use(bodyparser.urlencoded({extended:true}))


app.get('/', function(req,res){
   res.sendFile(__dirname + "/index.html")
})


app.post('/', function(req,res) {
    var fname = req.body.firstN;
    var lname = req.body.lastN;
    var email = req.body.email;

    var data = {
        members:[
            {
                email_address: email,
                status:"subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname
                }
            }
        ]
    }
    var jsonData = JSON.stringify(data)

    const url = "https://us21.api.mailchimp.com/3.0/lists/7142d6c5bb"

    const options = {
        method:"POST",
        auth: "ali1:c33831daec03361c4e2d13b88184d5de-us21"
    }

    const request =https.request(url, options, function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html")
        } else {
            res.sendFile(__dirname + '/failiure.html')
        }

        response.on ('data', function(data){
              
        })
    })
   request.write(jsonData);
   request.end()
  
})

app.post('/failiure', function(req,res){
    res.redirect("/")
})


app.listen(process.env.PORT || 3000, function() {
    console.log("server is runing")
})

// id
// c33831daec03361c4e2d13b88184d5de-us21


// audience
// 7142d6c5bb