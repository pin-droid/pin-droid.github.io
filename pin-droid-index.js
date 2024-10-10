//SUCCESSFULLY have access to Jquery
const AVAILABLE_PINS_DIV = "available-pins";

//Works
// const SPACE_BUFFER = 10

// function getObjectFromLine(line) {
//     let split = line.split(",")
//     return {
//         "id": parseInt(split[0]),
//         "got": split[1].replaceAll("\r", "") === "TRUE" ? true : false,
//         "name": split[2].replaceAll("\r", ""),
//         "who": split[3].replaceAll("\r", ""),
//         "out": split[4].replaceAll("\r", "") === "TRUE" ? true : false,
//         "type": "MANUAL"
//     }
// }

// function cleanFromAutomatedFormResponse(line) {
//     let split = line.split(",")
//     let when = split[0].replaceAll("\r", "")
//     if (when != undefined && when != null & when != "") {
//         return {
//             "when": when,
//             "who": split[1].replaceAll("\r", ""),
//             "id": parseInt(split[2]),
//             "photo": split[3].replaceAll("\r", ""),
//             "description": split[4].replaceAll("\r", ""),
//             "type": "AUTO"
//         }
//     } else {
//         return null
//     }
// }

function displayAvailablePins() {
    $.getJSON('./droidcon-pins.json', function (data) {
        let out = "";
        data.forEach(element => {
            console.log(element);
            out += `
                <div class="pin-image-container">
                    <img class="pin-image" src="/media/droidcon-place-pins/${element.img}.png"/>
                    <div class="pin-image-text-container">
                        <div class="pin-image-title">${element.name}</div>
                        <div class="pin-image-points"><b class="point-value">${element.points}</b> <b class="points-text">points</b></div>
                        <div class="pin-image-amount">x${element.total}</div>
                    </div>
                </div>
            `
        });
        document.getElementById(AVAILABLE_PINS_DIV).innerHTML = out;
    });
}

document.addEventListener('DOMContentLoaded', function (event) {
    console.log("Loaded");
    displayAvailablePins();

    // fetch("https://docs.google.com/spreadsheets/d/142pRmJfXE8EJ7Vbr1oPlAkswwlG8Yr8iYflTFsqjZ18/export?exportFormat=csv&gid=289434024#gid=289434024")
    //     .then(dd => {
    //         return dd.text()
    //     })
    //     .then(ff => {
    //         //IMPORTANT DO NOT CHANGE THE TEXT NUMBER OF LINES IN THE FORM
    //         //10 removes all the first row of the form response
    //         let AutoCleanedData = ff.split("\n").slice(10).map(e => cleanFromAutomatedFormResponse(e)).filter(a => a != null)

    //         //in case of issues manual override
    //         fetch("https://docs.google.com/spreadsheets/d/142pRmJfXE8EJ7Vbr1oPlAkswwlG8Yr8iYflTFsqjZ18/export?exportFormat=csv")
    //             .then(inner => {
    //                 return inner.text()
    //             })
    //             .then(innerTexr => {
    //                 let manualCleaned = innerTexr.split("\n").map(e => getObjectFromLine(e))
    //                 $.getJSON('data.json', function (data) {
    //                     let out = ""
    //                     let fullCount = data.length
    //                     let currentOutCount = 0
    //                     let currentAcquired = 0
    //                     data.forEach(element => {
    //                         // console.log(element);
    //                         let droidName = ""
    //                         let whoStr = ""
    //                         let acquiredText = ""
    //                         let typeStr = ""
    //                         let typeStrDisplay = ""
    //                         let visibilityStatus = ""
    //                         let currentAvailable = ""
    //                         let countStr = ""
    //                         let notOutYetText = ""
    //                         let foundDataObjAuto = AutoCleanedData.find(a => a.id === element.id)
    //                         if (foundDataObjAuto != undefined && foundDataObjAuto != null) {
    //                             currentAcquired++
    //                             visibilityStatus = "acquired"
    //                             acquiredText = `
    //                                 <div class="driod-acquired-text">ACQUIRED</div>
    //                             `
    //                             if (foundDataObjAuto.who != "") {
    //                                 whoStr = `
    //                                     <div class="driod-acquired-who-container">
    //                                         <div class="driod-acquired-who">${foundDataObjAuto.who}</div>
    //                                         ${foundDataObjAuto.photo != "" ? `<div class="driod-acquired-who-img-icon" onclick="displayDialog('${foundDataObjAuto.photo}')">📸</div>` : ""}
    //                                     </div>
    //                                 `
    //                             }
    //                             typeStr = foundDataObjAuto.type
    //                         } else {
    //                             let foundDataObj = manualCleaned.find(a => a.id === element.id)
    //                             if (foundDataObj != undefined && foundDataObj != null & foundDataObj.got === true) {
    //                                 currentAcquired++
    //                                 visibilityStatus = "acquired"
    //                                 acquiredText = `
    //                                     <div class="driod-acquired-text">ACQUIRED</div>
    //                                 `
    //                                 if (foundDataObj.who != "") {
    //                                     whoStr = `
    //                                         <div class="driod-acquired-who">${foundDataObj.who}</div>
    //                                     `
    //                                 }
    //                                 typeStr = foundDataObj.type
    //                             } else {
    //                                 //add out andabout
    //                                 if (foundDataObj != undefined && foundDataObj != null & foundDataObj.out === true) {
    //                                     currentAvailable = "available"
    //                                     currentOutCount++
    //                                 } else {
    //                                     currentAvailable = "reserve"
    //                                     notOutYetText = `
    //                                     <div class="not-out-yet-text">NOT out there yet... Soon!</div>
    //                                 `
    //                                 }
    //                             }

    //                         }
    //                         droidName = `
    //                             <div class="droid-name ${visibilityStatus == "acquired" ? "faded" : ""}">${element.name}</div>
    //                         `
    //                         if (typeStr != "") {
    //                             typeStrDisplay = `
    //                                 <div class="droid-data-type ${typeStr}">${typeStr.substring(0, 1)}</div>
    //                             `
    //                         }
    //                         out += `
    //                             <div class="droid-container ${currentAvailable}">
    //                                 <img class="droid-img ${visibilityStatus}" src="/media/android-pins/${element.id}.jpg"></img>
    //                                 ${countStr}
    //                                 ${droidName}
    //                                 ${acquiredText}
    //                                 ${whoStr}
    //                                 ${typeStrDisplay}
    //                                 ${notOutYetText}
    //                             </div>
    //                         `
    //                     });
    //                     document.getElementById("data").innerHTML = out
    //                     document.getElementById("stats").innerHTML = `
    //                         <div class="stats-text">
    //                             <div class="stat-line">    
    //                                 Available Pins to find, NOW: <span class="current-out-label">${currentOutCount}</span>
    //                             </div>
    //                             <div class="stat-line">    
    //                                 Acquired: <span class="stats-span">${currentAcquired}/${fullCount}</span>
    //                             </div>
    //                         </div>
    //                     `
    //                 });
    //             })
    //         // let cleanedData = ff.split("\n").map(e => getObjectFromLine(e))
    //         // console.log(cleanedData);

    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })
})


