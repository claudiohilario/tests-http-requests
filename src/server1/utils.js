

/**
 * This function allows generate boundary for multipart request.
 */
function generateBoundary () {
    let length = 15;
    const result = [];
    const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    while (--length) {
        result.push(charSet.charAt(Math.floor(Math.random() * charSet.length)));
    }

    return result.join('');
}