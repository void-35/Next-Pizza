import { ISuggestion, getAddresses } from "@/services/addresses";
import { useEffect, useState } from "react";
import { useDebounce } from "react-use";

interface ReturnProps {
    dataSuggestions: ISuggestion[];
    getHighlightWords: () => string[];
    getSuggestionKey: (suggestion: ISuggestion) => string;
}

export const useAddressSuggestions = (query: string): ReturnProps => {
    const [dataSuggestions, setDataSuggestions] = useState<ISuggestion[]>([])

    const getHighlightWords = (): string[] => {
        const wordsToPass = ['г', 'респ', 'ул', 'р-н', 'село', 'деревня', 'поселок', 'пр-д', 'пл', 'к', 'кв', 'обл', 'д'];
        let words: string[] = query.replace(',', '').split(' ');
        words = words.filter((word) => {
            return wordsToPass.indexOf(word) < 0;
        });
        return words;
    };

    const getSuggestionKey = (suggestion: ISuggestion): string => suggestion.value;

    const getAddressSugestions = async () => {
        try {
            const { suggestions } = await getAddresses({
                text: query,
                locations: [
                    {
                        country_iso_code: 'KZ'
                    }
                ]
            })
            setDataSuggestions(suggestions)
        } catch (error) {
            console.log(error)
        }
    }

    useDebounce(() => {
        getAddressSugestions()
    }, 250, [query])

    return ({ dataSuggestions, getHighlightWords, getSuggestionKey })
}