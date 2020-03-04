import Constants from '../Constants.js';

const checkCaptcha = async (capcthaContent) => {
    const response = await fetch(`${Constants.API_URL}/checkCaptcha`, {
        method: 'post',
        body: capcthaContent,
    });
    return await response.json();
}

export {
    checkCaptcha
}