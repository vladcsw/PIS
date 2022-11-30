
import { Component, OnInit } from '@angular/core';
import{ FirstServideService } from '../../demo/service/first-servide.service'
import { Carpeta } from 'src/app/demo/domain/carpeta';
@Component({
  selector: 'app-vincular-carpeta',
  templateUrl: './vincular-carpeta.component.html',
  styleUrls: ['./vincular-carpeta.component.scss']
})
export class VincularCarpetaComponent implements OnInit {
  carpetas:Carpeta[];
  constructor(
    private firtService:FirstServideService
  ) { }

  ngOnInit(): void {
    this.firtService.getCarpeta().subscribe(
      res=>{
        console.log(res['data']['CARPETA'])
        this.carpetas=res['data']['CARPETA']
      }
      ,err=>console.log(err)
    )

  }
   
}
