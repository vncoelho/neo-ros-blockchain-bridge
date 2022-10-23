var CONTRACT_HASH = "0xd277dd16fba842ab5c6ead82a6ec0c33a2fdf6bb";

var sampleVar;

function loopFunc(){    
  sampleVar = setTimeout(txFunc, 1000);
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

// ======================

var CONTRACT_HASH = "0xd277dd16fba842ab5c6ead82a6ec0c33a2fdf6bb";
var finalParams = [];
finalParams.push({type: "Integer", value: 1500});
invokeFunctionWithParams(CONTRACT_HASH,"doRequestWithParameters", finalParams, true);