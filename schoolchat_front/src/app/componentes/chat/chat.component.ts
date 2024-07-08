import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  @ViewChild('messageContainer') messageContainer!: ElementRef;
  messages: { user: string, avatar: string, text: string, time: string }[] = [
    { user: 'Oscar', avatar: 'https://via.placeholder.com/40', text: 'Hello!', time: '10:00 AM' },
    { user: 'Omar', avatar: 'https://via.placeholder.com/40', text: 'Hi there!', time: '10:01 AM' }
  ];
  newMessage: string = '';
  username: string | null = null;
  tempUsername: string = '';
  showUsernameModal: boolean = true;
  changeUserModal: boolean = false;

  sendMessage() {
    if (this.newMessage.trim() && this.username) {
      this.messages.push({
        user: this.username,
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

  setUsername() {
    if (this.tempUsername.trim()) {
      this.username = this.tempUsername.trim();
      this.showUsernameModal = false;
    }
  }

  changeUsername() {
    this.tempUsername = '';
    this.changeUserModal = true;
  }

  confirmChangeUsername() {
    if (this.tempUsername.trim()) {
      this.username = this.tempUsername.trim();
      this.changeUserModal = false;
    }
  }

  cancelChangeUsername() {
    this.changeUserModal = false;
  }
}
