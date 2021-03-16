import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-selector-semanas',
  templateUrl: './selector-semanas.component.html',
  styleUrls: ['./selector-semanas.component.css']
})
export class SelectorSemanasComponent implements OnInit {

  model: NgbDateStruct;
  hoveredDate: NgbDate | null = null;
  semanaSeleccionada: { inicio: NgbDate, fin: NgbDate };
  constructor(private calendar: NgbCalendar) {
    this.semanaSeleccionada = this.obtenerSemanaDeLaFecha(calendar.getToday())
///https://stackblitz.com/run?file=src%2Fapp%2Fdatepicker-range.ts
    console.log(this.semanaSeleccionada);

   }

  ngOnInit(): void {


  }

  onSeleccionarFecha(fecha: NgbDate) {

    this.semanaSeleccionada = this.obtenerSemanaDeLaFecha(fecha);


   }





  private obtenerSemanaDeLaFecha(fecha: NgbDate): { inicio: NgbDate, fin: NgbDate }
  {

    const diaSemana = this.calendar.getWeekday(fecha);
    const fechaInicioSemana = this.modificarFecha(fecha, 1 - diaSemana);
    const fechaFinSemana = this.modificarFecha(fecha, 7-diaSemana);
    return { inicio: fechaInicioSemana, fin: fechaFinSemana }

  }

  private modificarFecha(fechaReferencia: NgbDate, numeroDias: number): NgbDate {

    var fecha = new Date(fechaReferencia.year, fechaReferencia.month-1, fechaReferencia.day);

    const miliSegundos: number = numeroDias * 24 * 60 * 60 * 1000;
    fecha.setTime(fecha.getTime() + miliSegundos);

    const nuevaFecha = new NgbDate(fecha.getFullYear(), fecha.getMonth() + 1, fecha.getDate());
    return nuevaFecha;

  }




  isHovered(date: NgbDate) {
    return this.fechaDesde && !this.fechaHasta && this.hoveredDate && date.after(this.fechaDesde) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.fechaHasta && date.after(this.fechaDesde) && date.before(this.fechaHasta);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fechaDesde) || (this.fechaHasta && date.equals(this.fechaHasta)) || this.isInside(date) || this.isHovered(date);
  }

}
