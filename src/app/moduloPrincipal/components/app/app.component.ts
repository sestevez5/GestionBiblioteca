import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  imagen='';
  title = 'app';

  constructor() {
    console.log('hola');
  }

  onImagen(imagen:string) {
    this.imagen = imagen;
  }
}
