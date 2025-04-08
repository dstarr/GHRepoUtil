import axios from 'axios';
import dotenv from 'dotenv';
import { operations } from './operations'; // Import the extracted function

// Load environment variables from .env file
dotenv.config();

const GITHUB_TOKEN_1 = process.env.GITHUB_TOKEN_1;

if (!GITHUB_TOKEN_1) {
    console.error('Error: GITHUB_TOKEN_1 is not set.');
    process.exit(1);
}

const args = process.argv.slice(2);

async function main() {
    if (args.includes('--list') || args.includes('-l')) {
        await operations.listRepositories(GITHUB_TOKEN_1 as string);
    }
}

main().catch((error) => {
    if (error instanceof Error) {
        console.error('Error:', error.message);
    } else {
        console.error('Error:', error);
    }
});
