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
const suscessful =  document.getElementById("successful");
const volver = document.getElementById("back");





 // remover paginas
 containerRegister.classList.add("remove");
 containerLogin.classList.add("remove")
 containerPage.classList.add("remove");


 suscessful.classList.add("remove");


 

    formAddTask.classList.add("remove");

    butonIniciarApp.addEventListener("click", () => {
        initContainer.classList.add("remove");
    containerLogin.classList.remove("remove")
    });

    const buttonLogin = document.getElementById("button-login");

    buttonLogin.addEventListener("click", async () => {



        const user = {
            email: document.getElementById("email1").value,
            password: document.getElementById("password").value,
          }

          
  await manejarInicioDeSesion(user);





       
    });

    buttonRegister.addEventListener("click", () => {
        containerLogin.classList.add("remove");
        containerRegister.classList.remove("remove");
   
    });
   
 



    buttonRegister2.addEventListener("click", () => {
        const user = {
            nombre: document.getElementById("name").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password2").value,
          }

          const registerForm =    document.getElementById("register");
          registerForm.addEventListener("submit", function(event) {
            event.preventDefault();
        let nombre = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let password = document.getElementById("password2").value.trim();
        
        if (!nombre || !email || !password) {
          alert("Todos los campos son obligatorios.");
          event.preventDefault();
          return;
        }
    
        if (!email.includes("@")) {
          alert("Ingresa un correo válido.");
          event.preventDefault();
          return;
        }
    
        if (password.length < 6) {
          alert("La contraseña debe tener al menos 6 caracteres.");
          event.preventDefault();
          return;
        } 
        
        crearUsuario(user)

        document.getElementById("register").classList.add("remove");
        suscessful.classList.remove("remove");
          
          volver.addEventListener("click", () => {
            suscessful.classList.add("remove");
            containerLogin.classList.remove("remove");
            containerRegister.classList.add("remove");
  
  
        
      });

    
          
         
    });
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
  
        if (inputAAñadirTarea.value.trim() !== "") {
            agregarTarea(inputAAñadirTarea.value, listaDeTareas);
            inputAAñadirTarea.value = ""; 

               }
           if(listaDeTareas.children.length >= 1){
            parrafoCuandoNoHayTareas.classList.add("remove");
           } else if (listaDeTareas.children.length === 0){
            parrafoCuandoNoHayTareas.classList.remove("remove");
           
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


   
  
function crearUsuario(usuario) {
      


    fetch('http://localhost:3002/register', {

        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    }) .then(res => res.json())
    .then(result => {
        console.log('datos enviados al servidor' ,result);
    })
    .catch(err => {
        console.log('error al enviar los datos', err);
    });
   
    }


    async function valdiarInicioDeSesion(usuario) {
        try {
            const response = await fetch('http://localhost:3002/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuario)
            });
            
            const data = await response.json(); 
    
            if (data.valid) {
                console.log('Inicio de sesión exitoso:', data.user);
                return true; 
            } else {
                console.log('Credenciales incorrectas:', data.mensaje);
                return false;  
            }
    
        } catch (err) {
            console.log('Error al enviar los datos', err);
            return false; 
        }
    }
    

    async function manejarInicioDeSesion(usuario) {
        const containerPage = document.getElementById("page");
        const containerLogin  = document.querySelector(".container___login");
        if (await valdiarInicioDeSesion(usuario)) {
            containerPage.classList.remove("remove");
            containerLogin.classList.add("remove");
        } else {
            console.log("No se pudo iniciar sesión.");
            alert("Credenciales incorrectas.");
        }
    }
    

    