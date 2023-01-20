import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import urlBase from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  public agregarUsuario(user: any) {
    return this.httpClient.post(`${urlBase}/api/usuarios/`,user);
  }

  public listarUsuariosActivos() {
    return this.httpClient.get(`${urlBase}/api/usuarios/activo`);
  }

  public eliminarUsuario(idUsuario:any){
    return this.httpClient.delete(`${urlBase}/api/usuarios/${idUsuario}`);
  }

  public actualizarUsuario(usuario: any){
    return this.httpClient.put(`${urlBase}/api/usuarios/`, usuario);
  }

  public obtenerUsuarioById(idUsuario: any){
    return this.httpClient.get(`${urlBase}/api/usuarios/buscar/${idUsuario}`);
  }

  //manejo de archivos

  upload(file: File): Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();
    formData.append('files', file);
   
    const req = new HttpRequest('POST', `${urlBase}/api/usuarios/archivos/upload/`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.httpClient.request(req);
  }

  getFiles(){
    return this.httpClient.get(`${urlBase}/api/usuarios/archivos/files`);
  }

  deleteFile(filename: string){
    return this.httpClient.get(`${urlBase}/api/usuarios/archivos/delete/${filename}`);
  }

}
