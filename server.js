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
            // URL corregida para el nuevo proveedor
            url: `https://api-matriculas-espana.p.rapidapi.com/es?plate=${plate}`,
            headers: {
                'X-RapidAPI-Key': 'eed84183d8mshd47cb981fb16166p1750b2jsn1adb6a81a02a',
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
app.listen(PORT, '0.0.0.0', () => console.log(`Servidor Carbono Activo`));
