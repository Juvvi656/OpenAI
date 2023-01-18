import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import {Configuration, OpenAIApi} from 'openai';

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'Hello from Codex',
    })
})

app.post('/message', async (req, res) => {
    try {
        const prompt = req.body.prompt;

        const response = await openai.createImage({
            prompt: req.body.prompt,
            n: 1,
            size: req.body.size,
          });
          
        const image_url = response.data.data[0].url;

        res.status(200).send({
            data: image_url
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({error})
    }
})

app.listen(3000, () => {
    console.log('Listening on http://localhost:3000');
})

