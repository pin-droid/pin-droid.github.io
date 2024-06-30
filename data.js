//SUCCESSFULLY have access to Jquery
//Works

function getObjectFromLine(line) {
    let split = line.split(",")
    return {
        "id": parseInt(split[0]),
        "got": split[1] === "TRUE" ? true : false,
        "name": split[2].replaceAll("\r", ""),
        "who": split[3].replaceAll("\r", ""),
        "type": "MANUAL"
    }
}

function cleanFromAutomatedFormResponse(line) {
    let split = line.split(",")
    let when = split[0].replaceAll("\r", "")
    if (when != undefined && when != null & when != "") {
        return {
            "when": when,
            "who": split[1].replaceAll("\r", ""),
            "id": parseInt(split[2]),
            "photo": split[3].replaceAll("\r", ""),
            "description": split[4].replaceAll("\r", ""),
            "type": "AUTO"
        }
    } else {
        return null
    }
}


document.addEventListener('DOMContentLoaded', function (event) {
    console.log("Loaded");
    fetch("https://docs.google.com/spreadsheets/d/142pRmJfXE8EJ7Vbr1oPlAkswwlG8Yr8iYflTFsqjZ18/export?exportFormat=csv&gid=289434024#gid=289434024")
        .then(dd => {
            return dd.text()
        })
        .then(ff => {
            console.log(ff);
            let AutoCleanedData = ff.split("\n").slice(1).map(e => cleanFromAutomatedFormResponse(e)).filter(a => a != null)
            console.log(AutoCleanedData);

            //in case of issues manual override
            fetch("https://docs.google.com/spreadsheets/d/142pRmJfXE8EJ7Vbr1oPlAkswwlG8Yr8iYflTFsqjZ18/export?exportFormat=csv")
                .then(inner => {
                    return inner.text()
                })
                .then(innerTexr => {
                    console.log(innerTexr);
                    let manualCleaned = innerTexr.split("\n").map(e => getObjectFromLine(e))
                    console.log(manualCleaned);
                    $.getJSON('data.json', function (data) {
                        console.log(data);
                        let out = ""
                        let fullCount = data.length
                        let currentAcquired = 0
                        data.forEach(element => {
                            // console.log(element);
                            let droidName = ""
                            let whoStr = ""
                            let acquiredText = ""
                            let typeStr = ""
                            let typeStrDisplay = ""
                            let visibilityStatus = ""
                            let countStr = ""
                            let foundDataObjAuto = AutoCleanedData.find(a => a.id === element.id)
                            console.log(foundDataObjAuto);
                            if (foundDataObjAuto != undefined && foundDataObjAuto != null) {
                                currentAcquired++
                                visibilityStatus = "acquired"
                                acquiredText = `
                                    <div class="driod-acquired-text">ACQUIRED</div>
                                `
                                if (foundDataObjAuto.who != "") {
                                    whoStr = `
                                        <div class="driod-acquired-who">${foundDataObjAuto.who}</div>
                                    `
                                }
                                typeStr = foundDataObjAuto.type
                            } else {
                                let foundDataObj = manualCleaned.find(a => a.id === element.id)
                                console.log(foundDataObj);
                                if (foundDataObj != undefined && foundDataObj != null & foundDataObj.got === true) {
                                    currentAcquired++
                                    visibilityStatus = "acquired"
                                    acquiredText = `
                                        <div class="driod-acquired-text">ACQUIRED</div>
                                    `
                                    if (foundDataObj.who != "") {
                                        whoStr = `
                                            <div class="driod-acquired-who">${foundDataObj.who}</div>
                                        `
                                    }
                                    typeStr = foundDataObj.type
                                }
                            }
                            droidName = `
                                <div class="droid-name ${visibilityStatus == "acquired" ? "faded" : ""}">${element.name}</div>
                            `
                            if(typeStr != ""){
                                typeStrDisplay = `
                                    <div class="droid-data-type ${typeStr}">${typeStr.substring(0,1)}</div>
                                `
                            }
                            out += `
                                <div class="droid-container">
                                    <img class="droid-img ${visibilityStatus}" src="/media/${element.id}.jpg"></img>
                                    ${countStr}
                                    ${droidName}
                                    ${acquiredText}
                                    ${whoStr}
                                    ${typeStrDisplay}
                                </div>
                            `
                        });
                        document.getElementById("data").innerHTML = out
                        document.getElementById("stats").innerHTML = `
                            <div class="stats-text">
                                Acquired: <span class="stats-span">${currentAcquired}/${fullCount}</span>
                            </div>
                        `
                    });
                })
            // let cleanedData = ff.split("\n").map(e => getObjectFromLine(e))
            // console.log(cleanedData);

        })
        .catch(err => {
            console.log(err);
        })
})


