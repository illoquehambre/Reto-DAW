import { Component, Input } from '@angular/core';
import { ICategoria } from '../../interfaces/icategoria';

@Component({
  selector: 'app-categoria-card',
  standalone: true,
  imports: [],
  templateUrl: './categoria-card.component.html',
  styleUrl: './categoria-card.component.css'
})
export class CategoriaCardComponent {

  @Input() miCategoria!: ICategoria;
}
