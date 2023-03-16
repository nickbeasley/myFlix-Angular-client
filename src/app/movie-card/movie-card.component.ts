import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';

import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { DescriptionComponent } from '../description/description.component';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Component that displays a movie card.
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  /**
   * Creates an instance of MovieCardComponent.
   * @param fetchApiData - The service that handles the API calls.
   * @param dialog - The service that handles the dialog box.
   * @param snackBar - The service that handles the snackbar.
   * @param movies - The array of movies.
   * @param favorites - The array of favorite movies.
   * @param user - The user's information.
   * @param favoriteMovies - The user's favorite movies.
   */
  movies: any[] = [];
  favorites: any[] = [];
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}
  /**
   * Angular lifecycle hook that is called after component initialization.
   * @returns - The array of movies.
   * @returns - The array of favorite movies.
   */
  ngOnInit(): void {
    this.getMovies();
    this.getFavorites();
  }

  /**
   * Gets the array of movies.
   * @returns - The array of movies.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   *  Adds a movie to the user's list of favorite movies.
   * @param id - The ID of the movie to add.
   * @returns - The array of favorite movies.
   */
  openGenre(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '450px',
    });
  }

  /**
   * Opens a dialog box that displays the director's information.
   * @param name - The name of the director.
   * @param bio - The director's biography.
   * @returns - The director's name and biography.
   */
  openDirector(name: string, bio: string): void {
    this.dialog.open(DirectorComponent, {
      data: {
        Name: name,
        Bio: bio,
      },
      width: '450px',
    });
  }

  /**
   * Opens a dialog box that displays the movie's description.
   * @param title - The title of the movie.
   * @param description - The movie's description.
   * @returns - The movie's title and description.
   */
  openDescription(title: string, description: string): void {
    this.dialog.open(DescriptionComponent, {
      data: {
        Title: title,
        Description: description,
      },
      width: '450px',
    });
  }

  /**
   * Gets the array of favorite movies.
   * @returns - The array of favorite movies.
   */
  getFavorites(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favorites = resp.FavoriteMovies;
      console.log(this.favorites);
      return this.favorites;
    });
  }

  /**
   *  Checks if a movie is in the user's list of favorite movies.
   * @param id - The ID of the movie to check.
   * @returns - True if the movie is in the user's list of favorite movies, false if not.
   */
  isFav(id: string): boolean {
    return this.favorites.includes(id);
  }

  /**
   * Adds a movie to the user's list of favorite movies.
   * @param id - The ID of the movie to add.
   */
  addFavorite(id: string): void {
    console.log(id);
    this.fetchApiData.addFavoriteMovie(id).subscribe((result) => {
      console.log(result);
      this.snackBar.open('Movie has been added to your favorites!', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }
  /**
   * @param id - The ID of the movie to remove.
   */
  deleteFavorite(id: string): void {
    console.log(id);
    this.fetchApiData.removeFavoriteMovie(id).subscribe((result) => {
      console.log(result);
      this.snackBar.open('Movie has been removed from your favorites!', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }
}
