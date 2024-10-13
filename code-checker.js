const CODE_PARAM = "code"
const BASE_FORM_URL_PREFILLED = "https://docs.google.com/forms/d/e/1FAIpQLSfFjIsg9Upo1ca9l706oaB0Z_o4KhvBV88zIkDa9yQj9gI8MA/viewform?usp=pp_url&entry.2113672436="
const ID_OF_A = "codelink"

document.addEventListener('DOMContentLoaded', function (event) {
    getPassedInCode()
    // getCombo()
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

