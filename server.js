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
            url: `https://matriculas-espana1.p.rapidapi.com/es`,
            params: { plate: plate }, // Se recomienda enviar el parámetro así
            headers: {
                'x-rapidapi-key': '4ddf96d71bmsh3494a1124c44afbp1b95f2jsn2f4faf4e8dba',
                'x-rapidapi-host': 'matriculas-espana1.p.rapidapi.com' // CORREGIDO AQUÍ
            }
        };

        const response = await axios.request(config);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ 
            error: "Error en la API", 
            details: error.response ? error.response.data : error.message 
        });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => console.log("Servidor vinculado a matriculas-espana1"));
