const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/:plate', async (req, res) => {
    const plate = req.params.plate.toUpperCase().trim();
    if (plate.includes("FAVICON")) return res.status(204).end();

    try {
        const config = {
            method: 'GET',
            // URL ACTUALIZADA SEGÚN TU NUEVA INFORMACIÓN
            url: `https://api-matriculas-espana.p.rapidapi.com/es?plate=${plate}`, 
            headers: {
                'X-RapidAPI-Key': 'b4b6eb078cmsh025d40281b264c2p19be9ajsn045ec5167bae',
                'X-RapidAPI-Host': 'api-matriculas-espana.p.rapidapi.com'
            }
        };

        const response = await axios.request(config);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ 
            error: "Error en la consulta", 
            message: error.response ? error.response.data : error.message 
        });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0');
