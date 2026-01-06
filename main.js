/// -------------------------- PRIOR MADE FRAMEWORKS (derived from Unit 1 Project) --------------------------
/**Utility class used for storing and handling two dimensional vectors (x and y)
 * Alternatively used for simply storing two values occasionally
 */
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
    /**
     * Returns the y value of this vect or
     * @returns 
     */
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

    /**
     * get the ID of this ImageHTMLElement (used for HTML access and more)
     * @returns ID of the ImageHTMLElement
     */
    getID() {
        return this.IDRoot+"-"+this.ID;
    }

    /**
     * Sets the image to be displayed for this object
     * @param {String} source 
     */
    setSprite(source) {
        this.getSprite().src = source;
    }
    /**
     * Gets the HTML image linked to this object
     * @returns HTML image
     */
    getSprite() {
        return document.getElementById(this.getID());
    }

    /**
     * Sets the location of the sprite
     * @param {Vec2d} vec2d
     */
    moveSprite(vec2d) {
        let spriteSize = this.getSpriteSize();
        // this is so the location of the sprite is centered and not on the corner
        // if this code was not in place, moving around the sprite would have it's position anchored to the top left corner
        // this code places the anchor within the center of the image
        this.getSprite().style.left = vec2d.getX() - (spriteSize.getX() / 2) + "px";
        this.getSprite().style.top = vec2d.getY() - (spriteSize.getY() / 2) + "px";
    }
    /**
     * Gets the location of the sprite
     * @returns Location in Vec2d
     */
    getSpriteLocation() {
        let spriteSize = this.getSpriteSize();
        return new Vec2d(
            // also offset so the location of the sprite is anchored to it's center rather than the top left corner
            parseInt(String(this.getSprite().style.left).replace("px", "")) + (spriteSize.getX() / 2), 
            parseInt(String(this.getSprite().style.top).replace("px", "")) + (spriteSize.getY() / 2)
        );
    }

    /**
     * Sets the size of the sprite
     * @param {Number} size 
     */
    setSpriteSize(size) {
        this.getSprite().width = size.getX();
        this.getSprite().height = size.getY();
    }
    /**
     * Gets the size of the sprite
     * @returns Size in Vec2d
     */
    getSpriteSize() {
        return new Vec2d(
            this.getSprite().width, 
            this.getSprite().height
        );
    }

    /**
     * Whether two imageHTMLElements are overlapping
     * @param {ImageHTMLElement} imageHTMLElement 
     * @param {Number} boundingModifier changes the size of the other imageHTMLElement, making its detection size larger or smaller
     * @returns Whether this imageHTMLElement and the one provided in the arguements are overlapping in a boolean
     */
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

    /**
     * Rotates the sprite
     * @param {Number} degrees 
     */
    rotateSprite(degrees) {
        this.getSprite().style.transform = "rotate("+degrees+"deg)";
    }

    /**
     * Sets the opacity of the sprite
     * @param {Number} opacity 
     */
    setSpriteOpacity(opacity) {
        this.getSprite().style.opacity = opacity / 100+"";
    }

    /**
     * Gets the opacity of the sprite
     * @returns Opacity of sprite
     */
    getSpriteOpacity() {
        return this.getSprite().style.opacity * 100;
    }
}

// !!! The reason why there are functions mixed in with the classes are because they are a part of this "core" I've made to be used across multiple projects
// This means I can copy and paste between projects with minimal errors

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
        if(tickingObjects[i] == null) {
            tickingObjects.pop(tickingObjects[i]);
        }
        try {
            if(!tickingObjects[i].exemptedTicking) {
                tickingObjects[i].tick();
            }
        } catch (error) {
            // throw a tickFailError which it will be exempted from ticking furthermore if it continues to error
            tickingObjects[i].tickFailError(tickingObjects[i], error);
        }
    }
    // a tick default function is required for a program which ticks !
    tick();
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

    /**
     * Function which is called whenever a TickingElement throws an exception while attempting to tick
     * @param {Object} object Object which extends TickingElement
     * @param {String} error Error message
     */
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

    /**
     * Logs the objects exemption from ticking furthermore
     * @param {*} object 
     */
    exemptTicking(object) {
        // make sure to actually exempt this object from ticking
        this.exemptedTicking = true;
        console.error(object + " surpassed the tick fail threshold and will be exempted from ticking!");
    }

    /**
     * Function to be called externally to exempt an object from ticking manually
     */
    stopTicking() {
        // exempt the object from ticking
        this.exemptedTicking = true;
    }
}
let IDTracker = 0;
// function for getting a unique ID for an object
function getNewID() {
    IDTracker++;
    return IDTracker;
}

