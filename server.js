const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/:plate', async (req, res) => {
    const plate = req.params.plate.toUpperCase();
    console.log(`Buscando matrícula: ${plate}`); // Esto lo verás en el log de Render

    try {
        const response = await axios.get(`https://api-matriculas-espana.p.rapidapi.com/get/${plate}`, {
            headers: {
                'X-RapidAPI-Key': 'b4b6eb078cmsh025d40281b264c2p19be9ajsn045ec5167bae',
                'X-RapidAPI-Host': 'api-matriculas-espana.p.rapidapi.com'
            }
        });
        
        // Enviamos la respuesta de RapidAPI tal cual
        res.json(response.data);
    } catch (error) {
        console.error("Error en RapidAPI:", error.message);
        res.status(500).json({ error: "Error al consultar la API" });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Puente activo en puerto ${PORT}`));
