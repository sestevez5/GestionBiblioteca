import { ModuloAuthRootState } from '../../store/index';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { debounceTime, distinctUntilChanged, filter, first, skip } from 'rxjs/operators';


import { Usuario } from '../../models/usuario.model';

import * as FromSelector from '../../store/usuarios/usuarios.selectors';

import { select, Store } from '@ngrx/store';
import { ViewChild,Component, OnInit, ElementRef } from '@angular/core';
import { AppReducers } from 'src/app/reducers';
import * as AuthActions from '../../store/usuarios/usuarios.actions';

import { ModalManager } from 'ngb-modal';



@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestionUsuarios.component.html',
  styleUrls: ['./gestionUsuarios.component.css']
})
export class gestionUsuariosComponent implements OnInit {

  usuarios: Usuario[];
  usuarioActual: Usuario;
  solicitudConfirmacion: boolean = false;



  @ViewChild("panelModal") panelModal: ElementRef;
  private modalRef: any;


  constructor(
    private store: Store<ModuloAuthRootState>,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: ModalManager) { }

  ngOnInit(): void {

    this.store
      .pipe(
        select(FromSelector.selectTodosLosUsuarios)
      )
      .subscribe(
       usuarios => {
              if (usuarios.length == 0) {
                 this.store.dispatch(AuthActions.cargarUsuarios({ fou: { contieneSubcadena: undefined , SoloUsuariosDeAlta: false }}))
          };

            this.usuarios = usuarios;

      }
    )

  }


  OnChangeCadenaBusqueda(cadena: string) {
    this.store.dispatch(AuthActions.cargarUsuarios({ fou: { contieneSubcadena: cadena, SoloUsuariosDeAlta: false } }))
  }

  filtrarPor(val: string) {

    console.log('filtrando por: ',val);

  }

  onAnyadirUsuario() {
    this.router.navigateByUrl('usuarios/crearUsuario');
  }


  onAceptarVentanaModal() {

    this.modalService.close(this.modalRef);
    this.store.dispatch(AuthActions.eliminarUsuario({ uidUsuario: this.usuarioActual.uid }));

  };

  onCancelarVentanaModal() {
    this.modalService.close(this.modalRef);

  }

  onEditarUsuario(usuario: Usuario) {
   this.router.navigate(['usuarios', 'editarUsuario', usuario.uid], { queryParams: { returnUrl: 'usuarios/index'}} )
  }

  onBorrarUsuario(usuario: Usuario) {
    this.usuarioActual = usuario;
    this.solicitudConfirmacion = true;
  }

  onEsAceptadaConfirmacion(esAceptada: boolean) {
    this.solicitudConfirmacion = false;

    if (esAceptada) {
      this.store.dispatch(AuthActions.eliminarUsuario({ uidUsuario: this.usuarioActual.uid }));
    }

  }




}
