'use strict';

// Create a constructor function that creates an object associated with each product, and has the following properties:
// Name of the product
// File path of image
// Times the image has been shown

// As a user, I would like to track the selections made by viewers so that I can determine which products to begin production on.
// In the constructor function define a property to hold the number of times a product has been clicked.

let productList = [];

// Product Constructor

function Product (src, alt, title, viewed = 0, clicked = 0) {
  this.src = src;
  this.alt = alt;
  this.title = title;
  this.viewed = viewed;
  // holds how many times product has been clicked
  this.clicked = clicked;
  // all products being considered
  productList.push(this);
}

// Products Category
let allProducts = [
  new Product ('images/bag.jpg', 'weird bag', 'bag'),
  new Product ('images/banana.jpg', 'weird banana', 'banana'),
  new Product ('images/bathroom.jpg', 'weird bathroom', 'bathroom'),
  new Product ('images/boots.jpg', 'weird boots', 'boots'),
  new Product ('images/breakfast.jpg', 'weird breakfast', 'breakfast'),
  new Product ('images/bubblegum.jpg', 'weird bubblegum', 'bubblegum'),
  new Product ('images/chair.jpg', 'weird chair', 'chair'),
  new Product ('images/cthulhu.jpg', 'weird cthulhu', 'cthulhu'),
  new Product ('images/dog-duck.jpg', 'weird dog duck', 'dog-duck'),
  new Product ('images/dragon.jpg', 'weird dragon', 'dragon'),
  new Product ('images/pen.jpg', 'weird pen', 'pen'),
  new Product ('images/pet-sweep.jpg', 'weird pet sweep', 'pet-sweep'),
  new Product ('images/scissors.jpg', 'weird scissors', 'scissors'),
  new Product ('images/shark.jpg', 'weird shark', 'shark'),
  new Product ('images/sweep.png', 'weird sweep', 'sweep'),
  new Product ('images/tauntaun.jpg', 'weird tauntaun', 'tauntaun'),
  new Product ('images/unicorn.jpg', 'weird unicorn', 'unicorn'),
  new Product ('images/water-can.jpg', 'weird water can', 'water-can'),
  new Product ('images/wine-glass.jpg', 'weird wine glass', 'wine-glass'),
];

// Random Number Generator that returns 3 random indexes of productList

function randomImage() {
  return Math.floor(Math.random() * allProducts.length);
}

// Unique image checker

function uniqueImageChecker () {
  let imageArray = [];
  // while there are fewer than 3 images
  while (imageArray.length < 3) {
    let randomIndex = randomImage();
    // generate an image
    if (imageArray.includes(randomIndex)) {
      // do nothing
    }
    else {
      imageArray.push(randomIndex);
    }

    // if new image, add to the array
    // if repeated image, don't do anything

  }
  console.log('uniqueImageChecker', imageArray);
};

uniqueImageChecker();

// Event Listener attached to HTML where images will be displayed

let button1 = document.getElementById('productButton1');
button1.addEventListener('click', renderNewImages);
let button2 = document.getElementById('productButton2');
button2.addEventListener('click', renderNewImages);
let button3 = document.getElementById('productButton3');
button3.addEventListener('click', renderNewImages);

// Event Handler that's invoked upon button click

function renderNewImages() {
// Call unique image checker and generator into global product array
  let threeNewImages = allProducts[uniqueImageChecker()];
  let currentRound = 0;
  // If image is clicked, render 3 new images
  for (let i = 0; i < 26; i++){
    let imageOne = document.getElementById('image1');
    imageOne.src = productList.src;
    imageOne.alt = productList.alt;
    imageOne.title = productList.title;
    // increment times each image has been shown
    Product.viewed++;
    let imageTwo = document.getElementById('image2');
    imageTwo.src = productList.src;
    imageTwo.alt = productList.alt;
    imageTwo.title = productList.title;
    Product.viewed++;
    let imageThree = document.getElementById('image3');
    imageThree.src = productList.src;
    imageThree.alt = productList.alt;
    imageThree.title = productList.title;
    Product.viewed++;
  }

  currentRound++;
  // Remove event listener after 25 clicks
  if (currentRound === 25) {
    button1.removeEventListener('click', renderNewImages);
    button2.removeEventListener('click', renderNewImages);
    button3.removeEventListener('click', renderNewImages);
  }
}

renderNewImages();

function storeClicks(event) {
  let imageClicked = event.target;
  let nameOfImageClicked = imageClicked.title.value;
  for(let i = 0; i < productList.length; i++) {
    if(nameOfImageClicked === productList[i].title){
      productList[i].clicked++;
      break;
    }
  }
}


button1.addEventListener('click', storeClicks);
button2.addEventListener('click', storeClicks);
button3.addEventListener('click', storeClicks);

// storeClicks();

renderNewImages();

// Results Generator

function resultsGenerator() {
  let unorderedList = document.getElementById('ul');
  for (let i = 0; i < productList.length; i++) {
    let listItem = document.createElement('li');
    listItem.textContent = `${Product.title} had ${Product.clicked} votes, and was seen ${Product.viewed} times.`;
    unorderedList.appendChild(listItem);
  }
}

resultsGenerator();


// Keep the number of rounds in a variable to allow the number to be easily changed for debugging and testing purposes.

// Add a button with the text View Results, which when clicked displays the list of all the products followed by the votes received, and number of times seen for each. Example: banana had 3 votes, and was seen 5 times.
// After every selection by the viewer, update the newly added property to reflect if it was clicked.




