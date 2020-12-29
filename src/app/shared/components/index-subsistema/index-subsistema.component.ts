import { Router, ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-index-subsistema',
  templateUrl: './index-subsistema.component.html',
  styleUrls: ['./index-subsistema.component.css']
})
export class IndexSubsistemaComponent implements OnInit {

  nombreSubsistema: string;

  constructor(private route: ActivatedRoute) {
    this.nombreSubsistema = this.route.snapshot.data['nombreSubsistema'];
   }

  ngOnInit(): void {
  }

}
