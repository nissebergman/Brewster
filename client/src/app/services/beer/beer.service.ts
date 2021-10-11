// Service component responsible for calls to and from beer-related backend stories.
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BeerService {
  loading: boolean;
  constructor(private httpClient: HttpClient) {
    this.loading = false;
  }

  //Observable variables to be sent and fetched between components
  private searchBeerInfo = new BehaviorSubject(null);
  searchBeerInfo$ = this.searchBeerInfo.asObservable();

  private collectionInfo = new BehaviorSubject(null);
  collectionInfo$ = this.collectionInfo.asObservable();

  private beerNoteId = new BehaviorSubject(null);
  beerNoteId$ = this.beerNoteId.asObservable();

  updateSearchBeerInfo(searchBeerInfo: string) {
    this.searchBeerInfo.next(searchBeerInfo)
  }

  updateCollectionInfo(collectionInfo: string){
    this.collectionInfo.next(collectionInfo)
  }

  updateNotesInfo(beerNoteId: string) {
    this.beerNoteId.next(beerNoteId)
  }

  listAllBeers(){
    return this.httpClient.get(`${environment.baseURL}beer/getbeers`);
  }

  listUpcomingReleases(){
    return this.httpClient.get(`${environment.baseURL}beer/getreleases`);
  }

  getBeerInfo(payload){
    return this.httpClient.get(`${environment.baseURL}beer/getbeers/${payload}`)
  }

  updateBeerNotes(payload){
    return this.httpClient.post(`${environment.baseURL}beer/updatebeernotes`, payload);
  }
  // Async to make sure call is completed before moving on. Helps when used in conjunction with other subscribes.
  async getBeerNotes(userName, beerId){
    return await this.httpClient.get(`${environment.baseURL}beer/getbeernotes/${userName}/${beerId}`).toPromise();
  }
}
