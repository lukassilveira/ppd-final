import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css'],
})
export class MainScreenComponent implements OnInit {
  constructor(private websocketService: WebsocketService) {}

  friendName = '';
  friends = [];

  message = '';
  allMessages = [];
  messages: any = [
    // {
    //   text: 'oi',
    //   date: Date.now(),
    //   sender: 'Lukas',
    //   receiver: 'Mariana',
    //   received: false,
    // },
    // {
    //   text: 'tudo bom?',
    //   date: Date.now(),
    //   sender: 'Mariana',
    //   receiver: 'Lukas',
    //   received: false,
    // },
    // {
    //   text: 'tudo e vc?',
    //   date: Date.now(),
    //   sender: 'Lukas',
    //   receiver: 'Mariana',
    //   received: false,
    // },
    // {
    //   text: 'to bem tbm',
    //   date: Date.now(),
    //   sender: 'Mariana',
    //   receiver: 'Lukas',
    //   received: false,
    // },
  ];

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
      });
  }

  getUsername(): string {
    return 'lukas';
    // return this.websocketService.userName;
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
    console.log(message);
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
    console.log(this.messages);
    
  }
}
