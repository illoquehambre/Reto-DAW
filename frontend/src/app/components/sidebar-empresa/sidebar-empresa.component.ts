import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar-empresa',
  standalone: true,
  imports: [],
  templateUrl: './sidebar-empresa.component.html',
  styleUrl: './sidebar-empresa.component.css'
})
export class SidebarEmpresaComponent {

@Output()  menuSelected = new EventEmitter<string>();
selectedMenu: string = 'vacantes';

  onMenuSelect(menuKey: string): void {
    this.selectedMenu = menuKey;
    this.menuSelected.emit(menuKey);
  }
}
