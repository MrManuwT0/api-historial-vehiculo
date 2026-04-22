const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors()); // Permitir acceso desde cualquier web

app.get('/:plate', async (req, res) => {
    const plate = req.params.plate.toUpperCase().trim();
    try {
        const response = await axios.get(`https://matriculas-espana1.p.rapidapi.com/es`, {
            params: { plate: plate },
            headers: {
                'x-rapidapi-key': 'eed84183d8mshd47cb981fb16166p1750b2jsn1adb6a81a02a',
                'x-rapidapi-host': 'matriculas-espana1.p.rapidapi.com'
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error en API externa" });
    }
});

app.listen(process.env.PORT || 10000);
