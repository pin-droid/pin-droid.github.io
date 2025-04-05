//SUCCESSFULLY have access to Jquery

//Publically viewable sheets - data underlying it is not public
const IMAGE_DIV = "gallery"

// const IMAGES_URL = "https://docs.google.com/spreadsheets/d/1G7XmFZlmwBo1gqO_tqBMSa-ZMFzXbVD2tn7X4yAQdD4/export?exportFormat=csv&gid=774482806#gid=774482806"

function loadCurrentPinDroidComp() {
    $.getJSON('./pindroid.json', function (data) {
        getImages(data.current.publicUrl, data.current.galleryBit)
    })
}


function getImages(publicUrl, galleryBit) {
    fetch(`${publicUrl}/export?exportFormat=csv&${galleryBit}`)
        .then(dd => {
            return dd.text()
        })
        .then(ff => {
            displayImages(ff)
        }).catch(err => {

        })
}

function displayImages(data) {
    let splitByLine = data.split("\n").map(a => a.replace("\r", ""));
    splitByLine = splitByLine.filter(imageUrl => imageUrl != undefined && imageUrl != null && imageUrl != "" && imageUrl.length > 1);

    if (splitByLine.length < 1) {
        document.getElementById(IMAGE_DIV).innerHTML += `
            <div>
                <p>No Images Uploaded Yet!</p>
                <p>Use the Image Uploader in the form when you acquire a new pin!</p>
            </div>            
        `
    } else {
        splitByLine.forEach(imageUrl => {
            if (imageUrl != undefined && imageUrl != null && imageUrl != "" && imageUrl.length > 1) {
                let fileId = imageUrl.split("=")[1]
                document.getElementById(IMAGE_DIV).innerHTML += `
                    <img class="gallery-image" src="https://drive.google.com/thumbnail?id=${fileId}"/>
                `
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function (event) {
    console.log("Loaded");
    // getImages();
    loadCurrentPinDroidComp();
})
