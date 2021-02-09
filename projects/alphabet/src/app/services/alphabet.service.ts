import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pipe, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlphabetAPI, Card } from './IAlphabetApi';

@Injectable({
  providedIn: 'root'
})
export class AlphabetService implements AlphabetAPI {
  baseAPIURL: string = "https://api.tsilhqotinlanguage.ca"
  endpoints: any = {
    "getCard": "/alphabet-cards/",
    "getCount": "/alphabet-cards/count"
  }

  constructor( private http: HttpClient ) { }

  getCardBySequenceNumber(n: number): Observable<Card>{
    let endpoint: string = `${this.baseAPIURL}${this.endpoints.getCard}${n}`;
    return this.http.get(endpoint).pipe(
      map((data:any)=>{
        let card: Card = {
          'sequenceNumber': data.sequence_number,
          'letter': {
            'text': data.letter,
            'audioURL': `${this.baseAPIURL}${data.letter_audio.url}`,
          },
          'word': {
            'text': data.word,
            'audioURL': `${this.baseAPIURL}${data.word_audio.url}`
          },
          imageURL: `${this.baseAPIURL}${data.standalone_image.url}`
        }
        return card;
      })
    );
  }

  getAlphabetSize(): Observable<number>{
    let endpoint: string = `${this.baseAPIURL}${this.endpoints.getCount}`;
    return this.http.get(endpoint).pipe(
      map((data:Object)=>{
        return Number(data);
      })
    );
  }
}
