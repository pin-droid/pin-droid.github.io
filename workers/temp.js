/*
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
            displayAvailablePinsToFind(data.current.pinsDataFile, data.current.publicUrl, data.current.pinsBit, data.current.mediaFolder)
            displayPrizes(data.current.mediaFolder, data.current.prizes)
        }
    })
*/

onmessage = (e) => {
    //DO work
    loadConfig()
        .then(async (d) => {
            console.log("Loaded");
            console.log(d);
            let c = await loadPublicStats(d.current.publicUrl, d.current.statsBit)
            console.log(c);

        })
        .catch(err => {
            console.log("FAILED");
        })
}

function loadPublicStats(publicUrl, statsBit) {
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

        })
}

function loadConfig() {
    return new Promise((resolve, reject) => {
        fetch("../pindroid.json")
            .then(d => {
                return d.json()
            })
            .then(j => {
                resolve(j)
            })
            .catch(err => {
                reject(err)
            })
    })
}