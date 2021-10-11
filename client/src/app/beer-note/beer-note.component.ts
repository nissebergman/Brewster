import { Component, OnInit } from '@angular/core';
import { BeerService } from '../services/beer/beer.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-beer-note',
  templateUrl: './beer-note.component.html',
  styleUrls: ['./beer-note.component.css']
})
export class BeerNoteComponent implements OnInit {

  releaseBeerInfo: string;
  collectionInfo: string;
  beerNotes: string;
  beerName: string;
  beerType: string;
  beerImg: string;
  beerRating: number;
  userName: string;
  showNotesInfo:boolean;

  constructor(private beerService: BeerService, private userService: UserService) { }

  ngOnInit(): void {
    //Fetching username from service
    this.userName = this.userService.getCurrentUser();
    //Nested subscribes, making use of .then to await response from getBeerNotes before advancing since these has to be put in the same list.
    this.beerService.beerNoteId$.subscribe( res => {
      this.releaseBeerInfo = res;
      //Get beer notes and rating from beerNotes collection in DB
      if(this.releaseBeerInfo != null){
        this.beerService.getBeerNotes(this.userName, this.releaseBeerInfo).then(res => {
          this.beerNotes = res[0].notes;
          this.beerRating = res[0].rating;
        })
      }
    })
    // Observable variable sent from sibling user-collection.
    this.beerService.collectionInfo$.subscribe(res =>{
      this.collectionInfo = res;
      if(this.collectionInfo != null){
        this.beerService.getBeerInfo(this.collectionInfo).subscribe(res => {
          this.beerName = res[0].name;
          this.beerType = res[0].type;
          this.beerImg = res[0].link;
          this.showNotesInfo = true;
        })
      }

    })
  }

 
}



