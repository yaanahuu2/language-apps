import { Component, OnInit } from '@angular/core';
import { AlphabetService } from '../../services/alphabet.service';
import { Card } from '../../services/IAlphabetAPI';

@Component({
  selector: 'alphabet-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  numberOfRows: number = 3;
  numberOfMenuItems: number = 9;
  alphabetSize: number;
  numberOfColumns: number;
  menuItems: Card[][];

  constructor( private data: AlphabetService ) { }

  ngOnInit(): void {
    this.data.getAlphabetSize().subscribe((data:number)=>{
      console.log(data);
      this.alphabetSize = data;
      this.numberOfColumns = this.calculateNumberOfColumns(this.numberOfMenuItems,this.numberOfRows);
    });

    this.data.getCardBySequenceNumber(1).subscribe((data:Object)=>{
      console.log(data);
    })
  }

  private calculateNumberOfColumns(numberOfItems: number,numberOfRows: number){
    if( numberOfItems < 1 || !Number.isInteger(numberOfItems)) throw new Error("Number of items must be a positive integer.");
    if( numberOfRows < 1 || !Number.isInteger(numberOfRows)) throw new Error("Number of rows must be a positive integer");
    return Math.floor(numberOfItems / numberOfRows);
  }

}
