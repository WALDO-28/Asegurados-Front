import { Routes } from '@angular/router';
import { ListaAseguradosComponent } from './components/lista-asegurados/lista-asegurados.component';
import { AgregarAseguradoDialogComponent } from './components/agregar-asegurado-dialog/agregar-asegurado.component';

export const routes: Routes = [
    { path: '', redirectTo: 'asegurados', pathMatch: 'full' },
    { path: 'asegurados', component: ListaAseguradosComponent },
    { path: 'crear', component: AgregarAseguradoDialogComponent },
    { path: '**', redirectTo: 'asegurados' },
];