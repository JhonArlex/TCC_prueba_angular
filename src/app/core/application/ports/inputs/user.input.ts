import { Observable } from "rxjs";
import { UsuarioDto } from "../../dto/usuario.dto";

export interface UserInput {
    crearUsuario(input: UsuarioDto): Observable<UsuarioDto>;
    actualizarUsuario(input: UsuarioDto): Observable<UsuarioDto>;
    eliminarUsuario(id: number): Observable<UsuarioDto>;
    consultarUsuario(id: number): Observable<UsuarioDto>;
    consultarUsuarios(): Observable<UsuarioDto[]>;
}