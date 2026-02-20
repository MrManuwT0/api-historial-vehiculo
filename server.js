const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/:plate', async (req, res) => {
    const plate = req.params.plate.toUpperCase().trim();
    try {
        const config = {
            method: 'GET',
            // NUEVA URL DE LA API
            url: `https://matriculas-espana1.p.rapidapi.com/es?plate=${plate}`,
            headers: {
                // TU NUEVA CLAVE
                'x-rapidapi-key': 'eed84183d8mshd47cb981fb16166p1750b2jsn1adb6a81a02a',
                'x-rapidapi-host': 'matriculas-espana1.p.rapidapi.com'
            }
        };

        const response = await axios.request(config);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ 
            error: "Error en la nueva API", 
            details: error.response ? error.response.data : error.message 
        });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => console.log("Servidor vinculado a matriculas-espana1"));
