
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

  ngOnInit(): void {

    this.store
      .pipe(
        select(FromLoginSelector.selectUsuarioLogueado)
      ).subscribe(
        usuarioLogueado => this.usuario = usuarioLogueado
    );



  }

  onAcceder() {

    this.router.navigateByUrl('usuarios/login');
  }

}
