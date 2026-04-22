const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/:plate', async (req, res) => {
    const plate = req.params.plate.toUpperCase().trim();
    if (!plate) return res.status(400).json({ error: "Matrícula requerida" });

    try {
        const response = await axios.get(`https://matriculas-espana1.p.rapidapi.com/es`, {
            params: { plate: plate },
            headers: {
                'x-rapidapi-key': '4ddf96d71bmsh3494a1124c44afbp1b95f2jsn2f4faf4e8dba',
                'x-rapidapi-host': 'matriculas-espana1.p.rapidapi.com'
            },
            timeout: 5000 // 5 segundos de espera máxima
        });
        
        res.json(response.data);
    } catch (error) {
        console.error("Error en servidor:", error.message);
        res.status(502).json({ error: "No se pudo contactar con la API externa" });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => console.log("Servidor iniciado"));
