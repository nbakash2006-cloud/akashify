function remind(i){
    let time = prompt("Remind after how many minutes?");
    if(!time) return;

    let delay = parseInt(time) * 60000;

    setTimeout(()=>{
        if(Notification.permission === "granted"){
            new Notification("🔔 Reminder", {
                body: posts[i].title
            });
        } else {
            alert("Reminder: " + posts[i].title);
        }
    }, delay);

    alert("Reminder set!");
}
