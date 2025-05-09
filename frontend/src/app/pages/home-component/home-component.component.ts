import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css'
})
export class HomeComponentComponent {

}