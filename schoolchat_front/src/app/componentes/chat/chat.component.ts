import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MessageService } from '../../services/message.service';
import { GroupService } from '../../services/group.service';
import { JoinCreateGroupComponent } from '../../join-create-group/join-create-group.component';
import { MatDialog } from '@angular/material/dialog';
import { Group } from '../../models/group.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @ViewChild('messageContainer') messageContainer!: ElementRef;
  messages: { user: string, avatar: string, text: string, time: string }[] = [];
  newMessage: string = '';
  username: string | null = null;
  avatar: string = '';
  tempUsername: string = '';
  showUsernameModal: boolean = true;
  changeUserModal: boolean = false;
  channelId: string = 'defaultChannel'; // Definir el canal actual

  groups: Group[] = [];

  constructor(private userService: UserService, private messageService: MessageService,
    public dialog: MatDialog, private groupService: GroupService
  ) { }

  ngOnInit() {
    this.showUsernameModal = false;
    this.username = 'Usuario';
    this.loadGroups(false);


    // this.userService.getUser().subscribe(
    //   user => {
    //     this.username = user.username;
    //     this.showUsernameModal = false; // Asumiendo que ya está autenticado
    //     this.loadMessages();
    //   },
    //   error => {
    //     console.error('Error fetching user data', error);
    //     this.showUsernameModal = true; // Mostrar el modal si no se pudo obtener el usuario
    //   }
    // );

  }

  loadGroups(loadUser: boolean) {
    this.groupService.getGroupsByUserId().subscribe(
      {
        next: (response: any) => {
          this.groups = response;
          if (this.groups.length === 0) {
            this.openDialog();
          } else {
            this.channelId = this.groups[0].groupId;

            //Ahora traer la información del usuario
            if(loadUser) this.loadUserInfo();
          }
        },
        error: (error: any) => {
          console.error('Error al obtener grupos:', error);
        }
      }
    );
  }

  loadUserInfo() {
    this.userService.getUser().subscribe(
      user => {
        this.username = user.username;
        // this.avatar = user.avatar;
        this.showUsernameModal = false; // Asumiendo que ya está autenticado
        this.loadMessages();
      },
      error => {
        console.error('Error fetching user data', error);
        this.showUsernameModal = true; // Mostrar el modal si no se pudo obtener el usuario
        this.username = '';
      }
    );
  }

  loadMessages() {
    this.messageService.getMessagesByChannel(this.channelId).subscribe(
      messages => {
        this.messages = messages.map(message => ({
          user: message.username,
          avatar: message.avatar,
          text: message.text,
          time: new Date(message.timestamp).toLocaleTimeString()
        }));
        setTimeout(() => {
          this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
        }, 0);
      },
      error => {
        console.error('Error fetching messages', error);
      }
    );
  }

  sendMessage() {
    if (this.newMessage.trim() && this.username !== null) {
      const message = {
        channelId: this.channelId,
        userId: 'currentUserId', // Reemplaza esto con la lógica para obtener el userId del usuario autenticado
        username: this.username,
        avatar: this.avatar,
        text: this.newMessage,
        timestamp: new Date().toISOString()
      };

      this.messageService.createMessage(message).subscribe(
        response => {
          this.messages.push({
            user: this.username!,
            avatar: this.avatar,
            text: this.newMessage,
            time: new Date().toLocaleTimeString()
          });
          this.newMessage = '';
          setTimeout(() => {
            this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
          }, 0);
        },
        error => {
          console.error('Error sending message', error);
        }
      );
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

  openDialog() {
    const dialogRef = this.dialog.open(JoinCreateGroupComponent, {
      width: '400px',
      height: 'auto'
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.loadGroups(false);
    });
  }

  changeChannel(channelId: string) {
    console.log('Cambiando a canal:', channelId);
    this.channelId = channelId;
    this.loadMessages();
  }
}
