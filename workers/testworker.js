onmessage = (e) => {
    blocckOther()
};


function blocckOther(){
    let counter = 0;
    for (let i = 0; i < 10_000_000_000; i++) {
      counter++;
    }
    postMessage(counter)
}