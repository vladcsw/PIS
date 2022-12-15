import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';
import { BusquedaService } from 'src/app/services/busqueda.service';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.scss']
})
export class SolicitudesComponent implements OnInit {

    documentos: any = [];
    aux:any;
  constructor(private breadcrumbService: BreadcrumbService, private busquedaService: BusquedaService) {

  }

  ngOnInit(): void {
    this.breadcrumbService.setItems([
        {label: 'Agente'},
        {label: 'Solicitudes de Información'}
    ]);

    this.documentos = [];
    this.busquedaService.getPedidoDistinct().subscribe(xd =>{
        this.aux = xd
        this.busquedaService.getAllDocumento(xd).subscribe(xd2 =>{
            this.aux = xd2;
            this.aux.forEach(xd3 => {
                xd3['documento_prioridad_id'] = 'No clasificado'
                xd3['documento_clasificacion_id'] = 'No clasificado'
            })
            this.documentos = xd2;
        })
    })
  }

}
