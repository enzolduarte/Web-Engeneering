import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ExercicioComponent } from './components/exercicio/exercicio.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ExercicioComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cp2';
}
