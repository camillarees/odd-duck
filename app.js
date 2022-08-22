'use strict';

//--------------------GLOBAL VARIABLES/IMPORTS

let previousArray = [];

let allProducts = [];

let currentRound = 0;

let viewResultsButton = document.getElementById('resultsButton');

let viewProductImages = document.getElementById('productImages');

//--------------------CONSTRUCTORS

function Product (src, alt, title, viewed = 0, clicked = 0) {
  this.src = src;
  this.alt = alt;
  this.title = title;
  this.viewed = viewed;
  // holds how many times product has been clicked
  this.clicked = clicked;
  // all products being considered
  allProducts.push(this);
}

//--------------------CONSTRUCTOR METHODS

// Create Local Storage Variable

let storedItems = localStorage.getItem('allProducts');
// load saved items from storage
if (storedItems) {
  let parsedItem = JSON.parse(storedItems);
  allProducts = parsedItem;
  console.log(parsedItem);
} else {
  new Product ('images/bag.jpg', 'weird bag', 'bag');
  new Product ('images/banana.jpg', 'weird banana', 'banana');
  new Product ('images/bathroom.jpg', 'weird bathroom', 'bathroom');
  new Product ('images/boots.jpg', 'weird boots', 'boots');
  new Product ('images/breakfast.jpg', 'weird breakfast', 'breakfast');
  new Product ('images/bubblegum.jpg', 'weird bubblegum', 'bubblegum');
  new Product ('images/chair.jpg', 'weird chair', 'chair');
  new Product ('images/cthulhu.jpg', 'weird cthulhu', 'cthulhu');
  new Product ('images/dog-duck.jpg', 'weird dog duck', 'dog-duck');
  new Product ('images/dragon.jpg', 'weird dragon', 'dragon');
  new Product ('images/pen.jpg', 'weird pen', 'pen');
  new Product ('images/pet-sweep.jpg', 'weird pet sweep', 'pet-sweep');
  new Product ('images/scissors.jpg', 'weird scissors', 'scissors');
  new Product ('images/shark.jpg', 'weird shark', 'shark');
  new Product ('images/sweep.png', 'weird sweep', 'sweep');
  new Product ('images/tauntaun.jpg', 'weird tauntaun', 'tauntaun');
  new Product ('images/unicorn.jpg', 'weird unicorn', 'unicorn');
  new Product ('images/water-can.jpg', 'weird water can', 'water-can');
  new Product ('images/wine-glass.jpg', 'weird wine glass', 'wine-glass');
}

//--------------------FUNCTIONS

// Random Number Generator that returns 3 random indexes of allProducts
function randomImage() {
  return Math.floor(Math.random() * allProducts.length);
}

// Unique image checker

function uniqueImageChecker () {
  console.log(previousArray);
  let imageArray = [];
  // while there are fewer than 3 images (we don't want the same photos in the immediate previous set)
  while (imageArray.length < 3) {
    let randomIndex = randomImage();
    // generate an image
    if (imageArray.includes(randomIndex) || previousArray.includes(randomIndex)) {
      // do nothing
    }
    else {
      imageArray.push(randomIndex);
    }

    // if new image, add to the array
    // if repeated image, don't do anything

  }
  previousArray = imageArray;

  console.log(imageArray);
  console.log('----');
  // console.log('uniqueImageChecker', imageArray);
  return (imageArray);
}


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

  // console.log(product1, product2, product3);

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
  // console.log(imageClicked);
  let nameOfImageClicked = imageClicked.title;
  // console.log(nameOfImageClicked);
  for(let i = 0; i < allProducts.length; i++) {
    if(nameOfImageClicked === allProducts[i].title){
      allProducts[i].clicked++;
      break;
    }
  }
  currentRound++;
  if(currentRound === 10) {
    viewResultsButton.hidden = false;
    viewProductImages.hidden = true;
    imageOne.removeEventListener('click', handleClicks, renderNewImages);
    imageTwo.removeEventListener('click', handleClicks, renderNewImages);
    imageThree.removeEventListener('click', handleClicks, renderNewImages);
  } else {
    renderNewImages();
    setItems();
  }
}

viewResultsButton.addEventListener('click', renderChart);

// save items to local storage

function setItems () {
  let stringifiedItems = JSON.stringify(allProducts);
  localStorage.setItem('allProducts', stringifiedItems);
}



// Render Chart

function renderChart() {
  let productNames = [];
  let clicks = [];
  let views = [];

  for (let i = 0; i < allProducts.length; i++) {
    productNames.push(allProducts[i].title);
    clicks.push(allProducts[i].clicked);
    views.push(allProducts[i].viewed);
  }

  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [
        {
          label: '# of Votes',
          data: clicks,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            // 'rgba(54, 162, 235, 0.2)',
            // 'rgba(255, 206, 86, 0.2)',
            // 'rgba(75, 192, 192, 0.2)',
            // 'rgba(153, 102, 255, 0.2)',
            // 'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            // 'rgba(54, 162, 235, 1)',
            // 'rgba(255, 206, 86, 1)',
            // 'rgba(75, 192, 192, 1)',
            // 'rgba(153, 102, 255, 1)',
            // 'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
        {
          label: '# of Views',
          data: views,
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}



//--------------------FUNCTION CALLS
