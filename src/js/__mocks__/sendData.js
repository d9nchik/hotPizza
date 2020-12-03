export const mockFunction = jest.fn();
export function sendData(data, success) {
    mockFunction(data);
    success('112');
}
