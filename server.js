const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// RUTA RAIZ (Ya sabemos que funciona)
app.get('/', (req, res) => {
    res.send('✅ Servidor Online');
});

// RUTA DE CONSULTA (He quitado la barra final para evitar errores)
app.get('/consulta/:plate', async (req, res) => {
    const { plate } = req.params;
    console.log("Buscando:", plate);
    
    try {
        const response = await axios.get(`https://api-matriculas-espana.p.rapidapi.com/get/${plate}`, {
            headers: {
                'X-RapidAPI-Key': 'b4b6eb078cmsh025d40281b264c2p19be9ajsn045ec5167bae',
                'X-RapidAPI-Host': 'api-matriculas-espana.p.rapidapi.com'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error("Error API:", error.message);
        res.status(404).json({ error: 'No encontrado' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Puerto: ${PORT}`);
});
