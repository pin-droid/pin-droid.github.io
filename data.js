//SUCCESSFULLY have access to Jquery
//Works
$.getJSON('data.json', function (data) {
    console.log(data);
    let out = ""
    data.forEach(element => {
        console.log(element);
        let droidName = ""
        let acquiredText = ""
        let visibilityStatus = ""
        let countStr = ""
        if (element.acquired != undefined && element.acquired != null) {
            if (element.acquired == true) {
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
        // document.getElementById("talks-container").innerHTML += `
        //     <div class="year">    
        //         ${element.year}
        //     </div>
        // `;
        // element.talks.forEach(talk => {
        //     if (talk.display === true) {
        //         let locationBlock = "";
        //         if (talk.where != null) {
        //             locationBlock = `<div class="talk-location">${highlightOnline(talk.where)}</div>`;
        //         }
        //         let linkBlock = "";
        //         if (talk.link != null) {
        //             linkBlock = `<div class="talk-link"><a href="${talk.link}">${talk.link}</a></div>`;
        //         }
        //         document.getElementById("talks-container").appendChild(createElementsFromHTML(`
        //             <div class="links-container-wide">
        //                 <div class="talk-date">
        //                     ${getShortDate(talk.date)}
        //                 </div>
        //                 <div class="talk-talk-block">
        //                     <div class="talk-title">${talk.title}</div>
        //                     ${locationBlock}
        //                     ${linkBlock}
        //                 </div>
        //             </div>
        //         `));
        //     }
        // });
    });
    document.getElementById("data").innerHTML = out
});
//<div class="talk-title">${titleCase(talk.title)}</div>
//

// function highlightOnline(str){
//     return str.replace("online","<b class='online'>online</b>");
// }

// function getShortDate(dateIn) {
//     let splitDate = dateIn.split(".")
//     return `${splitDate[0]} - ${splitDate[1]}`;
// }

// function titleCase(str) {
//     var splitStr = str.toLowerCase().split(' ');
//     for (var i = 0; i < splitStr.length; i++) {
//         // You do not need to check if i is larger than splitStr length, as your for does that for you
//         // Assign it back to the array
//         splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
//     }
//     // Directly return the joined string
//     return splitStr.join(' '); 
//  }

// function createElementsFromHTML(html) {
//     let elm = document.createElement("div");
//     elm.innerHTML = html;
//     return elm
// }