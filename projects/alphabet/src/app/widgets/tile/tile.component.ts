import { Component, OnInit, Input } from '@angular/core';
import { AlphabetService } from '../../services/alphabet.service';
import { Card } from '../../services/IAlphabetAPI';

@Component({
  selector: 'alphabet-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit {
  alphabetSize: number;
  card: Card;
  _tileNumber: number;
  _active: boolean = true; // card must be explicitly inactivated using Input property active

  @Input() public set num(n: number){
    this._tileNumber = n;
  }

  @Input() public set active(activeState: boolean){
    this._active = activeState;
  }

  constructor( private data: AlphabetService ) { }

  ngOnInit(): void {
    this.data.getAlphabetSize().subscribe((data:number)=>{
      this.alphabetSize = data;
      this.updateCard(this._tileNumber);
    })
  }
    
  updateCard(newTileNumber: number){
    newTileNumber = Number(newTileNumber); // convert string to number
    if(newTileNumber < 0 || !Number.isInteger(newTileNumber)) throw new Error(`Tile number ${newTileNumber} is not a positive integer.`);
    this._tileNumber = newTileNumber;
    this.data.getCardBySequenceNumber(this._tileNumber).subscribe((data:Card)=>{
      this.card = data;
    });
  }

  cyclicIncrement(n:number,maxNumber:number){
    n++;
    if(n < 0 || n > maxNumber + 1) throw new Error(`Index ${n} out of bounds.`); 
    return (n++) % maxNumber;
  }

  cyclicDecrement(n:number,maxNumber:number){
    let startingIndex: number = 1;
    n--;
    if(n === startingIndex - 1) return maxNumber;
    if(n < startingIndex || n > maxNumber) throw new Error(`Index out of bounds: ${n}`);
    return n;
  }

  handleLeftArrowClick(){
    if(!this._active) return; // Freeze inactive card's state

    this._tileNumber = this.cyclicDecrement(this._tileNumber,this.alphabetSize);
    this.updateCard(this._tileNumber);
  }

  handleRightArrowClick(){
    if(!this._active) return; // Freeze inactive card's state
    
    this._tileNumber = this.cyclicIncrement(this._tileNumber,this.alphabetSize);
    this.updateCard(this._tileNumber);
  }

}
