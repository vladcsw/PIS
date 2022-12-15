
import { Component, OnInit } from '@angular/core';
import{ FirstService } from '../../demo/service/first-service'
import { Carpeta } from 'src/app/demo/domain/carpeta';
import { Router, ActivatedRoute } from '@angular/router';
import { documento } from 'src/app/demo/domain/documento';
@Component({
  selector: 'app-vincular-carpeta',
  templateUrl: './vincular-carpeta.component.html',
  styleUrls: ['./vincular-carpeta.component.scss']
})
export class VincularCarpetaComponent implements OnInit {
  documento:documento ={}
  carpetas:Carpeta[];
  constructor(
    private firtService:FirstService,
    private activatedRoute:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.firtService.getCarpeta().subscribe(
      res=>{

        this.carpetas=res['data']['CARPETA']
      }
      ,err=>console.log(err)
    )

  }


  vincular(idCarpeta:number){
    const params = this.activatedRoute.snapshot.params;

    this.firtService.getUnDocumento(params['id']).subscribe(
      res =>{
        this.documento = res['data']['documento']
        this.documento.carpeta_id = idCarpeta
        this.firtService.saveDocumento(this.documento).subscribe(
          res =>{
            this.router.navigate(["/analista/docRecibidos"],{queryParams:{fromFile: 'si'}})
          },err=>console.log(err)
        )
      }, err => console.log(err)
      )

    
   
  }
 
}
