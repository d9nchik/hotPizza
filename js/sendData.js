export async function sendData(data, success, failure) {
    const url = 'https://hotpizza.ml/sendData';

    try {
        const response = await fetch(url, {
            method: 'POST', // или 'PUT'
            body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.text();
        success(Number(json));
    } catch (error) {
        failure(error);
    }
}