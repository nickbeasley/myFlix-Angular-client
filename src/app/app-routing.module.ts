import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { ProfileComponent } from './profile/profile.component';
import { GenreComponent } from './genre/genre.component';
import { DirectorComponent } from './director/director.component';
import { DescriptionComponent } from './description/description.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'movies', component: MovieCardComponent },
  { path: 'login', component: UserLoginFormComponent },
  { path: 'register', component: UserRegistrationFormComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'genre/:name', component: GenreComponent },
  { path: 'director/:name', component: DirectorComponent },
  { path: 'description/:title', component: DescriptionComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
  { path: '**', redirectTo: 'welcome', pathMatch: 'prefix' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
