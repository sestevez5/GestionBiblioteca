import { Usuario } from './../../models/usuario.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class listaUsuariosComponent implements OnInit {

  @Input() usuarios: Usuario[];
  @Output() editarUsuario: EventEmitter<Usuario> = new EventEmitter();
  @Output() borrarUsuario: EventEmitter<Usuario> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  OnEditar(usuario: Usuario) {
    this.editarUsuario.emit(usuario);
  }

  OnBorrar(usuario: Usuario) {
    this.borrarUsuario.emit(usuario);
  }


}
