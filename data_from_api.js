import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

async function getRandomJoke() {
    const options = {
        method: 'GET',
        url: 'https://dad-jokes.p.rapidapi.com/random/joke',
        headers: {
            'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'dad-jokes.p.rapidapi.com'
        }
    };
    try {
        const response = await axios.request(options);
        return {
            setup: response.data.body[0].setup,
            punchline: response.data.body[0].punchline,
            type: response.data.body[0].type
        }
    } catch (error) {
        console.error('Error fetching joke:', error.message);
        return null;
    }
}

export default getRandomJoke;