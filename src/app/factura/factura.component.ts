import { Component, OnInit  } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.scss']
})
export class FacturaComponent implements OnInit {

  public p_num_factura: number = 0;
  public p_fecha_factura: string = '';

  facturaForm !: FormGroup;
  constructor(private formBuilder : FormBuilder, private api : ApiService, private dialogRef: MatDialogRef<FacturaComponent>){}
   ngOnInit(): void {
     this.facturaForm = this.formBuilder.group({
      numero_factura : ['',Validators.required],
      fecha : ['',Validators.required] 
     })
       
   }

    postFactura(numero_factura: number, fecha_fact: string){
      const data = {
        method: 'CreaFactura',
        token: '121215489',
        numero_factura: numero_factura,
        fecha: fecha_fact
      };
      this.api.postFactura(data)
      .subscribe({
        next:(rest)=>{
          alert("La factura fue creada");
          this.facturaForm.reset();
          this.dialogRef.close();
        },
        error:()=> {
          alert("La factura no fue creada");
        },
      })
     
   }
}
