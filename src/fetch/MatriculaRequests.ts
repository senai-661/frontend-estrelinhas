import { MatriculaDTO } from "../dto/MatriculaDTO";

// Função auxiliar para mapear o objeto do backend para o DTO
function mapearMatricula(item: any): MatriculaDTO {
    return {
        cod_matricula: item.idMatricula ?? item.id_matricula ?? item.cod_matricula,
        id_aluno: item.idAluno ?? item.id_aluno ?? item.codAluno ?? item.cod_aluno,
        id_plano: item.idPlano ?? item.id_plano ?? item.codPlano ?? item.cod_plano,
        nome_aluno: item.nomeAluno ?? item.nome_aluno ?? item.aluno_nome ?? item.aluno,
        nome_plano: item.nomePlano ?? item.nome_plano ?? item.plano_nome ?? item.tipoPlano ?? item.tipo_plano ?? item.plano,
        data_inicio: item.dataMatricula ?? item.data_matricula ?? item.data_inicio,
        data_fim: item.dataVencimento ?? item.data_vencimento ?? item.data_fim,
        status_matricula: item.statusMatricula ?? item.status_matricula,
        forma_pagamento: item.formaPagamento ?? item.forma_pagamento,
        valor_final: Number(item.valorPago ?? item.valor_pago ?? item.valor_final),
    };
}

class MatriculaRequests {
    private serverURL;
    private endpointMatricula;

    constructor() {
        this.serverURL = `http://localhost:3333`;
        this.endpointMatricula = `/api/matriculas`;
    }

    async obterListaDeMatriculas() {
        try {
            const token = localStorage.getItem('token');
            const respostaAPI = await fetch(`${this.serverURL}${this.endpointMatricula}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                }
            });

            if (respostaAPI.ok) {
                const dados = await respostaAPI.json();
                return dados.map(mapearMatricula); 
            } else {
                throw new Error("Não foi possível listar as matrículas.");
            }
        } catch (error) {
            console.error(`Erro ao fazer a consulta de matrículas. ${error}`);
            return [];
        }
    }

    async obterMatriculaPorId(idMatricula: number) {
        try {
            const token = localStorage.getItem('token');
            const respostaAPI = await fetch(`${this.serverURL}${this.endpointMatricula}/${idMatricula}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                }
            });

            if (respostaAPI.ok) {
                const dados = await respostaAPI.json();
                return mapearMatricula(dados); 
            } else {
                throw new Error("Não foi possível buscar a matrícula.");
            }
        } catch (error) {
            console.error(`Erro ao fazer a consulta de matrícula por ID. ${error}`);
            return null;
        }
    }

    async enviarFormularioMatricula(formmatricula: MatriculaDTO): Promise<boolean> {
        try {
            const token = localStorage.getItem('token');
            const respostaAPI = await fetch(`${this.serverURL}${this.endpointMatricula}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                },
                body: JSON.stringify(formmatricula)
            });

            if (!respostaAPI.ok) throw new Error(`Erro ${respostaAPI.status}: ${respostaAPI.statusText}`);

            console.info(`${respostaAPI.status}: ${respostaAPI.statusText}`);
            return true;
        } catch (error) {
            console.error(`Erro ao fazer consulta à API. ${error}`);
            return false;
        }
    }
}

export default new MatriculaRequests;