using Neo;
using Neo.SmartContract;
using Neo.SmartContract.Framework;
using Neo.SmartContract.Framework.Attributes;
using Neo.SmartContract.Framework.Native;
using Neo.SmartContract.Framework.Services;
using System;
using System.Numerics;

namespace OracleDemo
{
    [ManifestExtra("Author", "Neo")]
    [ManifestExtra("Email", "dev@neo.org")]
    [ManifestExtra("Description", "This is an oracle example")]
    
    
    public class OracleDemo : SmartContract
    {
        public static void DoRequestFixed()
        {
            string url = "https://ros-services-express-running:9092/robot"; // the content is  { "value": "hello world" }
            string filter = "$.value";  // JSONPath format https://github.com/atifaziz/JSONPath
            string callback = "callback"; // callback method
            object userdata = "userdata"; // arbitrary type
            long gasForResponse = Oracle.MinimumResponseFee;
    
            Oracle.Request(url, filter, callback, userdata, gasForResponse);
        }

	// , long gasForResponse
        public static void DoRequestWithParameters(string filter, string url)
        {
            object[] number = {3};
            Runtime.Notify("HI 1",number);
            object userdata = "userdata"; // arbitrary type
            Runtime.Log("Inside DoRequest");
            string callback = "callback"; // callback method
            Runtime.Notify("HI 2",number);
            
            long gasForResponse = Oracle.MinimumResponseFee;
            Oracle.Request(url, filter, callback, userdata, gasForResponse);
        }
        
        public static string GetStorage()
        {
            return Storage.Get(Storage.CurrentContext, "sensor");
        }

        public static void Callback(string url, string userdata, OracleResponseCode code, string result)
        {
            object[] number = {3,14};
            Runtime.Notify("HI C1",number);
            if (Runtime.CallingScriptHash != Oracle.Hash) throw new Exception("Unauthorized!");
            Runtime.Notify("HI C2",number);
            if (code != OracleResponseCode.Success) throw new Exception("Oracle response failure with code " + (byte)code);
            
            Runtime.Notify("HI C3",number);
            
            object ret = StdLib.JsonDeserialize(result); // [ "hello world" ]
            object[] arr = (object[])ret;
            string value = (string)arr[0];

	        Storage.Put(Storage.CurrentContext, "sensor",value);
	        object[] arrValue = {value};
	        Runtime.Notify("HI value",arrValue);
            Runtime.Log("response value: " + value);
        }
    }
}

