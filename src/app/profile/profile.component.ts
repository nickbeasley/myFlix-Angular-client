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

interface Movie {
  Title: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
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

  ngOnInit(): void {
    this.getUser();
  }

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

  updateUser(): void {
    this.fetchApiData.editUser(this.loggedUser).subscribe((result) => {
      //      console.log(result);
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

  openDescription(title: string, description: string) {
    const dialogRef = this.dialog.open(DescriptionDialogComponent, {
      width: '600px',
      data: { title: title, description: description },
    });
  }

  deleteFavorite(movieId: string): void {
    this.fetchApiData.removeFavoriteMovie(movieId).subscribe((result) => {
      console.log(result);
      this.snackBar.open('Movie was removed from your favorites!', 'OK', {
        duration: 2000,
      });
      this.getUser();
    });
  }

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
