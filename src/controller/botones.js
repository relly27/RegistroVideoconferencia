document.getElementById('descargar').addEventListener('click', async function() {
    const fecha = document.getElementById('fecha').value;
    if (!fecha) {
        alert('Por favor, selecciona una fecha.');
        return;
    }

    try {
        // Hacer la solicitud a la API
        const response = await fetch(`http://10.10.10.17:3000/listaPersonas?fecha=${fecha}`); 
        if (!response.ok) {
            throw new Error('Error al obtener los datos');
        }

        const datos = await response.json();

        // Convertir los datos a CSV
        const csv = convertirACSV(datos);

        // Crear un enlace para descargar el archivo
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('download', `datos_${fecha}.csv`);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema al descargar los datos.');
    }
});

function convertirACSV(datos) {
    const cabeceras = Object.keys(datos[0]).join(',') + '\n';
    const filas = datos.map(fila => Object.values(fila).join(',')).join('\n');
    return cabeceras + filas;
}

