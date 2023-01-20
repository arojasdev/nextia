import { Component, OnInit } from '@angular/core';
import { UserService } from './../../../services/user.service';
import  Swal  from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})

export class UsuariosComponent implements OnInit {

  usuarios : any = [

  ]

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.listarUsuariosActivos().subscribe(
      (dato:any) => {
        this.usuarios = dato;
        console.log(this.usuarios);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error','Error al listar los usuarios','error');
      }
    )
  }

  eliminarUsuario(idUsuario: any) {
    Swal.fire({
      title:'Eliminar usuario',
      text:'¿Estás seguro de eliminar el usuario?',
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Eliminar',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.userService.eliminarUsuario(idUsuario).subscribe(
          (data) => {
            this.usuarios = this.usuarios.filter((usuario:any) => usuario.idUsuario != idUsuario);
            Swal.fire('Usuario eliminado','Usuario eliminado con exito','success');
          },
          (error) => {
            Swal.fire('Error','Error al eliminar el usuario','error');
          }
        )
      }
    })
   }

}
