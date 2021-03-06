import { Docente } from './docente.model';
import { Dependencia } from './dependencia.model';
import { Grupo } from './grupo.model';
import { Usuario } from './../../moduloAuth/models/usuario.model';
import { EnumTipoEntidadHorario } from "./tipoEntidadHorario.model";

export class EntidadHorario {
  id: string;
  descripcion: string;
  detalle: string;
  imagen: string;
  tipoEntidad: EnumTipoEntidadHorario | undefined;

  constructor(entidad: Docente | Grupo | Dependencia) {


    this.tipoEntidad = this.tipoEntidadHorario(entidad);

    switch (this.tipoEntidad) {
      case EnumTipoEntidadHorario.DOCENTE:
        const docente: Docente = entidad as Docente;
        this.descripcion = docente.apellido1 + ' ' + docente.apellido2 + ', ' + docente.nombre;
        this.detalle = docente.alias;
        this.imagen = docente.foto;
        this.id = docente.idDocente;
        break;

      case EnumTipoEntidadHorario.GRUPO:
        const grupo: Grupo = entidad as Grupo;
        this.descripcion = grupo.denominacionLarga + ' (' + grupo.codigo + ')';
        break;

      case EnumTipoEntidadHorario.DEPENDENCIA:
        const dependencia: Dependencia = entidad as Dependencia;
        this.descripcion = dependencia.denominacionLarga + ' (' + dependencia.codigo + ')';
        break;

    }



  };


  private tipoEntidadHorario(x: any): EnumTipoEntidadHorario | undefined
  {

    if (x && x.idDocente && typeof (x.idDocente) == 'string') return EnumTipoEntidadHorario.DOCENTE;
    if (x && x.idGrupo && typeof(x.idGrupo) == 'string') return EnumTipoEntidadHorario.GRUPO;
    if (x && x.idDepenndencia && typeof(x.idDependencia))return EnumTipoEntidadHorario.DEPENDENCIA;
    return undefined;

  }



}
