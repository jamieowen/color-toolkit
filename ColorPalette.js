import Color from 'Color';
import ColorDiff from 'color-diff';

export default class ColorPalette{

    constructor( name, colorValues=[], colorNames=[] ){

        this.name = name || '';

        this.colors = colorValues.map( ( value,i )=>{

            return new Color( value );

        });

        // This would be added to the Color object but i can't mutate or extend it.
        // Fucking immutable programmers.
        this.colorNames = colorNames;

    }

    clone(){

    }

    add( value,name ){

        if( value instanceof Color ){
            this.colors.push( value );
        }else{
            this.colors.push( new Color(value) );
        }

        if( name ){
            this.colorNames.push( name );
        }

    }

    /**
     * Get the average color of the palette.
     */
    averageColor(){

        if( !this._averageColor ){

            let average = {
                r: 0,
                g: 0,
                b: 0
            }

            let c;
            for( let i = 0; i<this.colors.length; i++ ){

                c = this.colors[i];
                average.r += c.color[0];
                average.g += c.color[1];
                average.b += c.color[2];

            }

            average.r /= this.colors.length;
            average.g /= this.colors.length;
            average.b /= this.colors.length;

            this._averageColor = new Color( average );

        }

        return this._averageColor;

    }

    /**
     * filter opts.
     *
     * filter = {
     *   channel: 'luma', 'saturation', 'value',
     *   operator: 'gte' | 'lte',
     *   threshold: 0.2 // all values from 0 - 1
     * }
     *
     */
    filter( filters=[] ){

        if( filters.length === 0 ){
            return this;
        }

        let operators = {

            'gte': ( v1, v2 )=>{
                return v1 >= v2;
            },
            'lte': ( v1, v2 )=>{
                return v1 <= v2;
            }

        };
        let channels = {
            // Use HSV for all
            'saturation':( c )=>{
                return c.saturationv() / 100;
            },
            'value': ( c )=>{
                return c.value() / 100;
            },
            'luma': ( c )=>{
                return c.luminosity();
            }

        }

        let c,include;
        let colors = [];
        let colorNames = [];

        let op,channelValue,filter;

        for( let i = 0; i<this.colors.length; i++ ){

            include = 0;
            c = this.colors[i];

            for( let j = 0; j<filters.length; j++ ){

                filter = filters[j];
                channelValue = channels[ filter.channel ]( c );
                op = operators[ filter.operator ];

                if( op( channelValue, filter.threshold ) ){
                    include++;
                }

            }

            if( include === filters.length ){

                colors.push( new Color(c) );
                colorNames.push( this.colorNames[i] );

            }

        }

        return new ColorPalette( this.name + '-filtered', colors, colorNames );

    }

    /**
     * Create a new palette that maps one palette to another.
     */
    map( targetPalette ){

        let then = performance.now();

        // The result of ColorDiff.map_palette has the source color
        // as the key and the target as a new RGB object.
        /**
        {
            R255B10G90: {
                R: 255,
                G: 0,
                B: 0
            }
        }
         */
        // due to the result of the ColorDiff algo
        // create some lookup up maps to map back to original color objects.
        // for naming purposes.

        let sourceColorMap = {};
        let targetColorMap = {};

        let source = this.colors.map( ( color,i )=>{

            let rgb = color.color;
            let res = {
                R: rgb[0],
                G: rgb[1],
                B: rgb[2]
            }
            sourceColorMap[ `R${rgb[0]}B${rgb[2]}G${rgb[1]}` ] = color;

            return res;

        });

        let newPalettes = [];

        let target = targetPalette.colors.map( ( color,i )=>{

            let rgb = color.color;
            let res = {
                R: rgb[0],
                G: rgb[1],
                B: rgb[2]
            }

            // We are mapping to this target palette
            // so we expect a new ColorPalette for each color in the target,
            // in which source colors are added to. ( basically categorised )
            let paletteName = targetPalette.colorNames ? targetPalette.colorNames[i] : 'p1-' + i;
            let palette = new ColorPalette( paletteName );
            newPalettes.push( palette );
            targetColorMap[ `R${rgb[0]}B${rgb[2]}G${rgb[1]}` ] = { palette,color,i } ;
            return res;

        });

        let mapped = ColorDiff.map_palette( source,target );

        // format will be an object with colors found in 'from' to an object RGB existing in 'to'
        // but its not the same supplied object.
        let targetKey,res,colorName;
        let sourceColor,targetItem;


        for( let key in mapped ){

            res = mapped[key];
            targetKey = `R${res.R}B${res.B}G${res.G}`;

            sourceColor = sourceColorMap[ key ];
            targetItem = targetColorMap[ targetKey ];

            // color names are probably not needed??
            colorName = this.colorNames[ targetItem.i ];
            colorName = targetItem.palette.name + '_' + colorName;
            targetItem.palette.add( new Color( sourceColor.rgb().array() ), colorName );
            //targetItem.palette

            //console.log( 'COLOR :', key, targetKey, sourceColor, targetColor );

        }

        let time = ( performance.now() - then ) / 1000;
        //console.log( time );

        return newPalettes;

    }

}
