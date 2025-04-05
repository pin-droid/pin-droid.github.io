const AVAILABLE_PINS_DIV = "available-pins";

const PLAYER_COUNT_DIV = "player-count"
const PIN_SHARE_SCORE_DIV = "give-points-amount"

function loadCurrentPinDroidComp() {
    $.getJSON('./pindroid.json', function (data) {
        getPublicStatsInfo(data.current.publicUrl, data.current.statsBit)
            .then(d => {
                console.log(d)
                displayTotalPlayers(d)
            })

        //publicUrl 
    })
}

function fileExists(fileUrl) {
    var http = new XMLHttpRequest();
    http.open('HEAD', fileUrl, false);
    http.send();
    return http.status != 404;
}

function getPublicStatsInfo(publicUrl, statsBit) {
    let fullurl = `${publicUrl}/export?exportFormat=csv&${statsBit}`
    return new Promise((resolve, reject) => {
        fetch(fullurl)
            .then(dd => {
                return dd.text()
            })
            .then(d => {
                // var lines = d.split('\n');
                // lines.splice(0, 1);
                // var newtext = lines.join('\n');
                // displayTotalPlayers(d)
                resolve(d)
            }).catch(err => {
                console.log(err);
                reject(err)


            })
    })
    //gid=1572919526#gid=1572919526
}

function displayTotalPlayers(data) {
    let splitByLine = data.split("\n");
    splitByLine.shift();

    let vals = splitByLine[0].split(",")

    let total = vals[0]
    let found = vals[1]
    let left = vals[2]
    let players = vals[3]
    let differentPinCount = vals[4]
    let sharescore = vals[5]

    console.log(differentPinCount);
    
    document.getElementById(PIN_SHARE_SCORE_DIV).innerText = sharescore
}

document.addEventListener('DOMContentLoaded', function (event) {
    console.log("Loaded");
    loadCurrentPinDroidComp();
    // fetch(STATS_URL)
    //     .then(dd => {
    //         return dd.text()
    //     })
    //     .then(ff => {
    //         displayTotalPlayers(ff)
    //     }).catch(err => {

    //     })
    // displayAvailablePins();
})
