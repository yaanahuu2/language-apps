import { Observable } from 'rxjs';

export interface AlphabetAPI {
    getCardBySequenceNumber(n: number): Observable<Card>,
    getAlphabetSize(): Observable<number>
}

export type Card = {
    "sequenceNumber": number,
    "letter": TextWithAudio,
    "word": TextWithAudio,
    "imageURL": string
}

type TextWithAudio = {
    "text": string,
    "audioURL": string
}
