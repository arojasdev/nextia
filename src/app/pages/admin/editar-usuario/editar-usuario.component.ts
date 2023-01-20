import  Swal  from 'sweetalert2';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  auxData = {
    "idUsuario": 1,
    "username" : '',
    "password" : '',
  }

  constructor(private route:ActivatedRoute, private userService: UserService, private router:Router) { }

  idUsuario = 0;
  usuario: any;

  ngOnInit(): void {
    this.idUsuario = this.route.snapshot.params['idUsuario'];
    this.userService.obtenerUsuarioById(this.idUsuario).subscribe(
      (data) => {
        this.usuario = data;
        console.log(this.usuario);
      },
      (error) => {
        console.log(error);
      }
    )
    }  

  public actualizar(){
    this.auxData.idUsuario = this.idUsuario;
    this.auxData.username = this.usuario.username;
    this.auxData.password = this.usuario.password;
    console.log(this.auxData);
    this.userService.actualizarUsuario(this.auxData).subscribe(
      (data) => {
        Swal.fire('Usuario editado','El usuario ha sido actualizado con éxito','success').then(
          (e) => {
            this.router.navigate(['/admin/usuarios']);
          }
        );
      },
      (error) => {
        Swal.fire('Error','No se ha podido actualizar el usuario','error');
        console.log(error);
      }
    )
  }
}
