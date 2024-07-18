import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JoinCreateGroupComponent } from '../../join-create-group/join-create-group.component';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(public dialog: MatDialog) {}
  servers = [1, 2, 3, 4, 5]; // Ejemplo de datos de servidores (pueden ser dinámicos)

  openDialog() {
    const dialogRef = this.dialog.open(JoinCreateGroupComponent, {
      width: '400px',
      height: 'auto'
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}