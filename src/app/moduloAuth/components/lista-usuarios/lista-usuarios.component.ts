import { selectTodosLosUsuarios } from './../../store/reducers/auth.reducers';

import { Usuario } from './../../models/usuario.model';
import * as FromSelector from './../../store/selectors/auth.selectors';
import { select, Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppReducers } from 'src/app/reducers';
import { AuthActions } from '../../store/actions';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  usuarios: Usuario[];

  textoFiltro = '';

  constructor(private store: Store<AppReducers.AppState>) { }

  ngOnInit(): void {

    this.store
      .pipe(
        select(FromSelector.selectTodosLosUsuarios)
      )
      .subscribe(
        usuarios => this.usuarios = usuarios
    )


  }

  onPrueba() {
    this.store.dispatch(AuthActions.cargandoUsuarios());

  }



}
