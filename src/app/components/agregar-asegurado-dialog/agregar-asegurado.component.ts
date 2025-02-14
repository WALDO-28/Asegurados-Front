import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Asegurado } from '../../services/asegurado.service';
import {MatDatepickerModule} from '@angular/material/datepicker';

@Component({
  selector: 'app-agregar-asegurado-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule
  ],
  templateUrl: './agregar-asegurado-dialog.component.html',
  styleUrls: ['./agregar-asegurado-dialog.component.css']
})
export class AgregarAseguradoDialogComponent {
    data: Asegurado = {
    id: 0,
    numeroIdentificacion: 0,
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
    telefono: '',
    email: '',
    fechaNacimiento: new Date().toString().split('T')[0],
    valorEstimado: 0,
    observaciones: ''
  };

  constructor(public dialogRef: MatDialogRef<AgregarAseguradoDialogComponent>) {}

  emailValido(): boolean {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/i.test(this.data.email);
}
  
   guardar(form: NgForm): void {
      if (form.invalid) {
        form.form.markAllAsTouched(); // Muestra errores inmediatamente si hay campos vacíos
        return;
      }
  
      console.log('Guardando asegurado:', this.data);
      this.dialogRef.close(this.data);
    }
  
    cancelar(): void {
      this.dialogRef.close();
    }
}