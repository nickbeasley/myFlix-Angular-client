import { Component } from '@angular/core';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GenreComponent } from './genre/genre.component';
import { DirectorComponent } from './director/director.component';
import { DescriptionComponent } from './description/description.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'myFlix-Angular-client';

  constructor(public dialog: MatDialog) {}

  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px',
    });
  }
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px',
    });
  }
  openMoviesDialog(): void {
    this.dialog.open(MovieCardComponent, {
      width: '500px',
    });
  }
  openProfileDialog(): void {
    this.dialog.open(MovieCardComponent, {
      width: '500px',
    });
  }
  openNavbarDialog(): void {
    this.dialog.open(NavbarComponent, {
      width: '500px',
    });
  }
  openGenreDialog(): void {
    this.dialog.open(GenreComponent, {
      width: '500px',
    });
  }
  openDirectorDialog(): void {
    this.dialog.open(DirectorComponent, {
      width: '500px',
    });
  }
  openDescriptionDialog(): void {
    this.dialog.open(DescriptionComponent, {
      width: '500px',
    });
  }
}
