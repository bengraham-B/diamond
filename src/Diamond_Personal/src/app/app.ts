import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

//Y Components
import { Header } from './components/header/header';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, Header],
	templateUrl: './app.html',
	styleUrl: './app.css'
})
export class App {
  	protected readonly title = signal('Diamond_Personal');
}
