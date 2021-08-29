import { EnumTiposReglaNegocio } from './../../moduloHelpers/models/enumerados';
import { MensajeReglaNegocio } from './../../moduloHelpers/models/mensajeReglaNegocio';
import { selectReglasRotas } from './../../moduloPrincipal/store/comunicaciones/comunicaciones.selectors';
import { ModuloPrincipalRootState } from './../../moduloPrincipal/store/index';
import { ToastContainerDirective,ToastrService } from 'ngx-toastr';
import { mensajeUsuario, TipoMensaje } from './../../shared/models/mensajeUsuario.model';
import { estadoCarga } from './../../shared/models/estadoCarga.model';
import { delay, map, tap, filter, take } from 'rxjs/operators';
import { selectEstadoCarga, selectMensajeUsuario} from '../../moduloPrincipal/store/comunicaciones/comunicaciones.selectors';
import { select, Store } from '@ngrx/store';
import { Component, OnInit, HostListener, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import * as FromComunicacionesActions from '../../moduloPrincipal/store/comunicaciones/comunicaciones.actions';


import { Subscription, Observable } from 'rxjs';
import { arraysAreNotAllowedMsg } from '@ngrx/store/src/models';


@Component({
  selector: 'app-full-layout',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent implements OnInit {
  public config: PerfectScrollbarConfigInterface = {};


  @ViewChild(ToastContainerDirective, { static: true }) toastContainer: ToastContainerDirective;

  estadoCarga$: Observable<estadoCarga>;
  mensajeUsuario$: Observable<mensajeUsuario>;
  mensajesReglasRotas$: Observable<MensajeReglaNegocio[]>;
  mostrarInformacionUsuarioModal = false;
  panelesMensajesReglasRotas: any[]=[];





  tabStatus = 'justified';
  public isCollapsed = false;
  public innerWidth: any;
  public defaultSidebar: any;
  public showSettings = false;
  public showMobileMenu = false;
  public expandLogo = false;

  constructor(
    public router: Router,
    private store: Store<ModuloPrincipalRootState>,
    private toastr: ToastrService) { }

  options = {
    theme: 'light', // two possible values: light, dark
    dir: 'ltr', // two possible values: ltr, rtl
    layout: 'vertical', // fixed value. shouldn't be changed.
    sidebartype: 'full', // four possible values: full, iconbar, overlay, mini-sidebar
    sidebarpos: 'fixed', // two possible values: fixed, absolute
    headerpos: 'fixed', // two possible values: fixed, absolute
    boxed: 'full', // two possible values: full, boxed
    navbarbg: 'skin5', // six possible values: skin(1/2/3/4/5/6)
    sidebarbg: 'skin5', // six possible values: skin(1/2/3/4/5/6)
    logobg: 'skin5' // six possible values: skin(1/2/3/4/5/6)
  };

  Logo() {
    this.expandLogo = !this.expandLogo;
  }



  ngOnInit() {

    this.toastr.overlayContainer = this.toastContainer;


    if (this.router.url === '/') {
      this.router.navigate(['/dashboard/classic']);
    }
    this.defaultSidebar = this.options.sidebartype;
    this.handleSidebar();

    // Observar si el sistema se encuentar realizando carga de datos.
    this.estadoCarga$ = this.store
      .pipe(
        select(selectEstadoCarga),
        delay(0)
    );


    //--------------------------------------------------------
    // Gestión: Mostrar mensajes al usuario
    //--------------------------------------------------------
    this.mensajeUsuario$ = this.store
      .pipe(

        select(selectMensajeUsuario),
        filter(mensaje => mensaje.tipoMensaje !== TipoMensaje.NoMensaje),
        delay(0)
    );

    this.mensajeUsuario$.subscribe(
      mensaje => {
        this.mostrarMensaje(mensaje);
      }
    );

    //--------------------------------------------------------
    // Gestión: Mostrar reglas rotas
    //--------------------------------------------------------
    this.mensajesReglasRotas$ = this.store
      .pipe(
        select(selectReglasRotas),
        delay(0)
    );

    this.mensajesReglasRotas$.subscribe(
      mensajesReglasRotas => {
        this.panelesMensajesReglasRotas.map(pmrr => {
          pmrr.toastRef.close();
        });

        if (mensajesReglasRotas.length > 0) {
          this.mostrarInformacionUsuarioModal = true;
          this.mostrarMensajesReglasRotas(mensajesReglasRotas);
        }
        else {
          this.mostrarInformacionUsuarioModal = false;
        }
      }
    );

  }

  mostrarMensaje(mensaje: mensajeUsuario) {
    this.mostrarInformacionUsuarioModal = true;
     switch (mensaje.tipoMensaje) {

       case TipoMensaje.Error: {
         this.toastr.error(mensaje.mensaje,
           '',
           {
             disableTimeOut: true,
             positionClass: 'inline',

           })
           .onTap
           .pipe(take(1))
           .subscribe(
             value => this.mostrarInformacionUsuarioModal = false
           );

         break;
       } // fin case Error.

       default: {

         break;

       }



       }  // Fin switch
  }


  mostrarMensajesReglasRotas(mensajesReglasRotas: MensajeReglaNegocio[]) {

    this.mostrarInformacionUsuarioModal = true;

    var mensajes = mensajesReglasRotas.slice();

    mensajes = mensajes.sort(
      function (a, b) {
        return a.reglaNegocio.tipoReglaNegocio < b.reglaNegocio.tipoReglaNegocio ? -1 : 1;
      }
    );


    mensajes.forEach(

      mensajeReglaRota => {

        const titulo = 'R#'+mensajeReglaRota.reglaNegocio.idReglaNegocio+': ['+mensajeReglaRota.reglaNegocio.denominacionLarga+']'
        const detalle = '<i>' + mensajeReglaRota.detalle + '</i>';

        var panelMensaje;
        if (mensajeReglaRota.reglaNegocio.tipoReglaNegocio === EnumTiposReglaNegocio.WARNING) {
          panelMensaje = this.toastr.warning(detalle, titulo,
            {
              disableTimeOut: true,
              positionClass: '.toast-bottom-full-width',
              enableHtml: true

            });
        }
        else {
          panelMensaje = this.toastr.error(detalle, titulo,
            {
              disableTimeOut: true,
              positionClass: '.toast-bottom-full-width',
              enableHtml: true

            });

        }

        panelMensaje
        .onTap
        .subscribe(value => this.store.dispatch(FromComunicacionesActions.desactivarMensajeReglasRota({ idMensajeReglaRota: mensajeReglaRota.idMensaje })));

        this.panelesMensajesReglasRotas.push(panelMensaje);

      }
    );
    }






  @HostListener('window:resize', ['$event'])
  onResize(event: string) {
    this.handleSidebar();
  }

  handleSidebar() {
    this.innerWidth = window.innerWidth;
    switch (this.defaultSidebar) {
      case 'full':
      case 'iconbar':
        if (this.innerWidth < 1170) {
          this.options.sidebartype = 'mini-sidebar';
        } else {
          this.options.sidebartype = this.defaultSidebar;
        }
        break;

      case 'overlay':
        if (this.innerWidth < 767) {
          this.options.sidebartype = 'mini-sidebar';
        } else {
          this.options.sidebartype = this.defaultSidebar;
        }
        break;

      default:
    }
  }

  toggleSidebarType() {
    switch (this.options.sidebartype) {
      case 'full':
      case 'iconbar':
        this.options.sidebartype = 'mini-sidebar';
        break;

      case 'overlay':
        this.showMobileMenu = !this.showMobileMenu;
        break;

      case 'mini-sidebar':
        if (this.defaultSidebar === 'mini-sidebar') {
          this.options.sidebartype = 'full';
        } else {
          this.options.sidebartype = this.defaultSidebar;
        }
        break;

      default:
    }
  }
}
