/// -------------------------- PRIOR MADE FRAMEWORKS (derived from Unit 1 Project) --------------------------
// Utility class used for storing and handling two dimensional vectors (x and y)
class Vec2d {
    x = 0;
    y = 0;
    /**
     * Creates a two dimensional vector for storing locations and/or values
     * @param {Number} x 
     * @param {Number} y 
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Whether this vector and the vector provided within the arguement have the same values
     * @param {Vec2d} vec2d 
     * @returns Boolean
     */
    equals(vec2d) {
        return vec2d.getX() == this.getX() && vec2d.getY() == this.getY(); 
    }

    /**
     * Adds this vector to the vector provided within the arguements
     * @param {Vec2d} vec2d 
     * @returns The sum of the two vectors
     */
    add(vec2d) {
        return new Vec2d(this.x + vec2d.getX(), this.y + vec2d.getY())
    }

    /**
     * Subtracts this vector to the vector provided within the arguements
     * @param {Vec2d} vec2d 
     * @returns The difference of the two vectors
     */
    subtract(vec2d) {
        return new Vec2d(this.x - vec2d.getX(), this.y - vec2d.getY())
    }

    /**
     * Multiplies this vector to the vector provided within the arguements
     * @param {Number} value 
     * @returns the product of the multiplied vector
     */
    multiply(value) {
        this.x = this.x * value;
        this.y = this.y * value;
        return this;
    }

    /**
     * Divides this vector to the vector provided within the arguements
     * @param {Number} value 
     * @returns the quotient of divided vector
     */
    divide(value) {
        this.x = this.x / value;
        this.y = this.y / value;
        return this;
    }

