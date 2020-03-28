export interface Covid {
    get: string,
    parameters: {
        country: string
    },
    errors: [],
    results: number,
    response: [
        {
            country: string,
            cases: {
                new: string,
                active: number,
                critical: number,
                recovered: number,
                total: number
            },
            deaths: {
                new: string,
                total: number
            },
            day: string,
            time: string
        }
    ]
}

export interface CovidData {
    country: string,
    cases: {
        new: string,
        active: number,
        critical: number,
        recovered: number,
        total: number
    },
    deaths: {
        new: string,
        total: number
    },
    day: string,
    time: string
}