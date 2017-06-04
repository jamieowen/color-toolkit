

# Rough notes.

### palettes

Imported json prepared sets of colours - with names if possible.
These are larger collections of colours/shades/tints/etc to map other palettes to.

The other type of palette would be known sets of colours that work ( i.e. like those on colour lovers )
Question is how to we want to

e.g.
pantone list of colours
material ui list of colours - https://www.npmjs.com/package/google-material-color-palette-json
color wheel colours ( so 12 colours or whatever )
color lovers - https://github.com/Jam3/nice-color-palettes
data viz colours...

## Potential Deps.
Color Scheme js  << Probs use this for ColorScheme generation >>
https://github.com/c0bra/color-scheme-js  
Seems good for generating palettes from the colour wheel using various colour theory methods ( i.e. analous, split complementary, etc )
Like : http://paletton.com

But this one has a Color class model with adjustment props and palette generation.
Don't like the api method names as much the one below.
https://github.com/brehaut/color-js

<< and probably generate color theory palettes myself - theory is easy to implement >>
This has a nice Color class with good api.  << Probs use this for Color model >>
https://github.com/qix-/color

Color Difference and Mapping using correct lab space conversion.
https://github.com/markusn/color-diff/

Could use this but probably the above.
https://github.com/dtao/nearest-color

This color space looks interesting.
http://www.hsluv.org/




# Usage ideas

1. Mapping a set of colours ( with names ) to a larger range in another palette.
i.e : get me all reds of the pantone library.
or: generate a colour palette from an image - then get me all purples.
So - we could take the colour wheel palette then using the color-diff mapping function map pantone to the colour wheel,
which would give us the the pantone colours accessible via 'all reds', 'all blues', etc.
This could be extended by generating another colour wheel palette with a range of full-red, mid-red, dark-red, etc.
This would further sort the pantone colours.

2. Given the above, we want to generate a colour theory style set of colours

3. General lighter / darker permutations.
So take a small set of colours and generate a number of permutations with either luma, brightness, chroma, saturation, chroma or whatever.


3. Specular colours / emissive colour permutations.
Look into this more so :
http://polycount.com/discussion/50725/color-and-specular-maps

4. Three.js - What about just testing converting a vertex colour to lab, allow lighting calculations to be carried out,
then back to rgb.

Composer
Ways to determine foreground/background predominate colours in palettes and categorise.
Eg. in video on BlendGurus talks about how with the complementary color palettes one
predominiant colour should be used more frequently.  Usually the more weaker color of the palette.
https://www.youtube.com/watch?v=Qj1FK8n7WgY



Ideas with playing with schemes applied to lighting material properties ( emissive, specular, etc ) as well as the colors on the lights themselves. Also what abouy playing with object colors based on distance to camera..

https://www.youtube.com/watch?v=GOp02tHtCv4&t=183s
3 mins in - white light and green light mixing in shadows to create the complementary.

Tetric scheme( double complementary ) -- foreground / background pairs.

We could categories things with various combinations of luma/chroma/saturation for example.

RYB Traditinoal Colour Wheel
http://www.daveeddy.com/2014/07/01/red-yellow-and-blue/
https://github.com/bahamas10/ryb

May be exploring color theory rules on different color spaces.
And also, looking at applying color theory on the GPU and playing around with
Materials or Lights that interact using complementary colors or something.
I think rotating and shifting the relationship between mixing two complementary colors based on lights in a scene would look pretty cool.



## Explorer
maybe work on a ui to explore these ideas :
https://casesandberg.github.io/react-color/