    /**
     * Returns the x value of this vector
     * @returns
     */
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }

    /**
     * Sets the X value of the vector
     * @param {Number} value 
     */
    setX(value) {
        this.x = value;
    }
    /**
     * Sets the Y value of the vector
     * @param {Number} value 
     */
    setY(value) {
        this.y = value;
    }

    /**
     * Logs the value
     */
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
    containerDiv = "";dicc
    // IDRoot is the text before the actual ID (eg: root-69)
    IDRoot = "";
    ID = getNewID();
    /**
     * 
     * @param {String} imageSource 
     * @param {Vec2d} spawnLocation 
     * @param {String} containerDiv 
     * @param {String} IDRoot 
     */
    constructor(imageSource, spawnLocation, containerDiv, IDRoot) {
        this.imageSource = imageSource;
        this.spawnLocation = spawnLocation;
        this.containerDiv = containerDiv;
        this.IDRoot = IDRoot;
        this.initialize();
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

    /**
     * Toggles whether this image is to be displayed or not
     * @param {boolean} value 
     */
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

// the framework required for ticking elements
// configurable, the speed at which the game ticks
const TICKING_SPEED = 10;
// the setInterval for the ticking elements (so the tickingElements actually tick)
let tickingObjects = [];
let primaryTicker = setInterval(tickElements, TICKING_SPEED);
function tickElements() {
    for(let i = 0; i < tickingObjects.length; i++) {
        // have a try and catch as if one ticking element throws an exception, it will halt all further ticking
        // this effectively freezes all ticking for the game meaning it wont work
        try {
            if(!tickingObjects[i].exemptedTicking) {
                tickingObjects[i].tick();
            }
        } catch (error) {
            // throw a tickFailError which it will be exempted from ticking furthermore if it continues to error
            tickingObjects[i].tickFailError(tickingObjects[i], error);
        }
    }
}
/** TickingElement is a parent class for objects which are to be ticked non-persistently
 *  this means that these objects will not tick when the game is paused
 *  TickingElement acts as a tag of sorts where if a class extends this one, it will automatically have the tick() function called
 */
class TickingElement {
    constructor() {}

    initTickingElement(childClass) {
        tickingObjects.push(childClass);
    }
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
let IDTracker = 0;
// function for getting a unique ID for an object
function getNewID() {
    IDTracker++;
    return IDTracker;
}

// -------------------------- NEW CLASSES --------------------------
class ClothingItem extends TickingElement {
    size = "";
    color = "";
    type = "";
    imageSource = "";
    name = "";
    price = 0;
    IMG = null;
    /**
     * 
     * @param {String} size 
     * @param {String} color 
     * @param {String} type 
     * @param {String} imageSource 
     * @param {String} name 
     * @param {Number} price 
     */
    constructor(size, color, type, imageSource, name, price) {
        super();
        this.size = size;
        this.color = color;
        this.type = type;
        this.imageSource = imageSource;
        this.name = name;
        this.price = Number(price);
        this.initialize();
        this.initTickingElement(this);
    }

    initialize() {
        console.log("Successfully created a new clothing item instance")
        let sizeIndex = 0;
        switch(this.size) {
            case "unset":
                sizeIndex = 0;
                break;
            case "extra-small":
                sizeIndex = 1;
                break;
            case "small":
                sizeIndex = 2;
                break;
            case "medium":
                sizeIndex = 3;
                break;
            case "large":
                sizeIndex = 4;
                break;
            case "extra-large":
                sizeIndex = 5;
                break;
        }
        this.IMG = new ImageHTMLElement(this.imageSource, new Vec2d(0, 0), CLOTHING_CONTAINER, "clothing");

        console.log(sizeIndex);
        this.IMG.setSpriteSize(SIZE_ARRAY[sizeIndex]);
    }

    tick() {
        this.moveClothing();
    }

    moveClothing() {
        // get the location of this sprite
        let clothingLocation = this.IMG.getSpriteLocation();
        // get the difference of the target location and the ingredient's current location
        let locationDifference = new Vec2d(window.outerWidth/2 + 300*this.getIndexDifference(), window.outerHeight/2).subtract(clothingLocation);
        // divide the difference of locations and turn it into a small enough value so it can be used to move the image around smoothly
        locationDifference.divide(CLOTHES_MOVEMENT_SPEED);

        // rotate the sprite dynamically so it looks nice
        this.IMG.rotateSprite(locationDifference.getX());

        // actually move the sprite after all of these translations
        this.IMG.moveSprite(clothingLocation.add(locationDifference));
    }

    getIndexDifference() {
        // this for loop iterates through the closet array, looking for the index in which this clothing item is in
        for(let i = 0; i < closetArray.length; i++) {
            if(closetArray[i] == this) {
                // if a matching object is found within the closetArray, return the INDEX of the object
                return i - closetIndex;
            }
        }
    }
}
// -------------------------- CONSTANTS --------------------------

const SIZE = document.getElementById("size");
const COLOUR = document.getElementById("colour");
const NAME = document.getElementById("name");
const IMAGE_LINK = document.getElementById("image-link");
const TYPE = document.getElementById("type");
const PRICE = document.getElementById("price");
const CLOTHING_CONTAINER = "clothing-container";
const CLOTHES_MOVEMENT_SPEED = 20;

// -------------------------- VARIABLES --------------------------
const SIZE_ARRAY = [
    new Vec2d(100, 100),
    new Vec2d(150, 150),
    new Vec2d(200, 200),
    new Vec2d(250, 250),
    new Vec2d(300, 300),
    new Vec2d(350, 350),
    new Vec2d(400, 400)
];
let closetIndex = 0;
let closetArray = new Array(15);
closetArray[0] = new ClothingItem("small", "blue", "top", "black_t_shirt", "Black T-Shirt", 10);
closetArray[1] = new ClothingItem("extra-large", "blue", "top", "black_t_shirt", "Black T-Shirt", 10);
closetArray[2] = new ClothingItem("large", "blue", "top", "black_t_shirt", "Black T-Shirt", 10);
closetArray[5] = new ClothingItem("small", "blue", "top", "black_t_shirt", "Black T-Shirt", 10);

// -------------------------- FUNCTIONS --------------------------

function moveArray(amount) {
    // move the array index
    closetIndex += amount;

    // these if statements make sure the current location is within the array
    // if a position outside of the array is tried to be accessed, it will most likely throw errors
    if(closetIndex < 0) {
        // set the position of the array to the top so it loops
        closetIndex = 0;
    } // check if the position of the array is outside of array's bounds again
    else if(closetIndex > closetArray.length-1) {
        // set the position of the array to the bottom so it loops
        closetIndex = closetArray.length-1;
    }
}

// function which is called when the add clothing item button is pressed
function createClothingItem() {
    if(SIZE.value !== "unset" && COLOUR.value !== "" && NAME.value !== "" && IMAGE_LINK.value !== "" && TYPE.value !== "unset") {
        addClothingItem(new ClothingItem(SIZE.value, COLOUR.value, TYPE.value, IMAGE_LINK.value, NAME.value, PRICE.value));
    }
    SIZE.value = "";
    COLOUR.value = "";
    NAME.value = "";
    IMAGE_LINK.value = "";
    TYPE.value = "";
    PRICE.value = "";
}

function addClothingItem(clothingItem) {
    for(let i = 0; i < closetArray.length; i++) {
        if(closetArray[i] == null) {
            closetArray[i] = clothingItem;
        }
    }
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