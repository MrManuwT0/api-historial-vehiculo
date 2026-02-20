const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// RUTA RAIZ (Para verificar que el server vive)
app.get('/', (req, res) => {
    res.send('✅ SERVIDOR FUNCIONANDO - VERSION FINAL');
});

// RUTA DE CONSULTA
app.get('/consulta/:plate', async (req, res) => {
    const plate = req.params.plate;
    console.log("Buscando matricula:", plate);
    
    try {
        const response = await axios.get(`https://api-matriculas-espana.p.rapidapi.com/get/${plate}`, {
            headers: {
                'X-RapidAPI-Key': 'b4b6eb078cmsh025d40281b264c2p19be9ajsn045ec5167bae',
                'X-RapidAPI-Host': 'api-matriculas-espana.p.rapidapi.com'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error("Error en API:", error.message);
        res.status(404).json({ error: 'No encontrado' });
    }
});

// CAPTURADOR DE ERRORES 404 (Si alguna ruta falla, esto te avisará)
app.use((req, res) => {
    res.status(404).send(`La ruta ${req.url} no existe en este servidor.`);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor activo en puerto ${PORT}`);
});
