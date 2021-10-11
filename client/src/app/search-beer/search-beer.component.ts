import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BeerService } from '../services/beer/beer.service';
import { Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-search-beer',
  templateUrl: './search-beer.component.html',
  styleUrls: ['./search-beer.component.css']
})


export class SearchBeerComponent  implements OnInit{

  loading: boolean = true;
  products = [];
  searchBeerInfo: string;
  dataIsLoaded: boolean = false;
  
  constructor(private beerService: BeerService) { }

  ngOnInit(): void {
    //Listing all beers from DB in table.
    this.beerService.listAllBeers().subscribe((data: any) =>{
      data.forEach(element => {
        this.products.push({
          id: element._id,
          name: element.name,
          type: element.type,
          price: element.price,
          link: element.link
        })
      });
      this.dataIsLoaded = true; // Variable true when data is loaded. Needed for *ngIf in html
      this.loading = false; // Stop 'loading' spinner animation.
     })
  }

  // Update right content with the information from the selected beer in the table using Observable variable searchBeerInfo from beerService.
  newData(_id: string) {
    this.beerService.updateSearchBeerInfo(_id);
  }

  //Create Mat table for displaying all beers
  displayedColumns: string[] = ['image','name', 'type', 'price'];
  dataSource = new MatTableDataSource(this.products);

  // Filter the values and change to lower case. Used for searching a specific beer in the DB
  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
  }
 
}
