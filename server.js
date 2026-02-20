const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors()); // Permite que tu web de GitHub acceda a los datos
app.use(express.json());

// Tus credenciales
const API_KEY = 'b4b6eb078cmsh025d40281b264c2p19be9ajsn045ec5167bae';
const API_HOST = 'api-matriculas-espana.p.rapidapi.com';

app.get('/consulta/:plate', async (req, res) => {
    try {
        const plate = req.params.plate;
        const response = await axios.get(`https://${API_HOST}/get/${plate}`, {
            headers: {
                'X-RapidAPI-Key': API_KEY,
                'X-RapidAPI-Host': API_HOST
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error("Error en petición:", error.message);
        res.status(error.response?.status || 500).json({ error: 'Matrícula no encontrada' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor activo en puerto ${PORT}`));
