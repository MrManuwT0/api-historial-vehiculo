const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/:plate', async (req, res) => {
    const plate = req.params.plate.toUpperCase().trim();
    
    // Configuramos los headers exactos que pusiste en el curl
    const options = {
        method: 'GET',
        url: 'https://matriculas-espana1.p.rapidapi.com/es',
        params: { plate: plate },
        headers: {
            'x-rapidapi-key': '06cdd6d462msh0abc24c130d8be5p1e5d34jsna3e938c8cf62',
            'x-rapidapi-host': 'matriculas-espana1.p.rapidapi.com',
            'Content-Type': 'application/json'
        }
    };

    try {
        const response = await axios.request(options);
        res.json(response.data);
    } catch (error) {
        // Esto mostrará en los logs de Render exactamente qué falla
        console.error("ERROR DETALLADO:", error.response ? error.response.data : error.message);
        res.status(502).json({ 
            error: "Fallo de comunicación con la API", 
            details: error.message 
        });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Servidor escuchando en puerto " + PORT));
