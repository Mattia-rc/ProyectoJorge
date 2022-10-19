// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
  // App root element
  root: '#app',
  // App Name
  name: 'My App',
  // App id
  id: 'com.myapp.test',
  // Enable swipe panel
  panel: {
    swipe: 'left',
  },
  // Add default routes
  routes: [
    { path: '/index/', url: 'index.html', },
    { path: '/home/', url: 'home.html', },
    { path: '/envioDinero/', url: 'enviarDinero.html', },
    { path: '/addTarjetas/', url: 'addTarjetas.html', },
    { path: '/tarjetas/', url: 'tarjetas.html', },
    { path: '/historial/', url: 'historial.html', },
  ]
  // ... other parameters
});

var mainView = app.views.create('.view-main');

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function () {
  console.log("Device is ready!");
});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {

})



// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object


$$(document).on('page:init', '.page[data-name="index"]', function (e) {


  $$('#signIn').on('click', fnlog)
  $$('#CrearCuenta').on('click', fncrear)




  function fnlog(){
    const  email = $$('#email').val();
    const password = $$('#psw').val();
    firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;

    console.log("hola@!!! " + email);
    // ...

    mainView.router.navigate('/home/')
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;

    console.error(errorCode);
        console.error(errorMessage);
  });

  }



  function fncrear() {
    alert("hola")
    const  email = $$('#email').val();
    const password = $$('#psw').val();
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log("Bienvenid@!!! " + email);
        // ...
        mainView.router.navigate('/home/');
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.error(errorCode);
        console.error(errorMessage);

        if (errorCode == "auth/email-already-in-use") {
          console.error("el mail ya esta usado");
        }

        // ..
      });

  }
});


$$(document).on('page:init', '.page[data-name="home"]', function (a){
  $$('#botonCerrarSesion').on('click', fnCerrar);
  $$('#EnvioDinero').on('click', fnEnviarDinero);
  $$('#addTarjetas').on('click', fnaddTarjetas);
  $$('#tarjetas').on('click', fntarjetas);
  $$('#historial').on('click', fnhistorial);
  function fnEnviarDinero(){
    mainView.router.navigate('/envioDinero/')
  }
  function fnaddTarjetas(){
    mainView.router.navigate('/addTarjetas/')
  }
  function fntarjetas(){
    mainView.router.navigate('/tarjetas/')
  }
  function fnhistorial(){
    mainView.router.navigate('/historial/')
  }
 

    function fnCerrar(){
      const  email = $$('#email').val();
      const password = $$('#psw').val();
      firebase.auth().signOut().then(() => {
        // Sign-out successful.
        mainView.router.navigate('/index/')
        console.log("chau " + email);
      }).catch((error) => {
        // An error happened.
      });
    }

  })
 
  $$(document).on('page:init', '.page[data-name="envioDinero"]', function (a){
    $$('#volverparaatras').on('click', fnVolverAtras)

    function fnVolverAtras(){
      mainView.router.navigate('/home/')
    }
  })

  $$(document).on('page:init', '.page[data-name="tarjetas"]', function (a){
    $$('#volverparaatras').on('click', fnVolverAtras)

    function fnVolverAtras(){
      mainView.router.navigate('/home/')
    }
  })

  $$(document).on('page:init', '.page[data-name="addTarjetas"]', function (a){
    $$('#volverparaatras').on('click', fnVolverAtras)

    function fnVolverAtras(){
      mainView.router.navigate('/home/')
    }
  })

  $$(document).on('page:init', '.page[data-name="historial"]', function (a){
    $$('#volverparaatras').on('click', fnVolverAtras)

    function fnVolverAtras(){
      mainView.router.navigate('/home/')
    }
  })