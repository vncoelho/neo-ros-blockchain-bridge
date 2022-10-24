var CONTRACT_HASH = "0xd511d45e90187061640a7c7c885f10c44d6972af";

var sampleVar;

function loopFunc(){
  sampleVar = setTimeout(txFunc, 500);
}

function txFunc(){
    var finalParams = [];
    finalParams.push({type: "String", value: "$.value"});
    finalParams.push({type: "String", value: "https://ros-services-express-running:9092/robot/"+Date.now()});
    invokeFunctionWithParams(CONTRACT_HASH,"doRequestWithParameters", finalParams, true);
    //
    console.log("again, and again, and again!");
    sampleVar = setTimeout(txFunc, 500);
}

loopFunc();

// ======================

var CONTRACT_HASH = "0xd511d45e90187061640a7c7c885f10c44d6972af";
var finalParams = [];
finalParams.push({type: "Integer", value: 1500});
invokeFunctionWithParams(CONTRACT_HASH,"doRequestWithParameters", finalParams, true);
