// Service component responsible for calls to and from user-related backend stories.
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  // Decode token and return current user name. Used in several components.
  getCurrentUser() : string {
    var token = localStorage.getItem("Token");
    var base64Url = token.split('.')[1];
    var decoded = JSON.parse(window.atob(base64Url));
    return decoded.user.name;
  }
  createNewUser(payload) {
    return this.http.post(`${environment.baseURL}user/register`, payload);
  }
  userLogin(payload) {
    return this.http.post(`${environment.baseURL}user/login`, payload);
  }

  updateUserBeers(payload){
    return this.http.post(`${environment.baseURL}user/updatebeers`, payload);
  }

  updateUserImg(payload){
    return this.http.post(`${environment.baseURL}user/updateimg`, payload);
  }

  userData(payload){
    return this.http.get(`${environment.baseURL}user/getuser/${payload}`);
  }
}