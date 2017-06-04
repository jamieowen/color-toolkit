
var fs = require( 'fs-extra' );
var Color = require( 'Color' );

/**
 * Using the data sources,
 * Generate rgb,hex,name(if available) for each palette.
 */

var pantone = require( '../_data/pantone-colors' );

// Create color wheel colors
var colorWheel = [];
var deg = 30;
var c;
for( var i = 0; i<360; i+=deg ){

    c = new Color(0xff0000);
    colorWheel.push( c.rotate( i ) );

}

fs.mkdirsSync( './palettes/pantone' );
fs.mkdirsSync( './palettes/color-wheel' );

var fileData = {

    './palettes/pantone/rgb.json': pantone.values.map( function( value ){
        return new Color( value ).rgb().array();
    }),
    './palettes/pantone/hex.json': pantone.values.map( function( value ){
        return value;
    }),
    './palettes/pantone/names.json': pantone.names.map( function( name ){
        return name;
    }),
    './palettes/color-wheel/rgb.json': colorWheel.map( function(c){
        return c.rgb().array();
    }),
    './palettes/color-wheel/hex.json': colorWheel.map( function(c){
        return c.hex();
    })

}

for( var key in fileData ){

    fs.writeFileSync( key, JSON.stringify( fileData[key], null, 4 ), { encoding: 'utf8' } );

}
