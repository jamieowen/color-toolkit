

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

## Other deps.
Color Scheme js
https://github.com/c0bra/color-scheme-js

Seems good for generating palettes from the colour wheel using various colour theory methods ( i.e. analous, split complementary, etc )
Like : http://paletton.com/

Color Difference and Mapping using correct lab space conversion.
https://github.com/markusn/color-diff/

Could use this but probably the above.
https://github.com/dtao/nearest-color



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

PaletteGenerator.


## Explorer
maybe work on a ui to explore these ideas :
https://casesandberg.github.io/react-color/
