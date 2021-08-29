//variables
const btnEnviar = document.querySelector("#enviar");
const btnReset = document.querySelector("#resetBtn");
const mail = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");
const form = document.querySelector('#enviar-mail');
const emailValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ;

eventListener();
function eventListener(){
    //cuando arranca la pagina
    document.addEventListener('DOMContentLoaded', iniciarApp);

    //cuando presiono sobre los inputs
    mail.addEventListener('blur',validarFormulario);
    asunto.addEventListener('blur',validarFormulario);
    mensaje.addEventListener('blur',validarFormulario);

    //resetear formulario
    btnReset.addEventListener('click',resForm);

    //enviar email
    form.addEventListener('submit', enviarMail);
    
}

//funciones

function iniciarApp(){  
    btnEnviar.disabled= true;
    btnEnviar.classList.add('cursor-not-allowed','opacity-50');//cuando carga la pagina, este boton no se podra presionar
    
}

function validarFormulario(e){

    //validar que los campos no esten vacios
    
    if(e.target.value.length > 0){
        const eliminarError = document.querySelector('p.error');
        if(eliminarError) eliminarError.remove();
        e.target.classList.remove('border-red-500');
        e.target.classList.add('border','border-green-500');
       
        if(eliminarError) eliminarError.remove();
        
        
    }else{
        e.target.classList.remove('border-green-500');
        e.target.classList.add('border','border-red-500');
        
        mostrarError('todos los campos son obligatorios');
    }

    //validad el correo con una expresion regular sacada de https://emailregex.com/
    if(e.target.type === 'email'){
        
        const eliminarError = document.querySelector("p.error");//selecciono el mensaje de error que se genera cuando pongo mal un dato

        if(emailValid.test(e.target.value)){
            const eliminarError = document.querySelector('p.error');
            if(eliminarError) eliminarError.remove();
            e.target.classList.remove('border-red-500');
            e.target.classList.add('border','border-green-500');
        }
        else{
            e.target.classList.remove('border-green-500');
            e.target.classList.add('border','border-red-500');            

            mostrarError('Email incorrecto');
        }
    }

    
    //si todo esta ok, que se muestre el boton de enviar
    if(emailValid.test(mail.value) && asunto.value !=='' && mensaje.value !== '') 
    {
        btnEnviar.disabled= false;
         btnEnviar.classList.remove('cursor-not-allowed','opacity-50');
    }else{
        btnEnviar.disabled= true;
        btnEnviar.classList.add('cursor-not-allowed','opacity-50');
    }

}

function mostrarError(mensaje){
    const error = document.createElement('p');
    error.textContent = mensaje;
    error.classList.add('border','border-red-500','background-red-100','text-red-500','p-3','mt-5','text-center','error');
    
    const errorCantidad = document.querySelectorAll('.error');

     if(errorCantidad.length === 0){
        form.appendChild(error);
     }
}

function enviarMail(e){
    e.preventDefault();
    
        const spinner = document.querySelector('#spinner');
        spinner.style.display = 'flex';
        
    
        setTimeout(() => {
            spinner.style.display= 'none';
    
            //inserta el mensaje de envio correcto luego que se oculta el spinner
            const parrafo = document.createElement('p');
            parrafo.textContent = 'Mail enviado con exito';
            parrafo.classList.add('bg-green-500','text-white','font-bold','p-2','my-10','text-center','uppercase');
            form.insertBefore(parrafo,spinner);
    
            setTimeout(()=>{
                parrafo.remove();
                resetearForm();
            },2000);
    
        }, 2000);  
    

    
    

    
}

function resetearForm(){
    form.reset();
    iniciarApp();   
}

function resForm(e){
    e.preventDefault();
    form.reset();
    iniciarApp();
}
