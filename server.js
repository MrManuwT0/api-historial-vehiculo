const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/:plate', async (req, res) => {
    const plate = req.params.plate.toUpperCase().trim();
    if (plate === "FAVICON.ICO") return res.status(204).end();

    try {
        const response = await axios.get(`https://api-matriculas-espana.p.rapidapi.com/get/${plate}`, {
            headers: {
                // ASEGÚRATE DE QUE ESTA KEY ES LA CORRECTA EN TU PANEL DE RAPIDAPI
                'X-RapidAPI-Key': 'b4b6eb078cmsh025d40281b264c2p19be9ajsn045ec5167bae',
                'X-RapidAPI-Host': 'api-matriculas-espana.p.rapidapi.com'
            }
        });
        
        // Enviamos la respuesta directa
        res.json(response.data);
    } catch (error) {
        // Esto nos dirá si es culpa de la Key, del límite de créditos o de la matrícula
        res.status(error.response?.status || 500).json({ 
            error: "Error en RapidAPI", 
            detalles: error.response?.data || error.message 
        });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0');
