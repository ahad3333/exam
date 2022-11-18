const videoInput = document.querySelector("#videoInput")
const titleInput = document.querySelector("#titleInput")
const btn =document.querySelector("#btn");
const div1 = document.querySelector(".sp")
const form = document.querySelector("#form");
const host = "http://localhost:3000";
let videotypes=["video/mp4", "video/mov", "video/wmvv", "video/flv "]

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  let file = videoInput.files[0]
  if(videotypes.includes(file.type)){
    let formData = new FormData()
    formData.append("file", videoInput.files[0]);
    formData.append("title", titleInput.value);
    const response = await fetch(host + "/uploadvideo", {
      method: "POST",
      body: formData,
    });
     let span1 = document.createElement('span')
    span1.textContent = 'Video yuklandi'
    span1.style.color = "green"
   div1.append(span1)
   videoInput.video = null;
   titleInput.value = null;
 
   renderData();
    } 
   else {
   let span1 = document.createElement('span')
   span1.textContent = 'bu Video formati emas!'
   span1.style.color = "red"
   div1.append(span1)
   videoInput.video = null;
   titleInput.value = null;
   div1.append(null)
   }
 
});

async function renderData() {
  const ul = document.querySelector("#list");
  const response = await fetch(host + "/videos");
  const videos = await response.json();

  ul.innerHTML = null;
  for (let video of videos) {
    const li = document.createElement("li");
    const h3 = document.createElement("h3");
    const img = document.createElement("img");
    const a = document.createElement("a");
    // const button =document.createElement("button")

    h3.textContent = video.title;
    a.textContent = "Yuklabolish",

    h3.setAttribute('style','color: dark_brown !important;')
    img.setAttribute("src", host + "/1" + video.path);
    img.setAttribute("width", 200);
    a.setAttribute("href", host + "/downloads2/" + video.path);

    // a.setAttribute('style','background-color: red !important;');
    
    li.append(h3, img, a);
    ul.append(li);
  }
}

renderData();