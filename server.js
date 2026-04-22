const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/:plate', async (req, res) => {
    const plate = req.params.plate.toUpperCase().trim();
    
    // Configuración para la nueva API: matriculas-espana1
    const options = {
        method: 'GET',
        url: `https://matriculas-espana1.p.rapidapi.com/es`,
        params: { plate: plate }, // Usamos params para asegurar el formato
        headers: {
            'x-rapidapi-key': 'eed84183d8mshd47cb981fb16166p1750b2jsn1adb6a81a02a',
            'x-rapidapi-host': 'matriculas-espana1.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        res.json(response.data);
    } catch (error) {
        console.error("Error detallado:", error.message);
        res.status(500).json({ error: "Fallo al conectar con la API externa", details: error.message });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => console.log("Servidor corriendo en puerto " + PORT));
