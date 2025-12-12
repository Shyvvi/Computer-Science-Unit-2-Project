/// -------------------------- PRIOR MADE FRAMEWORKS (derived from Unit 1 Project) --------------------------
// Utility class used for storing and handling two dimensional vectors (x and y)
class Vec2d {
    // x and y values
    x = 0;
    y = 0;
    // super constructor for taking in values upon object creation
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    // function which returns whether this vector and the vector provided within the arguement have the same values
    equals(vec2d) {
        return vec2d.getX() == this.getX() && vec2d.getY() == this.getY(); 
    }

    // function which returns and adds this vector to the vector provided within the arguements
    add(vec2d) {
        return new Vec2d(this.x + vec2d.getX(), this.y + vec2d.getY())
    }

    // function which returns and subtracts this vector to the vector provided within the arguements
    subtract(vec2d) {
        return new Vec2d(this.x - vec2d.getX(), this.y - vec2d.getY())
    }

    // function which multiplies this vector to the vector provided within the arguements
    multiply(value) {
        this.x = this.x * value;
        this.y = this.y * value;
        return this;
    }

    // function which divides this vector to the vector provided within the arguements
    divide(value) {
        this.x = this.x / value;
        this.y = this.y / value;
        return this;
    }

    // functions which return the x and y values of this 2d vector
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }

    // functions which set the x and y values of this 2d vector
    setX(value) {
        this.x = value;
    }
    setY(value) {
        this.y = value;
    }

    // debugging function for logging the values of this vector inside of console
    logValues() {
        console.log(this + " = " + this.x + " " + this.y);
    }
}

// ImageHTMLElement allows for the dynamic creation of new images on a webpage which can be moved and animated very easily
class ImageHTMLElement {
    // imageSource is where the actual .png is located within the local files
    imageSource = "";
    // the location of where the image is created initially
    spawnLocation;
    // the HTML div where this image will be stored and moved
    containerDiv = "";
    // IDRoot is the text before the actual ID (eg: root-69)
    IDRoot = "";
    ID = getNewID();
    // super constructor for setting variables upon object creation
    constructor(imageSource, spawnLocation, containerDiv, IDRoot) {
        this.imageSource = imageSource;
        this.spawnLocation = spawnLocation;
        this.containerDiv = containerDiv;
        this.IDRoot = IDRoot;
    }

    // initialization function which is called by the createObject() function
    // controls everything which only needs to be ran once
    initialize() {
        // create the HTML img and store it inside of a constant blah blah blah
        const IMG_ELEMENT = document.createElement("img");
        // set the necessary CSS values
        IMG_ELEMENT.style.position = "absolute";
        IMG_ELEMENT.draggable = false;
        // again, set the ID of the HTML element so it can be referred to in the future by this object
        IMG_ELEMENT.id = this.getID();

        // push the image to the div in the actual HTML
        document.getElementById(this.containerDiv).appendChild(IMG_ELEMENT);
        
        // set the actual image to the source provided within the super constructor
        this.setSprite(this.imageSource);
        // move the image to the spawn location provided within the super constructor
        this.moveSprite(this.spawnLocation);
    }

    // function for toggling whether this image is to be displayed or not
    setDisplayed(value) {
        // set the CSS display to visible or not based on the boolean provided within the arguements
        if(value) {
            this.getSprite().style.display = "block";
        } else {
            this.getSprite().style.display = "none";
        }
    }

    // get the ID of this ImageHTMLElement (used for HTML access and more)
    getID() {
        return this.IDRoot+"-"+this.ID;
    }

    // function for setting the actual image to be displayed
    // image sources must be a .png and must be within the local assets folder
    setSprite(source) {
        this.getSprite().src = "assets/"+source+".png";
    }
    // function for getting the HTML element which this object is linked to
    getSprite() {
        return document.getElementById(this.getID());
    }

    // function for changing the location of this sprite
    moveSprite(vec2d) {
        let spriteSize = this.getSpriteSize();
        // this is so the location of the sprite is centered and not on the corner
        // if this code was not in place, moving around the sprite would have it's position anchored to the top left corner
        // this code places the anchor within the center of the image
        this.getSprite().style.left = vec2d.getX() - (spriteSize.getX() / 2) + "px";
        this.getSprite().style.top = vec2d.getY() - (spriteSize.getY() / 2) + "px";
    }
    // get the location of the sprite
    getSpriteLocation() {
        let spriteSize = this.getSpriteSize();
        return new Vec2d(
            // also offset so the location of the sprite is anchored to it's center rather than the top left corner
            parseInt(String(this.getSprite().style.left).replace("px", "")) + (spriteSize.getX() / 2), 
            parseInt(String(this.getSprite().style.top).replace("px", "")) + (spriteSize.getY() / 2)
        );
    }

