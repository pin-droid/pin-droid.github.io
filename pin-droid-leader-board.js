//SUCCESSFULLY have access to Jquery
const LEADER_BOARD_DIV = "leader-board-data";

const PINS_TOTAL_DIV = "pins-total-count"
const PINS_FOUND_DIV = "pins-found-count"
const PINS_LEFT_DIV = "pins-left-count"
const PINS_FULL_COLLECTION_AMOUNT = "collection-points-amount" //
const PINS_SHARE_SCORE_DIV = "given-points-amount"
const PINS_DIFFERENT_COUNT_DIV = "different-pins-count"

function loadCurrentPinDroidComp() {
    $.getJSON('./pindroid.json', function (data) {
        getCombo(data.current.publicUrl, data.current.pinsBit, data.current.statsBit, data.current.scoresBit, data.current.mediaFolder)
    })
}

let storedPinsData = null

function getCombo(publicUrl, pinsBit, statsBit, scoresBit, mediaFolder) {
    fetch(`${publicUrl}/export?exportFormat=csv&${pinsBit}`)
        .then(dd => {
            return dd.text()
        })
        .then(d => {
            console.log("PINNSS");
            console.log(d);

            let splitByLine = d.split("\n");
            let oo = splitByLine.map(a => ({ "name": a.split(",")[0], "id": a.split(",")[1].replace("\r", ""), "amount": a.split(",")[2].replace("\r", ""), "pointPerPin": a.split(",")[3].replace("\r", "") }))
            let dump = oo.shift() //drops first line which is colmun headers
            return oo
        })
        .then(ff => {
            storedPinsData = ff
            fetch(`${publicUrl}/export?exportFormat=csv&${statsBit}`)
                .then(dd => {
                    return dd.text()
                })
                .then(ff => {
                    displayOverallStats(ff)
                }).catch(err => {
                    console.log("ERROR 2");
                    console.log(err);

                })
            fetch(`${publicUrl}/export?exportFormat=csv&${scoresBit}`)
                .then(dd => {
                    return dd.text()
                })
                .then(ff => {
                    displayScores(ff, mediaFolder)
                }).catch(err => {
                    console.log("ERROR 3");
                    console.log(err);

                })
        }).catch(err => {
            console.log("ERROR 1 ");
            console.log(err);


        })

}

function displayOverallStats(statsData) {
    console.log("overall stats");
    console.log(statsData);

    let splitByLine = statsData.split("\n");
    splitByLine.shift();

    let vals = splitByLine[0].split(",")

    let total = vals[0]
    let found = vals[1]
    let left = vals[2]
    let totalPlayers = vals[3]
    let allpins = vals[4]
    let sharescore = vals[5]
    let fullcollectionscore = vals[6]

    document.getElementById(PINS_TOTAL_DIV).innerText = total
    document.getElementById(PINS_FOUND_DIV).innerText = found
    document.getElementById(PINS_LEFT_DIV).innerText = left
    document.getElementById(PINS_DIFFERENT_COUNT_DIV).innerText = allpins
    document.getElementById(PINS_SHARE_SCORE_DIV).innerText = sharescore
    document.getElementById(PINS_FULL_COLLECTION_AMOUNT).innerText = fullcollectionscore

}

