const API = "http://localhost:3000";

let page = 1;

function displayBooks(data){

let output = "";

data.forEach(book => {

output += `
<div class="book">

<h3>${book.title}</h3>
<p><b>Author:</b> ${book.author}</p>
<p><b>Category:</b> ${book.category}</p>
<p><b>Price:</b> ₹${book.price}</p>
<p><b>Rating:</b> ⭐ ${book.rating}</p>

</div>
`;

});

document.getElementById("books").innerHTML = output;

}


function searchBook(){

const title = document.getElementById("searchTitle").value;

fetch(`${API}/books/search?title=${title}`)
.then(res=>res.json())
.then(data=>displayBooks(data));

}


function filterCategory(){

const category = document.getElementById("category").value;

fetch(`${API}/books/category/${category}`)
.then(res=>res.json())
.then(data=>displayBooks(data));

}


function sortPrice(){

fetch(`${API}/books/sort/price`)
.then(res=>res.json())
.then(data=>displayBooks(data));

}


function sortRating(){

fetch(`${API}/books/sort/rating`)
.then(res=>res.json())
.then(data=>displayBooks(data));

}


function topBooks(){

fetch(`${API}/books/top`)
.then(res=>res.json())
.then(data=>displayBooks(data));

}


function loadBooks(){

page = 1;

fetch(`${API}/books?page=${page}`)
.then(res=>res.json())
.then(data=>displayBooks(data));

}


function nextPage(){

page++;

fetch(`${API}/books?page=${page}`)
.then(res=>res.json())
.then(data=>displayBooks(data));

}