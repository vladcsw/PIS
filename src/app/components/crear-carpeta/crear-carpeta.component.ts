import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';

@Component({
  selector: 'app-crear-carpeta',
  templateUrl: './crear-carpeta.component.html',
  styleUrls: ['./crear-carpeta.component.scss']
})
export class CrearCarpetaComponent implements OnInit {

  constructor(private breadcrumbService: BreadcrumbService) { }

  ngOnInit(): void {
    this.breadcrumbService.setItems([
      {label: 'Analista'},
      {label: 'Crear Carpeta'}
  ]);
  }

}
