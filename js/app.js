if(navigator.serviceWorker)
{
    navigator.serviceWorker.register("/sw.js")
    .then((registerObject)=>{console.log("Registered" , registerObject)})
    .catch((err)=>{console.log("Error" , err)});
}