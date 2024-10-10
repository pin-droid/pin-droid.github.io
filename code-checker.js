
document.addEventListener('DOMContentLoaded', function (event) {
    console.log("Loaded");
    const queryString = window.location.search;
    console.log(queryString); 
    const urlParams = new URLSearchParams(queryString);
    const product = urlParams.get('test')
console.log(product);
    
})

