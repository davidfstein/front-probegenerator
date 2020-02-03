import Constants from '../Constants.js';

const generateProbes = async (formData) => {
    const response = await fetch(`${Constants.API_URL}/generateProbes`, {
        method: "POST",
        body: formData,
    });
    return await response.json();
}

export {
    generateProbes,
}