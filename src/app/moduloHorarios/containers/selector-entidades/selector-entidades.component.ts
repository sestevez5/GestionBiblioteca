import { AuthService } from './../../../moduloAuth/services/auth.service';
import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-selector-entidades',
  templateUrl: './selector-entidades.component.html',
  styleUrls: ['./selector-entidades.component.css']
})
export class SelectorEntidadesComponent implements OnInit {

  tipoEntidadesHorario = ['docentes', 'grupos', 'dependencias']

  tipoEntidadSeleccionada: string = 'docentes'


  entidades: entidadHorario[] = [];



  constructor(usuarios: AuthService) {

    usuarios.ObtenerUsuarios(null)
    .subscribe(
      usuarios => {
        this.entidades = usuarios.map(
          usuario => {
            return {
              id: usuario.uid,
              texto: usuario.primerApellido + ' ' + usuario.segundoApellido + ', ' + usuario.nombre,
              leyenda: 'hola',
              imagen: usuario.foto
            }
          }) // Fin map
      }); // Fin subscribe
   }

  ngOnInit(): void {
  }


  onItemsSeleccionados(item: any) {

    console.log(item);

  }

  onSeleccionarEntidad(item: string) {
      this.tipoEntidadSeleccionada = item;
  }


}



export interface entidadHorario {
  id: string;
  texto: string;
  leyenda: string;
  imagen: string;
}
