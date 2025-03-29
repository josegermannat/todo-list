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

const suscessful =  document.getElementById("successful");








 // remover paginas

 containerRegister.classList.add("remove");
 containerLogin.classList.add("remove")
containerPage.classList.add("remove")


suscessful.classList.add('remove')


 

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
        
        document.getElementById("register").classList.remove("remove");
        
   
    });
   
 



    document.getElementById('button-register2').addEventListener('click', (event) => {
        event.preventDefault(event); // Evita el envío automático
    
        let nombre = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let password = document.getElementById("password2").value.trim();
        
        if (!nombre || !email || !password) {
            alert("Todos los campos son obligatorios.");
           
            return;
        }
    
        if (!email.includes("@")) {
            alert("Ingresa un correo válido.");
          
            return;
        }
    
        if (password.length < 6) {
            alert("La contraseña debe tener al menos 6 caracteres.");
            
            return;
        } 
    
        // Crear FormData después de validar
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('imgProfile', document.getElementById('file-upload').files[0]);
      
        // Intentamos registrar el usuario
        crearUsuario(formData)
            .then((exito) => {
                if (exito) {
                   
                    document.getElementById("register").classList.add("remove");
                   document.getElementById('successful').classList.remove("remove");
                }
            })
            .catch((error) => {
                console.error("Error al registrar el usuario:", error);
            });

   
    });
    const volver = document.getElementById("back");

    volver.addEventListener("click", () => {
        suscessful.classList.add("remove");
        containerLogin.classList.remove("remove");
        containerRegister.classList.add("remove");


    
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



function previewImage(event, selector) {
    
    console.log(event);
    const input = event.target;
    const imgPreview = document.querySelector(selector);
  
    if (!input.files.length) return;
  
    const file = input.files[0];
    const objectURL = URL.createObjectURL(file);
  
    imgPreview.src = objectURL;
    imgPreview.classList.remove("remove");
  
    
    document.getElementById('label-file').classList.add('remove');
  
    const contenedorDePhoto = document.getElementById("change-photo");
  
    // Verifica si ya existe un botón para cambiar la foto
    let buttonCambiarPhoto = document.querySelector('.button-change-photo');
  
    if (!buttonCambiarPhoto) {
        buttonCambiarPhoto = document.createElement("button");
        buttonCambiarPhoto.innerHTML = "Cambiar Foto";
        buttonCambiarPhoto.classList.add("button-change-photo");
        contenedorDePhoto.appendChild(buttonCambiarPhoto);
  
        buttonCambiarPhoto.addEventListener("click", () => {
            const labelFile = document.getElementById('label-file');
            URL.revokeObjectURL(imgPreview.src); // Revoca el objeto antes de limpiarlo
            imgPreview.src = "";
            input.value = "";
            imgPreview.classList.add("remove");
            labelFile.classList.remove('remove');
  
            // Elimina el botón completamente
            buttonCambiarPhoto.remove();
        });
    }
  
  return input.value
}

  
  
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


   
async function crearUsuario(usuario) {
    try {
        const response = await fetch('http://localhost:3002/register', {
            method: 'POST',
            body: usuario
        });

        const result = await response.json();
        console.log('Datos enviados al servidor', result);
        return true;
    } catch (err) {
        console.log('Error al enviar los datos', err);
        return false;
    }
}

    function actualizarImagenDePerfil(imagen) {
        const imgElement = document.getElementById('imgPreview2');  // Elemento de imagen en el HTML
        imgElement.src = `http://localhost:3002${imagen}`;  // Crear la URL completa
    }


    async function valdiarInicioDeSesion(usuario) {
        try {
            const response = await fetch('http://localhost:3002/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuario),
            });
    
            const data = await response.json();
            console.log(data); // Imprime toda la respuesta para verificar que el campo imgProfile existe
    
            if (data.valid) {
                console.log('Inicio de sesión exitoso:', data.user);
                return {
                    boolean: true,
                    data: data, // Pasa solo el objeto user
                };
            } else {
                console.log('Credenciales incorrectas:', data.mensaje);
                return {
                    boolean: false,
                    data: null
                };
            }
    
        } catch (err) {
            console.log('Error al enviar los datos', err);
            return {
                boolean: false,
                data: null
            };
        }
    }

    async function manejarInicioDeSesion(usuario) {
        const containerPage = document.getElementById("page");
        const containerLogin  = document.querySelector(".container___login");
        const resultado = await valdiarInicioDeSesion(usuario);
    
        if (resultado.boolean) {
            const imgUrl = resultado.data.user.imgprofile;
            console.log('URL de imagen:', imgUrl); // Verifica que imgUrl no sea undefined
    
            if (imgUrl) {
                actualizarImagenDePerfil(imgUrl);
            } else {
                console.log('No hay imagen de perfil disponible');
                document.getElementById('imgPreview2').src = 'images/1000_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg' 
            }
    
            containerPage.classList.remove("remove");
            containerLogin.classList.add("remove");
        } else {
            console.log("No se pudo iniciar sesión.");
            alert("Credenciales incorrectas.");
        }
    }
    
    