function displayScores(scoreData, mediaFolder) {
    let splitByLine = scoreData.split("\n").map(a => a.replace("\r", ""));
    console.log("----------------");

    console.log(splitByLine);
    splitByLine.shift();
    console.log(splitByLine);
    if (splitByLine.length > 0) {
        console.log("SHowing results!")
        let objs = []
        let out = ""
        // let collection = "<div class='leader-board-entry-collection'>"
        splitByLine.forEach(element => {
            let elements = element.split(",");
            let name = elements[0];
            let score = elements[1];
            let pinsFound = elements[2];
            let pinsGiven = elements[3];
            let pinsReceived = elements[4];
            let collectionIds = elements[5];
            console.log(name);
            console.log(score);
            console.log(pinsFound);
            console.log(pinsGiven);
            console.log(pinsReceived);
            console.log(collectionIds);
            objs.push({ "name": name, "score": score, "pinsFound": pinsFound, "pinsGiven": pinsGiven, "pinsReceived": pinsReceived, "collection": collectionIds })
        });
        objs.sort((a, b) => a.score - b.score).reverse();

        objs.forEach((obj, idx) => {
            let classPosition = ""
            let position = `<div class="leader-board-entry-rank">${idx + 1}</div>`
            if (idx == 0) {
                position = `<div class="leader-board-entry-rank-icon"><img src="media/images-general/1st.png" class="rank-icon-image"/></div>`
                classPosition = "first"
            } else if (idx == 1) {
                position = `<div class="leader-board-entry-rank-icon"><img src="media/images-general/2nd.png" class="rank-icon-image"/></div>`
                classPosition = "second"

            } else if (idx == 2) {
                position = `<div class="leader-board-entry-rank-icon"><img src="media/images-general/3rd.png" class="rank-icon-image"/></div>`
                classPosition = "third"
            }
            let pinStats = `
                <div class="pins-event-div" title="Number of pins found">
                    <div class="pins-event-icon">
                        <img class="pins-event-icon-image" src="media/images-general/found.png" />
                    </div>
                    <div class="pins-event-value">
                        ${obj.pinsFound}
                    </div>
    
                </div>
                <div class="pins-event-div" title="Number of pins given away (extra points)">
                    <div class="pins-event-icon">
                        <img class="pins-event-icon-image" src="media/images-general/given.png" />
                    </div>
                    <div class="pins-event-value">
                        ${obj.pinsGiven}
                    </div>
    
                </div>
                <div class="pins-event-div" title="Number of pins received as gift">
                    <div class="pins-event-icon">
                        <img class="pins-event-icon-image" src="media/images-general/received.png" />
                    </div>
                    <div class="pins-event-value">
                        ${obj.pinsReceived}
                    </div>
    
                </div>
    
            `
            let playerCollection = obj.collection.split("-")
            console.log(playerCollection);
            let collection = "<div class='leader-board-entry-collection'>"
            storedPinsData.forEach(pin => {
                let foundClass = "not-found";
                if (playerCollection.includes(pin.id)) {
                    foundClass = "found"
                }
                collection += `<img class="tiny-image ${foundClass}" src="${mediaFolder}/${pin.name}.png"/>`
            });
            collection += "</div>";
            out += `
                <div class="leader-board-entry-space">
                    <div class="leader-board-entry ${classPosition}">
                        <div class="leader-board-entry-left">
                            ${position}
                            <div class="leader-board-entry-name">
                                <div class="leader-board-entry-name-text">${obj.name}</div>
                                ${collection}
                            </div>
                        </div>
                        <div class="leader-board-entry-score ${obj.score == 0 ? "zero" : ""}">${obj.score}</div>
                    </div>
                    <div class="leader-board-entry-pin-stats">
                        ${pinStats}
                    </div>
                </div>
            `
        });
        document.getElementById("loader").style.display = "none";
        document.getElementById(LEADER_BOARD_DIV).style.display = "flex";
        document.getElementById(LEADER_BOARD_DIV).innerHTML = out
    } else {
        console.log("Not showing results!")
        document.getElementById("loader").style.display = "none";
        document.getElementById(LEADER_BOARD_DIV).style.display = "flex";
        document.getElementById(LEADER_BOARD_DIV).innerHTML = `<div style="    font-size: 150%;">Results Hidden for now!</div>`
    }

}

function redrawTieBlocks() {
    if (expanded == true) {
        document.getElementById("tie-details").style.display = "block";
        document.getElementById("exp-col-text").innerText = "COLLAPSE"
    } else {
        document.getElementById("tie-details").style.display = "none";
        document.getElementById("exp-col-text").innerText = "EXPAND"
    }
}

let expanded = false;

function toggleExpandCollapse() {
    console.log("TOGGLE");
    expanded = !expanded
    redrawTieBlocks()
}

document.addEventListener('DOMContentLoaded', function (event) {
    console.log("Loaded");
    loadCurrentPinDroidComp()
    redrawTieBlocks()
})
