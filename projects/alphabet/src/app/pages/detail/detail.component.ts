import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AlphabetService } from '../../services/alphabet.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  alphabetSize: number;
  tileNumber: number;

  constructor( private data: AlphabetService, private route:ActivatedRoute, private router: Router ) { }

  ngOnInit(): void {
    this.data.getAlphabetSize().subscribe((data:number)=>{
      this.alphabetSize = data;
    });

    this.route.params
      .pipe(map(params=>params['id']))
      .subscribe((id:string)=>{
        this.tileNumber = Number(id);
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
    this.tileNumber = this.cyclicDecrement(this.tileNumber,this.alphabetSize);
  }

  handleRightArrowClick(){
    this.tileNumber = this.cyclicIncrement(this.tileNumber,this.alphabetSize);
  }

  navigateToIndex(message: string){
    console.log(message);
    console.log(`Returning to menu.`);
    this.router.navigate(['/menu']);
  }
}
