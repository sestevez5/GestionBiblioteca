import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbDateStruct, NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-selector-semanas',
  templateUrl: './selector-semanas.component.html',
  styleUrls: ['./selector-semanas.component.css']
})
export class SelectorSemanasComponent{

  hoveredDate: NgbDate | null = null;

  @Output() lunesSemanaSeleccionada = new EventEmitter<Date>();

  semanaSeleccionada: { inicio: NgbDate, fin: NgbDate };

  constructor(private calendar: NgbCalendar) {
    this.semanaSeleccionada = this.obtenerSemanaDeLaFecha(calendar.getToday());
   }



  onSeleccionarFecha(fecha: NgbDate) {

    this.semanaSeleccionada = this.obtenerSemanaDeLaFecha(fecha);
    this.lunesSemanaSeleccionada.emit(this.convertirNgbDateEnFecha(this.semanaSeleccionada.inicio));

   }





  private obtenerSemanaDeLaFecha(fecha: NgbDate): { inicio: NgbDate, fin: NgbDate }
  {

    const diaSemana = this.calendar.getWeekday(fecha);
    const fechaInicioSemana = this.modificarFecha(fecha, 1 - diaSemana);
    const fechaFinSemana = this.modificarFecha(fecha, 7-diaSemana);
    return { inicio: fechaInicioSemana, fin: fechaFinSemana }

  }

  private modificarFecha(fechaReferencia: NgbDate, numeroDias: number): NgbDate {

    var fecha = this.convertirNgbDateEnFecha(fechaReferencia);

    const miliSegundos: number = numeroDias * 24 * 60 * 60 * 1000;
    fecha.setTime(fecha.getTime() + miliSegundos);

    return this.convertirFechaEnNgbDate(fecha);

  }

  convertirNgbDateEnFecha(ngb: NgbDate): Date {
    return new Date(ngb.year, ngb.month-1, ngb.day);
  }

  private convertirFechaEnNgbDate(fecha: Date): NgbDate {
    return new NgbDate(fecha.getFullYear(), fecha.getMonth() + 1, fecha.getDate());
  }




  isHovered(date: NgbDate) {
    console.log('hover: ', date);
    return this.semanaSeleccionada.inicio && !this.semanaSeleccionada.fin && this.hoveredDate && date.after(this.semanaSeleccionada.inicio) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.semanaSeleccionada.fin && date.after(this.semanaSeleccionada.inicio) && date.before(this.semanaSeleccionada.fin);
  }

  isRange(date: NgbDate) {
    return date.equals(this.semanaSeleccionada.inicio) || (this.semanaSeleccionada.fin && date.equals(this.semanaSeleccionada.fin)) || this.isInside(date) || this.isHovered(date);
  }

}
