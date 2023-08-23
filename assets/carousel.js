const carouselImageOne = document.getElementById("c-img-1");
const carouselImageTwo = document.getElementById("c-img-2");
const carouselImageThree = document.getElementById("c-img-3");

async function fetchImage1(id) {
  const response = await fetch(`http://localhost:4000/books/${id}`)
  const data = await response.json();
  carouselImageOne.src=`${data.image}`
}

async function fetchImage2(id) {
  const response = await fetch(`http://localhost:4000/books/${id}`)
  const data = await response.json();
  carouselImageTwo.src=`${data.image}`
}

async function fetchImage3(id) {
  const response = await fetch(`http://localhost:4000/books/${id}`)
  const data = await response.json();
  carouselImageThree.src=`${data.image}`
}

function randomId () {
  return Math.floor(Math.random() * 30);
} 

console.log(randomId())

fetchImage1(randomId());
fetchImage2(randomId());
fetchImage3(randomId());
