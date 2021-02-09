import { Component, OnInit, Input } from '@angular/core';
import { AlphabetService } from '../../services/alphabet.service';
import { Card } from '../../services/IAlphabetAPI';

@Component({
  selector: 'alphabet-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit {

  card: Card;
  _tileNumber: number;

  @Input() public set num(n: number){
    this._tileNumber = n;
  }

  constructor( private data: AlphabetService ) { }

  ngOnInit(): void {
    this.data.getCardBySequenceNumber(this._tileNumber).subscribe((data:Card)=>{
      this.card = data;
    });
  }

}
