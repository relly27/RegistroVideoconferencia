import http from 'http';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const server = http.createServer((req, res) => {
    const allowedRoutes = [
        'index.html',
        '/src/view/tablePer.html',
        '/src/view/formulario.html'
    ]; // Define qué archivos quieres que sean accesibles
    const requestedPath = req.url;

    if (allowedRoutes.includes(requestedPath)) {
        const filePath = path.join('.', requestedPath); // Responde solo para las rutas permitidas
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.statusCode = 404;
                res.end('Archivo no encontrado');
                return;
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html'); // Cambia el tipo de contenido según el archivo
            res.end(content);
        });
    } else {
        res.statusCode = 403; // Respuesta para rutas no permitidas
        res.end('Acceso denegado');
    }
});

const host = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

server.listen(PORT, host, () => {
    console.log(`Servidor escuchando en http://${host}:${PORT}`);
});
