import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar-admin',
  standalone: true,
  imports: [],
  templateUrl: './sidebar-admin.component.html',
  styleUrl: './sidebar-admin.component.css'
})
export class SidebarAdminComponent {

@Output()  menuSelected = new EventEmitter<string>();
selectedMenu: string = 'perfil';

  onMenuSelect(menuKey: string): void {
    this.selectedMenu = menuKey;
    this.menuSelected.emit(menuKey);
  }
}
