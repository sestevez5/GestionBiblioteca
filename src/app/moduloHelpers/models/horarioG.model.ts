import { HorarioG } from './horarioG.model';
import { DiaSemana } from '../models/diaSemana.model';
import { ActividadG } from './actividadG.model';
import { Actividad } from './actividad.model';
import * as d3 from 'd3';

export class HorarioG {

  static diasSemana: DiaSemana[] = [
    { codigo: 'L', denominacionCorta: 'LUN', denominacionLarga: 'Lunes' },
    { codigo: 'M', denominacionCorta: 'MAR', denominacionLarga: 'Martes' },
    { codigo: 'X', denominacionCorta: 'MIE', denominacionLarga: 'Miércoles' },
    { codigo: 'J', denominacionCorta: 'JUE', denominacionLarga: 'Jueves' },
    { codigo: 'V', denominacionCorta: 'VIE', denominacionLarga: 'Viernes' },
    { codigo: 'S', denominacionCorta: 'SAB', denominacionLarga: 'Sábado' },
    { codigo: 'D', denominacionCorta: 'DOM', denominacionLarga: 'Domingo' },

  ];

  static parser = d3.timeParse("%I:%M");

  actividadesG: ActividadG[]

  constructor(actividades: Actividad[]) {

    this.procesarActividades(actividades)

  }

  private procesarActividades(actividades: Actividad[]) {

    // Inicialmente añadimos el contenido de las actividades a nuestras actividades gráficas.
    actividades.forEach(
      act => {
        this.actividadesG.push(new ActividadG(act))
      }
    )

    // Calculamos el ancho de cada actividad para que permita visualizar las qeu solapa.

    this.actividadesG.sort(this.compare).forEach(
      act => {

        const actividadesCubiertas = this.actividadesCubiertasPor(act);

        if (actividadesCubiertas.length > 0) {
          act.nivelAncho = d3.max(actividadesCubiertas.map(act => act.nivelAncho)) + 1;
        }

      }
    )


  }

  public obtenerDiasSemanasHorario(): DiaSemana[] {

    const x = Array.from(new Set(this.actividadesG.map(
      act => act.sesion.diaSemana
    )));

    return HorarioG.diasSemana.filter((ds: DiaSemana) => x.includes(ds.codigo));

  }

  public obtenerActividadesDiaSemana(ds: string): ActividadG[] {

    return this.actividadesG.filter(act => act.sesion.diaSemana === ds);

  }

  public actividadesCubiertasPor(actividad: ActividadG): ActividadG[] {

    return this.actividadesG.filter(
      act =>
        act.sesion.diaSemana === actividad.sesion.diaSemana
        && HorarioG.parser(act.sesion.horaInicio) <= HorarioG.parser(actividad.sesion.horaInicio)
        && HorarioG.parser(act.sesion.horaFin) >= HorarioG.parser(actividad.sesion.horaFin)
    )



  }

  private compare(a: ActividadG, b: ActividadG) {

    const codigosDiasSemana = HorarioG.diasSemana.map(ds => ds.codigo);

    if (codigosDiasSemana.indexOf(a.sesion.diaSemana) < codigosDiasSemana.indexOf(a.sesion.diaSemana))
      return -1;

    if (codigosDiasSemana.indexOf(a.sesion.diaSemana) > codigosDiasSemana.indexOf(a.sesion.diaSemana))
      return 1;

    if (codigosDiasSemana.indexOf(a.sesion.diaSemana) === codigosDiasSemana.indexOf(a.sesion.diaSemana)) {

      if (HorarioG.parser(a.sesion.horaInicio) < HorarioG.parser(b.sesion.horaInicio))
        return -1;

      if (HorarioG.parser(a.sesion.horaInicio) > HorarioG.parser(b.sesion.horaInicio))
        return 1;

      if (HorarioG.parser(a.sesion.horaInicio) === HorarioG.parser(b.sesion.horaInicio)) {

        if (HorarioG.parser(a.sesion.horaFin) < HorarioG.parser(b.sesion.horaFin))
          return -1;

        if (HorarioG.parser(a.sesion.horaFin) > HorarioG.parser(b.sesion.horaFin))
          return 1;

        if (HorarioG.parser(a.sesion.horaFin) === HorarioG.parser(b.sesion.horaFin))
          return 0;

      }



    }


  }
}
