const AVAILABLE_PINS_DIV = "available-pins";

const PLAYER_COUNT_DIV = "player-count"
const PIN_SHARE_SCORE_DIV = "give-points-amount"

function loadCurrentPinDroidComp() {
    // $.ajaxSetup({
    //     async: false
    // });
    $.ajax({
        url: './pindroid.json',
        dataType: 'json',
        async: true,
        data: "",
        success: function (data) {
            console.log("D");
            console.log(data);
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
            displayAvailablePinsToFind(data.current.publicUrl, data.current.pinsBit, data.current.mediaFolder)
            displayPrizes(data.current.mediaFolder, data.current.prizes)
        }
    })
    // $.getJSON('./pindroid.json', function (data) {
    //     console.log(data);
    //     console.log(data.current);
    //     document.getElementById("title-place").innerHTML = data.current.location;
    //     document.getElementById("title-year").innerHTML = data.current.year;
    //     document.getElementById("registration-link").href = data.current.registrationUrl;
    //     getPublicStatsInfo(data.current.publicUrl, data.current.statsBit)
    //         .then(d => {
    //             console.log(d)
    //             displayTotalPlayers(d)
    //         })
    //     displayAvailablePinsToFind(data.current.pinsDataFile, data.current.publicUrl, data.current.pinsBit, data.current.mediaFolder)
    //     displayPrizes(data.current.mediaFolder, data.current.prizes)
    // })
}

function displayPrizes(mediaFolder, prizesArr) {
    let sorted = prizesArr.sort((a, b) => {
        return a.rank - b.rank
    })
    console.log(sorted);
    let out = ""
    let outOther = ""
    let scaleAmount = 250
    let showers = sorted.filter(e => e.individual == true)
    let other = sorted.filter(e => e.individual == false)
    showers.forEach(prize => {
        let med = ""
        if (prize.medalimg != null) {
            med = `<img class="prize-item-img-medal" src="/media/images-general/${prize.medalimg}"/>`
        }
        // <div class="prize-rank" style="font-size: ${scaleAmount}%">${prize.rankText}</div>
        out += `
            <div class="prize-item">
                <img class="prize-item-img" src="${mediaFolder}/${prize.img}"/>
                ${med}                
            </div>
        `
        scaleAmount = scaleAmount - 50
    });
    other.forEach(prize => {
        let med = ""
        if (prize.medalimg != null) {
            med = `<img class="prize-item-img-medal" src="/media/images-general/${prize.medalimg}"/>`
        }
        outOther += `
            <div class="prize-item">
                <img class="prize-item-img-other" src="${mediaFolder}/${prize.img}"/>
                <div class="prize-rank-other" style="font-size: ${scaleAmount}%">${prize.rankText}</div>
                ${med}                
            </div>
        `
        scaleAmount = scaleAmount - 50
    });

    document.getElementById("prizes").innerHTML = out;
    document.getElementById("prizes-other").innerHTML = outOther;
}

function fileExists(fileUrl) {
    var http = new XMLHttpRequest();
    http.open('HEAD', fileUrl, false);
    http.send();
    return http.status != 404;
}

// function getEventsBits(publicUrl, eventsBit) {
//     let fullurl = `${publicUrl}/export?exportFormat=csv&${eventsBit}`
//     return new Promise((resolve, reject) => {
//         fetch(fullurl)
//             .then(dd => {
//                 return dd.text()
//             })
//             .then(d => {
//                 resolve(d)
//             }).catch(err => {
//                 console.log(err);
//                 reject(err)
//             })
//     })
// }

function getPublicStatsInfo(publicUrl, statsBit) {
    let fullurl = `${publicUrl}/export?exportFormat=csv&${statsBit}`
    return new Promise((resolve, reject) => {
        fetch(fullurl)
            .then(dd => {
                return dd.text()
            })
            .then(d => {
                resolve(d)
            }).catch(err => {
                console.log(err);
                reject(err)
            })
    })
}

function displayAvailablePinsToFind(publicUrl, pinsBit, mediaFolder) {
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
    let differentPinCount = vals[4]
    let sharescore = vals[5]

    document.getElementById(PLAYER_COUNT_DIV).innerText = players
    // document.getElementById(PIN_SHARE_SCORE_DIV).innerText = sharescore
}

function blocck() {
    let counter = 0;
    for (let i = 0; i < 10_000_000_000; i++) {
        counter++;
    }
    document.getElementById("title-place").innerText = `Result: ${counter}`;
}

document.addEventListener('DOMContentLoaded', function (event) {
    console.log("Loaded");
    // blocck();
    // let worker = new Worker("workers/worker.js");
    // let workerOther = new Worker("workers/testworker.js");
    // workerOther.postMessage("");
    // workerOther.onmessage = (e) => {
    //     document.getElementById("title-place").innerText = `Result: ${e.data}`;
    // };

    // worker.postMessage(["a","b"]);
    // worker.onmessage = (e) => {
    //     console.log("Message received from worker= " +JSON.stringify(e));
    //     console.log("Message received from worker= " +JSON.stringify(e.data));
    // };
    loadCurrentPinDroidComp();


    // let a = new Worker("workers/requestWorker.js")
    // a.postMessage("")
    // a.onmessage = (b) => {
    //     console.log("********");

    //     console.log(b.data);
    //     console.log("********");

    // }
    // let aa = new Worker("workers/temp.js")
    // aa.postMessage("")
    // console.log("-----------");

    // aa.onmessage = (b) => {
    //     console.log("********");

    //     console.log(b.data);
    //     console.log("********");

    // }
})