// -------------------------- NEW CLASSES --------------------------

// Class which handles all of the data and visuals for each instance of a clothing item
class ClothingItem extends TickingElement {
    /**
     * isHidden simply controls whether the ClothingItem is to be on screen or not
     * Primarily used in the sorting functionality
     */
    isHidden = false;
    size = "";
    color = "";
    type = "";
    imageSource = "";
    name = "";
    price = 0;
    IMG = null;
    /**
     * All of the different values required for creating a new ClothingItem
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

    /**
     * Handles the location, opacity and rotation of the ClothingItem on screen
     */
    moveClothing() {
        // get the location of this sprite
        let clothingLocation = this.IMG.getSpriteLocation();
        // get the difference of the target location and the ingredient's current location
        let locationDifference = new Vec2d(window.outerWidth/2 + 300*this.getIndexDifference() + clothingOffset.getX(), window.outerHeight/2 - clothingOffset.getY()).subtract(clothingLocation);
        if(this.isHidden) {
            locationDifference.setY(-1000);
        }
        // divide the difference of locations and turn it into a small enough value so it can be used to move the image around smoothly
        locationDifference.divide(CLOTHES_MOVEMENT_SPEED);

        // rotate the sprite dynamically so it looks nice
        this.IMG.rotateSprite(locationDifference.getX());


        let opacityGoal = 100 - (Math.abs(this.getIndexDifference())*opacityScale);
        let currentOpacity = this.IMG.getSpriteOpacity();
        let opacityDifference = (opacityGoal - currentOpacity)/OPACITY_CHANGE_SPEED;
        this.IMG.setSpriteOpacity(currentOpacity + opacityDifference);

        // actually move the sprite after all of these translations
        this.IMG.moveSprite(clothingLocation.add(locationDifference));
    }

    /**
     * Returns the current index of the array and the location of this ClothingItem in the array
     * @returns location in array - current index of array 
     */
    getIndexDifference() {
        // this for loop iterates through the closet array, looking for the index in which this clothing item is in
        for(let i = 0; i < closetArray.length; i++) {
            if(closetArray[i] == this) {
                // if a matching object is found within the closetArray, return the INDEX of the object
                return i - closetIndex;
            }
        }
    }
    
    /**
     * function which is called to remove an instance of the ClothingItem object
     * @param {boolean} clearArray whether the object will be removed and will remove the current object index of the array
     */
    remove(clearArray) {
        // remove the HTML image element
        this.IMG.getSprite().remove();
        // stop the ticking to prevent unnecessary exceptions
        this.stopTicking();
        if(clearArray) {
            // remove this object from the current array
            closetArray[closetIndex] = null;
        }
    }
}

// -------------------------- CONSTANTS --------------------------

// Store all of the HTML elements in constants for ease of access
const SIZE = document.getElementById("size");
const COLOUR = document.getElementById("colour");
const NAME = document.getElementById("name");
const IMAGE_LINK = document.getElementById("image-link");
const TYPE = document.getElementById("type");
const PRICE = document.getElementById("price");
const CLOSET_INFO = document.getElementById("closet-info");
const SORT_TYPE = document.getElementById("sort-type");
const SORT_SIZE = document.getElementById("sort-size");
const SEARCH = document.getElementById("search");
const PRICE_SORT_MIN = document.getElementById("price-sort-min");
const PRICE_SORT_MAX = document.getElementById("price-sort-max");
const CLOSET_ID = document.getElementById("closet-id");
const CLOTHING_INFO_DISPLAY = document.getElementById("clothing-info");
// The ID of the container where all of the ImageHTMLElements are going to be stored in
const CLOTHING_CONTAINER = "clothing-container";
// How fast the clothes will transition with both their movement and opacity
const CLOTHES_MOVEMENT_SPEED = 20;
const OPACITY_CHANGE_SPEED = 10;

// All of the different sizes that a piece of clothing can have
const SIZE_ARRAY = [
    new Vec2d(100, 100), // extra-small
    new Vec2d(150, 150),
    new Vec2d(200, 200),
    new Vec2d(250, 250),
    new Vec2d(300, 300),
    new Vec2d(350, 350),
    new Vec2d(400, 400) // extra-large
];

// -------------------------- VARIABLES --------------------------

