import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Asegurado } from '../../services/asegurado.service';

@Component({
  selector: 'app-editar-asegurado-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, FormsModule,MatFormFieldModule,MatInputModule,MatButtonModule],
  templateUrl: './editar-asegurado-dialog.component.html',
  styleUrls: ['./editar-asegurado-dialog.component.css']
})
export class EditarAseguradoDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditarAseguradoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Asegurado
  ) {}
  emailValido(): boolean {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(this.data.email);
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
