import { filter } from 'rxjs/operators';
import { selectUsuarioActivo, selectUsuarioLogueado } from './../../../moduloAuth/store/selectors/auth.selectors';
import { Usuario } from './../../../moduloAuth/models/usuario.model';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers/app.reducer';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  usuario: Usuario | undefined;
  constructor(private route: ActivatedRoute, private router: Router, private store: Store<AppState>) { }

  ngOnInit(): void {

    this.store
      .pipe(
        select(selectUsuarioLogueado)
      ).subscribe(
        usuarioLogueado => this.usuario = usuarioLogueado
    );



  }

  onAcceder() {

    this.router.navigateByUrl('/login');
  }

}
