import { Component } from '@angular/core';
import { UserCard } from './user-card/user-card'
import { StatsPanel } from './stats-panel/stats-panel';

@Component({
  selector: 'app-root',
  imports: [UserCard, StatsPanel],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  followedUsers: string[] = [];

  users = [
    {
      name: "Alice",
      bio: "Frontend dev",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    {
      name: "Bob",
      bio: "Designer",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    {
      name: "Charlie",
      bio: "Fullstack",
      avatar: "https://i.pravatar.cc/150?img=3"
    }
  ];

  totalLikes = 0;

  onLiked(count: number) {
    this.totalLikes = this.totalLikes + count;
  }

  onFollowed(followed: boolean, userName: string) {
    if (followed) {
      this.followedUsers.push(userName)
    } else {
      const followeUserIndex = this.followedUsers.indexOf(userName)
      if (followeUserIndex > -1) { // only splice array when item is found
        this.followedUsers.splice(followeUserIndex, 1)
      }
    }
  }

}