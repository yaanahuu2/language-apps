import { Component, OnInit } from '@angular/core';
import { AlphabetService } from '../../services/alphabet.service';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.css']
})
export class CreditsComponent implements OnInit {

  contributors: Object;

  constructor( private alphabet: AlphabetService ) { }

  ngOnInit(): void {
    this.alphabet.getAlphabetCredits().subscribe((data: any)=>{
      this.contributors = data.contributors;
    })
  }

}
