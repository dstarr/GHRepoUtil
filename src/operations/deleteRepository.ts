import axios from 'axios';

export async function deleteRepository(owner: string, repo: string, token: string): Promise<void> {
    const url = `https://api.github.com/repos/${owner}/${repo}`;

    console.log(`Attempting to delete repository: ${url}`);

    try {
        const response = await axios.delete(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/vnd.github+json'
            }
        });

        if (response.status === 204) {
            console.log(`✅ Repository ${owner}/${repo} deleted successfully.`);
        } else {
            console.warn(`⚠️ Unexpected response status: ${response.status}`);
        }
    } catch (error: any) {
        if (error.response?.status === 404) {
            console.error(`❌ Repository not found or access denied.`);
        } else {
            console.error(`❌ Failed to delete repository:`, error.response?.data || error.message);
        }
    }
}