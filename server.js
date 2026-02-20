const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const API_KEY = 'b4b6eb078cmsh025d40281b264c2p19be9ajsn045ec5167bae';
const API_HOST = 'api-matriculas-espana.p.rapidapi.com';

// RUTA DE PRUEBA: Si entras a la URL de Render verás esto
app.get('/', (req, res) => {
    res.send('Servidor de Matrículas Activo 🚀');
});

// ESTA ES LA RUTA QUE BUSCA TU SCRIPT.JS
app.get('/consulta/:plate', async (req, res) => {
    try {
        const plate = req.params.plate;
        console.log("Consultando matrícula:", plate);
        
        const response = await axios.get(`https://${API_HOST}/get/${plate}`, {
            headers: {
                'X-RapidAPI-Key': API_KEY,
                'X-RapidAPI-Host': API_HOST
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error("Error en API:", error.message);
        res.status(404).json({ error: 'Matrícula no encontrada' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});
