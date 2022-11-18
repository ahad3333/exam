
let namelog = document.querySelector(".namelog");
let password = document.querySelector(".password")
let btn = document.querySelector(".add");
const div1 = document.querySelector(".sp")
let backPath = "http://localhost:3000"

 btn.addEventListener("click", async () => {
    let newUser = {
        name:namelog.value,
        password:password.value
      }
      let result = await fetch( "http://localhost:3000/login/:name/:password", {
        method: "GET",

      }); 
      result = await result.json()
      // window.location = "http://localhost:3000/photo"
      if(newUser === result){
        window.location = "http://localhost:3000/photo";
     }else{
    let span1 = document.createElement('span')
    span1.textContent = "name 3 hona va 12 hona orasida bo'lsin!"
    span1.style.color =  "red"
    div1.append(span1)
     }

    
 })