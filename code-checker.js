const CODE_PARAM = "code"
const ID_OF_A = "codelink"


function loadCurrentPinDroidComp() {
    $.getJSON('./pindroid.json', function (data) {
        getPassedInCode(data.current.submitFormUrl)
    })
}


document.addEventListener('DOMContentLoaded', function (event) {
    loadCurrentPinDroidComp()
})


function getPassedInCode(formCodeCheckUrl) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeIn = urlParams.get(CODE_PARAM)
    console.log(codeIn);
    let generatedUrl = formCodeCheckUrl + codeIn;
    document.getElementById(ID_OF_A).href = generatedUrl;
    document.getElementById(ID_OF_A).style.display = "block";
}

