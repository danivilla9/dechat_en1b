import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ChatMessage } from '../models/chat-message.model';
import { RdfService } from './rdf.service';
import { User } from '../models/user.model';
import { fn } from '@angular/compiler/src/output/output_ast';

@Injectable()
export class ChatService {

  chatMessages: ChatMessage[] = new Array<ChatMessage>();
  userName: string;
  userPhoto: string;
  friends: Array<User> = new Array<User>();

  constructor(private rdf : RdfService) {
    this.loadUserData();
    this.loadFriends();
  }

  getUser() {
    return of(new User(this.userName, this.userPhoto));
  }

  getUsers() : Observable<User[]> {
    return of(this.friends);
  }

  private async loadUserData() {
    await this.rdf.getSession();
    await this.rdf.getFieldAsStringFromProfile("fn").then(response => {
      this.userName = response;
    });
    await this.rdf.getFieldAsStringFromProfile("hasPhoto").then(response => {
      this.userPhoto = response;
    });
  }

  private async loadFriends() {
    await this.rdf.getSession();
    (await this.rdf.getFriends()).forEach(async element => {
      await this.rdf.fetcher.load(element.value);
      let photo: string = this.rdf.getValueFromVcard("hasPhoto", element.value);
      if(photo === "") {
        photo = "../assets/images/profile.png"
      }
      this.friends.push(new User(this.rdf.getValueFromVcard("fn", element.value), photo));
    });
  }

  sendMessage(msg: string) {
    if(msg !== "") {
      const timestamp = this.getTimeStamp();
      const newMsg = new ChatMessage(this.userName, msg);
      this.chatMessages.push(newMsg);
    }
  }

  getMessages(): Observable<ChatMessage[]> {
    return of(this.chatMessages);
  }

  getTimeStamp() {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' +
                 (now.getUTCMonth() + 1) + '/' +
                 now.getUTCDate();
    const time = now.getUTCHours() + ':' +
                 now.getUTCMinutes() + ':' +
                 now.getUTCSeconds();
    return (date + ' ' + time);
  }
}