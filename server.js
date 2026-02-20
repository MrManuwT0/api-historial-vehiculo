const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// El puente: cualquier cosa que llegue después de la / se trata como matrícula
app.get('/:plate', async (req, res) => {
    const plate = req.params.plate.toUpperCase().trim();

    // Evitar procesar peticiones vacías o de iconos del navegador
    if (!plate || plate === "FAVICON.ICO") return res.status(204).end();

    try {
        const response = await axios.get(`https://api-matriculas-espana.p.rapidapi.com/get/${plate}`, {
            headers: {
                'X-RapidAPI-Key': 'b4b6eb078cmsh025d40281b264c2p19be9ajsn045ec5167bae',
                'X-RapidAPI-Host': 'api-matriculas-espana.p.rapidapi.com'
            }
        });
        // Render simplemente pasa el paquete de datos de vuelta a GitHub
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: 'No encontrado o error en puente' });
    }
});

// Ruta base para confirmar que el puente está levantado
app.get('/', (req, res) => {
    res.send('✅ PUENTE RENDER ACTIVO');
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0');
