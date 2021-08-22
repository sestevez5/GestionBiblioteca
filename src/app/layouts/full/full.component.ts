import { selectReglasRotas } from './../../moduloPrincipal/store/comunicaciones/comunicaciones.selectors';
import { ModuloPrincipalRootState } from './../../moduloPrincipal/store/index';
import { ToastContainerDirective,ToastrService } from 'ngx-toastr';
import { mensajeUsuario, TipoMensaje } from './../../shared/models/mensajeUsuario.model';
import { estadoCarga } from './../../shared/models/estadoCarga.model';
import { delay, map, tap, filter, take } from 'rxjs/operators';
import { selectEstadoCarga, selectMensajeUsuario} from '../../moduloPrincipal/store/comunicaciones/comunicaciones.selectors';
import { select, Store } from '@ngrx/store';
import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { RootState } from 'src/app/reducers/app.reducer';
import { Subscription, Observable } from 'rxjs';
import { ReglaNegocio } from 'src/app/moduloHelpers/models/reglaNegocio';

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
  reglasRotas$: Observable<ReglaNegocio[]>;
  mostrarMensajeUsuario = false;



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
    this.reglasRotas$ = this.store
      .pipe(

        select(selectReglasRotas),
        filter(reglasRotas => reglasRotas.length > 0),
        delay(0)
    );

    this.reglasRotas$.subscribe(
      reglasRotas => {
        this.mostrarReglasRotas(reglasRotas);
      }
    );

  }

  mostrarMensaje(mensaje: mensajeUsuario) {
    this.mostrarMensajeUsuario = true;
     switch (mensaje.tipoMensaje) {

       case TipoMensaje.Error: {
         this.toastr.error(mensaje.mensaje,
           '',
           {
             disableTimeOut: true,
             positionClass: 'inline'
           })
           .onTap
           .pipe(take(1))
           .subscribe(
             value => this.mostrarMensajeUsuario = false
           );

         break;
       } // fin case Error.

       default: {

         break;

       }



       }  // Fin switch
  }


  mostrarReglasRotas(reglasRotas: ReglaNegocio[]) {


    this.mostrarMensajeUsuario = true;



        this.toastr.error(reglasRotas[0].denominacionLarga,
          'La actividad 9 no puede insertarse al ser enviada por un elemento no válido en la agrupación de sentido común. Para ver más detalle debe accionarse otra cosa.',
          {
            disableTimeOut: true,
            positionClass: '.toast-bottom-full-width'
          })
          .onTap
          .pipe(take(1))
          .subscribe(
            value => this.mostrarMensajeUsuario = false
    );
    this.toastr.error(reglasRotas[0].denominacionLarga,
      'La actividad 9 no puede insertarse al ser enviada por un elemento no válido en la agrupación de sentido común. Para ver más detalle debe accionarse otra cosa.',
      {
        disableTimeOut: true,
        positionClass: 'toast-container'
      })
      .onTap
      .pipe(take(1))
      .subscribe(
        value => this.mostrarMensajeUsuario = false
    );
    this.toastr.error(reglasRotas[0].denominacionLarga,
      'La actividad 9 no puede insertarse al ser enviada por un elemento no válido en la agrupación de sentido común. Para ver más detalle debe accionarse otra cosa.',
      {
        disableTimeOut: true,
        positionClass: 'inline'
      })
      .onTap
      .pipe(take(1))
      .subscribe(
        value => this.mostrarMensajeUsuario = false
    );
    this.toastr.error(reglasRotas[0].denominacionLarga,
      'La actividad 9 no puede insertarse al ser enviada por un elemento no válido en la agrupación de sentido común. Para ver más detalle debe accionarse otra cosa.',
      {
        disableTimeOut: true,
        positionClass: 'inline'
      })
      .onTap
      .pipe(take(1))
      .subscribe(
        value => this.mostrarMensajeUsuario = false
    );
    this.toastr.error(reglasRotas[0].denominacionLarga,
      'La actividad 9 no puede insertarse al ser enviada por un elemento no válido en la agrupación de sentido común. Para ver más detalle debe accionarse otra cosa.',
      {
        disableTimeOut: true,
        positionClass: 'inline'
      })
      .onTap
      .pipe(take(1))
      .subscribe(
        value => this.mostrarMensajeUsuario = false
    );
    this.toastr.error(reglasRotas[0].denominacionLarga,
      'La actividad 9 no puede insertarse al ser enviada por un elemento no válido en la agrupación de sentido común. Para ver más detalle debe accionarse otra cosa.',
      {
        disableTimeOut: true,
        positionClass: 'inline'
      })
      .onTap
      .pipe(take(1))
      .subscribe(
        value => this.mostrarMensajeUsuario = false
    );
    this.toastr.error(reglasRotas[0].denominacionLarga,
      'La actividad 9 no puede insertarse al ser enviada por un elemento no válido en la agrupación de sentido común. Para ver más detalle debe accionarse otra cosa.',
      {
        disableTimeOut: true,
        positionClass: 'inline'
      })
      .onTap
      .pipe(take(1))
      .subscribe(
        value => this.mostrarMensajeUsuario = false
    );
    this.toastr.error(reglasRotas[0].denominacionLarga,
      'La actividad 9 no puede insertarse al ser enviada por un elemento no válido en la agrupación de sentido común. Para ver más detalle debe accionarse otra cosa.',
      {
        disableTimeOut: true,
        positionClass: 'inline'
      })
      .onTap
      .pipe(take(1))
      .subscribe(
        value => this.mostrarMensajeUsuario = false
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
