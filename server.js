const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

// Configuración de CORS para permitir peticiones desde tu GitHub Pages
app.use(cors());
app.use(express.json());

// Credenciales de la API
const API_KEY = 'b4b6eb078cmsh025d40281b264c2p19be9ajsn045ec5167bae';
const API_HOST = 'api-matriculas-espana.p.rapidapi.com';

/**
 * RUTA RAIZ
 * Sirve para verificar que el servidor está encendido.
 */
app.get('/', (req, res) => {
    res.send('✅ SERVIDOR ACTIVO - INFO VEHÍCULO API');
});

/**
 * RUTA DE CONSULTA
 * Acepta peticiones en /consulta/MATRICULA
 */
app.get('/consulta/:plate', async (req, res) => {
    const plate = req.params.plate.toUpperCase().replace(/[-\s]/g, "");
    console.log(`[LOG] Consultando matrícula: ${plate}`);

    try {
        const response = await axios.get(`https://${API_HOST}/get/${plate}`, {
            headers: {
                'X-RapidAPI-Key': API_KEY,
                'X-RapidAPI-Host': API_HOST
            }
        });

        // Enviamos los datos recibidos a tu frontend
        res.status(200).json(response.data);

    } catch (error) {
        console.error(`[ERROR] Error en la petición: ${error.message}`);
        
        if (error.response && error.response.status === 404) {
            res.status(404).json({ error: 'Matrícula no encontrada en la base de datos oficial.' });
        } else {
            res.status(500).json({ error: 'Error interno del servidor al conectar con la API.' });
        }
    }
});

/**
 * MANEJO DE RUTAS NO ENCONTRADAS (Evita el error Cannot GET)
 */
app.use((req, res) => {
    res.status(404).json({ error: `La ruta ${req.url} no existe en este servidor.` });
});

// Configuración del puerto para Render
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
