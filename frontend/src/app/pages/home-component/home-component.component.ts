import { Component } from '@angular/core';
<<<<<<< HEAD
import { RouterLink } from '@angular/router';
=======
import { RouterLink, RouterLinkActive } from '@angular/router';
>>>>>>> versionArreglada


@Component({
  selector: 'app-home-component',
  standalone: true,
<<<<<<< HEAD
  imports: [RouterLink],
=======
  imports: [RouterLink,RouterLinkActive],
>>>>>>> versionArreglada
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css'
})
export class HomeComponentComponent {

}
