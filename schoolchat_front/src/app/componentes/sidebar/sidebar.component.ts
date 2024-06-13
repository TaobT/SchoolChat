import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  servers = [1, 2, 3, 4, 5]; // Ejemplo de datos de servidores (pueden ser dinámicos)
}