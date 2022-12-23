


document.addEventListener("DOMContentLoaded", function() {

  const email = {
    email: '',
    cc: '',
    asunto: '',
    mensaje: '',
  }

  // Seleccionar los elementos e la interfaz
  const inputEmail = document.querySelector('#email');
  const inputAsunto = document.querySelector('#asunto');
  const inputMensaje = document.querySelector('#mensaje');
  const inputCc = document.querySelector('#cc');
  const formulario = document.querySelector("#formulario")
  const btnSubmit = document.querySelector('#formulario button[type="submit"]');
  const btnReset = document.querySelector('#formulario button[type="reset"]');
  const spinner = document.querySelector('#spinner');

  // Asignar eventos
  // Blur se activa cuando salgo del input
  inputEmail.addEventListener('input', validar);
  inputAsunto.addEventListener('input', validar)
  inputMensaje.addEventListener('input', validar)
  cc.addEventListener('input', validar)
  formulario.addEventListener('submit', enviarEmail)

  btnReset.addEventListener('click', function (e) {
    e.preventDefault();
    // Reinicar el objeto
     resetFormulario();
    
  })

  function enviarEmail(e) {
    e.preventDefault();
    spinner.classList.add('flex');
    spinner.classList.remove('hidden');
    console.log(email);
    
    setTimeout(() => {
      spinner.classList.remove('flex');
      spinner.classList.add('hidden');
      resetFormulario();

      // Crear una alerta con scrinting
      const alertaExito = document.createElement("P");
      alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg','mt-10','font-bold','text-sm','uppercase');

      alertaExito.textContent = 'Mensaje enviado correctamente';
      formulario.appendChild(alertaExito);
      
      setTimeout(() => {
        alertaExito.remove();
      }, 3000);


    }, 3000);

  }

  function validar(e) {
    // trim lo que hace es eliminar los espacios
    if (e.target.value.trim() === '') {
      mostrarAlerta( ` El campo ${e.target.id} es obligatorio `, e.target.parentElement);
      email[e.target.name] = '';
      comprobarEmail();
      return;
    }

     if (e.target.id === 'email' && !validarEmail(e.target.value)){
      mostrarAlerta(`El ${e.target.id} no es valido`, e.target.parentElement);
      email[e.target.name] = '';
      comprobarEmail();
      return;
     }
     if (e.target.id === 'cc' && !validarEmail(e.target.value)){
      mostrarAlerta('El CC no es valido', e.target.parentElement);
      email[e.target.name] = '';
      comprobarEmail();
      return;
     }


    limpiarAlerta(e.target.parentElement);

    // Asignar los valores
    email[e.target.name] = e.target.value.trim().toLowerCase();
    
    // Comporbar el objeto de emial
    comprobarEmail();
  }

  function mostrarAlerta(mensaje, referencia) {
    limpiarAlerta(referencia);

    // Generar alerta en HTML
    const error = document.createElement('P');
    error.textContent = mensaje;
    error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');
    
    // Inyectar el error en el formulario
    referencia.appendChild(error);
    
    
  }
  
  function limpiarAlerta(referencia) {
    // Comprueba si ya existe un alerta
    const alerta = referencia.querySelector('.bg-red-600');
    if (alerta) {
      alerta.remove();
    }
  }

  function validarEmail(email) {
    const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
    const resultado = regex.test(email);
    return resultado;
  }

  function comprobarEmail() {
    // Object.values(email), va tomar todos los valores del objeto y los va asignar a un arreglo

    //.include(''), algunos de los elementos de este arreglo incluye un string vacio, los retorna true si viene vacio y false si todo esta lleno

    if (Object.values(email).includes('')) {
      btnSubmit.classList.add('opacity-50');
      btnSubmit.disable = true;
      return
    }
    btnSubmit.classList.remove('opacity-50');
    btnSubmit.disable = false;
    
  }

  function resetFormulario() {
    // Reinicar el objeto
      email.email = '';
      email.asunto = '';
      email.mensaje = '';
      formulario.reset();
      comprobarEmail();
  }



})