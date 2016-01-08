var http = require( 'http' );
var fs = require( 'fs' );
var querystring = require( 'querystring' );
var Handlebars = require( 'handlebars' );

var server = http.createServer( onConnect ).listen( 8080, function(){
  console.log('server started');
});

function onConnect( request, response ) {

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
        console.log( form.elementName );
        var element = form.elementName.toLowerCase();

        //readfile first then handlebar data

        fs.readFile( './public/template.html', function( err, data ) {
          console.log( data.toString() );

            var source =  data.toString();
                          //yeeeee, boiiiiiiiiiii

                          // '<!DOCTYPE html>' +
                          // '<html lang="en">' +
                          // '<head>' +
                          // '<meta charset="UTF-8">' +
                          // '<title>The Elements - {{ elementName }}</title>' +
                          // '<link rel="stylesheet" href="./css/styles.css">' +
                          // '</head>' +
                          // '<body>' +
                          // '<h1>{{ elementName }}</h1>' +
                          // '<h2>{{ elementSymbol }}</h2>' +
                          // '<h3>Atomic number {{ elementAtomicNumber }}</h3>' +
                          // '<p>{{ elementDescription }}</p>' +
                          // '<p><a href="/">back</a></p>' +
                          // '</body>' +
                          // '</html>';
            var template = Handlebars.compile( source );
            var result = template( form );

            console.log( result );

            data = result;

          fs.writeFile( 'public/' + element + '.html', data, function( err ) {
            if ( err ) {
              console.log( err );
            }
          });
        });


      });
//stats
    }

  // }
}