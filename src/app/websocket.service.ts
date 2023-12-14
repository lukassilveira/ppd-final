import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  constructor(private socket: Socket) {}

  userName = '';

  register(userName: string) {
    const data = {
      name: userName,
      status: 'offline',
      messages: [
        {
          text: 'oi',
          date: Date.now(),
          sender: 'Lukas',
          receiver: 'Mariana',
          received: false,
        },
        {
          text: 'tudo bom?',
          date: Date.now(),
          sender: 'Mariana',
          receiver: 'Lukas',
          received: false,
        },
        {
          text: 'tudo e vc?',
          date: Date.now(),
          sender: 'Lukas',
          receiver: 'Mariana',
          received: false,
        },
        {
          text: 'to bem tbm',
          date: Date.now(),
          sender: 'Mariana',
          receiver: 'Lukas',
          received: false,
        },
      ],
    };
    this.socket.emit('register', data);
    // this.socket.emit('register', userData);
  }

  login(userName: string) {
    this.socket.emit('login', userName);
    this.userName = userName;
  }

  addFriend(friendName: string) {
    this.socket.emit('addFriend', this.userName, friendName);
  }

  retrieveFriends() {
    this.socket.emit('retrieveFriends');
  }

  retrieveFriendsListener() {
    return this.socket.fromEvent('retrieveFriendsListener');
  }
}
