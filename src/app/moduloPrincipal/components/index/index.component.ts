
import { Usuario } from './../../../moduloAuth/models/usuario.model';
import { select, Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as FromLoginSelector from '../../../moduloPrincipal/store/login/login.selectors';
import { ModuloPrincipalRootState } from '../../store';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  usuario: Usuario | undefined;
  constructor(private route: ActivatedRoute, private router: Router, private store: Store<ModuloPrincipalRootState>) { }

  items = [
    {
      uid: '1',
      nombre: 'nombre elemento 1',
      apellidos: 'apellido elemento 1',
    },
    {
      uid: '2',
      nombre: 'nombre elemento 2',
      apellidos: 'apellido elemento 2',

    }
  ];



  ngOnInit(): void {

    this.store
      .pipe(
        select(FromLoginSelector.selectUsuarioLogueado)
      ).subscribe(
        usuarioLogueado => this.usuario = usuarioLogueado
    );



  }

  onAcceder() {

    this.router.navigateByUrl('login/login');
  }

}
