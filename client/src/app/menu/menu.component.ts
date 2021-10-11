import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { MenuItem } from '../interfaces/menu-item';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {

  constructor(private user: UserService, private router: Router) { }

  //Construct menu items from interface
  menuItems: MenuItem[] = [
    {
      label: 'HOME',
      routerLink: '/home'
    },
    {
      label: 'MY BEER COLLECTION',
      routerLink: '/collection'
    },
    {
      label: 'SEARCH BEER',
      routerLink: '/search'
    },
    {
      label: 'PROFILE',
      routerLink: '/profile'
    },
    {
      label: 'SIGN OUT',
      routerLink: ''
    },
  ];

  //Function called by signout. Clears localstorage and redirects to auth page.
  logout(){
    localStorage.clear();
    this.router.navigate(['./auth/login']);
  }

  ngOnInit(): void {
  }

}


