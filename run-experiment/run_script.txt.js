var CONTRACT_HASH = "0xd511d45e90187061640a7c7c885f10c44d6972af";

var sampleVar;

function loopFunc(){
  sampleVar = setTimeout(txFunc, 500);
}


urlPrivateNetwork = "https://ros-services-express-running:9092/robot/"
urlStarlinkBridge = "https://147.182.203.142:9092/robot/"

//urlPrivateNetwork+Date.now()

function txFunc(){
    var finalParams = [];
    finalParams.push({type: "String", value: "$.value"});
    finalParams.push({type: "String", value: urlStarlinkBridge+Date.now()});
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
