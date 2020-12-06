import { BehaviorSubject } from 'rxjs';

import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { selectTodosLosUsuarios } from './../../store/reducers/auth.reducers';

import { Usuario } from './../../models/usuario.model';
import * as FromSelector from './../../store/selectors/auth.selectors';
import { select, Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppReducers } from 'src/app/reducers';
import { AuthActions } from '../../store/actions';
import { FiltroOrdenUsuario } from '../../models/filtroOrdenUsuarios.model';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  usuarios: Usuario[];

  // Gestionamos el cambio de la subcadena para filtrar a través de un observable que emite un valor cada vez que cambia.
  _textoFiltro: BehaviorSubject<string>= new BehaviorSubject('');
  get textoFiltro(): string { return this._textoFiltro.getValue(); }
  set textoFiltro(val: string) { this._textoFiltro.next(val); }

  //


  constructor(private store: Store<AppReducers.AppState>) { }

  ngOnInit(): void {

    this._textoFiltro
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(
        val =>  this.store.dispatch(AuthActions.cargarUsuarios({ fou: { contieneSubcadena: this.textoFiltro , SoloUsuariosDeAlta: true }}))
    )

    this.store
      .pipe(
        select(FromSelector.selectTodosLosUsuarios)
      )
      .subscribe(
        usuarios => {
          this.usuarios = usuarios;
        }
    )


  }

  onPrueba() {
    this.store.dispatch(AuthActions.cargarUsuarios({ fou: { contieneSubcadena: this.textoFiltro, SoloUsuariosDeAlta: true } }));

  }

  filtrarPor(val: string) {

    console.log(val);

  }


}
