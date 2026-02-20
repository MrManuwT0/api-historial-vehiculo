const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

// RUTA PUENTE: Captura la matrícula directamente
app.get('/:plate', async (req, res) => {
    const plate = req.params.plate.toUpperCase().trim();

    // Filtro para ignorar peticiones automáticas del sistema
    if (plate === "FAVICON.ICO" || !plate) return res.status(204).end();

    try {
        const response = await axios.get(`https://api-matriculas-espana.p.rapidapi.com/get/${plate}`, {
            headers: {
                'X-RapidAPI-Key': 'b4b6eb078cmsh025d40281b264c2p19be9ajsn045ec5167bae',
                'X-RapidAPI-Host': 'api-matriculas-espana.p.rapidapi.com'
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(404).json({ error: 'Matrícula no encontrada en RapidAPI' });
    }
});

// Mensaje de estado en la raíz
app.get('/', (req, res) => {
    res.send('✅ PUENTE RENDER ACTIVO');
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0');
