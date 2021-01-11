import { Libro } from './../../../moduloLibros/models/libro.model';
import { Usuario } from './../../../moduloAuth/models/usuario.model';
import { select, Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as FromLoginSelector from '../../../moduloPrincipal/store/login/login.selectors';
import { ModuloPrincipalRootState } from '../../store';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-demo-selector-multiple-doble-lista',
  templateUrl: './demo-selector-multiple-doble-lista.component.html',
  styleUrls: ['./demo-selector-multiple-doble-lista.component.css']
})
export class DemoSelectorMultipleDobleListaComponent implements OnInit {


  usuario: Usuario | undefined;

  librosSeleccionados: any[];

  constructor(private route: ActivatedRoute, private router: Router, private store: Store<ModuloPrincipalRootState>, private http: HttpClient) { }

  libros: Libro[]=[];





  ngOnInit(): void {

    this.store
      .pipe(
        select(FromLoginSelector.selectUsuarioLogueado)
      ).subscribe(
        usuarioLogueado => this.usuario = usuarioLogueado
    );

    this.http.get("../../../../assets/libros.json")
      .subscribe(resp => {
        this.libros = resp as any[];
      }

    )



  }

  onAcceder() {

    this.router.navigateByUrl('login/login');
  }

  onItemsSeleccionados(librosSeleccionados: any[]) {
    console.log(librosSeleccionados);
    this.librosSeleccionados = librosSeleccionados;

  }

}
