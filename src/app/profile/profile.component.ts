import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatListModule } from '@angular/material/list';
import { DescriptionComponent } from '../description/description.component';
import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { DescriptionDialogComponent } from '../description-dialog/description-dialog.component';

/**
 * Component that displays a user's profile.
 * @param user - The user's information.
 * @param favorites - The array of favorite movies.
 * @param loggedUser - The user's information.
 */
interface Movie {
  Title: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  /**
   * Creates an instance of ProfileComponent.
   * @param fetchApiData - The service that handles the API calls.
   * @param dialog - The service that handles the dialog box.
   * @param router - The service that handles the routing.
   * @param snackBar - The service that handles the snackbar.
   * @param user - The user's information.
   * @param favorite - The user's favorite movie.
   * @param favorites - The array of favorite movies.
   */
  user: any = {};
  favorite: any = {};
  favorites: any[] = [];

  @Input() loggedUser = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
    favoriteMovies: [] as Movie[],
  };
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar
  ) {}
  /**
   * Angular lifecycle hook that is called after component initialization.
   * @returns - The user's information.
   */
  ngOnInit(): void {
    this.getUser();
  }
  /**
   * Gets the user's information.
   * @returns - The user's information.
   */
  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      this.loggedUser.Username = this.user.Username;
      this.loggedUser.Email = this.user.Email;
      this.loggedUser.Birthday = this.user.Birthday;
      this.loggedUser.favoriteMovies = this.user.favoriteMovies;
      console.log(this.loggedUser);
      return this.user;
    });
  }
  /**
   * Updates the user's information.
   * @returns - The user's information.
   */
  updateUser(): void {
    this.fetchApiData.editUser(this.loggedUser).subscribe((result) => {
      console.log(result);
      this.snackBar.open('Your profile was updated successfully!', 'OK', {
        duration: 2000,
      });
      if (this.user.Username || this.user.Password) {
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open(
          'Profile updated, please login again with your new credentials.',
          'OK',
          {
            duration: 2000,
          }
        );
      }
    });
  }
  /**
   * Opens a dialog box that displays a movie's description.
   * @param title - The movie's title.
   * @param description - The movie's description.
   * @returns - The dialog box that displays the movie's description.
   */
  openDescription(title: string, description: string) {
    const dialogRef = this.dialog.open(DescriptionDialogComponent, {
      width: '600px',
      data: { title: title, description: description },
    });
  }
  /**
   * Deletes a movie from the user's favorites.
   * @param movieId - The movie's ID.
   * @returns - The user's information.
   * @returns - The snackbar that displays a message.
   */
  deleteFavorite(movieId: string): void {
    this.fetchApiData.removeFavoriteMovie(movieId).subscribe((result) => {
      console.log(result);
      this.snackBar.open('Movie was removed from your favorites!', 'OK', {
        duration: 2000,
      });
      this.getUser();
    });
  }
  /**
   * Deletes the user's account.
   * @returns - The welcome page.
   * @returns - Local storage is cleared.
   */
  deleteAccount(): void {
    if (confirm('Are you sure you want to permanently delete this account?')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('Account has successfully been deleted!', 'OK', {
          duration: 2000,
        });
      });
      this.fetchApiData.deleteUser().subscribe((result) => {
        console.log(result);
        localStorage.clear();
      });
    }
  }
}
