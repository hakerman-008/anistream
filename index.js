const express = require('express');
const http = require('http');

const app = express();


app.get('/kshitiz', async (req, res) => {
    const { id } = req.query;

    try {
       
        const options = {
            method: 'GET',
            hostname: 'api.techzbots1.workers.dev',
            path: `/episode/${id}`,
        };

        
        const req = http.request(options, (response) => {
            let data = '';

            
            response.on('data', (chunk) => {
                data += chunk;
            });

           
            response.on('end', () => {
                const responseData = JSON.parse(data);
                const referer = responseData.results.stream.Referer;
                res.json({ Referer: referer });
            });
        });

    
        req.on('error', (error) => {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });

      
        req.end();
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
