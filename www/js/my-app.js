// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;
var CVUingresado = "CVU"

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
    { path: '/register/', url: 'register.html', },
  ]
  // ... other parameters
});

var mainView = app.views.create('.view-main');

var db = firebase.firestore();
var colUsuarios = db.collection("Usuarios");
var email, nombre, montoCargar, emailEnviar, montorEnviar

var movIngreso = db.collection("Ingresos")

var resultado;

var colMovimientos = db.collection("Movimientos")
// Handle Cordova Device Ready Event
$$(document).on('deviceready', function () {
  console.log("Device is ready!");
});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {

})

var nombreExtraido
var cvuExtraido;

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object


$$(document).on('page:init', '.page[data-name="index"]', function (e) {

  $$('#redireccionCuenta').on('click', fnRedireccionCuenta)
  $$('#signIn').on('click', fnlog)




});

$$(document).on('page:init', '.page[data-name="register"]', function (a) {
  $$('#CrearCuenta').on('click', fncrear)
  function fncrear() {


    email = $$('#correo').val();
    password = $$('#password').val();



    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log("Bienvenid@!!! " + email);
        // ...
        ///////////////////////       mainView.router.navigate('/home/');

        claveDeColeccion = email;

        nombre = $$('#nombre').val();




        var datos = {
          nombre: nombre,
          rol: "usuarios",
          password: password,
          /*     NombreDeTitular: nombreTitular,
              NumeroDeTarjeta: TarjetaIngresada,
              CVU: CVUIngresado,
              CVV: CVVIngresado, */

        }

        colUsuarios.doc(claveDeColeccion).set(datos)
          .then(function () {
            $$("#usuarioHome").text(nombre);
            mainView.router.navigate('/home/');
          })
          .catch(function (e) {

          })


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
})

$$(document).on('page:init', '.page[data-name="home"]', function (a) {
  $$('#botonCerrarSesion').on('click', fnCerrar);
  $$('#EnvioDinero').on('click', fnEnviarDinero);
  $$('#addTarjetas').on('click', fnaddTarjetas);
  $$('#tarjetas').on('click', fntarjetas);
  $$('#historial').on('click', fnhistorial);


  // Seguimos en el home

  user = firebase.auth().currentUser;
  //name = $$('#name').val();

  if (user) {
    //document.getElementById('usuarioHome').innerText = name;
    $$("#usuarioHome").text(nombreExtraido);

  } else {
    // No user is signed in.
  }
  db.collection("Usuarios").doc(email).get()

    .then((doc) => {
      if (doc.exists) {
        cvuExtraido = doc.data().CVUingresado
        $$("#cvuBox").text(cvuExtraido);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }

    )
})

$$(document).on('page:init', '.page[data-name="envioDinero"]', function (a) {
  $$('#volverparaatras').on('click', fnVolverAtras)
  $$('#enviarDinerouser').on('click', fnCargarEnviar)
  function fnVolverAtras() {
    mainView.router.navigate('/home/')
  }
})

$$(document).on('page:init', '.page[data-name="tarjetas"]', function (a) {
  $$('#volverparaatras').on('click', fnVolverAtras)

  function fnVolverAtras() {
    mainView.router.navigate('/home/')
  }
})

$$(document).on('page:init', '.page[data-name="addTarjetas"]', function (a) {
  $$('#volverparaatras').on('click', fnVolverAtras)

  $$('#agregarTarjetas').on('click', fnAgregarTarjetas)




  function fnVolverAtras() {
    mainView.router.navigate('/home/')
  }
})

$$(document).on('page:init', '.page[data-name="historial"]', function (a) {
  $$('#volverparaatras').on('click', fnVolverAtras)
  $$('#recargarDinero').on('click', fnCargar)
  function fnVolverAtras() {
    mainView.router.navigate('/home/')
  }
})




/*MIS FUNCIONES*/


function fnEnviarDinero() {
  setTimeout(() => { }, 3000);

  mainView.router.navigate('/envioDinero/')
}
function fnaddTarjetas() {
  setTimeout(() => { }, 1500);
  mainView.router.navigate('/addTarjetas/')
}

function fnhistorial() {
  setTimeout(() => { }, 1500);
  mainView.router.navigate('/historial/')
}


function fnCerrar() {

  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    mainView.router.navigate('/index/')
    console.log("chau " + nombreExtraido);
  }).catch((error) => {
    // An error happened.
  });
}



