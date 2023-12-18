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
      friends: [],
      messages: [],
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

  sendMessage(messageData: any) {
    this.socket.emit("sendMessage", messageData);
  }

  deleteFriend(friendName: string) {
    this.socket.emit('deleteFriend', this.userName, friendName);
  }
}
