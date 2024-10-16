//SUCCESSFULLY have access to Jquery

//Publically viewable sheets - data underlying it is not public
const IMAGE_DIV = "gallery"

const IMAGES_URL = "https://docs.google.com/spreadsheets/d/1G7XmFZlmwBo1gqO_tqBMSa-ZMFzXbVD2tn7X4yAQdD4/export?exportFormat=csv&gid=774482806#gid=774482806"

function getImages() {
    fetch(IMAGES_URL)
        .then(dd => {
            return dd.text()
        })
        .then(ff => {
            displayImages(ff)
        }).catch(err => {

        })
}

function displayImages(data){
    let splitByLine = data.split("\n").map(a => a.replace("\r",""));
    splitByLine.forEach(imageUrl => {
        let fileId = imageUrl.split("=")[1]
        document.getElementById(IMAGE_DIV).innerHTML += `
            <img class="gallery-image" src="https://drive.google.com/thumbnail?id=${fileId}"/>
        `
    });
    
}

document.addEventListener('DOMContentLoaded', function (event) {
    console.log("Loaded");
    getImages();
})