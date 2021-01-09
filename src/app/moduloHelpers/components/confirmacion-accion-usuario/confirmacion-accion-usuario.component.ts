import { mensajeUsuario } from './../../../shared/models/mensajeUsuario.model';
import { ModalManager } from 'ngb-modal';
import { ViewChild, Component, OnInit, ElementRef, Input, EventEmitter, Output, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-confirmacion-accion-usuario',
  templateUrl: './confirmacion-accion-usuario.component.html',
  styleUrls: ['./confirmacion-accion-usuario.component.css']
})
export class ConfirmacionAccionUsuarioComponent implements OnInit, OnChanges {

  @ViewChild("panelModal") panelModal: ElementRef;
  private modalRef: any;

  @Input()  solicitudConfirmacion: boolean = false;
  @Input()  mensajeConfirmacion: string;
  @Output() confirmacionAceptada = new EventEmitter();



  constructor(
    private modalService: ModalManager
  ) { }

  ngOnInit(): void {



  }
  ngOnChanges(changes: SimpleChanges) {

    // if (changes.solicitudConfirmacion) {
      this.modalRef = this.modalService.open(this.panelModal, {

        "title": "Confirmar acción",
        "size": "lg",
        "modalClass": "",
        "hideCloseButton": true,
        "centered": true,
        "backdrop": true,
        "animation": true,
        "keyboard": true,
        "closeOnOutsideClick": false,
        "backdropClass": "modal-backdrop"
    });

    //}
  }



  onAceptarConfirmacion(confirmacionAceptada: boolean) {
    this.confirmacionAceptada.emit(confirmacionAceptada);
    this.modalService.close(this.modalRef);
  }

}
