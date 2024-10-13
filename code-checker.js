const CODE_PARAM = "code"
const BASE_FORM_URL_PREFILLED = "https://docs.google.com/forms/d/e/1FAIpQLSfFjIsg9Upo1ca9l706oaB0Z_o4KhvBV88zIkDa9yQj9gI8MA/viewform?usp=pp_url&entry.2113672436="
const ID_OF_A = "codelink"

document.addEventListener('DOMContentLoaded', function (event) {
    getPassedInCode()
    getCombo()
})


function getPassedInCode() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeIn = urlParams.get(CODE_PARAM)
    console.log(codeIn);
    let generatedUrl = BASE_FORM_URL_PREFILLED + codeIn;
    document.getElementById(ID_OF_A).href = generatedUrl;
    document.getElementById(ID_OF_A).style.display = "block";
    // document.getElementById("codefound").innerText = codeIn;
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

function displayScores(scoreData) {
    let splitByLine = scoreData.split("\n");
    console.log(splitByLine);
    splitByLine.shift();
    console.log(splitByLine);
    splitByLine.forEach(element => {
        let elements = element.split(",");
        let name = elements[1];
        let score = elements[2];
        console.log(name);
        console.log(score);
    });

}