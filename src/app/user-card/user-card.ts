import { Component, Input } from '@angular/core';
import { LikeButton } from '../like-button/like-button';


@Component({
  selector: 'app-user-card',
  imports: [LikeButton],
  templateUrl: './user-card.html',
  styleUrl: './user-card.css',
})
export class UserCard {
  @Input() name = "";
  @Input() bio = "";
  @Input() avatar = "";

  likes = 0;

  onLiked(count: number) {
    this.likes = count;
  }
}
