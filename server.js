const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

// EL PUENTE: Captura la matrícula directamente en la raíz
app.get('/:plate', async (req, res) => {
    const plate = req.params.plate.toUpperCase().trim();

    // Evitar errores con peticiones vacías o iconos
    if (!plate || plate === "FAVICON.ICO") return res.status(204).end();

    try {
        const response = await axios.get(`https://api-matriculas-espana.p.rapidapi.com/get/${plate}`, {
            headers: {
                'X-RapidAPI-Key': 'b4b6eb078cmsh025d40281b264c2p19be9ajsn045ec5167bae',
                'X-RapidAPI-Host': 'api-matriculas-espana.p.rapidapi.com'
            }
        });
        // Render simplemente deja pasar los datos de vuelta a tu web
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: 'No encontrado en RapidAPI' });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0');
