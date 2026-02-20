const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

// El "Túnel": Recibe la matrícula y la dispara a RapidAPI
app.get('/:plate', async (req, res) => {
    const { plate } = req.params;

    if (!plate || plate.includes("favicon")) return res.status(204).end();

    try {
        const response = await axios.get(`https://api-matriculas-espana.p.rapidapi.com/get/${plate}`, {
            headers: {
                'X-RapidAPI-Key': 'b4b6eb078cmsh025d40281b264c2p19be9ajsn045ec5167bae',
                'X-RapidAPI-Host': 'api-matriculas-espana.p.rapidapi.com'
            }
        });
        // Enviamos los datos puros al frontend
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: 'Error en la consulta' });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0');
