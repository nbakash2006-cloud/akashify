let posts = JSON.parse(localStorage.getItem("posts")) || [];

function addPost(){
    let title = document.getElementById("title").value;
    let content = document.getElementById("content").value;
    let category = document.getElementById("category").value;

    if(!title || !content){
        showToast("Fill all fields ⚠️");
        return;
    }

    posts.push({
        title,
        content,
        category,
        done:false,
        date: new Date().toLocaleString()
    });

    save();
    clearInputs();
    render();
}

function save(){
    localStorage.setItem("posts", JSON.stringify(posts));
}

function clearInputs(){
    title.value="";
    content.value="";
}

function render(){
    let list = document.getElementById("posts");
    let search = document.getElementById("search").value.toLowerCase();

    list.innerHTML = "";

    posts.forEach((p,i)=>{
        if(!p.title.toLowerCase().includes(search)) return;

        let div = document.createElement("div");
        div.className = "post";

        div.innerHTML = `
            <h3 class="${p.done ? 'done':''}">${p.title}</h3>
            <p>${p.content}</p>
            <small>${p.date}</small><br>

            <button onclick="toggle(${i})">✔</button>
            <button onclick="del(${i})">❌</button>
        `;

        list.appendChild(div);
    });

    updateStats();
}

function toggle(i){
    posts[i].done = !posts[i].done;
    save();
    render();
}

function del(i){
    posts.splice(i,1);
    save();
    render();
}

function updateStats(){
    let total = posts.length;
    let done = posts.filter(p=>p.done).length;

    document.getElementById("stats").innerText =
        `Tasks: ${total} | Done: ${done}`;
}

function showToast(msg){
    let t = document.getElementById("toast");
    t.innerText = msg;
    t.classList.add("show");

    setTimeout(()=>{
        t.classList.remove("show");
    },2000);
}

window.onload = render;
