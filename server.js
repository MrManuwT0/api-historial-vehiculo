const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Verificación en la raíz
app.get('/', (req, res) => {
    res.send('✅ SERVIDOR FUNCIONANDO');
});

// RUTA ÚNICA DE CONSULTA
app.get('/consulta/:plate', async (req, res) => {
    const plate = req.params.plate.toUpperCase();
    try {
        const response = await axios.get(`https://api-matriculas-espana.p.rapidapi.com/get/${plate}`, {
            headers: {
                'X-RapidAPI-Key': 'b4b6eb078cmsh025d40281b264c2p19be9ajsn045ec5167bae',
                'X-RapidAPI-Host': 'api-matriculas-espana.p.rapidapi.com'
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(404).json({ error: 'No encontrado' });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor activo en puerto ${PORT}`);
});
