import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Subscription } from 'rxjs';
import { UsuarioController } from 'src/app/core/controllers/usuario.controller';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ButtonModule,
    DropdownModule
  ],
  exportAs: 'UsuarioForm'
})
export class UsuarioFormComponent implements OnInit, OnDestroy {
  usuario: FormGroup | undefined;
  editarUsuarioSubscription: Subscription | undefined;
  tiposDocumentos = [
    {
      label: 'Cédula de ciudadanía',
      value: 'CC'
    }, {
      label: 'Cédula de extranjería',
      value: 'CE'
    }, {
      label: 'Pasaporte',
      value: 'PA'
    }, {
      label: 'Tarjeta de identidad',
      value: 'TI'
    }, {
      label: 'Registro civil',
      value: 'RC'
    }
  ];
  generos = [
    {
      label: 'Masculino',
      value: 'M'
    }, {
      label: 'Femenino',
      value: 'F'
    }, {
      label: 'Otro',
      value: 'O'
    }
  ];

  constructor(
    private fb: FormBuilder,
    private usuarioController: UsuarioController,
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.usuario = this.fb.group({
      tipoIdentificacion: [''],
      identificacion: [''],
      nombre: [''],
      genero: ['']
    });

    this.editarUsuarioSubscription = this.usuarioController.editarUsuarioSubject.subscribe({
      next: (response) => {
        if (response) {
          this.usuario?.patchValue(response);
        } else {
          this.usuario?.reset();
          this.usuario?.reset({
            tipoIdentificacion: '',
          });
        }
      }
    });
  }

  guardar() {
    const value = this.usuario?.value;
    this.usuarioController.guardatUsuario(value);
    this.usuario?.reset();
    this.usuarioController.closeModal();
  }

  ngOnDestroy(): void {
    if (this.editarUsuarioSubscription) {
      this.editarUsuarioSubscription.unsubscribe();
    }
  }
}
