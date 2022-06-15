const express = require("express");
const body_parser=require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

app.use(express.static("public"));
app.use(body_parser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
  const firstName = req.body.fName;
  const secondName = req.body.lName;
  const email = req.body.eMail;

  const data ={
    members:[
      {
        email_address: email,
        status: "subscribed",
        merge_fields:{
          FNAME: firstName,
          LNAME: secondName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);
  const url ="https://us10.api.mailchimp.com/3.0/lists/f08b3c3b0b";
  const options ={
    method: "POST",
    auth :"jay_suk:7da593c778c042513278dff954980667-us10"
  }
  const request =https.request(url,options,function(response){
    if(response.statusCode===200)
        res.sendFile(__dirname+"/success.html");
    else
        res.sendFile(__dirname+"/failure.html");
    response.on("data",function(data){
      //console.log(JSON.parse(data));
    })
  })

request.write(jsonData);
request.end();

});


app.post("/failure",function(req,res){
  res.redirect("/");
})
app.listen(process.env.PORT || 3000,function(){
  console.log("server is running on port 3000");
});
