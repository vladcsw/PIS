import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doc-enviado',
  templateUrl: './doc-enviado.component.html',
  styleUrls: ['./doc-enviado.component.scss']
})
export class DocEnviadoComponent implements OnInit {
  docEnviadoDialog: boolean;

  index: number = 0;
  constructor() { }

  ngOnInit(): void {
  }
  newDocAngente(){
    this.docEnviadoDialog = true;
  }

  openNext() {
    this.index = (this.index === 2) ? 0 : this.index + 1;
  }

  openPrev() {
      this.index = (this.index === 0) ? 2 : this.index - 1;
  }

}
export class TabViewDemo {}