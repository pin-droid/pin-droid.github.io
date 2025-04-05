//SUCCESSFULLY have access to Jquery
const LEADER_BOARD_DIV = "leader-board-data";

const PINS_TOTAL_DIV = "pins-total-count"
const PINS_FOUND_DIV = "pins-found-count"
const PINS_LEFT_DIV = "pins-left-count"

function loadCurrentPinDroidComp() {
    $.getJSON('./pindroid.json', function (data) {
        getCombo(data.current.publicUrl, data.current.statsBit, data.current.scoresBit)
    })
}


function getCombo(publicUrl, statsBit, scoresBit) {
    fetch(`${publicUrl}/export?exportFormat=csv&${statsBit}`)
        .then(dd => {
            return dd.text()
        })
        .then(ff => {
            displayOverallStats(ff)
        }).catch(err => {

        })
        fetch(`${publicUrl}/export?exportFormat=csv&${scoresBit}`)
        .then(dd => {
            return dd.text()
        })
        .then(ff => {
            displayScores(ff)
        }).catch(err => {

        })
}

function displayOverallStats(statsData) {
    console.log("overall stats");
    let splitByLine = statsData.split("\n");
    splitByLine.shift();

    let vals = splitByLine[0].split(",")

    let total = vals[0]
    let found = vals[1]
    let left = vals[2]

    document.getElementById(PINS_TOTAL_DIV).innerText = total
    document.getElementById(PINS_FOUND_DIV).innerText = found
    document.getElementById(PINS_LEFT_DIV).innerText = left

}

function displayScores(scoreData) {
    let splitByLine = scoreData.split("\n");
    console.log(splitByLine);
    splitByLine.shift();
    console.log(splitByLine);
    if(splitByLine.length > 0){
        console.log("SHowing results!")
        let objs = []
        let out = ""
        splitByLine.forEach(element => {
            let elements = element.split(",");
            let name = elements[0];
            let score = elements[1];
            let pinsFound = elements[2];
            let pinsGiven = elements[3];
            let pinsReceived = elements[4];
            console.log(name);
            console.log(score);
            console.log(pinsFound);
            console.log(pinsGiven);
            console.log(pinsReceived);
            objs.push({ "name": name, "score": score, "pinsFound": pinsFound, "pinsGiven": pinsGiven, "pinsReceived": pinsReceived })
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
            out += `
                <div class="leader-board-entry-space">
                <div class="leader-board-entry ${classPosition}">
                    <div class="leader-board-entry-left">
                        ${position}
                        <div class="leader-board-entry-name">${obj.name}</div>
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
    }else{
        console.log("Not showing results!")
        document.getElementById("loader").style.display = "none";
        document.getElementById(LEADER_BOARD_DIV).style.display = "flex";
        document.getElementById(LEADER_BOARD_DIV).innerHTML = `<div style="    font-size: 150%;">Results Hidden for now!</div>`
    }
    
}

function redrawTieBlocks(){
    if(expanded == true){
        document.getElementById("tie-details").style.display = "block";
        document.getElementById("exp-col-text").innerText = "COLLAPSE"
    }else{
        document.getElementById("tie-details").style.display = "none";
        document.getElementById("exp-col-text").innerText = "EXPAND"
    }
}

let expanded = false;

function toggleExpandCollapse(){
    console.log("TOGGLE");
    expanded = !expanded    
    redrawTieBlocks()
}

document.addEventListener('DOMContentLoaded', function (event) {
    console.log("Loaded");
    loadCurrentPinDroidComp()
    redrawTieBlocks()
})
