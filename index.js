document.addEventListener('DOMContentLoaded', (event) => {
    const butonIniciarApp = document.getElementById("button-Init-App");
    const initContainer = document.getElementById("init");
    const containerPage = document.getElementById("page");
    const formAddTask = document.getElementsByClassName("form-for-list-item");
    const buttonAñadirTarea = document.getElementById("add-task"); 
    const parrafoCuandoNoHayTareas = document.getElementById("p-no-task");
   
  



    containerPage.classList.add("remove");
    formAddTask[0].classList.add("destruir");
 

   buttonAñadirTarea.addEventListener("click",  () => {
    parrafoCuandoNoHayTareas.classList.add("remove");
    formAddTask[0].classList.remove("destruir");
 
 

 
 
     
   })
    
    butonIniciarApp.addEventListener("click", () => {
        initContainer.classList.add("remove");
        containerPage.classList.remove("remove") 
    })
});
