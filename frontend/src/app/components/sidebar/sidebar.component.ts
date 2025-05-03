import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

@Output()  menuSelected = new EventEmitter<string>();
selectedMenu: string = 'perfil';

  onMenuSelect(menuKey: string): void {
    this.selectedMenu = menuKey;
    this.menuSelected.emit(menuKey);
  }
}