    // function for setting the size of the sprite
    setSpriteSize(size) {
        this.getSprite().width = size.getX();
        this.getSprite().height = size.getY();
    }
    // function for getting the size of the sprite
    getSpriteSize() {
        return new Vec2d(
            this.getSprite().width, 
            this.getSprite().height
        );
    }

    // check for whether two imageHTMLElements are overlapping
    // bounding modifier changes the size of the other imageHTMLElement, making its detection size larger or smaller
    isOverlappingImage(imageHTMLElement, boundingModifier) {
        // get the rectangles of this sprite and the sprite provided within the arguements
        const thisRect = this.getSprite().getBoundingClientRect();
        const otherRect = imageHTMLElement.getSprite().getBoundingClientRect();

        // this part I got from stackoverflow :)
        const xOverlap = Math.max(0, Math.min(thisRect.right-boundingModifier.getX(), otherRect.right) - Math.max(thisRect.left+boundingModifier.getX(), otherRect.left));
        const yOverlap = Math.max(0, Math.min(thisRect.bottom-boundingModifier.getY(), otherRect.bottom) - Math.max(thisRect.top+boundingModifier.getY(), otherRect.top));

        // return for whether the x and y differences are more than zero (which means they're overlapping)
        return xOverlap > 0 && yOverlap > 0;
    }

    // function for rotating the sprite a set amount of degrees
    rotateSprite(degrees) {
        this.getSprite().style.transform = "rotate("+degrees+"deg)";
    }

    // function for setting the opacity of the sprite
    setSpriteOpacity(opacity) {
        this.getSprite().style.opacity = opacity / 100+"";
    }
}

/** TickingElement is a parent class for objects which are to be ticked non-persistently
 *  this means that these objects will not tick when the game is paused
 *  TickingElement acts as a tag of sorts where if a class extends this one, it will automatically have the tick() function called
 */
class TickingElement {
    // !! all of the code below is essentially a failsafe to make sure the program keeps running even when there are errors !!

    // constant for the maximum amount of failed ticks a TickingElement can have
    TICK_FAIL_THRESHOLD = 10;
    // variable for storing the amount of failed ticks a TickingElement has
    tickFailAmount = 0;
    // boolean to determine whether a TickingElement is exempted from ticking or not
    exemptedTicking = false;

    // function which is called whenever an object fails to tick
    tickFailError(object, error) {
        // increment the amount of failed ticks
        this.tickFailAmount++;
        // log the error to console
        console.error(object + " has failed to tick correctly "+this.tickFailAmount+" times! \n("+error+")");
        // if the amount of failed ticks surpasses the threshold constant, exempt it from ticking furthermore as it is broken
        if(this.tickFailAmount > this.TICK_FAIL_THRESHOLD) {
            object.exemptTicking(object);
        }
    }

    // function which logs this TickingElement's exemption from ticking furthermore 
    exemptTicking(object) {
        // make sure to actually exempt this object from ticking
        this.exemptedTicking = true;
        console.error(object + " surpassed the tick fail threshold and will be exempted from ticking!");
    }
}

// -------------------------- NEW CLASSES --------------------------
class ClothingItem {
    size = "";
    color = "";
    type = "";
    imageSource = "";
    name = "";
    price = 0;
    
    constructor(size, color, type, imageSource, name, price) {
        this.size = size;
        this.color = color;
        this.type = type;
        this.imageSource = imageSource;
        this.name = name;
        this.price = Number(price);
    }
}
// -------------------------- CONSTANTS --------------------------

const SIZE = document.getElementById("size");
const COLOUR = document.getElementById("colour");
const NAME = document.getElementById("name");
const IMAGE_LINK = document.getElementById("image-link");
const CLOTHING_TYPE = document.getElementById("clothing-type");
const PRICE = document.getElementById("price");

// -------------------------- VARIABLES --------------------------

let closetIndex = 0;
let closetArray = new Array(15);

// -------------------------- FUNCTIONS --------------------------

// function which is called when the add clothing item button is pressed
function createClothingItem() {
    SIZE.value = "";
    COLOUR.value = "";
    NAME.value = "";
    IMAGE_LINK.value = "";

}

function addClothingItem(clothingItem) {
    closetIndex++;
    closetArray[closetIndex] = clothingItem;
}
function setClothingItem(index, clothingItem) {
    closetArray[index] = clothingItem;
} 
function clearClothingItem(index) {
    closetArray[index] = null;
}

// return a random integer for some more variety in gameplay
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}