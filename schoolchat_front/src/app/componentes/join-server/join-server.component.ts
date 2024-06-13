import { Component } from '@angular/core';

@Component({
  selector: 'app-join-server',
  templateUrl: './join-server.component.html',
  styleUrls: ['./join-server.component.css']
})
export class JoinServerComponent {
  displayModal: boolean = false;
  joinCode: string = '';

  showModalDialog() {
    this.displayModal = true;
  }

  joinServer() {
    console.log('Código para unirse:', this.joinCode);
    this.displayModal = false;
    // Lógica para unirse al servidor
  }
}