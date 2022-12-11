import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';

@Component({
  selector: 'app-modulo-inicio',
  templateUrl: './modulo-inicio.component.html',
  styleUrls: ['./modulo-inicio.component.scss']
})
export class ModuloInicioComponent implements OnInit {

  constructor(private breadcrumbService: BreadcrumbService) { }

  ngOnInit(): void {
    this.breadcrumbService.setItems([
      {label: 'Modulo'}
  ]);
  }

}
