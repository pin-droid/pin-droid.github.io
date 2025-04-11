onmessage = (e) => {
    console.log("Message received from main script");
    const workerResult = `Result: ${e.data[0] * e.data[1]}`;
    console.log("Posting message back to main script");
    // postMessage(workerResult);
    let counter = 0
    setInterval(() => {
        counter++ 
        postMessage(counter);
    }, 1000);
    // for (let index = 0; index < 1000; index++) {
    //     setTimeout(() => {
    //         console.log(`Got ${index}`);
                    
    //         postMessage(workerResult);
    //     }, 1000);
    // }
  };