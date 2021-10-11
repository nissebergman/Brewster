import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent implements OnInit {

  userData: string;

  constructor(private User: UserService, private router: Router, private snackBar: MatSnackBar) { }
  loginForm = new FormGroup({
    name: new FormControl(''),
    password: new FormControl('')
  });

  //Function for logging in user, displaying error if unsuccessful login, setting auth-token in localstorage to keep user logged in.
  loginUser(){
    this.User.userLogin(this.loginForm.value).subscribe(
      (data: any) => {
        console.log(this.userData);
        let token = data.token;
        localStorage.setItem('Token', token);
        this.router.navigate([ '/home']);
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        if(err.error.msg) {
          this.snackBar.open(err.error.msg, 'Undo');
        }
        else{
          this.snackBar.open('Something went wrong!')
        }
      }
    )
  }
  ngOnInit(): void {
  }

}
