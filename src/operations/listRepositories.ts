import axios from 'axios';

/**
 * Fetches and lists all repositories for the authenticated user.
 * @param githubToken - The GitHub personal access token. 
 * @returns {Promise<void>} - A promise that resolves when the repositories are listed.
 */
export async function listRepositories(githubToken: string): Promise<void> {
    try {
        const response = await axios.get('https://api.github.com/user/repos', {
            headers: {
                Authorization: `Bearer ${githubToken}`,
            },
            params: {
                per_page: 100,
            },
        });
        const repos = (response.data as Array<{ name: string; private: boolean }>).map((repo) => ({
            name: repo.name,
            isPrivate: repo.private ? 'private' : 'public',
        }));
        repos.sort((a, b) => a.name.localeCompare(b.name)); // Sort repositories alphabetically
        console.log('Repositories:');
        repos.forEach((repo) => console.log(`${repo.isPrivate}: ${repo.name}`));
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error fetching repositories:', error.message);
        }
        else {
            console.error('Error fetching repositories:', error);
        }
    }
}
