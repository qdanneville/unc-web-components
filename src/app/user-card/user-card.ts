import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LikeButton } from '../like-button/like-button';
import { FollowButton } from '../follow-button/follow-button';


@Component({
  selector: 'app-user-card',
  imports: [LikeButton, FollowButton],
  templateUrl: './user-card.html',
  styleUrl: './user-card.css',
})
export class UserCard {
  @Input() name = "";
  @Input() bio = "";
  @Input() avatar = "";

  likes = 0;

  @Output()
  liked = new EventEmitter<number>();

  @Output()
  isFollowed = new EventEmitter<boolean>();

  onLiked(count: number) {
    this.likes = count;
    this.liked.emit(1)
  }

  onFollowed(followed: boolean) {
    this.isFollowed.emit(followed);
  }
}
