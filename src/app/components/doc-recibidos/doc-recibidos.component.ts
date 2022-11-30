import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doc-recibidos',
  templateUrl: './doc-recibidos.component.html',
  styleUrls: ['./doc-recibidos.component.scss']
})
export class DocRecibidosComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  redirect() {
    this.router.navigate(['analista/vistaDoc']);
}

}
