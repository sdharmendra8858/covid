interface Covid {
    error: boolean,
    statusCode: number,
    nessage: string,
    data: {
        lastChecked: string,
        covid19Stats: [
            {
                province: string,
                country: string,
                lastUpdated: string,
                deaths: number,
                recovered: number
            }
        ],
        length: number
    }
}