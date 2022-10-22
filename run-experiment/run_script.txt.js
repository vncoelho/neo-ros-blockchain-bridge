var finalParams = [];
finalParams.push({type: "String", value: "$.value"});
finalParams.push({type: "String", value: "https://ros-services-express-running:9092/robot/"+Date.now()});
invokeFunctionWithParams("0x3f0ad96ca473765b64974638d56057084eee429b","doRequestWithParameters", finalParams, true);

// =========================

var CONTRACT_HASH = "0xf9b380a31bd0477484337794c5f5cf17120466e9";

var sampleVar;

function loopFunc(){    
  sampleVar = setTimeout(txFunc, 2000);
}

function txFunc(){    
    var finalParams = [];
    finalParams.push({type: "String", value: "$.value"});
    finalParams.push({type: "String", value: "https://ros-services-express-running:9092/robot/"+Date.now()});
    invokeFunctionWithParams(CONTRACT_HASH,"doRequestWithParameters", finalParams, true);
    //
    console.log("again, and again, and again!");
    sampleVar = setTimeout(txFunc, 1000);
}