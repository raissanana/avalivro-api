import { usuarioCreateDTO } from '../dto/usuario.dto';
import { Usuario } from '../modelo/usuario';
import { sql } from '../util/conexao';
import { usuarioListDTO } from '../dto/usuario.dto';

export class usuarioDAO {
    public async criarUsuario(usuario: Usuario): Promise<void> {
        try {
            const result: any = await sql(
                'INSERT INTO usuario (id, email, senha) VALUES (?, ?, ?) RETURNING *',
                [usuario.id, usuario.email, usuario.senha]
            );
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            throw new Error('Erro ao criar usuário');
        }
    }

    public async buscarUsuarioPorId(id: string): Promise<Usuario | null> {
        try {
            const rows: any = await sql('SELECT * FROM usuario WHERE id = ?', [id]);
            if (rows.length === 0) {
                return null;
            }
            const usuario = Usuario.reconstruir(rows[0]);
            return usuario;
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
            throw new Error('Erro ao buscar usuário');
        }
    }

    public async atualizarUsuario(id: string, usuario: Usuario): Promise<void> {
        try {
            await sql(
                'UPDATE usuario SET email = ?, senha = ? WHERE id = ?',
                [usuario.email, usuario.senha, id]
            );
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            throw new Error('Erro ao atualizar usuário');
        }
    }

    public async listarTodosUsuarios(): Promise<usuarioListDTO[]> {
        try {
            const rows: any = await sql('SELECT * FROM usuario');
            return rows.map((row: any) => ({ id: row.id, email: row.email }));
        } catch (error) {
            console.error('Erro ao listar usuários:', error);
            throw new Error('Erro ao listar usuários');
        }
    }

    public async deletarUsuario(id: string): Promise<void> {
        try {
            await sql('DELETE FROM usuario WHERE id = ?', [id]);
        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
            throw new Error('Erro ao deletar usuário');
        }
    }
    public async buscarPorLogin(email: string, senha: string): Promise<Usuario | null> {
        try {

            const usuario = await sql(
                'SELECT * FROM usuario WHERE email = ? AND senha = ?',
                [email, senha]
            ) as any[];

            if (usuario.length === 0) {
                return null;
            }

            return Usuario.reconstruir(usuario[0]);

        } catch (error) {
            console.error('Erro ao buscar usuário por login:', error);
            throw new Error('Erro ao buscar usuário por login');
        }
    }
}