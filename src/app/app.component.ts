import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  imagen='';
  title = 'app';

  onImagen(imagen:string) {
    this.imagen = imagen;
  }
}
