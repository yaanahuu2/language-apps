import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlphabetAPI } from './IAlphabetApi';

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

  getCardBySequenceNumber(n: number){
    let endpoint = `${this.baseAPIURL}${this.endpoints.getCard}${n}`;
    return this.http.get(endpoint).pipe(
      map((data:any)=>{
        return data;
      })
    )
  }

  getAlphabetSize(){
    return this.http.get(this.endpoints.getCount);
  }
}
