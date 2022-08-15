'use strict';

// Create a constructor function that creates an object associated with each product, and has the following properties:
// Name of the product
// File path of image
// Times the image has been shown

// As a user, I would like to track the selections made by viewers so that I can determine which products to begin production on.
// In the constructor function define a property to hold the number of times a product has been clicked.

let productList = [];

let currentRound = 0;

let viewResultsButton = document.getElementById('resultsButton');

let viewProductImages = document.getElementById('productImages');

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
  return (imageArray);
};

//--------------------EVENT LISTENERS (attached to HTML where images will be displayed)

let imageOne = document.getElementById('image1');
imageOne.addEventListener('click', handleClicks);
let imageTwo = document.getElementById('image2');
imageTwo.addEventListener('click', handleClicks);
let imageThree = document.getElementById('image3');
imageThree.addEventListener('click', handleClicks);

//--------------------EVENT HANDLERS (invoked upon click)

function renderNewImages() {
// Call unique image checker and generator into global product array
  let threeNewImages = uniqueImageChecker();
  let product1, product2, product3;
  product1 = allProducts[threeNewImages[0]]; 
  product2 = allProducts[threeNewImages[1]];
  product3 = allProducts[threeNewImages[2]];

  console.log(product1, product2, product3);

  // If image is clicked, render 3 new images
  let imageOne = document.getElementById('image1');
  imageOne.src = product1.src;
  imageOne.alt = product1.alt;
  imageOne.title = product1.title;
  // increment times each image has been shown
  product1.viewed++;
  let imageTwo = document.getElementById('image2');
  imageTwo.src = product2.src;
  imageTwo.alt = product2.alt;
  imageTwo.title = product2.title;
  product2.viewed++;
  let imageThree = document.getElementById('image3');
  imageThree.src = product3.src;
  imageThree.alt = product3.alt;
  imageThree.title = product3.title;
  product3.viewed++;

}

renderNewImages();

//--------------------HELPER FUNCTION

function handleClicks(event) {
  let imageClicked = event.target;
  console.log(imageClicked);
  let nameOfImageClicked = imageClicked.title;
  console.log(nameOfImageClicked);
  for(let i = 0; i < productList.length; i++) {
    if(nameOfImageClicked === productList[i].title){
      productList[i].clicked++;
      break;
    }
  }
  currentRound++;
  if(currentRound === 25) {
    viewResultsButton.hidden = false;
    viewProductImages.hidden = true;
    imageOne.removeEventListener('click', handleClicks);
    imageTwo.removeEventListener('click', handleClicks);
    imageThree.removeEventListener('click', handleClicks);
  } else {
    renderNewImages();
  }
}

viewResultsButton.addEventListener('click', resultsGenerator);

// Results Generator

function resultsGenerator() {
  let unorderedList = document.getElementById('ul');
  for (let i = 0; i < productList.length; i++) {
    let listItem = document.createElement('li');
    listItem.textContent = `${productList[i].title} had ${productList[i].clicked} votes, and was seen ${productList[i].viewed} times.`;
    unorderedList.appendChild(listItem);
  }
}


// Keep the number of rounds in a variable to allow the number to be easily changed for debugging and testing purposes.

// Add a button with the text View Results, which when clicked displays the list of all the products followed by the votes received, and number of times seen for each. Example: banana had 3 votes, and was seen 5 times.
// After every selection by the viewer, update the newly added property to reflect if it was clicked.




