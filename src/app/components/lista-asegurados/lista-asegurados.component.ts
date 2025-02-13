import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AseguradoService, Asegurado } from '../../services/asegurado.service';
import { HttpClientModule } from '@angular/common/http';
import { EditarAseguradoDialogComponent } from '../editar-asegurado-dialog/editar-asegurado-dialog.component';
import { AgregarAseguradoDialogComponent } from '../agregar-asegurado-dialog/agregar-asegurado.component';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-asegurados',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    SweetAlert2Module,
    MatDialogModule,
    MatSnackBarModule,
    HttpClientModule
  ],
  templateUrl: './lista-asegurados.component.html',
  styleUrls: ['./lista-asegurados.component.css']
})
export class ListaAseguradosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'numeroIdentificacion', 'nombreCompleto', 'telefono', 'email','fechaNacimiento','valorEstimado','observaciones', 'acciones'];
  dataSource = new MatTableDataSource<Asegurado>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private aseguradoService: AseguradoService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.obtenerAsegurados();
  }

  obtenerAsegurados(): void {
    this.aseguradoService.obtenerAsegurados().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
  }

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eliminarAsegurado(id: number): void {
    //if (confirm('¿Estás seguro de eliminar este asegurado?')) {
      Swal.fire({
        title: "Estas Seguro?",
        text: "Se eliminara el registro permanentemente.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Eliminar!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.aseguradoService.eliminarAsegurado(id).subscribe(() => {
        
            this.obtenerAsegurados();
            this.snackBar.open('Asegurado eliminado', 'Cerrar', { duration: 3000 });
    
          });
          Swal.fire({
            title: "Eliminado",
            text: "Su registro ha sido eliminado.",
            icon: "success"
          });
        }
      });
    
      
    
    //}
  }

  editarAsegurado(asegurado: Asegurado): void {
    console.log('Asegurado enviado al modal:', asegurado);

    const aseguradoEditado = {
      ...asegurado,
      fechaNacimiento: asegurado.fechaNacimiento ? asegurado.fechaNacimiento.split('T')[0] : '' //  Formato YYYY-MM-DD
    };
  
    const dialogRef = this.dialog.open(EditarAseguradoDialogComponent, {
      width: '400px',
      data: { ...asegurado }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Datos editados:', result);
        this.aseguradoService.ActualizarAsegurado(result).subscribe(() => {
          console.log('Asegurado actualizado en la base de datos');
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Registro actualizado exitosamente",
            showConfirmButton: false,
            timer: 2000
          });
          this.obtenerAsegurados();
        });
      }
    });
  }
  

  //  Método para abrir el modal de crear asegurado
  crearAsegurado(): void {
    const dialogRef = this.dialog.open(AgregarAseguradoDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Nuevo asegurado:', result);
        this.aseguradoService.crearAsegurado(result).subscribe(() => {
          console.log('Asegurado creado con éxito');
          this.obtenerAsegurados(); // Refrescar la lista
          //this.snackBar.open('Asegurado creado', 'Cerrar', { duration: 3000 });
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Registro guardado exitosamente",
            showConfirmButton: false,
            timer: 2000
          });
        });
      }
    });
  }
}
