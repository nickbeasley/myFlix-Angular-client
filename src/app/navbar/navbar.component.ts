import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Component that displays the navigation bar.
 */

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  /**
   * Creates an instance of NavbarComponent.
   */
  constructor(public router: Router) {}
  ngOnInit(): void {}

  /**
   * Navigates to the movies view.
   * @returns - The movies view.
   */
  toMovies(): void {
    this.router.navigate(['movies']);
  }
  /**
   * Navigates to the profile view.
   * @returns - The profile view.
   */
  toProfile(): void {
    this.router.navigate(['profile']);
  }
  /**
   * Logs out user
   * @returns - The welcome view.
   * @returns - Clears local storage.
   */
  logout(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }
}
