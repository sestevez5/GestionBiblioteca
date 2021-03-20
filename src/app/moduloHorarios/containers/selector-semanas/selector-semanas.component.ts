import { ModuloHorarioRootState } from './../../store/index';
import { Store, select } from '@ngrx/store';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbDateStruct, NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import * as FromActividadesSelector from '../../store/actividades/actividades.selectors';
@Component({
  selector: 'app-selector-semanas',
  templateUrl: './selector-semanas.component.html',
  styleUrls: ['./selector-semanas.component.css']
})
export class SelectorSemanasComponent implements OnInit {

  hoveredDate: NgbDate | null = null;

  opcionSeleccionada: string;
  @Output() lunesSemanaSeleccionada = new EventEmitter<Date>();
  rangoSemanaSeleccionada: { inicio: NgbDate, fin: NgbDate };

  constructor(private calendar: NgbCalendar, private store: Store<ModuloHorarioRootState>) {

    this.rangoSemanaSeleccionada = this.obtenerSemanaDeLaFecha(calendar.getToday());

  }

  ngOnInit(): void {
    this.gestionarSubscripcionesStore();
  }

  // ----------------------------------------------------------------
  // Método que gestiona las subscripciones necesarias al Store.
  // ----------------------------------------------------------------
  gestionarSubscripcionesStore() {

    this.store.pipe(select(FromActividadesSelector.selectLunesSemanaSeleccionada))
      .subscribe(lunesSemanaSeleccionada => {
        if (lunesSemanaSeleccionada) {
          this.opcionSeleccionada='semana';
          const inicio: NgbDate = this.convertirFechaEnNgbDate(lunesSemanaSeleccionada);
          this.rangoSemanaSeleccionada = this.obtenerSemanaDeLaFecha(inicio);
        }
        else {
          this.opcionSeleccionada = 'todas';
        }
      });

  }

  // ----------------------------------------------------------------
  // Métodos que atienden a las acciones del usuario
  // ----------------------------------------------------------------
  onSeleccionarFecha(fecha: NgbDate) {

    this.rangoSemanaSeleccionada = this.obtenerSemanaDeLaFecha(fecha);
    this.lunesSemanaSeleccionada.emit(this.convertirNgbDateEnFecha(this.rangoSemanaSeleccionada.inicio));

  }

  isHovered(date: NgbDate) {
    console.log('hover: ', date);
    return this.rangoSemanaSeleccionada.inicio && !this.rangoSemanaSeleccionada.fin && this.hoveredDate && date.after(this.rangoSemanaSeleccionada.inicio) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.rangoSemanaSeleccionada.fin && date.after(this.rangoSemanaSeleccionada.inicio) && date.before(this.rangoSemanaSeleccionada.fin);
  }

  isRange(date: NgbDate) {
    return date.equals(this.rangoSemanaSeleccionada.inicio) || (this.rangoSemanaSeleccionada.fin && date.equals(this.rangoSemanaSeleccionada.fin)) || this.isInside(date) || this.isHovered(date);
  }

  // ----------------------------------------------------------------
  // Métodos auxiliares
  // ----------------------------------------------------------------
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





}
