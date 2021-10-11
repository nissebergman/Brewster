import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BeerService } from '../services/beer/beer.service';

@Component({
  selector: 'app-upcoming-releases',
  templateUrl: './upcoming-releases.component.html',
  styleUrls: ['./upcoming-releases.component.css']
})

export class UpcomingReleasesComponent implements OnInit{

  releases = [];

  dataIsLoaded: boolean = false;

  constructor(private beerService: BeerService) { }

  ngOnInit(): void {
  //Fetch information about the upcoming releases
    this.beerService.listUpcomingReleases().subscribe((data: any) => {
      data.forEach(element => {
        this.releases.push({
          name: element.name,
          release: element.release.substring(0,9),
          type: element.type
        })
      });
      this.dataIsLoaded = true; // true when data is loaded, used by *ngIf
      // Sort releases based on their date.
      this.releases.sort(function(a,b){
        var date1 = a.release;
        var date2 = b.release;
        if(date1 < date2){
          return -1;
        }
        if(date1 > date2){
          return 1;
        }
        return 0;
      })
    })
  }
  // Create mat table that displays the information
  displayedColumns: string[] = ['release','name', 'type'];
  dataSource = new MatTableDataSource(this.releases);
}
