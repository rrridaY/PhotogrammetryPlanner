const API_BASE_URL = 'http://localhost:3001';


/**
 * Fetch data from the API.
 * @returns {Promise<Object>} The data fetched from the API.
 */
export const fetchData = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/data`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

/**
 * Save data to the API.
 * @param {Object} data - The data to be saved.
 * @returns {Promise<Object>} The response from the API.
 */
export const saveData = async (data) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/data`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error saving data:', error);
        throw error;
    }
};