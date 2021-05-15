import { ModalManager } from 'ngb-modal';
import { Asignatura } from './../../models/asignatura.model';
import { EntidadHorario } from './../../models/entidadHorario.model';
import { Actividad } from './../../models/actividad.model';
import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-mostrar-actividad',
  templateUrl: './mostrar-actividad.component.html',
  styleUrls: ['./mostrar-actividad.component.css']
})
export class MostrarActividadComponent implements OnInit {

  @Input() actividad: Actividad;

  @ViewChild("panelAlumnos") panelModal: ElementRef;
  private modalRef: any;



  constructor(private modalService: ModalManager) { }

  ngOnInit(): void {
  }

entidadesHorarioDocentes(): EntidadHorario[] {
    const entidadesHorario: EntidadHorario[] = [];
    this.actividad.docentes.forEach(
      docente => {
        const entidadHorario = new EntidadHorario(docente);
        entidadesHorario.push(entidadHorario);
      });

    return entidadesHorario;
  }



entidadesHorarioGrupos(): EntidadHorario[] {
  const entidadesHorario: EntidadHorario[] = [];
  this.actividad.grupos.forEach(
    grupo => {
      const entidadHorario = new EntidadHorario(grupo);
      entidadesHorario.push(entidadHorario);
    });

  return entidadesHorario;
}


  obtenerDenominacionDiaSemana(codigo: string): string {
    switch (codigo) {
      case 'L': return 'Lunes'; break;
      case 'M': return 'Martes'; break;
      case 'X': return 'Miércoles'; break;
      case 'J': return 'Jueves'; break;
      case 'V': return 'Viernes'; break;
      case 'S': return 'Sábado'; break;
      case 'D': return 'Domingo'; break;
      default: return ''; break;
    }
  }

  onMostrarAlumnos() {

    this.AbrirVentanaModal();

  }
      // ------------------------------------------
  // Métodos no implementados.
  // ------------------------------------------

  AbrirVentanaModal() {

    this.modalRef = this.modalService.open(this.panelModal, {
     size: "xs",
     hideCloseButton: true,
     centered: true,
     backdrop: true,
     animation: true,
     keyboard: false,
     closeOnOutsideClick: true,
     backdropClass: "modal-backdrop",
   });

 }
  onAbrirVentanaModal() {}

  onCerrarVentanaModal() {
    this.modalService.close(this.modalRef);
  }

  obtenerCamposConfig(): object {


    return { texto: 'idAlumno', leyenda: 'nombre', imagen:'foto' };

  }


}



