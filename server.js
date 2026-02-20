const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

// El puente: Captura la matrícula directamente tras la barra
app.get('/:plate', async (req, res) => {
    const plate = req.params.plate.toUpperCase().trim();

    // Filtro para evitar peticiones basura del navegador
    if (!plate || plate === "FAVICON.ICO") return res.status(204).end();

    try {
        const response = await axios.get(`https://api-matriculas-espana.p.rapidapi.com/get/${plate}`, {
            headers: {
                'X-RapidAPI-Key': 'b4b6eb078cmsh025d40281b264c2p19be9ajsn045ec5167bae',
                'X-RapidAPI-Host': 'api-matriculas-espana.p.rapidapi.com'
            }
        });
        
        // Enviamos los datos puros (marca, modelo, bastidor, etc.) de vuelta
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: 'Matrícula no encontrada' });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0');
