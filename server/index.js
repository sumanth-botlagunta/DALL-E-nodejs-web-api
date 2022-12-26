import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.status(200).send({
        message: 'Welcome to DALL-E API',
    });
});


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/openai', async (req, res) => {
    const { prompt, size } = req.body;

    const imageSize = size === 'small' ? '256x256' : 'medium' ? '512x512' : '1024x1024';
    try {
        const response = await openai.createImage({
            prompt: `${prompt}`,
            size: `${imageSize}`,
            n: 1
        })
        const imageURL = response.data.data[0].url;
        res.status(200).json({
            success: true,
            data: imageURL,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error,
            text: 'Image generation failed'
        });
        console.error(error);
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});
