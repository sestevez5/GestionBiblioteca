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

  public static convertirCadenaHoraEnTiempo: any = d3.timeParse("%I:%M%p");
  public static convertirTiempoEnCadenaHora: any = d3.timeFormat("%I:%M%p")

  actividadesG: ActividadG[] = [];

  constructor(actividades: Actividad[]) {

    this.procesarActividades(actividades)

  }

  private procesarActividades(actividades: Actividad[]) {

    // Inicialmente añadimos el contenido de las actividades a nuestras actividades gráficas.

    actividades.sort(this.compare).forEach(
      act => {
        const nuevaActividadG = new ActividadG(act);
        nuevaActividadG.horaInicio = HorarioG.convertirCadenaHoraEnTiempo(act.sesion.horaInicio);
        nuevaActividadG.horaFin = HorarioG.convertirCadenaHoraEnTiempo(act.sesion.horaFin);
        this.actividadesG.push(nuevaActividadG)
      }
    )

    // Calculamos el ancho de cada actividad para que permita visualizar las qeu solapa.

    this.actividadesG.forEach(
      act => {

        const actividadesCubiertas = this.actividadesCubiertasPor(act);

        if (actividadesCubiertas && act) {

          act.nivelAncho = d3.max(actividadesCubiertas.map(act => act.nivelAncho)) as number + 1;
        }

      }
    )


  }
  public obtenerDiasSemanaHorario(): DiaSemana[] {

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
        && HorarioG.convertirCadenaHoraEnTiempo(act.sesion.horaInicio) <= HorarioG.convertirCadenaHoraEnTiempo(actividad.sesion.horaInicio)
        && HorarioG.convertirCadenaHoraEnTiempo(act.sesion.horaFin) >= HorarioG.convertirCadenaHoraEnTiempo(actividad.sesion.horaFin)
    )



  }

  public minimoIntervaloTemporal(): Date {
    return this.obtenerHorasInicionHorasFin().reduce((n, m) => n < m ? n : m);
  }

  public maximoIntervaloTemporal() {
    return this.obtenerHorasInicionHorasFin().reduce((n, m) => n > m ? n : m);

  }

  private compare(a: Actividad, b: Actividad): number {

    const codigosDiasSemana = HorarioG.diasSemana.map(ds => ds.codigo);

    if (codigosDiasSemana.indexOf(a.sesion.diaSemana) < codigosDiasSemana.indexOf(b.sesion.diaSemana))      return -1
    else if (codigosDiasSemana.indexOf(a.sesion.diaSemana) > codigosDiasSemana.indexOf(b.sesion.diaSemana)) return 1
    else {

      if (HorarioG.convertirCadenaHoraEnTiempo(a.sesion.horaInicio) < HorarioG.convertirCadenaHoraEnTiempo(b.sesion.horaInicio)) return -1
      else if (HorarioG.convertirCadenaHoraEnTiempo(a.sesion.horaInicio) > HorarioG.convertirCadenaHoraEnTiempo(b.sesion.horaInicio)) return 1
      else if (HorarioG.convertirCadenaHoraEnTiempo(a.sesion.horaInicio) == HorarioG.convertirCadenaHoraEnTiempo(b.sesion.horaInicio)) {

        if (HorarioG.convertirCadenaHoraEnTiempo(a.sesion.horaFin) < HorarioG.convertirCadenaHoraEnTiempo(b.sesion.horaFin)) return -1
        else if (HorarioG.convertirCadenaHoraEnTiempo(a.sesion.horaFin) > HorarioG.convertirCadenaHoraEnTiempo(b.sesion.horaFin)) return 1
        else return 0;

      } else return 0;

    }
  } // Fin compare


  public obtenerHorasInicionHorasFin(): Date[] {
     return this.actividadesG.reduce(
       function (colecAnterior: Date[], actividadActual) {
         return colecAnterior.concat([actividadActual.horaInicio, actividadActual.horaFin]);
      },
      []
      )
  }


}
