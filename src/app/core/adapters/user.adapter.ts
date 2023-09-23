import { Injectable } from "@angular/core";
import { UsuarioDto } from "../application/dto/usuario.dto";
import { UserOutput } from "../application/ports/outputs/user.output";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: `root`
})
export class UserAdapter implements UserOutput {
    constructor(
        private http: HttpClient
    ) { }

    crearUsuario(input: UsuarioDto): Observable<UsuarioDto> {
        return this.http.post<UsuarioDto>(`${environment.apiUrl}/${environment.apiV1}/usuario/crear`, input);
    }

    actualizarUsuario(input: UsuarioDto): Observable<UsuarioDto> {
        return this.http.put<UsuarioDto>(`${environment.apiUrl}/${environment.apiV1}/usuario/actualizar`, input);
    }

    eliminarUsuario(id: number): Observable<UsuarioDto> {
        return this.http.delete<UsuarioDto>(`${environment.apiUrl}/${environment.apiV1}/usuario/eliminar/${id}`);
    }

    consultarUsuario(id: number): Observable<UsuarioDto> {
        return this.http.get<UsuarioDto>(`${environment.apiUrl}/${environment.apiV1}/usuario/consultar/${id}`);
    }
    
    consultarUsuarios(): Observable<UsuarioDto[]> {
        return this.http.get<UsuarioDto[]>(`${environment.apiUrl}/${environment.apiV1}/usuario/consultar-todos`);
    }
    
}