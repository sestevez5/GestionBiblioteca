import { AuthService } from './../../../moduloAuth/services/auth.service';
import { HorarioService } from '../../services/horario.service';
import { Component, OnInit } from '@angular/core';
import { Actividad } from '../../models/actividad.model';

@Component({
  selector: 'app-gestion-actividades',
  templateUrl: './gestion-actividades.component.html',
  styleUrls: ['./gestion-actividades.component.css']
})
export class GestionActividadesComponent implements OnInit {


  actividades: Actividad[];

  constructor(horarioService: HorarioService, usuarios: AuthService) {

    this.actividades = horarioService.obtenerTodasLasActividades();
    usuarios.ObtenerUsuarios(null)
      .subscribe(usuario => console.log('usuarios',usuario));
   }



  ngOnInit(): void {



  }
}
