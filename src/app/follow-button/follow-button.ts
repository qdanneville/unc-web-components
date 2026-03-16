import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-follow-button',
  imports: [],
  templateUrl: './follow-button.html',
  styleUrl: './follow-button.css',
})
export class FollowButton {
  @Input() isFollowed = false
  text = "follow"

  @Output()
  followed = new EventEmitter<boolean>();

  follow() {
    this.isFollowed = !this.isFollowed
    this.followed.emit(this.isFollowed);
    this.text = this.isFollowed ? "unfollow" : "follow me"
  }

}
