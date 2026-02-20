const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// 1. RUTA DE DIAGNÓSTICO (Para confirmar que el código es el nuevo)
app.get('/', (req, res) => {
    res.send('✅ SERVIDOR V3 - RUTAS ACTIVAS');
});

// 2. RUTA DE CONSULTA REFORMATEADA
app.get('/consulta/:plate', async (req, res) => {
    const matricula = req.params.plate;
    console.log(`Petición recibida para: ${matricula}`);

    try {
        const response = await axios.get(`https://api-matriculas-espana.p.rapidapi.com/get/${matricula}`, {
            headers: {
                'X-RapidAPI-Key': 'b4b6eb078cmsh025d40281b264c2p19be9ajsn045ec5167bae',
                'X-RapidAPI-Host': 'api-matriculas-espana.p.rapidapi.com'
            }
        });
        
        // Devolvemos la data directamente
        return res.status(200).json(response.data);

    } catch (error) {
        console.error("Error en API externa:", error.message);
        return res.status(404).json({ error: 'No encontrado' });
    }
});

// 3. CONFIGURACIÓN DEL PUERTO
const PORT = process.env.PORT || 10000; // Render prefiere el 10000 por defecto
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});
