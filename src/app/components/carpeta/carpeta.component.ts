import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';

@Component({
  selector: 'app-carpeta',
  templateUrl: './carpeta.component.html',
  styleUrls: ['./carpeta.component.scss']
})
export class CarpetaComponent implements OnInit {

  carpetaDialog: boolean;

  index: number = 0;

  constructor(private breadcrumbService: BreadcrumbService) { }

  ngOnInit(): void {
    this.breadcrumbService.setItems([
      {label: 'Analista'},
      {label: 'Bandeja de carpeta'},
  ]);
    
  }
  newDocAngente(){
    this.carpetaDialog = true;
  }

  openNext() {
    this.index = (this.index === 2) ? 0 : this.index + 1;
  }

  openPrev() {
      this.index = (this.index === 0) ? 2 : this.index - 1;
  }

}
export class TabViewDemo {}