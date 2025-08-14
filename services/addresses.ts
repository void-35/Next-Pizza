import axios, { AxiosResponse } from "axios";

interface AddressQuery {
    text: string,
    locations: { country?: string, country_iso_code?: string }[]
}

interface IDataSuggestion {
    suggestions: ISuggestion[]
}

export interface ISuggestion {
    value: string;
}



export async function getAddresses(query: AddressQuery): Promise<IDataSuggestion> {
    const { data } = await axios.post<IDataSuggestion>('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
        { query: query.text, locations: query.locations },
        {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Token " + process.env.NEXT_PUBLIC_DADATA_API_KEY
                ,
            }
        }
    )

    return data

}