const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

// 1. Habilitar CORS para que GitHub Pages pueda leer los datos
app.use(cors());
app.use(express.json());

const API_KEY = 'b4b6eb078cmsh025d40281b264c2p19be9ajsn045ec5167bae';
const API_HOST = 'api-matriculas-espana.p.rapidapi.com';

// 2. Ruta para la raíz (Soluciona el error "Cannot GET /")
app.get('/', (req, res) => {
    res.send('✅ Servidor de InfoMatricula funcionando correctamente');
});

// 3. Ruta de consulta para tu Web
app.get('/consulta/:plate', async (req, res) => {
    const plate = req.params.plate;
    try {
        const response = await axios.get(`https://${API_HOST}/get/${plate}`, {
            headers: {
                'X-RapidAPI-Key': API_KEY,
                'X-RapidAPI-Host': API_HOST
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(404).json({ error: 'Vehículo no encontrado' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor listo en puerto ${PORT}`);
});
