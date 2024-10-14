//SUCCESSFULLY have access to Jquery
const LEADER_BOARD_DIV = "leader-board-data";

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

function displayScores(scoreData) {
    let splitByLine = scoreData.split("\n");
    console.log(splitByLine);
    splitByLine.shift();
    console.log(splitByLine);
    let objs = []
    let out = ""
    splitByLine.forEach(element => {
        let elements = element.split(",");
        let name = elements[1];
        let score = elements[2];
        console.log(name);
        console.log(score);
        objs.push({ "name": name, "score": score })
    });
    objs.sort((a, b) => a.score - b.score).reverse();

    objs.forEach((obj, idx) => {
        let classPosition = ""
        let position = `<div class="leader-board-entry-rank">${idx + 1}</div>` 
        if(idx == 0){
            position = `<div class="leader-board-entry-rank-icon"><img src="media/images-general/1st.png" class="rank-icon-image"/></div>` 
            classPosition = "first"
        } else if(idx == 1){
            position = `<div class="leader-board-entry-rank-icon"><img src="media/images-general/2nd.png" class="rank-icon-image"/></div>` 
            classPosition = "second"

        }else if(idx == 2){
            position = `<div class="leader-board-entry-rank-icon"><img src="media/images-general/3rd.png" class="rank-icon-image"/></div>` 
            classPosition = "third"
        }

        out += `
            <div class="leader-board-entry ${classPosition}">
                <div class="leader-board-entry-left">
                    ${position}
                    <div class="leader-board-entry-name">${obj.name}</div>
                </div>
                <div class="leader-board-entry-score ${obj.score == 0 ? "zero" : ""}">${obj.score}</div>
            </div>
        `
    });
    document.getElementById("loader").style.display = "none";
    document.getElementById(LEADER_BOARD_DIV).style.display = "flex";
    document.getElementById(LEADER_BOARD_DIV).innerHTML = out
}

document.addEventListener('DOMContentLoaded', function (event) {
    console.log("Loaded");
    getCombo();
})
