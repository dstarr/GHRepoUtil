import dotenv from 'dotenv';
import { listRepositories } from './operations/listRepositories.js';
import { deleteRepository } from './operations/deleteRepository.js';

// Load environment variables from .env file
dotenv.config();

const GITHUB_TOKEN_1 = process.env.GITHUB_TOKEN_1;

if (!GITHUB_TOKEN_1) {
    console.error('Error: GITHUB_TOKEN_1 is not set.');
    process.exit(1);
}

const args = process.argv.slice(2);

if (args.includes('--delete')) {
    const repoName = args[args.indexOf('--delete') + 1];
    console.log(`Repository to delete: ${repoName}`);
}

async function main() {
    if (args.includes('--list') || args.includes('-l')) {
        await listRepositories(GITHUB_TOKEN_1 as string);
    } else if (args.includes('--delete') || args.includes('-d')) {
        const repoName = args[args.indexOf('--delete') + 1] || args[args.indexOf('-d') + 1];
        if (!repoName) {
            console.error('Error: Repository name is required for deletion.');
            process.exit(1);
        }
        await deleteRepository("dstarr", repoName as string, GITHUB_TOKEN_1 as string);
    }
}

main().catch((error) => {
    if (error instanceof Error) {
        console.error('Error:', error.message);
    } else {
        console.error('Error:', error);
    }
});