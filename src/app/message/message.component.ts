import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { ChatMessage } from '../models/chat-message.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() chatMessage: ChatMessage;
  userName: string;
  messageContent: string;
  timeStamp: Date = new Date();

  isOwnMessage: boolean;
  isDeleted: boolean = false;

  constructor(private chatService: ChatService, private toastr: ToastrService) {}

  ngOnInit(chatMessage = this.chatMessage) {
    if (!chatMessage) {
      chatMessage = new ChatMessage('', 'Failed to load');
    }
    this.messageContent = chatMessage.message;
    this.timeStamp = chatMessage.timeSent;
    this.userName = chatMessage.userName;
    this.chatService.getUser().subscribe(user => {
      if (!user) {
        return;
      }
      this.isOwnMessage = user.username.toString().localeCompare(this.userName.toString()) === 0;
    });
  }

  removeMessage() {
    if (this.isDeleted) {
      console.log("Already deleted");
    } else if (this.isOwnMessage === false) {
      this.toastr.error('Cannot remove this message');
    } else {
      this.chatService.removeMsg(this.chatMessage);
      this.isDeleted = true;
    }
  }

}
