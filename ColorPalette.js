
import ColorDiff from 'color-diff';

export default class ColorPalette{

    static create( colors ){

        let palette = new ColorPalette();
        return palette;

    }

    static map( colors1, colors2 ){

        if( colors1[0] instanceof Array && colors2[1] instanceof Array ){

        }else{
            throw new Error( 'Supply the rgb array versions of colors for mapping.' );
        }

    }

    constructor( colorArray ){

        console.log( 'COLOR' );

        this.name = '';
        //for( let i)

    }

    map( palette ){

        
    }

}
