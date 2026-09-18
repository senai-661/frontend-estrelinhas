import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MatriculaRequests from '../../../fetch/MatriculaRequests';
import AlunoRequests from '../../../fetch/AlunoRequests';
import PlanoRequests from '../../../fetch/PlanoRequests';
import type { MatriculaDTO } from '../../../dto/MatriculaDTO';
import type {AlunoDTO} from '../../../dto/AlunoDTO';
import type { PlanoDTO } from '../../../dto/PlanoDTO';

function FormMatricula() {
    const navigate = useNavigate();
    const [alunos, setAlunos] = useState<AlunoDTO[]>([]);
    const [planos, setPlanos] = useState<PlanoDTO[]>([]);
    const [formData, setFormData] = useState({
        id_aluno: 0,
        id_plano: 0,
        data_inicio: '',
        data_fim: '',
        forma_pagamento: '',
        valor_final: 0,
        status_matricula: 'ATIVA',
    });

    useEffect(() => {
        const carregarDados = async () => {
            const [listaAlunos, listaPlanos] = await Promise.all([
                AlunoRequests.obterListaDeAlunos(),
                PlanoRequests.obterListaDePlanos(),
            ]);
            if (listaAlunos) setAlunos(listaAlunos);
            if (listaPlanos) setPlanos(listaPlanos);
        };
        carregarDados();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === 'id_aluno' || name === 'id_plano') {
            setFormData(prev => ({ ...prev, [name]: Number(value) }));
            return;
        }

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formData.id_aluno === 0) {
            alert("Selecione um aluno");
            return;
        }
        if (formData.id_plano === 0) {
            alert("Selecione um plano");
            return;
        }
        if (!formData.forma_pagamento) {
            alert("Selecione a forma de pagamento");
            return;
        }

        const resposta = await MatriculaRequests.enviarFormularioMatricula(formData as MatriculaDTO);
        if (resposta) {
            alert("Matrícula cadastrada com sucesso");
            navigate('/lista/matriculas');
        } else {
            alert("Erro ao cadastrar matrícula");
        }
    };

    return (
        <main className="bg-gray-100 flex-1 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 overflow-y-auto">
            <div className="max-w-3xl mx-auto">
                <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-2xl p-6 sm:p-10 border border-slate-200">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl text-center font-bold text-slate-800 mb-8 sm:mb-12">
                        Cadastro de Matrícula
                    </h1>

                    <div className="space-y-6 sm:space-y-8">
                        {/* Linha 1: Aluno e Plano */}
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1">
                                <label htmlFor="id_aluno" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Aluno
                                </label>
                                <select
                                    name="id_aluno"
                                    id="id_aluno"
                                    required
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all text-slate-700 bg-white"
                                >
                                    <option value={0}>Selecione um aluno</option>
                                    {alunos.map(aluno => (
                                        <option key={aluno.idAluno} value={aluno.idAluno}>
                                            {aluno.nome} {aluno.sobrenome}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex-1">
                                <label htmlFor="id_plano" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Plano
                                </label>
                                <select
                                    name="id_plano"
                                    id="id_plano"
                                    required
                                    onChange={(e) => {
                                        const planoSelecionado = planos.find(p => p.cod_plano === Number(e.target.value));
                                        setFormData(prev => ({
                                            ...prev,
                                            id_plano: Number(e.target.value),
                                            valor_final: planoSelecionado?.valor ?? 0
                                        }));
                                    }}
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all text-slate-700 bg-white"
                                >
                                    <option value={0}>Selecione um plano</option>
                                    {planos.map(plano => (
                                        <option key={plano.cod_plano} value={plano.cod_plano}>
                                            {plano.tipo_plano} - R$ {plano.valor.toFixed(2).replace('.', ',')}
                                        </option>
                                    ))}
                                </select>
                            </div>

                        </div>

                        {/* Linha 2: Data Início e Data Fim */}
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1">
                                <label htmlFor="data_inicio" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Data de Início
                                </label>
                                <input
                                    type="date"
                                    name="data_inicio"
                                    id="data_inicio"
                                    required
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all"
                                />
                            </div>

                            <div className="flex-1">
                                <label htmlFor="data_fim" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Data de Fim
                                </label>
                                <input
                                    type="date"
                                    name="data_fim"
                                    id="data_fim"
                                    required
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Linha 3: Forma de Pagamento */}
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1">
                                <label htmlFor="forma_pagamento" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Forma de Pagamento
                                </label>
                                <select
                                    name="forma_pagamento"
                                    id="forma_pagamento"
                                    required
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all text-slate-700 bg-white"
                                >
                                    <option value="">Selecione a forma de pagamento</option>
                                    <option value="PIX">Pix</option>
                                    <option value="CARTÃO DÉBITO">Cartão Débito</option>
                                     <option value="CARTÃO CRÉDITO ">Cartão Crédito</option>
                                    <option value="DIN">Dinheiro</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 sm:mt-14 space-y-4">
                        <input
                            type="submit"
                            value="CADASTRAR MATRÍCULA"
                            style={{ backgroundColor: '#F97316' }}
                            className="w-full bg-slate-800 text-white py-4 rounded-xl font-bold text-lg cursor-pointer hover:bg-slate-700 shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
                        />

                        <button
                            type="button"
                            onClick={() => navigate('/lista/matriculas')}
                            style={{ backgroundColor: '#F97316' }}
                            className="w-full bg-slate-800 text-white py-4 rounded-xl font-bold text-lg cursor-pointer hover:bg-slate-700 shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
                        >
                            VOLTAR PARA LISTAGEM
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default FormMatricula;