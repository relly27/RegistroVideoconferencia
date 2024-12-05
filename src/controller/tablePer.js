const urlApi = "http://10.10.10.17:3000"

document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = `${urlApi}/listaPersonas`;
    const tablaBody = document.getElementById('personasTabla');

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        data.forEach((persona, index) => {
          const fila = `
            <tr>
              <td>${index + 1}</td>
              <td>${persona.cedula_id}</td>
              <td>${persona.primer_nombre+" "+persona.segundo_nombre}</td>        
              <td>${persona.primer_apellido+" "+persona.segundo_apellido}</td>
              <td>${persona.genero}</td>
              <td>${persona.email}</td>
              <td>${persona.telf}</td>
              <td>${persona.nacionalidad}</td>
              <td>${persona.estado}</td>
              <td>${persona.municipio}</td>
              <td>${persona.parroquia}</td>
              <td>${persona.descripcion}</td>
              <td>${new Date(persona.created_at).toLocaleString()}</td>
            </tr>
          `;
          tablaBody.insertAdjacentHTML('beforeend', fila);
        });
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
        const errorRow = `
          <tr>
            <td colspan="13" class="text-center text-danger">Error al cargar los datos.</td>
          </tr>
        `;
        tablaBody.insertAdjacentHTML('beforeend', errorRow);
      });
  });

//aqui otros js
///primer boton

document.getElementById('descargar').addEventListener('click', async function() {
  const fecha = document.getElementById('fecha').value;
  if (!fecha) {
      alert('Por favor, selecciona una fecha.');
      return;
  }

  try {
      // Hacer la solicitud a la API
      const response = await fetch(`${urlApi}/listaPersonas?fecha=${fecha}`); 
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

////////--------------->

//segundo boton

document.getElementById('descargar2').addEventListener('click', async function() {
  // Obtener la fecha actual en formato YYYY-MM-DD
  const fecha = new Date().toISOString().split('T')[0];

  try {
      // Hacer la solicitud a la API
      const response = await fetch(`${urlApi}/listaPersonas?fecha=${fecha}`);
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

     


/////////------------>


////tercer boton

document.getElementById('descargar3').addEventListener('click', async function() {
  const fechaInicio = document.getElementById('fechaInicio').value;
  const fechaFin = document.getElementById('fechaFin').value;

  if (!fechaInicio || !fechaFin) {
      alert('Por favor, selecciona ambas fechas.');
      return;
  }

  try {
      // Hacer la solicitud a la API con el rango de fechas
      const response = await fetch(`${urlApi}/listaPersonas?fecha-inicio=${fechaInicio}&fecha-final=${fechaFin}`);
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
      a.setAttribute('download', `datos_${fechaInicio}_a_${fechaFin}.csv`);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
  } catch (error) {
      console.error('Error:', error);
      alert('Hubo un problema al descargar los datos.');
  }
});

function convertirACSV(datos) {
  if (datos.length === 0) {
      return 'No hay datos disponibles.\n';
  }
  const cabeceras = Object.keys(datos[0]).join(',') + '\n';
  const filas = datos.map(fila => Object.values(fila).join(',')).join('\n');
  return cabeceras + filas;
}


//////////-------------->