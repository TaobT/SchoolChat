import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  @ViewChild('messageContainer') messageContainer!: ElementRef;
  messages: { user: string, avatar: string, text: string, time: string }[] = [
    { user: 'Alice', avatar: 'https://via.placeholder.com/40', text: 'Hello!', time: '10:00 AM' },
    { user: 'Bob', avatar: 'https://via.placeholder.com/40', text: 'Hi there!', time: '10:01 AM' }
  ];
  newMessage: string = '';

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({
        user: 'You',
        avatar: 'https://via.placeholder.com/40',
        text: this.newMessage,
        time: new Date().toLocaleTimeString()
      });
      this.newMessage = '';
      setTimeout(() => {
        this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
      }, 0);
    }
  }
}
