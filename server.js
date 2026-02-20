const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const API_KEY = 'b4b6eb078cmsh025d40281b264c2p19be9ajsn045ec5167bae';
const API_HOST = 'api-matriculas-espana.p.rapidapi.com';

// RUTA DE PRUEBA (Para ver si el server funciona)
app.get('/', (req, res) => {
    res.send('Servidor API Matrículas: ONLINE 🚀');
});

// RUTA DE CONSULTA (La que llama tu script.js)
app.get('/consulta/:plate', async (req, res) => {
    const plate = req.params.plate;
    console.log(`Buscando matrícula: ${plate}`);
    
    try {
        const response = await axios.get(`https://${API_HOST}/get/${plate}`, {
            headers: {
                'X-RapidAPI-Key': API_KEY,
                'X-RapidAPI-Host': API_HOST
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error("Error en API:", error.message);
        res.status(404).json({ error: 'No encontrado en la base de datos' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