// Whether the user is currently viewing the contents of the closet (side display text)
let closetInfoViewing = false;
// The current Index of the array which is being viewed
let closetIndex = 0;
// The array which stores your closet
let closetArray = new Array(15);
// The offset of the clothing 
let clothingOffset = new Vec2d(0, 20);
// How transparent a ClothingItem will appear based off their index difference
let opacityScale = 25;

// Values for the default, initial partially filled closet array
closetArray[0] = new ClothingItem("small", "black", "t-shirt", "assets/black_t_shirt.png", "Black T-Shirt", 5);
closetArray[3] = new ClothingItem("large", "black", "t-shirt", "assets/black_t_shirt.png", "Black T-Shirt", 30);//
closetArray[5] = new ClothingItem("large", "black", "hat", "https://armadamerch.com/cdn/shop/files/Screenshot2025-09-25at10.18.46.png?v=1766763715&width=800", "Loathe As One Hat", 30);
closetArray[6] = new ClothingItem("medium", "gray", "t-shirt", "https://armadamerch.com/cdn/shop/files/sunteef.png?v=1766782102&width=800", "Loathe As One Sun Tee", 40);
closetArray[7] = new ClothingItem("large", "gray", "shirt", "https://armadamerch.com/cdn/shop/files/loatheasonehoodief.png?v=1748539953&width=800", "Loathe As One Hoodie", 45);
closetArray[9] = new ClothingItem("small", "white", "t-shirt", "assets/white_t_shirt.png", "White T-Shirt", 40);
closetArray[14] = new ClothingItem("extra-large", "black", "t-shirt", "assets/black_t_shirt.png", "Black T-Shirt", 10);
closetArray[15] = new ClothingItem("extra-small", "cat", "accessory", "https://media.tenor.com/gEPF7fBZy3IAAAAe/shitpost-cat.png", "Weirdass Cat", 100);

// -------------------------- FUNCTIONS --------------------------

/**
 *  Primary ticking function called by the tickingObject framework
 */
function tick() {
    // show the clothing info of the currently viewed clothing item
    showClothingInfo(closetArray[closetIndex]);
    // tick all of the filters
    tickFilters();
    // if closet info is being viewed, display the text
    if(closetInfoViewing) {
        displayClosetText();
    } else {
        // elsewise simply hide the text
        CLOSET_INFO.innerText = "";
    }
}

/**
 * Attempts to save the closet with the ID provided in the text box
 */
function saveCloset() {
    // Make sure the ClosetID provided is valid
    if(getClosetID() != null) {
        // for loop through the localStorage to make sure there are no keys with the same name
        let duplicateID = false;
        for(let i = 0; i < localStorage.length; i++) {
            if(localStorage.key(i) == getClosetID()) {
                // if there is a key already with this ID, set the boolean and break; the loop to prevent unnecessary iterating
                duplicateID = true;
                break;
            }
        }
        // alert the user of a duplicate ID
        if(duplicateID) {
            alert("There is already a closet with ID "+getClosetID()+".");
        } else {
            // elsewise add the item with the new ID
            localStorage.setItem(getClosetID(), JSON.stringify(closetArray));
            alert("Saved closet with ID "+getClosetID()+".");
        }
    }
}

/**
 * Attempts to load the closet with the ID provided in the text box
 */
function loadCloset() {
    // Make sure the ClosetID provided is valids
    if(getClosetID() != null) {      
        // Attempt to get the storedArray from localStorage and parse it from String back into Array
        let storedArray = JSON.parse(localStorage.getItem(getClosetID()));
        // if the storedArray was not found notify the user
        if(storedArray == null) {
            alert("Local closet with ID "+getClosetID()+" not found.");
        } else {
            // elsewise load the array by first clearing the closet
            clearCloset();
            // iterate through the storedArray and add it to the closetArray
            for(let i = 0; i < storedArray.length; i++) {
                let storedObject = storedArray[i];
                // if an object is found in the array
                if(storedObject != null) {
                    // create a brand new instance of a ClothingItem which will be added into the ClothingArray automatically
                    setClothingItem(new ClothingItem(storedObject.size, storedObject.color, storedObject.type, storedObject.imageSource, storedObject.name, storedObject.price), i);
                }
            }
            // notify the user that their closet has been loaded
            alert("Loaded closet with ID "+getClosetID()+".");
        }
    }
}

/**
 * Deletes the closet with the ID provided in the text box
 */
function deleteCloset() {
    // Make sure the ClosetID provided is valid
    if(getClosetID() != null) {
        // simply remove the closet and notify the user
        localStorage.removeItem(getClosetID());
        alert("Removed closet with ID "+getClosetID()+".");
    }
}