// window.displayDialog = (content) => {
//     console.log(content);
//     let fileId = content.split("=")[1]
//     console.log(fileId);
//     let cc = `
//         <div class="image-container">
//             <img src="https://drive.google.com/thumbnail?id=${fileId}" />
//             <div class="x-button" onclick="killDialog()">X</div>
//         </div>
//     `
//     displayGenericHoverDialogWithContent(cc)
// }

// window.killDialog = () => {
//     hideGenericHoverDialog()
// }


// function getSizeOfElement(elem) {
//     document.body.appendChild(elem)
//     let rect = elem.getBoundingClientRect()
//     document.body.removeChild(elem)
//     return rect
// }

// function baseDisplayDialog(contents, anchor, containerAdditionalClasses, position) {
//     hideGenericHoverDialog()
//     var e = window.event
//     var posX = 100
//     var posY = 100

//     if (e != undefined) {
//         // posX = e.clientX + SPACE_BUFFER
//         // posY = e.clientY + SPACE_BUFFER
//         posX = e.pageX + SPACE_BUFFER
//         posY = e.pageY + SPACE_BUFFER
//     }

//     let htmlText = `
//         <div class="generic-dialog-container ${containerAdditionalClasses}">
//             ${contents}
//         </div>
//     `
//     var dialogBox = document.createElement('div')
//     dialogBox.id = 'generic-dialog'
//     dialogBox.innerHTML = htmlText
//     dialogBox.style.top = `${posY}px`
//     dialogBox.style.left = `${posX}px`

//     let size = getSizeOfElement(dialogBox)

//     if (posX + size.width >= window.innerWidth) {
//         dialogBox.style.maxWidth = "50%"
//         dialogBox.style.whiteSpace = "normal"

//         let remeasure = getSizeOfElement(dialogBox)
//         if (posX + remeasure.width >= window.innerWidth) {
//             dialogBox.style.right = `${window.innerWidth - posX + SPACE_BUFFER}px`
//             dialogBox.style.left = "unset"
//         }
//     }
//     if (posY + size.height >= window.innerHeight) {
//         dialogBox.style.bottom = `${window.innerHeight - posY + SPACE_BUFFER}px`
//         dialogBox.style.top = "unset"
//     }
//     document.body.appendChild(dialogBox)
// }

// function displayGenericHoverDialogWithContent(contentHTML) {
//     baseDisplayDialog(contentHTML)
// }

// function hideGenericHoverDialog() {
//     let otherelem = document.getElementById('all-next-steps-dialog')
//     if (otherelem != undefined && otherelem != null) {
//         document.body.removeChild(otherelem)
//     }
//     let elem = document.getElementById('generic-dialog')
//     if (elem != undefined && elem != null) {
//         document.body.removeChild(elem)
//     }
// }
