document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = "http://10.10.10.17:3000/listaPersonas";
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