/**
 * Lists all of the closets found in localStorage via an alert
 */
function listClosets() {
    // create a string to be concatenated in the for loop below
    let alertString = "Closet IDs:\n";
    // concatenate the string relative to the amount of localStorage instances found
    for(let i = 0; i < localStorage.length; i++) {
        alertString += "- Closet: "+localStorage.key(i)+"\n";
    }
    // notify user
    alert(alertString);
}

/**
 * Returns whether the ClosetID provided in the text box is valid or not
 * @returns null if the closetID provided is invalid, the ClosetID if the ID is valid
 */
function getClosetID() {
    if(CLOSET_ID.value.length < 5) {
        alert("Closet ID must have a length more than 5.");
        return null;
    } else {
        return CLOSET_ID.value;
    }
}

/**
 * Clears the current closet, mostly used in loading new closets
 */
function clearCloset() {
    // iterate through the array and kill everythingskdhbjshbg
    for(let i = 0; i < closetArray.length; i++) {
        if(closetArray[i] != null) {
            closetArray[i].remove(false);
            closetArray[i] = null;
        }
    }
}

/**
 * Moves through the closetArray, changing the closetIndex
 * @param {Number} amount 
 */
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
    // Make sure that all of the values provided in the text box are valid
    if(SIZE.value !== "unset" && COLOUR.value !== "" && NAME.value !== "" && IMAGE_LINK.value !== "" && TYPE.value !== "unset" && !isNaN(PRICE.value)) {
        // create a new ClothingItem
        addClothingItem(new ClothingItem(SIZE.value, COLOUR.value, TYPE.value, IMAGE_LINK.value, NAME.value, PRICE.value));
        // clear all of the text boxes
        SIZE.value = "unset";
        COLOUR.value = "";
        NAME.value = "";
        IMAGE_LINK.value = "";
        TYPE.value = "unset";
        PRICE.value = "";
    } else {
        // if not valid, notify the user
        alert("Please fill in the fields correctly before creating a new item.");
    }
}

/**
 * Sets the clothingItem in the clothingArray at the index provided in arguements
 * @param {ClothingItem} clothingItem 
 * @param {Number} index 
 */
function setClothingItem(clothingItem, index) {
    // Set the clothingItem in the clothingArray at the index provided in arguements
    closetArray[index] = clothingItem;
}

/**
 * Attempts to add a clothingItem into the clothingArray
 * @param {ClothingItem} clothingItem 
 */
function addClothingItem(clothingItem) {
    // whether the clothingItem has been successfully added to the clothingArray or not
    let itemHasBeenSet = false;
    // iterate through the array attempting to find a free slot
    for(let i = 0; i < closetArray.length; i++) {
        if(closetArray[i] == null) {
            setClothingItem(clothingItem, i);
            itemHasBeenSet = true;
            break;
        }
    }
    // if the item has not been set successfully, notify the user and remove the new clothingItem instance to prevent issues
    if(!itemHasBeenSet) {
        alert("The closet is full.");
        alert("Please clear some space before adding new clothing to the closet");
        clothingItem.remove(false);
    }
} 

/**
 * Removes the clothing item at the current clothingIndex
 */
function removeClothingItem() {
    // if there is an object at the current index
    if(closetArray[closetIndex] != null) {
        //remove it
        closetArray[closetIndex].remove(true);
    } else {
        alert("This item is already empty!");
    }
}

/**
 * Ticks all of the different filters in the Filters: field
 */
