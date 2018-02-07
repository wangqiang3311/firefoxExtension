/*
On startup, connect to the "ping_pong" app.
*/
var port =null;
var host_name = "ping_pong";


function connectToNative(message) {
      console.log('Connecting to native host: ' + host_name);
	  port=browser.runtime.connectNative(host_name);
      
	  port.onMessage.addListener((response) => {
        console.log(new Date()+",Received: " + response);
      });

      port.onDisconnect.addListener(()=>{
         console.log('disconnected from native app.');
         port = null;
	  });
     sendNativeMessage(message);
 }
 
 function sendNativeMessage(msg) {
    port.postMessage(msg);
    console.log('Sent message to native app: ' + msg);
}
 
 

/*
On a click on the browser action, send the app a message.
*/
browser.browserAction.onClicked.addListener(() => {
  connectToNative("ping")

});


function getClickHandler() {
      return function(info, tab) { 
	  
	    console.log(info);
		console.log(tab);

	    connectToNative("ping from click");
	}
 }


browser.contextMenus.create({
    id: "notefirst",
    title: "notefirst",
    contexts: ["all"],
	onclick : getClickHandler()
});

// browser.contextMenus.onClicked.addListener((info, tab) => {
    // if (info.menuItemId === "notefirst") {
		// connectToNative("ping from notefirst");
    // }
// });

