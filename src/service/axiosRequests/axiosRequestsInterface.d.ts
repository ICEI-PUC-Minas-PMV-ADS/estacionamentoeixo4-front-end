export default interface axiosRequestInterface {
    url: string,
    data?: any,
    options: {
        headers: { Authorization: string },
        params?: object
    }
}