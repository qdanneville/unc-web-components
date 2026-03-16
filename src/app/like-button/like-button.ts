import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-like-button',
  imports: [],
  templateUrl: './like-button.html',
  styleUrl: './like-button.css',
})
export class LikeButton {
  count = 0;

  @Output()
  liked = new EventEmitter<number>();

  like() {
    this.count++;
    this.liked.emit(this.count);
  }
}
