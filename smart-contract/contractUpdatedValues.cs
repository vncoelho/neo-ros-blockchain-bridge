using Neo;
using Neo.SmartContract;
using Neo.SmartContract.Framework;
using Neo.SmartContract.Framework.Attributes;
using Neo.SmartContract.Framework.Native;
using Neo.SmartContract.Framework.Services;
using System;
using System.Numerics;

namespace RosStarlinkRegistering
{
    [ManifestExtra("Author", "Neo")]
    [ManifestExtra("Email", "dev@neo.org")]
    [ManifestExtra("Description", "This is an oracle for registering ROS data published from a starlink connected robxxxxot")]
    
    public class RosStarlinkRegistering : SmartContract
    {
        public static void DoRequestFixed()
        {
            //https://147.182.203.142:9092/robot
            string url = "https://ros-services-express-running:9092/robot111"; // the content is  { "value": "hello world" }
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
            
            long gasForResponse = 1000000000;
            Oracle.Request(url, filter, callback, userdata, gasForResponse);
        }
        
        public static string GetStorage()
        {
            object[] number = {3};
            Runtime.Notify("GetStorage", number);
            string s = Storage.Get(Storage.CurrentContext, "sensor");
            Runtime.Notify(s, number);
            return s;
        }
        
        public static void Reset(int nonce)
        {
            BigInteger bigzero = BigInteger.Zero;
            Storage.Put(Storage.CurrentContext, "val0", nonce);
            Storage.Put(Storage.CurrentContext, "val1", nonce);
            Storage.Put(Storage.CurrentContext, "val2", nonce);
            Storage.Put(Storage.CurrentContext, "bigdiff", bigzero);
            BigInteger big3 = 3;
            Storage.Put(Storage.CurrentContext, "count", big3);
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
            // string value = (string)arr[0];
            BigInteger value = (BigInteger)arr[0];
            value = value + 1;

	        Storage.Put(Storage.CurrentContext, "sensor",value);
	        
	        
	        
	        // ROTATE latest three data
	        // ASSUMING its ZERO for unitialized data
	        BigInteger val0 = (BigInteger)Storage.Get(Storage.CurrentContext, "val0");
	        BigInteger val1 = (BigInteger)Storage.Get(Storage.CurrentContext, "val1");
	        BigInteger val2 = (BigInteger)Storage.Get(Storage.CurrentContext, "val2");
	        //
	        // CHECK IF STRICTLY INCREASING
	        if(val2 > value) {
	            object[] arrValue1 = {value};
	            Runtime.Notify("IGNORED new value less than val2",arrValue1);
	            return;
	        }
	        //
	        Storage.Put(Storage.CurrentContext, "val0",val1);
	        Storage.Put(Storage.CurrentContext, "val1",val2);
	        Storage.Put(Storage.CurrentContext, "val2",value);
	        
	        BigInteger count = (BigInteger)Storage.Get(Storage.CurrentContext, "count");
	        if(count == 0) {
    	        // CALCULATE and store the biggest difference
    	        BigInteger diff = value - val2;
    	        BigInteger bigdiff = (BigInteger)Storage.Get(Storage.CurrentContext, "bigdiff");
    	        if(diff > bigdiff) {
    	           // new big difference
    	           Storage.Put(Storage.CurrentContext, "bigdiff",diff);
    	           object[] arrValue0 = {diff};
    	           Runtime.Notify("UPDATED bigdiff",arrValue0);
    	        }
	        } else {
	            Storage.Put(Storage.CurrentContext, "count",count-1);
	        }
	        //
	        
	        object[] arrValue = {value};
	        Runtime.Notify("HI value",arrValue);
            Runtime.Log("response value: " + value);
        }
    }
}

