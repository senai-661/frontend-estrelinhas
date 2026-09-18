import { MatriculaDTO } from "../dto/MatriculaDTO";

// Função auxiliar para mapear o objeto do backend para o DTO
function mapearMatricula(item: any): MatriculaDTO {
    return {
        cod_matricula: item.idMatricula,
        id_aluno: item.codAluno,
        id_plano: item.codPlano,
        data_inicio: item.dataMatricula,
        data_fim: item.dataVencimento,
        status_matricula: item.statusMatricula,
        forma_pagamento: item.formaPagamento,
        valor_final: parseFloat(item.valorPago),
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