document.addEventListener('DOMContentLoaded', (event) => {
    const butonIniciarApp = document.getElementById("button-Init-App");
    const initContainer = document.getElementById("init");
    const containerPage = document.getElementById("page");
    const formAddTask = document.querySelector(".form___add-task");
    const buttonAñadirTarea = document.getElementById("add-task"); 
    const parrafoCuandoNoHayTareas = document.getElementById("p-no-task");
    const bottonClose = document.getElementById("cancel");
    const listaDeTareas = document.querySelector(".list-task");
    const inputAAñadirTarea = document.getElementById("tarea");
    const buttonConfirmarTarea = document.getElementById("add");
  const containerLogin  = document.querySelector(".container___login");
const containerRegister = document.querySelector(".container___register");  
const buttonRegister = document.getElementById("button-register");
const buttonRegister2 = document.getElementById("button-register2");

 // remove paginas
 containerRegister.classList.add("remove")
 containerLogin.classList.add("remove")
 containerPage.classList.add("remove");


 
   
    formAddTask.classList.add("remove");

    butonIniciarApp.addEventListener("click", () => {
        initContainer.classList.add("remove");
    containerLogin.classList.remove("remove")
    });

    const buttonLogin = document.getElementById("button-login");

    buttonLogin.addEventListener("click", () => {
        containerLogin.classList.add("remove");
        containerPage.classList.remove("remove");
       
    });

    buttonRegister.addEventListener("click", () => {
        containerLogin.classList.add("remove");
        containerRegister.classList.remove("remove");
    });

    buttonRegister2.addEventListener("click", () => {
        containerRegister.classList.add("remove");
        containerLogin.classList.remove("remove");
    });

    buttonAñadirTarea.addEventListener("click", () => {
        document.getElementById("overlay").classList.add("show");
        parrafoCuandoNoHayTareas.classList.add("remove");
        formAddTask.classList.remove("remove");
    });

    bottonClose.addEventListener("click", () => {
        document.getElementById("overlay").classList.remove("show");
        formAddTask.classList.add("remove");
    });

    buttonConfirmarTarea.addEventListener("click", () => {
        parrafoCuandoNoHayTareas.classList.add("remove");
        if (inputAAñadirTarea.value.trim() !== "") {
            agregarTarea(inputAAñadirTarea.value, listaDeTareas);
            inputAAñadirTarea.value = ""; 
            
        }
        document.getElementById("overlay").classList.remove("show");
        formAddTask.classList.add("remove");
    });

    const inputs = document.querySelectorAll(".items___inputs");
  

    inputs.forEach(input => {
        input.addEventListener("input", () => {
            const labelline = input.nextElementSibling;
            if (input.value.trim() !== "") {
                labelline.classList.add("focus");
                input.classList.add("input_focus");
            } else {
                labelline.classList.remove("focus");
            }
        });
    });

});
function agregarTarea(textoTarea, lista) {
    const li = document.createElement("li");
    li.classList.add("task");

    const div1 = document.createElement("div");
    div1.classList.add("marcador-task");

    const textTarea = document.createElement("span");
    textTarea.classList.add("task-text");
    textTarea.textContent = textoTarea;


    const buttonBorrarTarea = document.createElement("button")
    buttonBorrarTarea.textContent = "Borrar Tarea";
    buttonBorrarTarea.classList.add("button-borrar-tarea")
     
    const div = document.createElement("div");
    const div2= document.createElement("div");
    const div3 = document.createElement("div");
    
    div.appendChild(div1);
    div2.appendChild(textTarea);
    div3.appendChild(buttonBorrarTarea)


    div.classList.add("task___containers")
    div2.classList.add("task___containers")
    div3.classList.add("task___containers")

    li.appendChild(div)
    li.appendChild(div2)
    li.appendChild(div3)

    lista.appendChild(li);

    div1.addEventListener("click", function (event) {
        event.stopPropagation(); 
        marcarTarea(div1,textTarea);
    });

    buttonBorrarTarea.addEventListener("click", () => {
        const parrafoCuandoNoHayTareas = document.getElementById("p-no-task");
         lista.removeChild(li)
       
       if (lista.children.length === 0) {
        parrafoCuandoNoHayTareas.classList.remove("remove");
        actualizarTitleTareas(lista.children.length)
    } else{
        actualizarTitleTareas(lista.children.length)

    }
    })
    actualizarTitleTareas(lista.children.length)
}

function marcarTarea(divAserMarcado,textoAmarcar) {
    const marcador = divAserMarcado.querySelector(".marcador-task-iniciado");

    if (marcador) {
        divAserMarcado.removeChild(marcador);
        textoAmarcar.classList.remove("tachado")
    } else {
        const div2 = document.createElement("div");
        div2.classList.add("marcador-task-iniciado");
        divAserMarcado.appendChild(div2);
        textoAmarcar.classList.add("tachado")
    }

    
}
function actualizarTitleTareas(cantidadDeTareas){
     const titleCantidadDeTareas = document.getElementById("text-cantidad-tareas");
    titleCantidadDeTareas.textContent = `You have ${cantidadDeTareas} task today`

}

