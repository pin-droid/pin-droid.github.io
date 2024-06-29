//SUCCESSFULLY have access to Jquery
//Works

document.addEventListener('DOMContentLoaded', function (event) {
    console.log("Loaded");
    //I know this API key should not be here, 
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/142pRmJfXE8EJ7Vbr1oPlAkswwlG8Yr8iYflTFsqjZ18/values/Sheet1!A1:B97?key=AIzaSyD9pBfjb2mUyAz1WDkFCvEaIt_uJ0qk5yU`)
        .then((data) => {
            return data.json()
        }).then((gotPins) => {
            console.log("data: ");
            console.log(gotPins.values);
            $.getJSON('data.json', function (data) {
                console.log(data);
                let out = ""
                let fullCount = data.length
                let currentAcquired = 0
                data.forEach(element => {
                    console.log(element);
                    let droidName = ""
                    let acquiredText = ""
                    let visibilityStatus = ""
                    let countStr = ""
                    if (element.acquired != undefined && element.acquired != null) {
                        if (element.acquired == true) {
                            currentAcquired++
                            visibilityStatus = "acquired"
                            acquiredText = `
                                <div class="driod-acquired-text">ACQUIRED</div>
                            `
                        }
                    }
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
        }).catch((err) => {
            console.log(err);
        })

})


