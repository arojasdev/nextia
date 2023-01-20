import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import  Swal  from 'sweetalert2';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public user = {
    username : '',
    password : '',
    estatus: true
  }

  constructor(private userService:UserService,private snack:MatSnackBar) { }

  ngOnInit(): void { }

  formSubmit() {
    console.log(this.user);
    
    if(this.user.username == '' || this.user.username == null) {
      this.snack.open('Por favor ingrese un usuario','Aceptar',{
        duration : 3000,
        verticalPosition : 'top',
        horizontalPosition : 'right'
      });
      return;
    }

    this.userService.agregarUsuario(this.user).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Felicidades!!','Tu cuenta ha sido creada','success');
      },(error) => {
        console.log(error);
        this.snack.open('ERROR!! No se ha podido guardar el usuario','Aceptar',{
          duration : 3000
        });
      }
    )
  }

}