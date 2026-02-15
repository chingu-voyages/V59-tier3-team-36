export const fetchSummary = async (sessionId) => {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const response = await fetch(`${BASE_URL}/api/sessions/${sessionId}/summary`);

    if (!response.ok) {
        throw new Error('Failed to fetch summary');
    }

    return response.json();
}

