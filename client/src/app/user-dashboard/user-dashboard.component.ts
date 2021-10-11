import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  loading: boolean = true;
  user: string;
  imgURL: string;
  nrOfAddedBeers: number;

  constructor(private User: UserService) { }
  
  ngOnInit(): void {
    //Get the information of the login user 
    this.user = this.User.getCurrentUser();
    this.User.userData(this.user).subscribe((data: any) =>{
      console.log(data);
      this.imgURL = data[0].profileIMG;
      this.nrOfAddedBeers = data[0].addedBeers.length;
      this.loading = false;
    })
  }
}

