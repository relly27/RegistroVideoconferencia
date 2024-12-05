// JAVASCRIPT DEL LOGIN DEL PANEL

const user = {
    init: "usuario", // Cambia esto por el nombre de usuario deseado
    pass: "1234" // Cambia esto por la contraseña deseada
};

const handleSubmit = (e) => { 
    e.preventDefault();
    
    let userName = document.getElementById("user").value;
    if (user.init === userName) {
        console.log("si es tu usuario");
    } else {
        console.log("no es tu usuario");
        return;
    }

    let passWord = document.getElementById("pass").value;
    if (user.pass === passWord) {
        console.log("si es tu contraseña");
        // Realiza la transición a la nueva vista
        window.location.href = "panel.html"; // Cambia la ruta según sea necesario
    } else {
        console.log("no es tu contraseña");
    }
}

document.getElementById("myForm").addEventListener("submit", handleSubmit);
    // const handleSubmit = (e) => {
    //     e.preventDefault(); // Prevenir el envío del formulario por defecto
    //     let product = document.querySelector('#mi-input').value;

    //     // Realizar cálculos con los valores ya obtenidos
    //     let valorBs = Paralelo * product;
    //     let valorBcv = valorBs / bcv;

    //     // Mostrar resultados en la UI
    //     document.getElementById('bs-result').textContent = `Costo en Bolívares (Paralelo): ${valorBs.toFixed(2)} Bs`;
    //     document.getElementById('bcv-result').textContent = `Costo en Dólares (BCV): ${valorBcv.toFixed(2)} USD`;
    // };
