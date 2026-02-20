const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

// EL PUENTE: Captura CUALQUIER cosa después de la "/" como matrícula
app.get('/:plate', async (req, res) => {
    const plate = req.params.plate.toUpperCase().trim();

    // Filtro de seguridad para peticiones vacías o iconos del sistema
    if (!plate || plate === "FAVICON.ICO" || plate === "INDEX.HTML") {
        return res.status(204).end();
    }

    console.log(`[PROXIED] Solicitando matrícula: ${plate}`);

    try {
        const response = await axios.get(`https://api-matriculas-espana.p.rapidapi.com/get/${plate}`, {
            headers: {
                'X-RapidAPI-Key': 'b4b6eb078cmsh025d40281b264c2p19be9ajsn045ec5167bae',
                'X-RapidAPI-Host': 'api-matriculas-espana.p.rapidapi.com'
            }
        });
        
        // Devolvemos los datos tal cual los entrega RapidAPI
        res.json(response.data);

    } catch (error) {
        // Si RapidAPI falla o la matrícula no existe
        res.status(error.response?.status || 500).json({ 
            error: 'No encontrado', 
            message: error.message 
        });
    }
});

// Mensaje de estado solo para la raíz pura "/"
app.get('/', (req, res) => {
    res.send('✅ PUENTE RENDER ACTIVO');
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor puente en puerto ${PORT}`);
});
