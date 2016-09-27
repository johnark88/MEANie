var express = require( 'express' );
var app = express();
var path = require( 'path' );
var bodyParser = require( 'body-parser' );
var mongoose = require( 'mongoose' );

app.use(bodyParser.json());

// 27017 is default mongo port
mongoose.connect( 'localhost:/27017/test' );
var ourSchema = new  mongoose.Schema({
  name: String,
  location: String
});
var ourModel = mongoose.model( 'ourModel', ourSchema );
//app.get path.resolve
app.get( '/', function( req, res ){
  res.sendFile( path.resolve( 'public/index.html' ) );
});
app.get( '/getRecords', function( req, res ){
  // get and send back all the things
  ourModel.find({}, function(err, testResults){
if (err) {
  console.log(err);
  res.sendStatus(500);
}else {
  console.log('connected to DB');
  res.send(testResults);
}//end else
  });//end then function
});//end app.get records

//app.listen on port 8080
app.listen( 8080, 'localhost', function( req, res ){
  console.log( 'listening on 8080' );
});//end app.listen

//app.post testpost
app.post( '/testPost', function( req, res ){
  console.log( 'req.body.name: ' + req.body.name);

  // retrieved the req.body
  // putting it into an object to be saved in the db
  var recordToAdd={
    name: req.body.name,
    location: req.body.location
  };//end recordToAdd object
  console.log(recordToAdd,'add add add');
  // create new record
  var newRecord=ourModel( recordToAdd );
  newRecord.save();
});
app.delete('/delete/:id', function(req,res){
console.log('params :', req.params);
ourModel.remove({"_id " : req.params.id}, function(err){
if (err) {
  console.log(err);
  res.sendStatus(500);
}else {
  console.log('connected to the DB!');
  res.sendStatus(200);
}
});// .remove record


});//end app. delete

app.use( express.static( 'public' ) );
