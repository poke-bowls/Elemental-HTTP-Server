var http = require( 'http' );
var fs = require( 'fs' );
var moment = require( 'moment-timezone' );
var querystring = require( 'querystring' );

var server = http.createServer( onConnect ).listen( 8080, function(){
  console.log('server started');
});

function onConnect( request, response ) {
  var today = new Date();
  var UTCstring = moment(today.toUTCString()).tz( 'Pacific/Honolulu' ).format('MM/DD/YYYY hh:mm:ss a');

  var path = request.url;

  if( path === '/' ) {
    path = '/index.html';
  }

  //handle client 'GET' requests and 'POST' requests
  //redirect requests to public folder

  // if( request.method === 'GET' ) {

    // fs.readFile( './public/' + path, function( err, data ){
    //   if( err ){
    //     return notFound();
    //   }
    //   response.writeHead( 200, {
    //         'Server' : 'Narnia\n',
    //         'Content-Length':  data.length + '\n',
    //         // 'Content-Type': 'text/' + path.split('.');
    //       });
    //   return response.end( data );
    // });

    // var notFound = function () {
    //   fs.readFile( './public/404.html' , function( err, data ) {
    //     if(err) console.log(err);

    //     response.writeHead( 404, {
    //       'Server' : 'Narnia\n',
    //       'Content-Length':  data.length + '\n',
    //       // 'Content-Type':
    //     });
    //     response.write( data );
    //   return response.end( data );
    //   });
    // };

  // } else if( request.method === 'POST' ) {

    // console.log( response );
    if( request.url === '/elements' ) {
      request.on( 'data', function( buffer ){
        console.log( querystring.parse(buffer.toString()) );
        var form = querystring.parse(buffer.toString());
        console.log( form.elementName.toLowerCase() );
      });
    }

  // }
}