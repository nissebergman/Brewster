import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../services/user/user.service';

let imgUpdate: {
  userName: string,
  profileIMG: string
}[] = [];

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {

loading: boolean = true;
urlPrefix: string = 'https://brewster-profile-img.s3.eu-north-1.amazonaws.com/'; //Prefix is our own Amazon bucket.
userName: string;
imgUpdate: [];
imgNr: number;

//Constructing the URLS for profile imgs.
imgURLS: string[] = [
  this.urlPrefix + '1.png',
  this.urlPrefix + '2.png',
  this.urlPrefix + '3.png',
  this.urlPrefix + '4.png',
  this.urlPrefix + '5.png',
  this.urlPrefix + '6.png',
  this.urlPrefix + '7.png',
  this.urlPrefix + '8.png',
];

  constructor(private userService: UserService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    // Get initial img nr for applying highlight
    this.setFrameInit();
    this.loading = false;

  }

  // Setting inital frame on load
  setFrameInit(){
    this.userName = this.userService.getCurrentUser();
    this.userService.userData(this.userName).subscribe((data: any) =>{
      this.imgNr = data[0].profileIMG[data[0].profileIMG.length-5]-1;
    })
  }

  // Changing img on click
  changeImg(img: string){
    imgUpdate = [{
      userName: this.userName,
      profileIMG: img
    }];
    
    // Call to DB to change user img
    this.userService.updateUserImg(imgUpdate[0]).subscribe(
      (data: any) => {
      })
      // Update border pos and display snackbar
      this.imgNr = parseInt(img.substr(img.length-5))-1;
      this.snackBar.open("Profile image changed!", "Dismiss");
    }
  }

