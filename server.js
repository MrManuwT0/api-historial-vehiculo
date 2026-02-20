const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

// Captura cualquier matrícula directamente en la raíz
app.get('/:plate', async (req, res) => {
    const plate = req.params.plate.toUpperCase().trim();
    
    // Evita que las peticiones automáticas del navegador (favicon) bloqueen el sistema
    if (plate.includes("FAVICON")) return res.status(204).end();

    try {
        const response = await axios.get(`https://api-matriculas-espana.p.rapidapi.com/get/${plate}`, {
            headers: {
                'X-RapidAPI-Key': 'b4b6eb078cmsh025d40281b264c2p19be9ajsn045ec5167bae',
                'X-RapidAPI-Host': 'api-matriculas-espana.p.rapidapi.com'
            }
        });
        
        // Enviamos la respuesta limpia al frontend
        res.json(response.data);
    } catch (error) {
        // Si RapidAPI falla, devolvemos el error exacto para saber qué pasa
        res.status(error.response?.status || 500).json({ 
            error: "Error en la consulta", 
            detalles: error.response?.data || error.message 
        });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => console.log(`Proxy activo en puerto ${PORT}`));
