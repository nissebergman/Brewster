import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BeerService } from '../services/beer/beer.service';
import { UserService } from '../services/user/user.service';


@Component({
  selector: 'app-user-collection',
  templateUrl: './user-collection.component.html',
  styleUrls: ['./user-collection.component.css']
})
export class UserCollectionComponent implements OnInit {
  
  loading: boolean = true;
  updateReleasesInfo: string;
  dataIsLoaded: boolean;

  constructor(private beerService: BeerService, private userService: UserService) { }

  user: string;
  beersIds: number[];
  beers = [];
  beerRating: number;
  collectionInfo: string;

  ngOnInit(): void {
    this.beerService.beerNoteId$.subscribe(res => this.updateReleasesInfo = res)
    this.beerService.collectionInfo$.subscribe(res => this.collectionInfo = res)
    // Fetch current users added beers id's
    this.user = this.userService.getCurrentUser();
    // Async
    this.userService.userData(this.user).subscribe(async (data: any) =>{
    this.beersIds = data[0].addedBeers;
    
    for (var id of this.beersIds){
      // Connect fetched id's to beers from beer db. async & await to make sure that data received from beerRating can be synced up with data
      // in getBeerInfo.
      await this.getIds(this.user, id).then(res => this.beerRating = res[0].rating);
      this.beerService.getBeerInfo(id).subscribe((data: any) =>{
        //Add subscribe from beernotesDB to shared array.
        this.beers.push({
          id: data[0]._id,
          name: data[0].name,
          type: data[0].type,
          price: data[0].price,
          rating: this.beerRating
        })
        
        // Bit of a haxy solution for the *ngIf to work. Not sure why putting this after the 
        // for-loop does not work.. Perhaps this can be solved with the async/await somehow?
        if(this.beers.length == this.beersIds.length){
          this.dataIsLoaded = true;
          this.loading = false;
        }
      });
    }
    })
  }

  // Function to get beerNotes from beerId, async to keep main above to go on without it.
  async getIds(name: string, id: number){    
   await new Promise(r => setTimeout(r, 50));
   return this.beerService.getBeerNotes(name, id);
  }

  // Show the information from the selected beer in the right content
  newData(_id: string) {
    this.beerService.updateNotesInfo(_id);
    this.beerService.updateCollectionInfo(_id);
  }

  displayedColumns: string[] = ['name', 'type', 'price', 'rating'];
  dataSource = new MatTableDataSource(this.beers);

  //Angular material to sort the information in the table
  @ViewChild(MatSort, {static: false}) set content (sort: MatSort) {
    this.dataSource.sort = sort;
  };
}
