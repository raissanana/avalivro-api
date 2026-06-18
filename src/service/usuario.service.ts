import { usuarioDAO } from '../dao/usuario.dao';
import { usuarioCreateDTO, usuarioListDTO } from '../dto/usuario.dto';
import { Usuario } from '../modelo/usuario';
import { EmailAlreadyExistsError } from '../errors/EmailAlreadyExistsError';
import { UserNotFoundError } from '../errors/UserNotFoundError';

export class usuarioService {

    public constructor(private readonly usuarioDAO: usuarioDAO) {
    }

    public async criarUsuario(usuarioDto: usuarioCreateDTO): Promise<Usuario> {
        const usuarioExistente = await this.usuarioDAO.buscarPorEmail(usuarioDto.email);
        if (usuarioExistente) {
            throw new EmailAlreadyExistsError();
        }
        const usuario = Usuario.construir(usuarioDto.email, usuarioDto.senha);
        await this.usuarioDAO.criarUsuario(usuario);
        return usuario;
    }

    public async atualizarUsuario(id: string, usuarioDto: usuarioCreateDTO): Promise<Usuario> {
        const usuarioExistente = await this.usuarioDAO.buscarUsuarioPorId(id);
        if (!usuarioExistente) {
            throw new UserNotFoundError();
        }
        const usuarioAtualizado = Usuario.reconstruir({ id, email: usuarioDto.email, senha: usuarioDto.senha })
        await this.usuarioDAO.atualizarUsuario(id, usuarioAtualizado);
        return usuarioAtualizado;
    }

    public async buscarUsuarioPorId(id: string): Promise<Usuario> {
        const usuario = await this.usuarioDAO.buscarUsuarioPorId(id);
        if (!usuario) {
            throw new UserNotFoundError();
        }
        return usuario;
    }

    public async listarTodosUsuarios(): Promise<usuarioListDTO[]> {
        const usuarios = await this.usuarioDAO.listarTodosUsuarios();
        return usuarios;
    }

    public async deletarUsuario(id: string): Promise<void> {
        const usuarioExistente = await this.usuarioDAO.buscarUsuarioPorId(id);
        if (!usuarioExistente) {
            throw new UserNotFoundError();
        }
        await this.usuarioDAO.deletarUsuario(id);
    }

}
