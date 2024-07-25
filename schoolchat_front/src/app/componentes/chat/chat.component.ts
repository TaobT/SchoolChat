import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MessageService } from '../../services/message.service';
import { GroupService } from '../../services/group.service';
import { JoinCreateGroupComponent } from '../../join-create-group/join-create-group.component';
import { MatDialog } from '@angular/material/dialog';
import { Group } from '../../models/group.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChannelService } from '../../services/channel.service';
import { Channel } from '../../models/channel.model';

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
  showChannelModal: boolean = false;
  isCreatingChannel: boolean = true;
  groupId: string = ''; // ID del grupo actual
  channelId: string = ''; // ID del canal actual

  groups: Group[] = [];
  channels: Channel[] = [];

  createChannelForm: FormGroup;
  joinChannelForm: FormGroup;
  channelDetails: Channel | null = null;
  channelNotFound: boolean = false;

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private channelService: ChannelService,
    public dialog: MatDialog,
    private groupService: GroupService,
    private fb: FormBuilder
  ) {
    this.createChannelForm = this.fb.group({
      name: ['', Validators.required]
    });

    this.joinChannelForm = this.fb.group({
      inviteCode: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.showUsernameModal = false;
    this.username = 'Usuario';
    this.loadGroups(false);
  }

  loadGroups(loadUser: boolean) {
    this.groupService.getGroupsByUserId().subscribe(
      {
        next: (response: any) => {
          this.groups = response;
          if (this.groups.length === 0) {
            this.openGroupDialog();
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
        groupId: this.groupId,
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

  openGroupDialog() {
    const dialogRef = this.dialog.open(JoinCreateGroupComponent, {
      width: '400px',
      height: 'auto'
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.loadGroups(false);
    });
  }

  openChannelDialog() {
    this.showChannelModal = true;
  }

  switchChannelMode() {
    this.isCreatingChannel = !this.isCreatingChannel;
    this.channelDetails = null;
    this.channelNotFound = false;
  }

  createChannel() {
    if (this.createChannelForm.valid) {
      this.channelService.createChannel(this.createChannelForm.value).subscribe(
        response => {
          console.log('Channel created:', response);
          this.showChannelModal = false;
          this.loadChannels();
        },
        error => {
          console.error('Error creating channel:', error);
        }
      );
    }
  }

  checkInviteCode() {
    if (this.joinChannelForm.controls['inviteCode'].valid) {
      const inviteCode = this.joinChannelForm.controls['inviteCode'].value;
      this.channelService.getChannelByInviteCode(inviteCode).subscribe(
        response => {
          this.channelDetails = response;
          this.channelNotFound = false;
        },
        error => {
          this.channelDetails = null;
          this.channelNotFound = true;
        }
      );
    }
  }

  joinChannel() {
    if (this.channelDetails && this.joinChannelForm.valid) {
      this.channelService.joinChannel({ channelId: this.channelDetails.channelId }).subscribe(
        response => {
          console.log('Joined channel:', response);
          this.showChannelModal = false;
          this.loadChannels();
        },
        error => {
          console.error('Error joining channel:', error);
        }
      );
    }
  }

  changeGroup(groupId: string) {
    this.groupId = groupId;
    this.loadChannels();
  }

  loadChannels() {
    if (this.groupId) {
      this.channelService.getChannelsByGroupId(this.groupId).subscribe(channels => {
        this.channels = channels;
      });
    }
  }

  changeChannel(channelId: string) {
    console.log('Cambiando a canal:', channelId);
    this.channelId = channelId;
    this.loadMessages();
  }

}
