import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChannelService } from '../services/channel.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-join-create-channel',
  templateUrl: './join-create-channel.component.html',
  styleUrls: ['./join-create-channel.component.css']
})
export class JoinCreateChannelComponent {
  createChannelForm: FormGroup;
  joinChannelForm: FormGroup;
  isCreatingChannel: boolean = true;
  channelDetails: any = null;
  channelNotFound: boolean = false;
  groupId: string;

  constructor(
    private fb: FormBuilder,
    private channelService: ChannelService,
    public dialogRef: MatDialogRef<JoinCreateChannelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.groupId = data.groupId;

    this.createChannelForm = this.fb.group({
      name: ['', Validators.required],
      photoUrl: ['']
    });

    this.joinChannelForm = this.fb.group({
      inviteCode: ['', Validators.required]
    });
  }

  switchMode() {
    this.isCreatingChannel = !this.isCreatingChannel;
    this.channelDetails = null;
    this.channelNotFound = false;
  }

  createChannel() {
    if (this.createChannelForm.valid) {
      const channelData = {
        ...this.createChannelForm.value,
        groupId: this.groupId
      };
      this.channelService.createChannel(channelData).subscribe(
        response => {
          console.log('Canal creado:', response);
          this.dialogRef.close({ success: true });
        },
        error => {
          console.error('Error al crear canal:', error);
          this.dialogRef.close({ success: false });
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
      const joinData = {
        ...this.joinChannelForm.value,
        groupId: this.groupId
      };
      this.channelService.joinChannel(joinData).subscribe(
        response => {
          console.log('Te has unido al canal:', response);
          this.dialogRef.close();
        },
        error => {
          console.error('Error al unirse al canal:', error);
        }
      );
    }
  }
}
