import { DiaSemana } from 'src/app/moduloHelpers/models/diaSemana.model';
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

  ]

  actividades: Actividad[] = [
    {
      idActividad: '1',
      sesion: { diaSemana: 'L', horaInicio: '8:00', horaFin: '8:55' },
      contenido: { contenido:'t'}
    },
    {
      idActividad: '2',
      sesion: { diaSemana: 'L', horaInicio: '8:55', horaFin: '9:50' },
      contenido: { contenido:'t'}
    },
    {
      idActividad: '3',
      sesion: { diaSemana: 'L', horaInicio: '9:50', horaFin: '10:45' },
      contenido: { contenido:'t'}
    },
    {
      idActividad: '4',
      sesion: { diaSemana: 'M', horaInicio: '8:00', horaFin: '8:55' },
      contenido: { contenido:'t'}
    },
    {
      idActividad: '5',
      sesion: { diaSemana: 'M', horaInicio: '8:55', horaFin: '9:50' },
      contenido: { contenido:'t'}
    },
    {
      idActividad: '6',
      sesion: { diaSemana: 'M', horaInicio: '9:50', horaFin: '10:45' },
      contenido: { contenido:'t'}
    },

    {
      idActividad: '7',
      sesion: { diaSemana: 'X', horaInicio: '8:00', horaFin: '8:55' },
      contenido: { contenido:'t'}
    },
    {
      idActividad: '8',
      sesion: { diaSemana: 'J', horaInicio: '8:55', horaFin: '9:50' },
      contenido: { contenido:'t'}
    },
    {
      idActividad: '9',
      sesion: { diaSemana: 'V', horaInicio: '9:50', horaFin: '10:45' },
      contenido: { contenido:'t'}
    },

  ]

  obtenerTodasLasActividades(): Actividad[] {
    return this.actividades;
  }



  obtenerDiasSemana(actividades: Actividad[]) {

    const x = Array.from(new Set(actividades.map(
      act => act.sesion.diaSemana
    )));

    return this.DiasSemana.filter((ds: DiaSemana) => x.includes(ds.codigo)).slice();


  }

}
