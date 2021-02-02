import { DiaSemana } from '../models/diaSemana.model';

import { Actividad } from '../models/actividad.model';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  DiasSemana: DiaSemana[] = [
    { codigo: 'L', denominacionCorta: 'LUN', denominacionLarga: 'Lunes' },
    { codigo: 'M', denominacionCorta: 'MAR', denominacionLarga: 'Martes' },
    { codigo: 'X', denominacionCorta: 'MIE', denominacionLarga: 'Miércoles' },
    { codigo: 'J', denominacionCorta: 'JUE', denominacionLarga: 'Jueves' },
    { codigo: 'V', denominacionCorta: 'VIE', denominacionLarga: 'Viernes' },
    { codigo: 'S', denominacionCorta: 'SAB', denominacionLarga: 'Sábado' },
    { codigo: 'D', denominacionCorta: 'DOM', denominacionLarga: 'Domingo' },

  ];

  actividades: any = [
    {
      idActividad: '1',
      sesion: { diaSemana: 'L', horaInicio: '8:00am', horaFin: '8:55am' },
      contenido: { contenido: 't' }
    },
    {
      idActividad: '2',
      sesion: { diaSemana: 'L', horaInicio: '08:55am', horaFin: '09:50am' },
      contenido: { contenido: 't' }
    },
    {
      idActividad: '3',
      sesion: { diaSemana: 'L', horaInicio: '09:50am', horaFin: '10:45am' },
      contenido: { contenido: 't' }
    },
    {
      idActividad: '4',
      sesion: { diaSemana: 'M', horaInicio: '08:00am', horaFin: '08:55am' },
      contenido: { contenido: 't' }
    },
    {
      idActividad: '5',
      sesion: { diaSemana: 'M', horaInicio: '08:30am', horaFin: '09:50am' },
      contenido: { contenido: 't' }
    },
    {
      idActividad: '6',
      sesion: { diaSemana: 'M', horaInicio: '07:00am', horaFin: '10:45am' },
      contenido: { contenido: 't' }
    },

    {
      idActividad: '7',
      sesion: { diaSemana: 'X', horaInicio: '08:01am', horaFin: '08:55am' },
      contenido: { contenido: 't' }
    },
    {
      idActividad: '8',
      sesion: { diaSemana: 'J', horaInicio: '08:55am', horaFin: '09:50am' },
      contenido: { contenido: 't' }
    },
    {
      idActividad: '9',
      sesion: { diaSemana: 'V', horaInicio: '09:50am', horaFin: '11:35am' },
      contenido: { contenido: 't' }
    },

  ];

  obtenerTodasLasActividades(): Actividad[] {
    return this.actividades;
  }



}
