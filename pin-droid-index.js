const AVAILABLE_PINS_DIV = "available-pins";

const PLAYER_COUNT_DIV = "player-count"
const PIN_SHARE_SCORE_DIV = "give-points-amount"

function loadCurrentPinDroidComp() {
    $.getJSON('./pindroid.json', function (data) {
        console.log(data);
        console.log(data.current);
        document.getElementById("title-place").innerHTML = data.current.location;
        document.getElementById("title-year").innerHTML = data.current.year;
        document.getElementById("registration-link").href = data.current.registrationUrl;
        getPublicStatsInfo(data.current.publicUrl, data.current.statsBit)
            .then(d => {
                console.log(d)
                displayTotalPlayers(d)
            })
        displayAvailablePinsToFind(data.current.pinsDataFile, data.current.publicUrl, data.current.pinsBit, data.current.mediaFolder)

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

function displayAvailablePinsToFind(pinsFile, publicUrl, pinsBit, mediaFolder) {
        let fullurl = `${publicUrl}/export?exportFormat=csv&${pinsBit}`
        fetch(fullurl)
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
            .then(pinvalues => {
                let out = "";
                console.log(pinvalues);
                pinvalues.forEach(elem => {
                    if (fileExists(`${mediaFolder}/${elem.name}.png`)) {
                        console.log("Exists!");
                        out += `
                        <div class="pin-image-container">
                            <img class="pin-image" src="${mediaFolder}/${elem.name}.png"/>
                            <div class="pin-image-text-container">
                                <div class="pin-image-title">${elem.name}</div>
                                <div class="pin-image-points"><b class="point-value">${elem.pointPerPin}</b> <b class="points-text">points</b></div>
                                <div class="pin-image-amount">x${elem.amount}</div>
                            </div>
                        </div>
                    `
                    } else {
                        console.log(`File: ${mediaFolder}/${elem.name}.png, does NOT exist, SKIPPING showing that pin!`);
                    }
                })

                // data.forEach(element => {
                //     console.log(element);
                //     out += `
                //         <div class="pin-image-container">
                //             <img class="pin-image" src="${mediaFolder}/${element.name}.png"/>
                //             <div class="pin-image-text-container">
                //                 <div class="pin-image-title">${element.name}</div>
                //                 <div class="pin-image-points"><b class="point-value">${pinvalues[element.id - 1].pointPerPin}</b> <b class="points-text">points</b></div>
                //                 <div class="pin-image-amount">x${pinvalues[element.id - 1].amount}</div>
                //             </div>
                //         </div>
                //     `
                // });
                document.getElementById(AVAILABLE_PINS_DIV).innerHTML = out;
            }).catch(err => {
                console.log(err);


            })
}

function displayAvailablePins() {
    $.getJSON('./droidcon-pins.json', function (data) {
        fetch(PIN_POINTS_URL)
            .then(dd => {
                return dd.text()
            })
            .then(d => {
                let splitByLine = d.split("\n");
                let oo = splitByLine.map(a => ({ "id": a.split(",")[0], "value": a.split(",")[1].replace("\r", ""), "total": a.split(",")[2].replace("\r", "") }))
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
