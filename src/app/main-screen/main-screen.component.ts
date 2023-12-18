import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css'],
})
export class MainScreenComponent implements OnInit {
  constructor(private websocketService: WebsocketService) {}

  selectedFriend = '';
  friendName = '';
  friends = [];

  message = '';
  allMessages = [];
  messages: any = [];

  ngOnInit(): void {
    console.log(this.getUsername());
    this.websocketService.retrieveFriends();
    this.websocketService
      .retrieveFriendsListener()
      .subscribe((friendsData: any) => {
        console.log(friendsData);
        const currentUser = friendsData.filter((data: any) => {
          return data.name == this.getUsername();
        })[0];
        this.friends = currentUser.friends;
        this.allMessages = currentUser.messages;
        console.log(this.allMessages);
        this.retrieveMessagesFromFriend(this.selectedFriend);
      });
  }

  getUsername(): string {
    // return 'lukas';
    return this.websocketService.userName;
  }

  isFriendSelected(): boolean {
    return this.selectedFriend != '';
  }

  addFriend(): void {
    this.websocketService.addFriend(this.friendName);
    this.websocketService.retrieveFriends();
    this.friendName = '';
  }

  retrieveFriends() {
    return this.friends;
  }

  sendMessage(message: string) {    
    const messageData = {
      text: message,
      date: Date.now(),
      sender: this.getUsername(),
      receiver: this.selectedFriend,
      received: true,
    };
    
    this.websocketService.sendMessage(messageData);
    this.message = '';
    this.retrieveMessagesFromFriend(this.selectedFriend);
    this.websocketService.retrieveFriends();
  }

  retrieveMessagesFromFriend(friend: string) {
    this.messages = this.allMessages.filter((message: any) => {
      return (
        (message.receiver.toLowerCase() === friend.toLowerCase() &&
          message.sender.toLowerCase() === this.getUsername().toLowerCase()) ||
        (message.receiver.toLowerCase() === this.getUsername().toLowerCase() &&
          message.sender.toLowerCase() === friend.toLowerCase())
      );
    });
  }

  selectFriend(friend: string) {
    this.selectedFriend = friend;
  }

  deleteFriend(friend: string) {
    this.websocketService.deleteFriend(friend);
    this.websocketService.retrieveFriends();
    console.log('deleting friend', friend);
  }

  logout() {
    console.log('logging out');
  }
}
