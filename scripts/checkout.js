// Each ticket will cost 100 Rupees
// If wallet amount is insufficient show alert "Insufficient Balance!";
// Else show "Booking successfull!" and adjust the wallet amount in real time
let amount = localStorage.getItem("amount");
document.querySelector("#wallet").innerHTML = amount;

data = JSON.parse(localStorage.getItem("movie"));
console.log(data);
let movie = document.querySelector("#movie");

let box = document.createElement('div');

let image = document.createElement("img");
image.src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
image.setAttribute("class", "image");

let name = document.createElement("h2");
name.innerText = data.title;

box.append(name, image);
movie.append(box);


document.querySelector("#book").addEventListener("click", booking );
let total;

function booking () {

    let number = document.querySelector("#seats").value;
    total = number * 100;
    
    if ( total > amount )
    {
        alert("Insufficient Balance!");
    }
    else if ( number > 0 && total < amount )
    {
        amount = amount - total;
        localStorage.setItem("amount", amount);
        document.querySelector("#wallet").innerHTML = amount;
        alert("Booking successful!");
    }
    else if ( number <=  0 )
    {
        alert("Please fill the required details!")
    }
}