const AVAILABLE_PINS_DIV = "available-pins";

const PLAYER_COUNT_DIV = "player-count"
const PIN_SHARE_SCORE_DIV = "give-points-amount"

function loadCurrentPinDroidEvents() {
    $.getJSON('./pindroid.json', function (data) {
        getEventsBits(data.current.publicUrl, data.current.eventsBit)
            .then(a => {
                let lines = a.split('\n');
                let dataWithoutHeader = lines.slice(1);
                console.log(dataWithoutHeader)
                hideSpinner()
                displayUpcomingEvents(dataWithoutHeader)
            })


        //publicUrl 
    })
}

function hideSpinner() {
    document.getElementById("spinner").style.display = "none";
}

function getEventsBits(publicUrl, eventsBit) {
    let fullurl = `${publicUrl}/export?exportFormat=csv&${eventsBit}`
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

function cleanUpDateAndTime(dateIn, timeIn) {
    /*
    let eventDateString = "26/09/2025";
let eventTimeString = "12:00:00";
    */
    let [day, month, year] = dateIn.split('/');
    let formattedDate = `${year}-${month}-${day}T${timeIn}`;

    return new Date(formattedDate);
}

function displayUpcomingEvents(data) {
    let out = "";

    // Convert the data strings into objects for easier manipulation
    const events = data.map(element => {
        let vals = element.split(",");
        let date = vals[2];
        let time = vals[3];

        // Reformat date string to YYYY-MM-DD for reliable parsing
        let [day, month, year] = date.split('/');
        let formattedDate = `${year}-${month}-${day}T${time}`;
        let eventDate = new Date(formattedDate);
        console.log(eventDate)

        return {
            name: vals[0],
            what: vals[1],
            date: date,
            time: time,
            location: vals[4],
            datetimeObj: eventDate
        };
    });

    // Sort the events by date and time, with the newest at the top
    let sorted = events.toSorted((a, b) => b.datetimeObj + a.datetimeObj);
    //let sorted = events.sort((a, b) => b.datetimeObj + a.datetimeObj);

    const now = new Date();

    sorted.filter(e => now < e.datetimeObj).forEach(event => {
        let extra = "";

        // Add the "passed" class if the event is in the past
        if (now > event.datetimeObj) {
            extra = "passed";
        }

        out += `
            <div class="card ${extra}">
                <div class="event-datetime">
                    <div class="event-date">${event.date}</div>
                    <div class="event-time">${event.time}</div>
                </div>
                <div class="event-location">${event.location}</div>
                <div class="v-spacer"></div>
                <div class="event-name">${event.name}</div>
                <div class="event-what">${event.what}</div>
            </div>
        `;
    });

    document.getElementById("events-list").innerHTML = out;

    let outPast = ""
    sorted.filter(e => now > e.datetimeObj).forEach(event => {
        let extra = "";

        // Add the "passed" class if the event is in the past
        if (now > event.datetimeObj) {
            extra = "passed";
        }

        outPast += `
            <div class="card ${extra}">
                <div class="event-datetime">
                    <div class="event-date">${event.date}</div>
                    <div class="event-time">${event.time}</div>
                </div>
                <div class="event-location">${event.location}</div>
                <div class="v-spacer"></div>
                <div class="event-name">${event.name}</div>
                <div class="event-what">${event.what}</div>
            </div>
        `;
    });

    document.getElementById("past-events-list").innerHTML = outPast;
}

// function displayUpcomingEvents(data) {
//     let out = ""
//     data.forEach(element => {
//         let vals = element.split(",")
//         let name = vals[0]
//         let what = vals[1]
//         let date = vals[2]
//         let time = vals[3]
//         let location = vals[4]
//         let cleanedUpWhen = cleanUpDateAndTime(date, time)
//         const now = new Date();
//         let extra= ""

//         if (now > cleanedUpWhen) {
//             // This condition is true if the current time is AFTER the event time
//             console.log("The event has already passed. Do not show it.");
//             extra="passed"
//         } else {
//             // This is true if the current time is BEFORE or equal to the event time
//             console.log("The event is still in the future. Show it.");
//         }
//         console.log(cleanedUpWhen)
//         console.log(`${name} => ${what} : ${date} : ${time} , ${location}`)
//         out += `
//             <div class="card ${extra}">
//                 <div class="event-datetime">
//                     <div class="event-date">${date}</div>
//                     <div class="event-time">${time}</div>
//                 </div>
//                 <div class="event-location">${location}</div>
//                 <div class="v-spacer"></div>
//                 <div class="event-name">${name}</div>
//                 <div class="event-what">${what}</div>
//             </div>
//         `
//     });
//     document.getElementById("events-list").innerHTML = out

// }

// function getPublicStatsInfo(publicUrl, statsBit) {
//     let fullurl = `${publicUrl}/export?exportFormat=csv&${statsBit}`
//     return new Promise((resolve, reject) => {
//         fetch(fullurl)
//             .then(dd => {
//                 return dd.text()
//             })
//             .then(d => {
//                 // var lines = d.split('\n');
//                 // lines.splice(0, 1);
//                 // var newtext = lines.join('\n');
//                 // displayTotalPlayers(d)
//                 resolve(d)
//             }).catch(err => {
//                 console.log(err);
//                 reject(err)


//             })
//     })
//     //gid=1572919526#gid=1572919526
// }

// function displayTotalPlayers(data) {
//     let splitByLine = data.split("\n");
//     splitByLine.shift();

//     let vals = splitByLine[0].split(",")

//     let total = vals[0]
//     let found = vals[1]
//     let left = vals[2]
//     let players = vals[3]
//     let differentPinCount = vals[4]
//     let sharescore = vals[5]

//     console.log(differentPinCount);

//     document.getElementById(PIN_SHARE_SCORE_DIV).innerText = sharescore
// }

document.addEventListener('DOMContentLoaded', function (event) {
    console.log("Loaded");
    loadCurrentPinDroidEvents();
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
