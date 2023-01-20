import { Component, OnInit } from '@angular/core';
import { UserService } from './../../../services/user.service';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import  Swal  from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-archivos',
  templateUrl: './archivos.component.html',
  styleUrls: ['./archivos.component.css']
})
export class ArchivosComponent implements OnInit {

  selectedFiles: FileList;
  message = '';
  imageName = "";
  n=1;
  fileInfos : Observable<any>;

  constructor(private userService: UserService, private router:Router) { }

  ngOnInit(): void {
    this.fileInfos = this.userService.getFiles();
  }

  selectFiles(event) {
    console.log(event.target.files.length);
      event.target.files.length == 1 ? this.imageName = event.target.files[0].nombre : this.imageName = event.target.files.length + " archivos";
    this.selectedFiles = event.target.files;
  }

  upload(index, file) {

    this.userService.upload(file).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
        } else if (event instanceof HttpResponse) {
          this.fileInfos = this.userService.getFiles();
        }
      },
      err => {
        this.message = 'No se puede subir el archivo ' + file.name;
      });
      Swal.fire('Archivo cargado','Archivo cargado con exito','success');
      this.router.navigate(['/admin']);
  }

  uploadFiles() {
    this.message = '';
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
  }

  deleteFile(filename: string) {
    this.userService.deleteFile(filename).subscribe(res => {
      this.fileInfos = this.userService.getFiles();
    });
    Swal.fire('Archivo eliminado','Archivo eliminado con exito','success');
    this.router.navigate(['/admin']);
  }

}
