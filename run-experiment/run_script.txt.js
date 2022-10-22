var finalParams = [];
finalParams.push({type: "String", value: "$.value"});
finalParams.push({type: "String", value: "https://ros-services-express-running:9092/robot/"+Date.now()});
invokeFunctionWithParams("0x3f0ad96ca473765b64974638d56057084eee429b","doRequestWithParameters", finalParams, true);