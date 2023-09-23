import { Component, OnDestroy, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { UsuarioDto } from 'src/app/core/application/dto/usuario.dto';
import { UsuarioController } from 'src/app/core/controllers/usuario.controller';
import { UsuarioFormComponent } from '../usuario-form/usuario-form.component';
import { Subscription } from 'rxjs';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  imports: [
    ButtonModule,
    TableModule,
    DialogModule,
    UsuarioFormComponent,
    ConfirmDialogModule,
    ToastModule,
  ],
  providers: [ConfirmationService, MessageService],
  standalone: true
})
export class UsuariosComponent implements OnInit, OnDestroy {

  visibleModal: boolean = false;
  subscriptionUsuario: Subscription | undefined;
  clientes: UsuarioDto[] = [];

  constructor(
    private usuarioController: UsuarioController,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {

  }
  ngOnInit(): void {
    this.subscriptionUsuarios();
    this.subscriptionModal();
  }


  subscriptionUsuarios() {
    this.subscriptionUsuario = this.usuarioController.usuariosSubject.subscribe({
      next: (response) => {
        this.clientes = response;
      }
    })
  }

  subscriptionModal() {
    this.usuarioController.modalState.subscribe({
      next: (response) => {
        this.visibleModal = response;
      }
    })
  }

  limpiarEditarUsuario() {
    this.usuarioController.clearEditarUsuario();
  }

  crearUsuario() {
    this.visibleModal = true;
  }

  actualizarUsuario(cliente: UsuarioDto) {
    this.usuarioController.setEditarUsuario(cliente);
    this.visibleModal = true;
  }

  eliminarUsuario(cliente: UsuarioDto) {
    this.confirmationService.confirm({
      message: `¿Está seguro que desea eliminar el cliente ${cliente.nombre}?`,
      header: 'Eliminar cliente',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.usuarioController.eliminarUsuario(cliente.id!);
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rechazado', detail: 'Cancelada la eliminación' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
            break;
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscriptionUsuario)
      this.subscriptionUsuario?.unsubscribe();
  }
}

