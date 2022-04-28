// Implement debouncing for network request
// On clicking book now store the selected movie in localstorage as key "movie"
// so that you can retrive it on checkout.html page
const movieBox = document.querySelector("#movies");
let id;

async function searchMovies()
{
  try{
    const query =  document.querySelector("#search").value;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=9ec49ee61f8a396cf9db6bc6dd6d687c&language=en-US&page=1&include_adult=false&query=${query}`
    const res = await fetch(url);
    const data = await res.json();
    const movies = data.results;
    return movies;

  }catch(err)
  {
    console.log(err);
  }
}

function appendMovies(movies)
{
  movieBox.innerHTML="";
  movies.map(el=>{
    let box = document.createElement("div");
    box.setAttribute("class","book_now")

    let image = document.createElement("img")
    image.setAttribute("class","searching")
    image.src = `https://image.tmdb.org/t/p/w500${el.poster_path}`;
  
    let p = document.createElement("p");
  p.innerText = el.title;

  let btn = document.createElement("button");
      btn.innerText = "Book Now";
      btn.setAttribute("class", "book_now");
      btn.addEventListener("click", function() {
          bookmovie(el);
      })
  

  let p1 = document.createElement("p");
  let year = new Date(el.release_date);
  let ans = year.getFullYear()
  p1.innerText = ans;
  p1.setAttribute("class", "para1");

    box.append(image,p,p1,btn);
    movieBox.append(box)

  })
}

const bookmovie = (el) =>  {
  localStorage.setItem("movie", JSON.stringify(el));
  window.location.href = "checkout.html";
}

async function main() {
let data = await searchMovies();
if (data === undefined) {
  return false;
}
console.log(data)
appendMovies(data);
}

//Debouncing function

function debounce(func, delay) {
if (id) {
  clearTimeout(id);
}
id = setTimeout(() => {
  func();
}, delay);
}