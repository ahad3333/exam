const fileInput = document.querySelector("#filiInput")
const titleInput = document.querySelector("#titleInput")
const btn =document.querySelector("#btn");
const div1 = document.querySelector(".sp")
const form = document.querySelector("#form");
const host = "http://localhost:3000";
let imgsTypes = ["image/jpeg", "image/jpg", "image/png","video/mp4", "video/mov", "video/wmvv", "video/flv "]
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  let file = fileInput.files[0]
  if(imgsTypes.includes(file.type)){
    let span1 = document.createElement('span')
    span1.textContent = 'bu document formati emas!'
    span1.style.color = "red"
    div1.append(span1)
    } 
   else {
    let formData = new FormData()
   formData.append("file", fileInput.files[0]);
   formData.append("title", titleInput.value);
   const response = await fetch(host + "/uploadfile", {
     method: "POST",
     body: formData,
   });
      let span1 = document.createElement('span')
     span1.textContent = 'document yuklandi'
     span1.style.color = "green"
    div1.append(span1)
    fileInput.file = null;
    titleInput.value = null;
  
    renderData();
   }
});

async function renderData() {
  const ul = document.querySelector("#list");
  const response = await fetch(host + "/files");
  const files = await response.json();

  ul.innerHTML = null;
  for (let file of files) {
    const li = document.createElement("li");
    const h3 = document.createElement("h3");
    const img = document.createElement("img");
    const a = document.createElement("a");
    // const button =document.createElement("button")

    h3.textContent = file.title;
    a.textContent = "Yuklabolish",

    h3.setAttribute('style','color: red !important;')
    img.setAttribute("src", host + "/1" + file.path);
    img.setAttribute("width", 200);
    a.setAttribute("href", host + "/downloads1/" + file.path);

    // a.setAttribute('style','background-color: red !important;');
    
    li.append(h3, img, a);
    ul.append(li);
  }
}

renderData();