import Observable from 'rxjs';

export interface AlphabetAPI {
    getCardBySequenceNumber(n: number): Observable<Card>,
    getAlphabetSize(): Observable<number>
}

type Card = {
    "sequence_number": number,
    "letter": TextWithAudio,
    "word": TextWithAudio
}

type TextWithAudio = {
    "text": "string",
    "audioURL": "string"
}
