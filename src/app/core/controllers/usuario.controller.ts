import { Injectable } from "@angular/core";
import { UserAdapter } from "../adapters/user.adapter";
import { UserService } from "../application/services/user.service";
import { UserInput } from "../application/ports/inputs/user.input";
import { UsuarioDto } from "../application/dto/usuario.dto";
import { BehaviorSubject } from "rxjs";
import { MessageService } from "primeng/api";

@Injectable({
    providedIn: 'root',
})
export class UsuarioController {

    private userInput: UserInput | undefined;
    private editarUsuario: UsuarioDto | null = null;
    public usuariosSubject: BehaviorSubject<UsuarioDto[]> = new BehaviorSubject<UsuarioDto[]>([]);
    public editarUsuarioSubject: BehaviorSubject<UsuarioDto | null> = new BehaviorSubject<UsuarioDto | null>(null);
    private usuarios: UsuarioDto[] = [];
    modalState = new BehaviorSubject<boolean>(false);

    constructor(
        private userAdapter: UserAdapter,
        private messageService: MessageService
    ) {
        this.userInput = new UserService(userAdapter);
        this.consultarUsuarios();
    }

    closeModal() {
        this.modalState.next(false);
    }

    setEditarUsuario(data: UsuarioDto) {
        this.editarUsuario = data;
        this.editarUsuarioSubject.next(this.editarUsuario);
    }

    clearEditarUsuario() {
        this.editarUsuario = null;
        this.editarUsuarioSubject.next(this.editarUsuario);
    }

    guardatUsuario(data: UsuarioDto) {
        if (this.editarUsuario) {
            data.id = this.editarUsuario.id;
            this.actualizarUsuario(data);
        } else {
            this.crearUsuario(data);
        }
    }

    crearUsuario(data: UsuarioDto) {
        this.userInput?.crearUsuario(data).subscribe({
            next: (response) => {
                this.usuarios.push(response);
                this.usuariosSubject.next(this.usuarios);
                this.messageService.add({ severity: 'success', summary: 'Usuario creado', detail: 'El usuario se ha creado correctamente' });
                this.clearEditarUsuario();
            },
            error: (error) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ha ocurrido un error al crear el usuario' });
                throw error;
            }
        })
    }

    actualizarUsuario(data: UsuarioDto) {
        this.userInput?.actualizarUsuario(data).subscribe({
            next: (response) => {
                this.usuarios = this.usuarios.map((usuario) => {
                    if (usuario.id === response.id) {
                        return response;
                    }
                    return usuario;
                });
                this.usuariosSubject.next(this.usuarios);
                this.messageService.add({ severity: 'success', summary: 'Usuario actualizado', detail: 'El usuario se ha actualizado correctamente' });
                this.clearEditarUsuario();
            },
            error: (error) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ha ocurrido un error al actualizar el usuario' });
                throw error;
            }
        })
    }

    eliminarUsuario(id: number) {
        this.userInput?.eliminarUsuario(id).subscribe({
            next: (response) => {
                this.usuarios = this.usuarios.filter((usuario) => usuario.id !== response.id);
                this.usuariosSubject.next(this.usuarios);
                this.messageService.add({ severity: 'success', summary: 'Usuario eliminado', detail: 'El usuario se ha eliminado correctamente' });
            },
            error: (error) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ha ocurrido un error al eliminar el usuario' });
                throw error;
            }
        })
    }

    consultarUsuario(id: number) {
        this.userInput?.consultarUsuario(id).subscribe({
            next: (response) => {
                this.usuarios = this.usuarios.map((usuario) => {
                    if (usuario.id === response.id) {
                        return response;
                    }
                    return usuario;
                });
                this.usuariosSubject.next(this.usuarios);
            },
            error: (error) => {
                throw error;
            }
        })
    }

    consultarUsuarios() {
        this.userInput?.consultarUsuarios().subscribe({
            next: (response) => {
                this.usuarios = response;
                this.usuariosSubject.next(this.usuarios);
            },
            error: (error) => {
                throw error;
            }
        })
    }

}