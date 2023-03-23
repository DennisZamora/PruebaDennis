import { Component, OnInit  } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-detalle-factura',
  templateUrl: './detalle-factura.component.html',
  styleUrls: ['./detalle-factura.component.scss']
})
export class DetalleFacturaComponent {
  
  public listaProducto : Array<any> = [];
  public nombreProducto : string = "";

  detalleFacturaForm !: FormGroup;
  constructor(private formBuilder : FormBuilder, private api : ApiService, private dialogRef: MatDialogRef<DetalleFacturaComponent>){}
   ngOnInit(): void {
     this,this.detalleFacturaForm = this.formBuilder.group({
       numeroFactura : ['',Validators.required],
       codigoProducto: ['',Validators.required],
       cantidad: ['',Validators.required]  
     })
       
   }
    postDetalleFactura(){
     if (this.detalleFacturaForm.valid){
      this.api.postFactura(this.detalleFacturaForm.value)
      .subscribe({
        next:(rest)=>{
          alert("El detalle de la factura fue creada");
          this.detalleFacturaForm.reset();
          this.dialogRef.close();
        },
        error:()=> {
          alert("El detalle de la factura no fue creada");
        },
      })
     }
   }

   getObtenerProducto(){
    const data = {
      method: 'BuscarProducto',
      token: '121215489'
    };
    this.api.getObtenerProducto(data).subscribe({
      next:(rest)=>{
       this.listaProducto = <any>rest; 
      }
    })
    
   }
}
