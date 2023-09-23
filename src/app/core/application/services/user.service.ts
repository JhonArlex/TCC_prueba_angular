import { Observable } from "rxjs";
import { UsuarioDto } from "../dto/usuario.dto";
import { UserInput } from "../ports/inputs/user.input";
import { UserOutput } from "../ports/outputs/user.output";

export class UserService implements UserInput{

    constructor(
        private userOutput: UserOutput
    ) { }

    crearUsuario(input: UsuarioDto): Observable<UsuarioDto> {
        return this.userOutput.crearUsuario(input);
    }
    actualizarUsuario(input: UsuarioDto): Observable<UsuarioDto> {
        return this.userOutput.actualizarUsuario(input);
    }
    eliminarUsuario(id: number): Observable<UsuarioDto> {
        return this.userOutput.eliminarUsuario(id);
    }
    consultarUsuario(id: number): Observable<UsuarioDto> {
        return this.userOutput.consultarUsuario(id);
    }
    consultarUsuarios(): Observable<UsuarioDto[]> {
        return this.userOutput.consultarUsuarios();
    }
    
}