function fnRedireccionCuenta() {
  mainView.router.navigate('/register/')
}
function fnlog() {
  email = $$('#email').val();
  password = $$('#psw').val();
  nombre = $$('#name').val();
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in

      var user = userCredential.user;

      console.log("hola@!!! " + email);
      // ...
      db.collection("Usuarios").doc(email).get()

        .then((doc) => {
          if (doc.exists) {
            nombreExtraido = doc.data().nombre
            $$("#usuarioHome").text(nombreExtraido);
            console.log(nombreExtraido);
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }

          mainView.router.navigate('/home/')
        })



    })

    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;

      console.error(errorCode);
      console.error(errorMessage);
    });

}

function fnAgregarTarjetas() {


  var nombreTitular = $$('#nombreTitular').val();
  var TarjetaIngresada = $$('#TarjetaIngresada').val();
  var FechaIngresado = $$('#FECHAIngresado').val();
  var CVVIngresado = $$('#CVVIngresado').val();
  var CVUingresado = parseInt(Math.random() * 1000000)
  console.log("El nombre del titular es " + nombreTitular);
  console.log("la tarjeta ingresada es " + TarjetaIngresada);
  console.log("La fecha ingresada es " + FechaIngresado);
  console.log("El CVV ingresado es " + CVVIngresado);
  console.log("El cvu random es " + CVUingresado);



  claveDeColeccion = email;
  var datos2 = {
    nombreTitular: nombreTitular,
    TarjetaIngresada: TarjetaIngresada,
    FechaIngresado: FechaIngresado,
    CVVIngresado: CVVIngresado,
    CVUingresado: CVUingresado
  }




  /*
  colUsuarios.doc(claveDeColeccion).collection("subColeccion").doc( ).
  
  
  */


  movIngreso.doc(claveDeColeccion).set(datos2)
    .then(function () {
      console.log("agrego tarjetas");

    })
    .catch(function (e) {
      console.log("no agrego nada");
    })

}



function fnCargar() {

  montoCargar = $$('#monto-a-cargar').val();
  /*  var cbuCargar = $$('#cbu-cargar').val(); */

  const date = dayjs().format('YYYY-DD-MM');
  const hour = dayjs().format('HH:mm:ss');
  const timestamp = dayjs().format('YYYY-DD-MM-HH:mm:ss')
  var emailv2 = email

  claveDeColeccion = emailv2 + "-" + timestamp;
  var datos3 = {
    email: email,
    timestamp: timestamp,
    fecha: date,
    hora: hour,
    sentido: "INGRESO",
    MontoCargar: montoCargar

  }


  colMovimientos.doc(claveDeColeccion).set(datos3)
    .then(function () {

      console.log(montoCargar);
      console.log("agrego dinero");
    })
    .catch(function (e) {
      console.log("no agrego nada");
    })


}


function fnCargarEnviar() {
  dayjs.locale('es');
  const date = dayjs().format('YYYY-DD-MM');
  const hour = dayjs().format('HH:mm:ss');
  const timestamp = dayjs().format('YYYY-DD-MM-HH:mm:ss')
  var montorEnviar = $$("#montoEnviar").val()
  var emailEnviar = $$("#emailEnviar").val()
  claveDeColeccion = emailEnviar + "-" + timestamp;
  var datos4 = {
    email: emailEnviar,
    timestamp: timestamp,
    fecha: date,
    hora: hour,
    sentido: "INGRESO",
    recepEmisor: email,
    importe: montorEnviar
  }
  claveDeColeccionn = email + "-" + timestamp;
  var datos5 = {
    email: email,
    timestamp: timestamp,
    fecha: date,
    hora: hour,
    sentido: "EGRESO",
    recepEmisor: emailEnviar,
    importe: montorEnviar
  }

  /*   colMovimientos.doc(claveDeColeccion).set(datos5) */

  console.log(datos4);
  colMovimientos.doc(claveDeColeccion).set(datos4);
  colMovimientos.doc(claveDeColeccionn).set(datos5);
  // /// seguir para registrar el movimiento de ingreso en la otra cuenta
}

function fntarjetas() {
  setTimeout(() => { }, 1500);
  mainView.router.navigate('/tarjetas/')
  UltMovimiento = $$('#ultMovimiento').val();
  db.collection("Movimientos").where("email", "==", email).where("sentido", "==", "EGRESO").get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log("Le envia " + doc.data().email);
        console.log(doc.data().recepEmisor);
        console.log(doc.data().sentido);
        console.log(doc.data().importe);
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
  db.collection("Movimientos").where("recepEmisor", "==", email).where("sentido", "==", "INGRESO").get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log("Le llega " + doc.data().email);
        console.log(doc.data().sentido);
        console.log(doc.data().importe);
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
}


