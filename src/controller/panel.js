// JAVASCRIPT DEL PANEL 

const mobileScreen = window.matchMedia("(max-width: 990px )");
$(document).ready(function () {
    $(".dashboard-nav-dropdown-toggle").click(function () {
        $(this).closest(".dashboard-nav-dropdown")
            .toggleClass("show")
            .find(".dashboard-nav-dropdown")
            .removeClass("show");
        $(this).parent()
            .siblings()
            .removeClass("show");
    });
    $(".menu-toggle").click(function () {
        if (mobileScreen.matches) {
            $(".dashboard-nav").toggleClass("mobile-show");
        } else {
            $(".dashboard").toggleClass("dashboard-compact");
        }
    });
});

// JAVASCRIPT DEL LOGOUT

document.getElementById('logout').addEventListener('click', function(event) {
    event.preventDefault(); // Evita que el enlace navegue a otra página

    // Aquí puedes eliminar la información de la sesión
    localStorage.removeItem('userSession'); // Elimina la sesión del almacenamiento local

    // Redirige al usuario a la página de inicio de sesión
    window.location.href = 'login.html';
});