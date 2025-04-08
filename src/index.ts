import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const GITHUB_TOKEN_1 = process.env.GITHUB_TOKEN_1;

if (!GITHUB_TOKEN_1) {
    console.error('Error: GITHUB_TOKEN_1 is not set.');
    process.exit(1);
}

const args = process.argv.slice(2);

if (args.includes('--list') || args.includes('-l')) {
    await listRepositories();
}

/**
 * Fetches and lists all repositories for the authenticated user.
 * Displays the repository name and its visibility (private/public).
 * @returns {Promise<void>}
 */
async function listRepositories() {
    try {
        const response = await axios.get('https://api.github.com/user/repos', {
            headers: {
                Authorization: `Bearer ${GITHUB_TOKEN_1}`,
            },
            params: {
                per_page: 100,
            },
        });

        const repos = (response.data as { name: string; private: boolean }[]).map((repo) => ({
            name: repo.name,
            isPrivate: repo.private ? 'private' : 'public',
        }));
        repos.sort((a, b) => a.name.localeCompare(b.name)); // Sort repositories alphabetically

        console.log('Repositories:');
        repos.forEach((repo) => console.log(`${repo.isPrivate}: ${repo.name}`));
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error fetching repositories:', error.message);
        } else {
            console.error('Error fetching repositories:', error);
        }
    }
}
