import { Component, signal } from '@angular/core';
import { UserCard } from './user-card/user-card'

@Component({
  selector: 'app-root',
  imports: [UserCard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('social-app');
}