import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @ViewChild('messageContainer') messageContainer!: ElementRef;
  messages: { user: string, avatar: string, text: string, time: string }[] = [
    { user: 'Oscar', avatar: 'https://via.placeholder.com/40', text: 'Hello!', time: '10:00 AM' },
    { user: 'Omar', avatar: 'https://via.placeholder.com/40', text: 'Hi there!', time: '10:01 AM' }
  ];
  newMessage: string = '';
  username: string | null = null;
  avatar: string = '';
  tempUsername: string = '';
  showUsernameModal: boolean = true;
  changeUserModal: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUser().subscribe(
      user => {
        this.username = user.username;
        this.showUsernameModal = false; // Asumiendo que ya está autenticado
      },
      error => {
        console.error('Error fetching user data', error);
        this.showUsernameModal = true; // Mostrar el modal si no se pudo obtener el usuario
      }
    );
  }

  sendMessage() {
    if (this.newMessage.trim() && this.username) {
      this.messages.push({
        user: this.username,
        avatar: this.avatar,
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
