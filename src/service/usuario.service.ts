import { usuarioDAO } from '../dao/usuario.dao';
import { usuarioCreateDTO, usuarioListDTO } from '../dto/usuario.dto';
import { Usuario } from '../modelo/usuario';

export class usuarioService {

    public constructor(private readonly usuarioDAO: usuarioDAO) {
    }

    public async criarUsuario(usuarioDto: usuarioCreateDTO): Promise<Usuario> {
        const usuario = Usuario.construir(usuarioDto.email, usuarioDto.senha);
        await this.usuarioDAO.criarUsuario(usuario);
        return usuario;
    }
    public async atualizarUsuario(id: string, usuarioDto: usuarioCreateDTO): Promise<Usuario | null> {
        const usuarioExistente = await this.usuarioDAO.buscarUsuarioPorId(id);
        if (!usuarioExistente) {
            return null;
        }
        const usuarioAtualizado = Usuario.reconstruir({ id, email: usuarioDto.email, senha: usuarioDto.senha })
        await this.usuarioDAO.atualizarUsuario(id, usuarioAtualizado);
        return usuarioAtualizado;
    }
    public async buscarUsuarioPorId(id: string): Promise<Usuario | null> {
        const usuario = await this.usuarioDAO.buscarUsuarioPorId(id);
        return usuario;
    }
    public async listarTodosUsuarios(): Promise<usuarioListDTO[]> {
        const usuarios = await this.usuarioDAO.listarTodosUsuarios();
        return usuarios;
    }
    public async deletarUsuario(id: string): Promise<boolean> {
        try {
            await this.usuarioDAO.deletarUsuario(id);
            return true;
        } catch {
            return false;
        }
    }

}