function tickFilters() {
    // make sure the price sorting range provided is valid
    let priceSortRange = new Vec2d(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
    if(!isNaN(Number(PRICE_SORT_MIN.value)) && PRICE_SORT_MIN.value != "") {
        priceSortRange.setX(Number(PRICE_SORT_MIN.value));
    }
    if(!isNaN(Number(PRICE_SORT_MAX.value)) && PRICE_SORT_MAX.value != "") {
        priceSortRange.setY(Number(PRICE_SORT_MAX.value));
    }
    // execute all of the different filters essentially
    sortProperties(SORT_TYPE.value, SORT_SIZE.value, priceSortRange, SEARCH.value);
}

/**
 * Shows and hides certain objects based off whether certain conditions are met or not met
 * I would have to make a different system in order to make the filters narrow down what's shown
 * So instead, I made a system which expands what's shown based off the amount of filters you have active
 * @param {String} type 
 * @param {String} size 
 * @param {Vec2d} priceRange 
 * @param {String} keywordString 
 */
function sortProperties(type, size, priceRange, keywordString) {
    // iterate through the closet array
    for(let i = 0; i < closetArray.length; i++) {
        let clothingItem = closetArray[i];
        // make sure we're not calling functions on a null
        if(clothingItem != null) {
            // check for if any filters are active
            if(type != "unset" || size != "unset" || keywordString != "" || !unchangedPriceRange(priceRange)) {
                // unbearable spaghetti code which shows different items based off the filters active
                if(clothingItem.type == type || clothingItem.size == size || (!unchangedPriceRange(priceRange) && clothingItem.price <= priceRange.getY() && clothingItem.price >= priceRange.getX()) || (foundSimilarString(clothingItem, keywordString) && keywordString != "")) {
                    clothingItem.isHidden = false;
                } else {
                    clothingItem.isHidden = true;
                }
            } else {
                // if no filters are active just show everything
                closetArray[i].isHidden = false;
            }
        }
    }
}

/**
 * Whether the price range remains unchanged
 * @param {Vec2d} vec2d 
 * @returns boolean for if the price range has been changed from it's default value or not
 */
function unchangedPriceRange(vec2d) {
    return vec2d.x == Number.MIN_SAFE_INTEGER && vec2d.y == Number.MAX_SAFE_INTEGER;
}

/**
 * Whether a string matches the text for any of the properties within the ClothingItem
 * @param {ClothingItem} clothingItem 
 * @param {String} string 
 * @returns boolean for whether the string is contained or not
 */
function foundSimilarString(clothingItem, string) {
    let lowercasedString = string.toLowerCase();
    if(clothingItem.color.toLowerCase().includes(lowercasedString) || clothingItem.name.toLowerCase().includes(lowercasedString) || clothingItem.type.toLowerCase().includes(lowercasedString) || clothingItem.size.toLowerCase().includes(lowercasedString)) return true;
}

/**
 * displays the info of the clothing item provided within the function's arguements
 * @param {ClothingItem} clothingItem 
 */
function showClothingInfo(clothingItem) {
    // move the display if the closet display is active
    CLOTHING_INFO_DISPLAY.style.left = (window.outerWidth - 75) + clothingOffset.getX();
    // so we don't call variables on a null
    if(clothingItem != null) {
        // display all of the properties of a clothingItem
        CLOTHING_INFO_DISPLAY.innerText =
        "Name: "+clothingItem.name+"\n" 
        + "Size: "+clothingItem.size+"\n"
        + "Type: "+clothingItem.type+"\n" 
        + "Color: "+clothingItem.color+"\n"
        + "Price: "+clothingItem.price+"\n";
    } else {
        // elsewise simply say the current slot is empty
        CLOTHING_INFO_DISPLAY.innerText = "Empty"
    }
}

/**
 * Toggles whether the closet info is being viewed or not
 */
function displayCloset() {
    // toggle function which also changed the clothing display offset and opacity scale
    if(closetInfoViewing) {
        closetInfoViewing = false;
        opacityScale = 25;
        clothingOffset.setX(0);
    } else {
        closetInfoViewing = true;
        opacityScale = 33;
        clothingOffset.setX(window.outerWidth/3);
    }
}

/**
 * Displays the text for the closet info
 */
function displayClosetText() {
    // create an empty string which is to be concatenated
    closetInfoDisplay = "";
    // iterate through the closet array
    for(let i = 0; i<closetArray.length; i++) {
        let clothingItem = closetArray[i];
        // make sure the current clothingItem is not empty
        if(clothingItem != null) {
            if(clothingItem.getIndexDifference() == 0) {
                // indicate where you are viewing in the closet currently, sort of like a map
                closetInfoDisplay+="|["+clothingItem.name+"]|";
            } else {
                closetInfoDisplay+="<"+clothingItem.name+">";
            }
            closetInfoDisplay+=" Size: "+clothingItem.size+" Type: "+clothingItem.type+" Color: "+clothingItem.color+" Price: $"+clothingItem.price;
        } else {
            // show the empty slots in the closet and show where you are currently in the closet
            if(i == closetIndex) {
                closetInfoDisplay+="|[Empty]|";
            } else {
                closetInfoDisplay+="<Empty>";
            }
        }
        // add a new line for aesthetic appeal
        closetInfoDisplay+="\n\n";
    }
    CLOSET_INFO.innerText = closetInfoDisplay;
}

/**
 * Returns a random integer
 * @param {Number} min minimum value
 * @param {Number} max maximum value
 * @returns Returns a random value in between the min and max value
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}