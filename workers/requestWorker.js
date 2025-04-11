onmessage = (a) => {
    //do request here!
    console.log("");

    loadConfig()
}

function loadConfig() {

    fetch("../pindroid.json")
        .then(d => {
            return d.json()
        })
        .then(j => {
            console.log(j);
            postMessage({ "success": true, "message": j })
        })
        .catch(err => {
            postMessage({ "success": false, "message": err })
        })
    // ajax.ajax({
    //     url: './pindroid.json',
    //     dataType: 'json',
    //     async: true,
    //     data: "",
    //     success: function (data) {
    //         postMessage(data)
    //     }
    // })
}