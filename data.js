//SUCCESSFULLY have access to Jquery
//Works

function getObjectFromLine(line){
    let split = line.split(",")
    return {
        "id": parseInt(split[0]),
        "got": split[1] === "TRUE" ? true : false,
        "name": split[2].replaceAll("\r","")
    }
}



document.addEventListener('DOMContentLoaded', function (event) {
    console.log("Loaded");
    fetch("https://docs.google.com/spreadsheets/d/142pRmJfXE8EJ7Vbr1oPlAkswwlG8Yr8iYflTFsqjZ18/export?exportFormat=csv")
        .then(dd => {
            return dd.text()
        })
        .then(ff => {
            console.log(ff);
            let cleanedData = ff.split("\n").map(e => getObjectFromLine(e))
            console.log(cleanedData);
            $.getJSON('data.json', function (data) {
                console.log(data);
                let out = ""
                let fullCount = data.length
                let currentAcquired = 0
                data.forEach(element => {
                    // console.log(element);
                    let droidName = ""
                    let acquiredText = ""
                    let visibilityStatus = ""
                    let countStr = ""
                    let foundDataObj = cleanedData.find(a => a.id === element.id)
                    console.log(foundDataObj);
                    if(foundDataObj.got === true){
                        currentAcquired++
                        visibilityStatus = "acquired"
                        acquiredText = `
                            <div class="driod-acquired-text">ACQUIRED</div>
                        `
                    }
                    // if (element.acquired != undefined && element.acquired != null) {
                    //     if (element.acquired == true) {
                    //         currentAcquired++
                    //         visibilityStatus = "acquired"
                    //         acquiredText = `
                    //             <div class="driod-acquired-text">ACQUIRED</div>
                    //         `
                    //     }
                    // }
                    // if (element.count != undefined && element.count != null && element.count != "") {
                    //     countStr = `
                    //         <div class="droid-count">
                    //             ${element.count}
                    //         </div>
                    //     `
                    // }
                    droidName = `
                        <div class="droid-name ${visibilityStatus == "acquired" ? "faded" : ""}">${element.name}</div>
                    `
                    out += `
                        <div class="droid-container">
                            <img class="droid-img ${visibilityStatus}" src="/media/${element.id}.jpg"></img>
                            ${countStr}
                            ${droidName}
                            ${acquiredText}
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
        .catch(err => {
            console.log(err);
        })
    // //I know this API key should not be here, 
    // // ?exportFormat=cs97,FALSE0 -  main 8146fa6 0 0 1  pin-droid.github.i-L https://docs.google.com/spreadsheets/d/142pRmJfXE8EJ7Vbr1oPlAkswwlG8Yr8iYflTFsqjZ18/export?exportFormat=csvtv
    // https://docs.google.com/spreadsheets/d/142pRmJfXE8EJ7Vbr1oPlAkswwlG8Yr8iYflTFsqjZ18/export?exportFormat=csvt
    // fetch(`https://sheets.googleapis.com/v4/spreadsheets/142pRmJfXE8EJ7Vbr1oPlAkswwlG8Yr8iYflTFsqjZ18/values/Sheet1!A1:B97?key=AIzaSyD9pBfjb2mUyAz1WDkFCvEaIt_uJ0qk5yU`)
    //     .then((data) => {
    //         return data.json()
    //     }).then((gotPins) => {
    //         console.log("data: ");
    //         console.log(gotPins.values);
    //         $.getJSON('data.json', function (data) {
    //             console.log(data);
    //             let out = ""
    //             let fullCount = data.length
    //             let currentAcquired = 0
    //             data.forEach(element => {
    //                 console.log(element);
    //                 let droidName = ""
    //                 let acquiredText = ""
    //                 let visibilityStatus = ""
    //                 let countStr = ""
    //                 if (element.acquired != undefined && element.acquired != null) {
    //                     if (element.acquired == true) {
    //                         currentAcquired++
    //                         visibilityStatus = "acquired"
    //                         acquiredText = `
    //                             <div class="driod-acquired-text">ACQUIRED</div>
    //                         `
    //                     }
    //                 }
    //                 // if (element.count != undefined && element.count != null && element.count != "") {
    //                 //     countStr = `
    //                 //         <div class="droid-count">
    //                 //             ${element.count}
    //                 //         </div>
    //                 //     `
    //                 // }
    //                 droidName = `
    //                     <div class="droid-name ${visibilityStatus == "acquired" ? "faded" : ""}">${element.name}</div>
    //                 `
    //                 out += `
    //                     <div class="droid-container">
    //                         <img class="droid-img ${visibilityStatus}" src="/media/${element.id}.jpg"></img>
    //                         ${countStr}
    //                         ${droidName}
    //                         ${acquiredText}
    //                     </div>
    //                 `
    //             });
    //             document.getElementById("data").innerHTML = out
    //             document.getElementById("stats").innerHTML = `
    //                 <div class="stats-text">
    //                     Acquired: <span class="stats-span">${currentAcquired}/${fullCount}</span>
    //                 </div>
    //             `
    //         });
    //     }).catch((err) => {
    //         console.log(err);
    //     })

})


