//SUCCESSFULLY have access to Jquery
//Works

document.addEventListener('DOMContentLoaded', function (event) {
    console.log("Loaded");
    fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => response.json())
        .then(json => console.log(json))


})


