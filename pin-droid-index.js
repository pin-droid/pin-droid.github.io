const AVAILABLE_PINS_DIV = "available-pins";

function displayAvailablePins() {
    $.getJSON('./droidcon-pins.json', function (data) {
        let out = "";
        data.forEach(element => {
            console.log(element);
            out += `
                <div class="pin-image-container">
                    <img class="pin-image" src="/media/droidcon-place-pins/${element.img}.png"/>
                    <div class="pin-image-text-container">
                        <div class="pin-image-title">${element.name}</div>
                        <div class="pin-image-points"><b class="point-value">${element.points}</b> <b class="points-text">points</b></div>
                        <div class="pin-image-amount">x${element.total}</div>
                    </div>
                </div>
            `
        });
        document.getElementById(AVAILABLE_PINS_DIV).innerHTML = out;
    });
}

function getCombo() {
    fetch("https://docs.google.com/spreadsheets/d/1WFu4TilKMHZXACtd5y6r4t6UoLZjS5z-IosFqgqO2gA/export?exportFormat=csv&gid=304234329#gid=304234329") //gid=516779236#gid=516779236
        .then(dd => {
            return dd.text()
        })
        .then(ff => {
            console.log(ff)
            displayScores(ff)
        }).catch(err => {

        })
}


document.addEventListener('DOMContentLoaded', function (event) {
    console.log("Loaded");
    displayAvailablePins();
})
