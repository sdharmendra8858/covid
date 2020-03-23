export interface Covid {
    error: boolean,
    statusCode: number,
    message: string,
    data: {
        lastChecked: 'string',
        covid19Stats: [{
            province: string,
            country: string,
            lastUpdate: string,
            confirmed: number,
            deaths: number,
            recovered: number
        }],
        lentgh: number
    }
}