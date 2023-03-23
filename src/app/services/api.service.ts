import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private httpClient:HttpClient) { }
  url:string = "https://api.cafebritt.com/develop/test/functions/api.cfc";
  
  //Agrega la factura
  postFactura(data:any) {
    return this.httpClient.post(this.url, data);
  }
  
  //Agrega el detalle de factura
  postdetalleFactura(data: any) {
    return this.httpClient.post(this.url,data);
  }
 
  //Obtiene el detalle de la factura
  getDetalleFactura(numeroFactura:number){
    const urlApi = this.url + '?method=ObtieneFactura&token=121215489&numero_factura='+numeroFactura;
    return this.httpClient.get<any>(urlApi);
  }
  //Obtiene el producto
  getObtenerProducto(data:any){
    return this.httpClient.get(this.url, data);
  }
  
  //Elimina el detalle de la factura
  deleteDetalleFactura(data:any){
    return this.httpClient.get(this.url, data);
  }
}
