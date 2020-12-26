import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { debounceTime, distinctUntilChanged, filter, first, skip } from 'rxjs/operators';
import { selectTodosLosUsuarios, selectTotalUsuarios } from './../../store/reducers/auth.reducers';

import { Usuario } from './../../models/usuario.model';
import * as FromSelector from './../../store/selectors/auth.selectors';
import { select, Store } from '@ngrx/store';
import { ViewChild,Component, OnInit, ElementRef } from '@angular/core';
import { AppReducers } from 'src/app/reducers';
import { AuthActions } from '../../store/actions';

import { ModalManager } from 'ngb-modal';



@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  usuarios: Usuario[];

  usuarioActual: Usuario;

  // Gestionamos el cambio de la subcadena para filtrar a través de un observable que emite un valor cada vez que cambia.
  _textoFiltro: BehaviorSubject<string>= new BehaviorSubject('');
  get textoFiltro(): string { return this._textoFiltro.getValue(); }
  set textoFiltro(val: string) { this._textoFiltro.next(val); }

  @ViewChild("panelModal") panelModal: ElementRef;
  private modalRef: any;


  constructor(
    private store: Store<AppReducers.AppState>,
    private router: Router,
    private modalService: ModalManager) { }

  ngOnInit(): void {

    this.store
      .pipe(
        select(FromSelector.selectTodosLosUsuarios)
    )
    .subscribe(
        usuarios => {
          console.log('usuarios: ', usuarios, usuarios.length);
          if (usuarios.length == 0) {
                 this.store.dispatch(AuthActions.cargarUsuarios({ fou: { contieneSubcadena: this.textoFiltro , SoloUsuariosDeAlta: false }}))
          }
          else {
            this.usuarios = usuarios;
          }
      }
    )

    this._textoFiltro
      .pipe(
        skip(1), // El primer valor del cuadro de texto queremos omitirlo.
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe(
        val =>  this.store.dispatch(AuthActions.cargarUsuarios({ fou: { contieneSubcadena: this.textoFiltro , SoloUsuariosDeAlta: false }}))
    )

    // this.store
    //   .pipe(
    //     select(FromSelector.selectTodosLosUsuarios)
    //   )
    //   .subscribe(
    //     usuarios => {
    //       this.usuarios = usuarios;
    //     }
    // )




  }


  filtrarPor(val: string) {

    console.log(val);

  }

  onAnyadirUsuario() {
    this.router.navigateByUrl('/crearUsuario');
  }


  AbrirVentanaModal(usuario: Usuario) {

    this.usuarioActual = usuario;

    this.modalRef = this.modalService.open(this.panelModal, {

        "title": "Confirmación de borrado",
        "size": "lg",
        "modalClass": "",
        "hideCloseButton": true,
        "centered": true,
        "backdrop": true,
        "animation": true,
        "keyboard": true,
        "closeOnOutsideClick": true,
        "backdropClass": "modal-backdrop"
    });
  }

  onAceptarVentanaModal() {


    this.modalService.close(this.modalRef);
    this.store.dispatch(AuthActions.eliminarUsuario({ uidUsuario: this.usuarioActual.uid }));



  };

  onCancelarVentanaModal() {
    this.modalService.close(this.modalRef);

  }


}
