import type { AlunoDTO } from "../dto/AlunoDTO";
// Classe responsável por fazer requisições à API - aluno
class AlunoRequests {
    private serverURL;
    private endpointAluno;

    constructor() {
        this.serverURL = `http://localhost:3333`;
        this.endpointAluno = `/api/alunos`;
    }

   async obterListaDeAlunos(): Promise<AlunoDTO[]> {
    try {
        const token = localStorage.getItem('token');
        const respostaAPI = await fetch(`${this.serverURL}${this.endpointAluno}`, {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `${token}`
            }
        });

        if (respostaAPI.ok) {
            const lista = await respostaAPI.json();
            return lista.map((raw: any) => ({
                idAluno: raw.idAluno ?? raw.id_aluno,
                codAluno: raw.codAluno ?? raw.cod_aluno,
                nome: raw.nome,
                sobrenome: raw.sobrenome,
                cpf: raw.cpf,
                dataNascimento: raw.dataNascimento ?? raw.data_nascimento,
                celular: raw.celular,
                statusAluno: raw.statusAluno ?? raw.status_aluno,
                endereco: raw.endereco,
                email: raw.email,
            }));
        } else {
            throw new Error("Não foi possível listar os alunos.");
        }
    } catch (error) {
        console.error(`Erro ao fazer a consulta de alunos. ${error}`);
        return [];
    }
}

    async enviarFormularioAluno(formAluno: AlunoDTO): Promise<boolean> {
        try {
            const token = localStorage.getItem('token');
            const respostaAPI = await fetch(`${this.serverURL}${this.endpointAluno}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                },
                body: JSON.stringify(formAluno)
            });

            if (!respostaAPI.ok) throw new Error(`Erro ${respostaAPI.status}: ${respostaAPI.statusText}`);

            console.info(`${respostaAPI.status}: ${respostaAPI.statusText}`);

            return true;
        } catch (error) {
            console.error(`Erro ao fazer consulta à API. ${error}`);
            return false;
        }
    }
    async obterAlunoPorId(id_aluno: number): Promise<AlunoDTO | undefined> {
        try {
            const token = localStorage.getItem('token');
            const respostaAPI = await fetch(`${this.serverURL}${this.endpointAluno}/${id_aluno}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                }
            });

            if (respostaAPI.ok) {
                const raw = await respostaAPI.json();
                const aluno: AlunoDTO = {
                    idAluno: raw.id_aluno,
                    codAluno: raw.cod_aluno,
                    nome: raw.nome,
                    sobrenome: raw.sobrenome,
                    cpf: raw.cpf,
                    dataNascimento: raw.data_nascimento,
                    celular: raw.celular,
                    statusAluno: raw.status_aluno,
                    endereco: raw.endereco,
                    email: raw.email,
                    codPlano: raw.cod_plano,
                    tipoPlano: raw.tipo_plano,
                    duracaoDias: raw.duracao_dias,
                    valorPlano: raw.valor_plano,
                    descricaoPlano: raw.descricao_plano,
                    codMatricula: raw.cod_matricula,
                    dataInicio: raw.data_inicio,
                    dataFim: raw.data_fim,
                    statusMatricula: raw.status_matricula,
                    formaPagamento: raw.forma_pagamento,
                    valorFinal: raw.valor_final
                };
                return aluno;
            } else {
                throw new Error("Não foi possível buscar o aluno.");
            }
        } catch (error) {
            console.error(`Erro ao fazer a consulta de aluno por ID. ${error}`);
            return;
        }
    }
}

export default new AlunoRequests;