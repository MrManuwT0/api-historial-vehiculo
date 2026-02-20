const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// 1. RUTA DINÁMICA (Cualquier cosa tras la / es la matrícula)
app.get('/:plate', async (req, res) => {
    const plate = req.params.plate.toUpperCase().trim();

    // Evitar que el navegador pida el icono de la web
    if (plate === "FAVICON.ICO") return res.status(204).end();

    try {
        const response = await axios.get(`https://api-matriculas-espana.p.rapidapi.com/get/${plate}`, {
            headers: {
                'X-RapidAPI-Key': 'b4b6eb078cmsh025d40281b264c2p19be9ajsn045ec5167bae',
                'X-RapidAPI-Host': 'api-matriculas-espana.p.rapidapi.com'
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(404).json({ error: 'Matrícula no encontrada' });
    }
});

// 2. RUTA RAIZ SIMPLE
app.get('/', (req, res) => {
    res.send('✅ SERVIDOR ONLINE');
});

// 3. CAPTURADOR DE RUTAS INEXISTENTES (Esto es lo que te está respondiendo ahora)
app.use((req, res) => {
    res.status(404).json({error: `La ruta ${req.url} no existe en este servidor.`});
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0');
