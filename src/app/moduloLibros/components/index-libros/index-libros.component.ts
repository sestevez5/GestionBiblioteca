import { ModuloLibrosRootState, selectFeature } from './../../store/index';
import { Observable } from 'rxjs/Observable';
import { selectPrueba } from './../../store/libros.selectors';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-index-libros',
  templateUrl: './index-libros.component.html',
  styleUrls: ['./index-libros.component.css']
})


export class IndexLibrosComponent implements OnInit {

  x$: Observable<string>

  constructor(private store: Store<ModuloLibrosRootState>) {
    this.store.select(selectPrueba).subscribe(x=>console.log('jsafhkjsahfksa',x));
  }

  ngOnInit(): void {
  }

}
