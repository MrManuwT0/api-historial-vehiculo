const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// 1. ESCUCHA DIRECTA EN LA RAÍZ
// Esto permite que llames a: https://api-historial-vehiculo.onrender.com/6986JDY
app.get('/:plate', async (req, res) => {
    const plate = req.params.plate.toUpperCase().trim();

    // Ignorar peticiones automáticas del navegador
    if (plate === "FAVICON.ICO" || plate === "") return res.status(204).end();

    console.log(`Solicitando a RapidAPI la matrícula: ${plate}`);

    try {
        // 2. PETICIÓN A RAPIDAPI
        const response = await axios.get(`https://api-matriculas-espana.p.rapidapi.com/get/${plate}`, {
            headers: {
                'X-RapidAPI-Key': 'b4b6eb078cmsh025d40281b264c2p19be9ajsn045ec5167bae',
                'X-RapidAPI-Host': 'api-matriculas-espana.p.rapidapi.com'
            }
        });

        // 3. RESPUESTA AL FRONTEND
        // Si RapidAPI devuelve datos, se los pasamos a tu web
        res.json(response.data);

    } catch (error) {
        // Si RapidAPI devuelve 404 o error, lo reportamos
        console.error("Error en el puente con RapidAPI:", error.message);
        res.status(error.response?.status || 500).json({
            error: 'Error al consultar RapidAPI',
            details: error.message
        });
    }
});

// Mensaje de bienvenida para verificar que el server está vivo
app.get('/', (req, res) => {
    res.send('✅ Puente con RapidAPI configurado en la raíz. Listo para recibir matrículas.');
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0');
