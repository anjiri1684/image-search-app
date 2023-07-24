const accessKey = "kCpbE5GVfCzGl870QOCsV76CSxEvS_A3wj-q6qKfeK8";
const secretKey = "qwZxUxA-j5g4zIHvA-LL77NI4ikox3BOJIBhTYQu8AQ";

const formEl = document.querySelector("form");

const searchInputEl = document.getElementById("search-input");

const searchResultEl = document.querySelector(".search-results");
const showMoreButtonEl = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
  inputData = searchInputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();
  if(page === 1) {
    searchResultEl.innerHTML = "";
  }
   const results = data.results;

   results.map((result)=>{
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result")
    const image = document.createElement("img")
    image.src =result.urls.small
    image.alt = result.alt_description
    const imageLink = document.createElement("a")
    imageLink.href = result.links.html
    imageLink.target = "_self"
    imageLink.textContent = result;
    imageLink.textContent = result.alt_description
    imageWrapper.appendChild(image)
    imageWrapper.appendChild(imageLink)
    searchResultEl.appendChild(imageWrapper)
   })

   page++;


  if(page > 1){
    showMoreButtonEl.style.display = "block";
  }

}

formEl.addEventListener("submit", (event)=>{
  event.preventDefault();
  page = 1;
  searchImages()
})

showMoreButtonEl.addEventListener("click", ()=>{
  searchImages()
})