var http = require( 'http' );
var fs = require( 'fs' );
var querystring = require( 'querystring' );
var Handlebars = require( 'handlebars' );

var server = http.createServer( onConnect ).listen( 8080, function(){
  console.log('Server Started');
});

function onConnect( request, response ) {

  var path = request.url;

  if( path === '/' ) {
    path = '/index.html';
  }

  //if path = / or /index.html
  //get an array of all elements
  //fs.readdir( 'public/', function( err, files ) {
  //if (err) console.log(err)
  //console.log(files);
  //var elementArr = files.filter( curr, index, array );
  //  return
  //    curr !== '.keep' &&
  //    curr !== '404.html' &&
  //    curr !== 'css' &&
  //    curr !== 'index.html'
  // });



  //handle client 'GET' requests and 'POST' requests
  //redirect requests to public folder



  // if( request.method === 'GET' ) {
    //can use if/else statements or switch cases to handle instances of each method

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

        var form = querystring.parse(buffer.toString());

        var element = form.elementName.toLowerCase();

        //readfile first then handlebar data
        //adding a new html page with the input data

        fs.readFile( './public/elementTemplate.html', function( err, data ) {

            var source =  data.toString();
            var template = Handlebars.compile( source );
            var result = template( form );

          fs.writeFile( 'public/' + element + '.html', result, function( err ) {
            if ( err ) {
              console.log( err );
            }

            response.writeHead( 200, {
              'Content-Type' : 'application/json'
            });

            response.end( JSON.stringify({'success' : true}) );
          });
        });

        fs.readFile( './public/indexTemplate.html', function( err, data ) {

          var source = data.toString();
          var template = Handlebars.compile( source );
          var result = template(  );

        });
      });
//stats
    }

  // }
}