import { MatriculaDTO } from "../dto/MatriculaDTO";

// Função auxiliar para mapear o objeto do backend para o DTO
function mapearMatricula(item: any): MatriculaDTO {
    return {
        cod_matricula: String(item.cod_matricula ?? item.codMatricula ?? item.idMatricula ?? item.id_matricula ?? ''),
        id_aluno: Number(item.id_aluno ?? item.idAluno ?? item.codAluno ?? item.cod_aluno ?? 0),
        id_plano: Number(item.id_plano ?? item.idPlano ?? item.codPlano ?? item.cod_plano ?? 0),
        data_inicio: item.data_inicio ?? item.dataInicio ?? item.dataMatricula ?? item.data_matricula ?? '',
        data_fim: item.data_fim ?? item.dataFim ?? item.dataVencimento ?? item.data_vencimento ?? '',
        status_matricula: item.status_matricula ?? item.statusMatricula ?? '—',
        forma_pagamento: String(item.forma_pagamento ?? item.formaPagamento ?? item.forma_de_pagamento ?? item.formaDePagamento ?? '—'),
        valor_final: Number(item.valor_final ?? item.valorFinal ?? item.valorPago ?? item.valor_pago ?? item.valor ?? 0),
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
                const lista = Array.isArray(dados) ? dados : (Array.isArray(dados?.value) ? dados.value : []);
                return lista.map(mapearMatricula);
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
                const matricula = dados?.value ?? dados;
                return mapearMatricula(matricula);
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