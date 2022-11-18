const photoInput = document.querySelector("#photoInput")
const titleInput = document.querySelector("#titleInput")
const btn =document.querySelector("#btn");
const login = document.querySelector(".login")
const div1 = document.querySelector(".sp")
const form = document.querySelector("#form");
const host = "http://localhost:3000";
let imgsTypes = ["image/jpeg", "image/jpg", "image/png"]



form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData();
  let file = photoInput.files[0]
  if(imgsTypes.includes(file.type)){
   let formData = new FormData()
   formData.append("file", photoInput.files[0]);
   formData.append("title", titleInput.value);
   const response = await fetch(host + "/upload", {
    method: "POST",
     body: formData,
    });
    let span1 = document.createElement('span')
   span1.textContent = 'Rasim yuklandi'
   span1.style.color = "green"
  div1.append(span1)
  photoInput.photo = null;
  titleInput.value = null;
  renderData();
   } 
  else {
  let span1 = document.createElement('span')
  span1.textContent = 'bu rasim formati emas!'
  span1.style.color = "red"
  div1.append(span1)
  }
  // console.log(response);
  
});

async function renderData() {
  const ul = document.querySelector("#list");
  const response = await fetch(host + "/photos");
  const photos = await response.json();

  ul.innerHTML = null;
  for (let photo of photos) {
    const li = document.createElement("li");
    const h3 = document.createElement("h3");
    const img = document.createElement("img");
    const a = document.createElement("a");

    h3.textContent = photo.title;
    a.textContent = "Yuklabolish",

    h3.setAttribute('style','color:red !important;')
    img.setAttribute("src",  "http://localhost:3000/photo" + photo.path);
    img.setAttribute("width", 200);
    a.setAttribute("href",  "http://localhost:3000/downloads/" + photo.path);
    
    li.append(h3, img, a);
    ul.append(li);
  }
}
// }


let nameValid = window.localStorage.getItem("nameId");
      if (!nameValid) {
        // window.location = "/login";
        login.addEventListener("click", () => {
          window.localStorage.removeItem("name");
          // localStorage.clear();
          window.location = "/login";
        })
         
        renderData();

      }
