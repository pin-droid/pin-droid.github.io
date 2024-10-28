const AVAILABLE_PINS_DIV = "available-pins";

const PLAYER_COUNT_DIV = "player-count"
const PIN_SHARE_SCORE_DIV = "give-points-amount"
const STATS_URL = "https://docs.google.com/spreadsheets/d/1G7XmFZlmwBo1gqO_tqBMSa-ZMFzXbVD2tn7X4yAQdD4/export?exportFormat=csv&gid=1572919526#gid=1572919526"
const PIN_POINTS_URL = "https://docs.google.com/spreadsheets/d/1G7XmFZlmwBo1gqO_tqBMSa-ZMFzXbVD2tn7X4yAQdD4/export?exportFormat=csv&gid=1871628007#gid=1871628007"

function displayAvailablePins() {
    $.getJSON('./droidcon-pins.json', function (data) {
        fetch(PIN_POINTS_URL)
            .then(dd => {
                return dd.text()
            })
            .then(d => {
                let splitByLine = d.split("\n");
                let oo = splitByLine.map(a => ({ "id": a.split(",")[0], "value": a.split(",")[1].replace("\r", ""),"total": a.split(",")[2].replace("\r", "") }))
                return oo
            })
            .then(pinvalues => {
                let out = "";
                data.forEach(element => {
                    console.log(element);
                    out += `
                        <div class="pin-image-container">
                            <img class="pin-image" src="/media/droidcon-place-pins/${element.img}.png"/>
                            <div class="pin-image-text-container">
                                <div class="pin-image-title">${element.name}</div>
                                <div class="pin-image-points"><b class="point-value">${pinvalues[element.id - 1].value}</b> <b class="points-text">points</b></div>
                                <div class="pin-image-amount">x${pinvalues[element.id - 1].total}</div>
                            </div>
                        </div>
                    `
                });
                document.getElementById(AVAILABLE_PINS_DIV).innerHTML = out;
            }).catch(err => {
                console.log(err);


            })
    });
}

function displayTotalPlayers(data) {
    let splitByLine = data.split("\n");
    splitByLine.shift();

    let vals = splitByLine[0].split(",")

    let total = vals[0]
    let found = vals[1]
    let left = vals[2]
    let players = vals[3]
    let sharescore = vals[4]

    document.getElementById(PLAYER_COUNT_DIV).innerText = players
    document.getElementById(PIN_SHARE_SCORE_DIV).innerText = sharescore

}

document.addEventListener('DOMContentLoaded', function (event) {
    console.log("Loaded");
    fetch(STATS_URL)
        .then(dd => {
            return dd.text()
        })
        .then(ff => {
            displayTotalPlayers(ff)
        }).catch(err => {

        })
    displayAvailablePins();
})
