

let bachPath = "http://localhost:3000"; 
let nameInput = document.querySelector(".name");
let email = document.querySelector("#email")
let password = document.querySelector(".cod");
let ibk = document.querySelector(".ibk")
let btn = document.querySelector("button");
const div1 = document.querySelector(".sp")

 ibk.addEventListener("click", ()=>{
  window.localStorage.setItem("name","id");
  window.location = "http://localhost:3000/photo";
 })
btn.addEventListener("click", async () => {
  let newUser = {
    name:nameInput.value,
    email:email.value,
    password:password.value
  }
  let mail =newUser.email.length
  let lan =newUser.name.length
  let cod = newUser.password.length
  // }else if (newUser==null) {
//   let span1 = document.createElement('span')
//     span1.textContent = "gmail xato! example@gmail.com"
//     span1.style.color =  "red"
//     div1.append(span1)
   if(lan<3||lan>12){
    let span1 = document.createElement('span')
    span1.textContent = "name 3 hona va 12 hona orasida bo'lsin!"
    span1.style.color =  "red"
    div1.append(span1)
   
}else if (mail<5|| mail>50) {
  let span1 = document.createElement('span')
    span1.textContent = "email uzligi 5 hona va 50 hona orasida bo'lsin!"
    span1.style.color =  "red"
    div1.append(span1)
}else if (cod<5||cod>20) {
  let span1 = document.createElement('span')
    span1.textContent = "password uzligi 3 hona va 20 hona orasida bo'lsin!"
    span1.style.color =  "red"
    div1.append(span1)
// }else if (newUser==null) {
//   let span1 = document.createElement('span')
//     span1.textContent = "gmail xato! example@gmail.com"
//     span1.style.color =  "red"
//     div1.append(span1)
}
else{
  let result = await fetch( bachPath+"/registers", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(newUser, null, 2),
});
let span1 = document.createElement('span')
span1.textContent = "Ro'yhadan o'tigiz"
span1.style.color = "green"
div1.append(span1)
window.location = "http://localhost:3000/photo";
}

  nameInput.value =null
  email.value =null
  password.value=null
});

