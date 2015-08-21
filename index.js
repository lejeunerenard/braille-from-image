var Canvas = require('drawille');
var sharp = require('sharp');

sharp(process.argv[2]).resize( parseInt( process.argv[3] ) || 64, parseInt( process.argv[4] ) || 64).greyscale().raw()
.toBuffer(function(err, outputBuffer, info) {
   if (err) {
      throw err;
   }
   var c = new Canvas(info.width, info.height);
   for(var i = 0; i < outputBuffer.length; i++) {
         var value = outputBuffer[i];

         var x = i % info.width;
         if ( value >= 255/1.6) {
            c.set( x, ( i - x ) / info.width );
         } else {
            c.unset( x, ( i - x ) / info.width );
         }
   }

   var frame = c.frame();

   process.stdout.write(frame.split(' ').join('\u00A0'));

   for ( var j = 0; j < 10; j ++ ){
      process.stdout.write('\u2003');
   }

});
