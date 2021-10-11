import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BeerService } from '../services/beer/beer.service';
import { UserService } from '../services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReturnStatement } from '@angular/compiler';

let beerNotes: {
  userName: string;
  beerId: number;
  rating: number,
  notes: string
}[] = [];

let userUpdate: {
  userName: string,
  beerId: number
}[] = [];

@Component({
  selector: 'app-beer-info',
  templateUrl: './beer-info.component.html',
  styleUrls: ['./beer-info.component.css']
})
export class BeerInfoComponent implements OnInit {

  searchBeerInfo: string;
  beerImg: string;
  beerName: string;
  beerId: number;
  beerPrice: string;
  beerType: string;
  beerTaste: string;
  displayButton: boolean;
  addToCollection: boolean;
  showBeerInfo: boolean;
  beerAlreadyAdded: boolean;
  userName: string;
  selectedRating: number;
  
  //Star rating
  stars = [
    {
      id: 1,
      icon: 'star',
      class: 'star-gray star-hover star'
    },
    {
      id: 2,
      icon: 'star',
      class: 'star-gray star-hover star'
    },
    {
      id: 3,
      icon: 'star',
      class: 'star-gray star-hover star'
    },
    {
      id: 4,
      icon: 'star',
      class: 'star-gray star-hover star'
    },
    {
      id: 5,
      icon: 'star',
      class: 'star-gray star-hover star'
    }
  ];

  constructor(private beerService: BeerService, private userService: UserService, private snackBar: MatSnackBar) { }
    //Create the form that stores the input notes from the user
    notesForm = new FormGroup({
      notes: new FormControl('')
    });

    //Fetch all beers in DB to be processed in search/filter functionality.
  ngOnInit(): void {
    this.beerService.searchBeerInfo$.subscribe( res => {
      this.searchBeerInfo = res;
      if(this.searchBeerInfo != null){
        this.showBeerInfo = true;
        this.beerService.getBeerInfo(this.searchBeerInfo).subscribe((data: any) =>{
          this.beerName = "Name: " +data[0].name;
          this.beerId = data[0]._id;
          this.beerImg = data[0].link;
          this.beerPrice = "Price: " + data[0].price + ":-";
          this.beerType = "Type: " + data[0].type;
          this.beerTaste = "Information: " + data[0].taste;
          this.displayButton = true;
          // Check if beer already is added to My Collection, hides 'Add' button.
          this.checkAlreadyExists();
        })
      }
    })
  }

  //Set the number of stars that was selected to orange otherwise they are grey
  selectStar(value): void{
    this.stars.filter((star) => {
      if(star.id <= value){
        star.class = 'star-gold star';
      }
      else{
        star.class = 'star-gray star';
      }
      return star;
    });
    this.selectedRating = value;
    
  }
  
  //Function that change the div 'to add beer to collection'.
  showAddBeerToCollection(){
    this.addToCollection = true;
    this.showBeerInfo = false;
    this.stars.filter((star) => {
      star.class = 'star-gray star';
      return star;
    });
  }
  
  //Function to show default div, just containing beer info.
  showInfo(){
    this.addToCollection = false;
    this.showBeerInfo = true;
  }

  //If beer already is added to current user, hides add button and displays text.
  async checkAlreadyExists(){
    await this.beerService.getBeerNotes(this.userService.getCurrentUser(), this.searchBeerInfo).then((data: any) =>{
      if(data[0]){
        this.beerAlreadyAdded = true;
      } else {
        this.beerAlreadyAdded = false;
      }
    })
  }

  // Add the selected beer with its information to the user collection
  addBeerToCollection(){
    this.userName = this.userService.getCurrentUser();
    beerNotes = [{
      userName: this.userName,
      beerId: this.beerId,
      rating: this.selectedRating,
      notes: this.notesForm.value.notes      
    }];
    userUpdate = [{
      userName: this.userName,
      beerId: this.beerId
    }];
    // Update beer notes DB
    this.beerService.updateBeerNotes(beerNotes[0]).subscribe(
      (data: any) => {
        console.log(data);
      })
    // Update added-beers array in user DB when added ID.
    this.userService.updateUserBeers(userUpdate[0]).subscribe(
      (data: any) => {
        console.log(data);
      })
    this.snackBar.open("Beer added to My Collection", "Dismiss"); //User feedback when beer is added.
    this.showInfo();
    this.notesForm.reset();
    this.stars.filter((star) => {
      star.class = 'star-gray star';
      return star;
    });
  }
}
