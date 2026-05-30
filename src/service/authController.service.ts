import { usuarioDAO } from '../dao/usuario.dao';
import { LoginDTO } from '../dto/login.dto';
import { Usuario } from '../modelo/usuario';

export class AuthService {

    public constructor(private readonly usuarioDAO: usuarioDAO) {
    }
    public async login(loginDto: LoginDTO): Promise<Usuario | null> {
        const usuario = await this.usuarioDAO.buscarPorLogin(loginDto.email, loginDto.senha);
        return usuario;
    }
}