//Getting imports and including them
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

//Forms modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Material components
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';

//Componenst for page functionality
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MainComponent } from './main/main.component';
import { MenuComponent } from './menu/menu.component';
import { UpcomingReleasesComponent } from './upcoming-releases/upcoming-releases.component';
import { SearchBeerComponent } from './search-beer/search-beer.component';
import { UserCollectionComponent } from './user-collection/user-collection.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { BeerInfoComponent } from './beer-info/beer-info.component';
import { LeftContentComponent } from './left-content/left-content.component';
import { RightContentComponent } from './right-content/right-content.component';
import { BeerNoteComponent } from './beer-note/beer-note.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    AuthComponent,
    MainComponent,
    MenuComponent,
    UpcomingReleasesComponent,
    SearchBeerComponent,
    UserCollectionComponent,
    UserDashboardComponent,
    BeerInfoComponent,
    LeftContentComponent,
    RightContentComponent,
    BeerNoteComponent,
    UserProfileComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatGridListModule,
    MatInputModule,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatTableModule,
    MatSortModule,
    MatMenuModule,
    MatDividerModule,
    FlexLayoutModule,

    //Router config for the app. Most routes are nested to render children inside parent.
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/auth/login', pathMatch: 'full'
      },
      {
        path: 'auth/login', 
        component: AuthComponent,
        children: [
          {
            path: '',
            component: LoginComponent
          }
        ]
      },
      {
        path: 'auth/signup', 
        component: AuthComponent,
        children: [
          {
            path: '',
            component: SignupComponent
          }
        ]
      },
      {
        path: 'home',
        component: MainComponent,
        children: [
          {
            path: '',
            component: UserDashboardComponent,
            outlet: 'left-router-outlet',
          },
          {
            path: '',
            component: UpcomingReleasesComponent,
            outlet: 'right-router-outlet',
          }
        ]
      },
      {
        path: 'collection', 
        component: MainComponent,
        children: [
          {
            path: '',
            component: UserCollectionComponent,
            outlet: 'left-router-outlet',
          },
          {
            path: '',
            component: BeerNoteComponent,
            outlet: 'right-router-outlet',
          }
        ]
      },
      {
        path: 'search', 
        component: MainComponent,
        children: [
          {
            path: '',
            component: SearchBeerComponent,
            outlet: 'left-router-outlet',
          },
          {
            path: '',
            component: BeerInfoComponent,
            outlet: 'right-router-outlet',
          }
        ]
      },
      {
        path: 'profile', 
        component: MainComponent,
        children: [
          {
            path: '',
            component: UserProfileComponent,
            outlet: 'left-router-outlet',
          },
        ]
      },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
