import { entidadesHorarioState } from './../../store/entidadesHorario/entidadesHorario.state';
import { EnumTipoEntidadHorario } from './../../models/tipoEntidadHorario.model';
import { ModuloHorarioRootState } from './../../store/index';
import { Store, select } from '@ngrx/store';
import { EntidadHorario } from './../../models/entidadHorario.model';
import { Observable } from 'rxjs';
import { Docente } from './../../models/docente.model';
import { AuthService } from './../../../moduloAuth/services/auth.service';
import * as FromEntidadesHorarioActions from '../../store/entidadesHorario/entidadesHorario.actions';
import * as FromEntidadesHorarioSelectors from '../../store/entidadesHorario/entidadesHorario.selectors';
import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-selector-entidades',
  templateUrl: './selector-entidades.component.html',
  styleUrls: ['./selector-entidades.component.css']
})
export class SelectorEntidadesComponent implements OnInit {

  tipoEntidadesHorario = ['docentes', 'grupos', 'dependencias']

  tipoEntidadSeleccionada: string = 'docentes'


  entidades: EntidadHorario[] = [];



  constructor(usuarios: AuthService, private store: Store<ModuloHorarioRootState>) {

    // usuarios.ObtenerUsuarios(null)

    // .subscribe(
    //   usuarios => {


    //     this.entidades = usuarios.map(
    //       usuario => {

    //         const docente: Docente =
    //          {
    //           idDocente: usuario.uid,
    //           nombre: usuario.nombre,
    //           apellido1: usuario.primerApellido,
    //           apellido2: usuario.segundoApellido,
    //           foto: usuario.foto,
    //           alias: usuario.nombre.slice(0, 2) + usuario.primerApellido.slice(0, 2) + usuario.segundoApellido.slice(0, 2)
    //         }

    //         return new EntidadHorario(docente);


    //       });

    //       // Fin map
    //   }); // Fin subscribe

    this.store.dispatch(FromEntidadesHorarioActions.cargarEntidadesHorario({ tipoEntidad: EnumTipoEntidadHorario.DOCENTE }))

   }

  ngOnInit(): void {

    this.store.pipe(
      select(FromEntidadesHorarioSelectors.selectTodasLasEntidadesHorario)
    )
    .subscribe( entidadesHorario =>  this.entidades = entidadesHorario )

  }


  onItemsSeleccionados(item: any) {

    console.log(item);

  }

  onSeleccionarEntidad(item: string) {
    this.tipoEntidadSeleccionada = item;

  }


}


