const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

// Configuración de CORS y JSON
app.use(cors());
app.use(express.json());

// 1. RUTA PARA MATRÍCULAS (DINÁMICA)
// Esta ruta debe ir PRIMERO para interceptar cualquier texto tras la "/"
app.get('/:plate', async (req, res, next) => {
    const plate = req.params.plate.toUpperCase().trim();

    // Si la ruta es solo "/" o es el favicon, pasamos a la siguiente función
    if (!plate || plate === "FAVICON.ICO") {
        return next();
    }

    console.log(`[LOG] Solicitando a RapidAPI: ${plate}`);

    try {
        const response = await axios.get(`https://api-matriculas-espana.p.rapidapi.com/get/${plate}`, {
            headers: {
                'X-RapidAPI-Key': 'b4b6eb078cmsh025d40281b264c2p19be9ajsn045ec5167bae',
                'X-RapidAPI-Host': 'api-matriculas-espana.p.rapidapi.com'
            }
        });

        // Enviamos los datos técnicos al frontend
        res.status(200).json(response.data);

    } catch (error) {
        console.error(`[ERROR] Detalle: ${error.message}`);
        
        // Si la API externa no encuentra la matrícula, devolvemos 404
        if (error.response && error.response.status === 404) {
            res.status(404).json({ error: 'Matrícula no encontrada' });
        } else {
            res.status(500).json({ error: 'Error al conectar con la base de datos' });
        }
    }
});

// 2. RUTA RAÍZ (Mensaje de estado)
app.get('/', (req, res) => {
    res.send('✅ SERVIDOR ACTIVO - PUENTE RAPIDAPI LISTO');
});

// 3. CAPTURADOR DE ERRORES (Solo se ejecuta si nada de lo anterior coincidió)
app.use((req, res) => {
    res.status(404).json({
        error: `La ruta ${req.url} no existe en este servidor.`
    });
});

// Puerto dinámico para Render
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 API escuchando en el puerto ${PORT}`);
});
