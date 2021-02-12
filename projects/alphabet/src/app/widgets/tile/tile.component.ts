import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlphabetService } from '../../services/alphabet.service';
import { Card } from '../../services/IAlphabetAPI';
import { CardRegion } from './card-region';
import { TileClickEventData } from './tile-click-event-data';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'alphabet-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit {
  letterRegion = CardRegion.LETTER;
  wordRegion = CardRegion.WORD;
  imageRegion = CardRegion.IMAGE;
  card: Card;
  _tileNumber: number;
  _active: boolean = true; // card must be explicitly inactivated using Input property active
  private _ready: boolean = false;
  @Input() public set num(n: number){
    // tile state is controlled from outside solely by num property
    if(!this._active) return;

    this._tileNumber = n;
    this.updateCard(this._tileNumber); // update card state for new num
  }

  @Input() public set active(activeState: boolean){
    this._active = activeState;
  }

  @Output() public cardNotFound = new EventEmitter<string>();
  alertCardNotFound(){
    this.cardNotFound.emit(`Card not found: ${this._tileNumber}`);
  }

  @Output() public cardClicked = new EventEmitter<TileClickEventData>();
  handleClick(region: CardRegion){
    let data: TileClickEventData = {
      "region": region,
      "cardNumber": this._tileNumber
    }
    this.audio.playAudioFromURL(this.card.word.audioURL);
    this.cardClicked.emit(data);
  }

  constructor( private data: AlphabetService, private audio: AudioService ) { }

  ngOnInit(): void {
      this.updateCard(this._tileNumber);
  }
    
  updateCard(newTileNumber: number){
    newTileNumber = Number(newTileNumber); // convert string to number
    if(newTileNumber < 0 || !Number.isInteger(newTileNumber)) throw new Error(`Tile number ${newTileNumber} is not a positive integer.`);
    this._tileNumber = newTileNumber;
    this.data.getCardBySequenceNumber(this._tileNumber)
    .pipe(
      catchError((error:any) =>{
        console.log(error.message);
        this.alertCardNotFound();
        return of([]);
      })
    )
    .subscribe((data:Card)=>{
      if(data) this.card = data;
    });
  }
}
