var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');


var accountSid = 'AC552ec788b83cba4b91ed340673c8e39e';
var authToken = "c816ff4f038ce4b56611993328b01722";
var client = require('twilio')(accountSid, authToken);



var corsOptions = {
  origin: /^[^.\s]+\.mixmax\.com$/,
  credentials: true
};

app.use(bodyParser.json({limit:'100MB'}))
app.get('/typeahead', cors(corsOptions), require('./api/typeahead'));
app.get('/resolver', cors(corsOptions), require('./api/resolver'));


console.log (req.body)
  var to = req.body.to[0];
  var email = to.email
  //var req = /.*\+?(*+)@./
  var number = email.split('+')[1];
  number = number.split('@')[0];


  app.post('/rule4', (req, resp) => {

    console.log('SMS IMP');

    client.messages.create({
        to: "+12193336717",
        from: "+14438326629",
        body: "Amulya Parmar has requested that his/her most recent VERY IMPORTANT email is alerted to you via SMS. Powered by MailMax." ,
    }, function(err, message) {
        console.log(message.sid);
    });


  });


//Rule 2 - Congrats

app.post('/rule2', (req, resp) => {

  console.log('Main Congrats Call');
  //console.log(call.sid);

  client.calls.create({
    url: "http://amulyaparmar.co/project/Response2.xml",
    to: "+12193336717",
    from: "+14438326629",
    statusCallback: "https://www.myapp.com/events",
    statusCallbackMethod: "POST",
    statusCallbackEvent: ["initiated", "ringing", "answered", "completed"],
    method: "GET"
}, function(err, call) {
  if(err) {
    console.log(err);
  }
  else {
    console.log(call.sid)
  }

});

});



//Rule 3 - SMS Alert

app.post('/rule3', (req, resp) => {

  console.log('SMS Basic');

  // console.log('+14438326629');
  //console.log(call.sid);
  // console.log (req.body)
  // var to = req.body.to[0];
  // console.log(to.name);
  client.messages.create({
      to: "+12193336717",
      from: "+14438326629",
      body: "Amulya Parmar has requested that his/her most recent email is alerted. Powered by MailMax." ,
  }, function(err, message) {
      console.log(message.sid);
  });


});


//Rule 4 - SMS Alert - IMP

app.post('/rule4', (req, resp) => {

  console.log('SMS IMP');

  client.messages.create({
      to: "+12193336717",
      from: "+14438326629",
      body: "Amulya Parmar has requested that his/her most recent VERY IMPORTANT email is alerted to you via SMS. Powered by MailMax." ,
  }, function(err, message) {
      console.log(message.sid);
  });


});

//Rule 5 - SMS Alert - IMP

// app.post('/rule5', (req, resp) => {
//
//   console.log('SMS Congrats');
//
//
//   client.messages.create({
//       to: "+15862588588",
//       from: "+14438326629",
//       body: "Amulya Parmar has requested that his/her most recent EXCITING email about a scholarship be alerted to you. Congratulations in advance from the team at MailMax." ,
//   }, function(err, message) {
//       console.log(message.sid);
//   });
//
//
// });

  //  resp.status (200)
  //});

//})


app.listen(process.env.PORT || 8080);
