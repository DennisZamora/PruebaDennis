import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ApiService } from './services/api.service';
import { DetalleFacturaComponent } from './detalle-factura/detalle-factura.component';
import { FacturaComponent } from './factura/factura.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public p_num_factura : number= 0;
  title = 'PruebaDennis';
  numeroFactura = 0;
  displayedColumns: string[] = ['codigo', 'producto', 'cantidad', 'precio', 'total','accion'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api : ApiService){

  }
  ngOnInit(): void {
      this.getDetalleFactura(this.numeroFactura);
  }
  
  /// Abre el dialogo de la factura
  openFacturaDialog() {
     this.dialog.open(FacturaComponent,{
      width: '30%'
     });
  }

  /// Abre el dialogo de la detalle factura
  openDetalleFacturaDialog() {
    this.dialog.open(DetalleFacturaComponent,{
     width: '30%'
    });
  }

  ///Muestra el detalle de la factura
  getDetalleFactura(numeroFactura : number){
    this.api.getDetalleFactura(numeroFactura)
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      },
      error:()=>{
        //alert("Error al mostrar los datos")
      }
    })
  }
  

  /// Elimina el detalle de la factura
  /// Linea->Numero de linea de la factura
  /// NumeroFactura -> El numero de la factura
  /// nombreProducto -> El nombre del prodcuto
  deleteDetalleFactura(linea: number,numeroFactura : number,nombreProducto : string){
    const data = {
      method: 'BorrarDetalle',
      token: '121215489',
      linea: linea,
      numero_factura: numeroFactura
    };
    this.api.deleteDetalleFactura(data)
    .subscribe({
      next:(res)=>{
        alert('La linea *'+linea+'* del producto *'+nombreProducto+'*fue eliminada')
      },
      error:()=>{
        alert("La linea no fue eliminada");
      }
    })
   }
}