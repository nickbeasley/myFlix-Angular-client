import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'; // Close dialog on success
import { UserRegistrationService } from '../fetch-api-data.service'; // API
import { MatSnackBar } from '@angular/material/snack-bar'; // Notifications
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { Router } from '@angular/router'; // Routing

/**
 * Component that displays a user login form.
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  /**
   * Creates an instance of UserLoginFormComponent.
   */
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: UserRegistrationService, // API service
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  /**
   * Angular lifecycle hook that is called after component initialization.
   */
  ngOnInit(): void {}

  /**
   * Sends the user's login information to the API.
   * @returns - The user's information.
   * @returns - The user's token.
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (result) => {
        console.log(result);
        localStorage.setItem('user', result.user.Username);
        localStorage.setItem('token', result.token);
        this.dialogRef.close();
        this.snackBar.open('Login successful!', 'OK', {
          duration: 2000,
        });
        this.router.navigate(['movies']); // Navigate to the movies route
      },
      (result) => {
        this.snackBar.open(result.error, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
