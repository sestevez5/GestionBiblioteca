import { AuthService } from './../../../moduloAuth/services/auth.service';
import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-selector-entidades',
  templateUrl: './selector-entidades.component.html',
  styleUrls: ['./selector-entidades.component.css']
})
export class SelectorEntidadesComponent implements OnInit {

  tipoEntidad: TipoEntidad = TipoEntidad.docentes;
  tiposEntidades = TipoEntidad;
  entidades: entidadHorario[] = []


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


}

export enum TipoEntidad { docentes, grupos, dependencias }


@Pipe({
  name: 'enumToArray'
})
export class EnumToArrayPipe implements PipeTransform {
  transform(data: Object) {
    const keys = Object.keys(data);
    return keys.slice(keys.length / 2);
  }
}

export interface entidadHorario {
  id: string;
  texto: string;
  leyenda: string;
  imagen: string;
}
