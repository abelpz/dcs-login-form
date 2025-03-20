import './style.css'

//Esta es la función que usamos para pedirle el token de inicio de sesión a Door43
async function iniciarSesion(username, password, appname) {
  try {
    const response = await fetch(`https://qa.door43.org/api/v1/users/${username}/tokens`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'authorization': `Basic ${btoa(username + ":" + password)}`
      },
      body: JSON.stringify({
        "name": appname
      })
    });

    return response.json();
  } catch(error) {
    return error;
  }
}

//Esta es la función que contiene nuestra aplicación.
function startApp() {

  const authentication = {
    token: null
  }

  const inputName = document.getElementById('nombre');
  const inputPassword = document.getElementById('clave');
  const submitButton = document.getElementById('button-login')

  submitButton.onclick = async () => {

    const name = inputName.value;
    const password = inputPassword.value;

    const response = await iniciarSesion(name, password, "mi-aplicacion-de-login");

    if (response.sha1) {
      authentication.token = response.sha1;
      alert("Has iniciado sesión con el token: " + authentication.token);
    } else {
      alert("Usuario o contraseña invalido");
      inputName.value = "";
      inputPassword.value = "";
    }
  }

}

//Con esto iniciamos nuestra aplicacion
startApp();