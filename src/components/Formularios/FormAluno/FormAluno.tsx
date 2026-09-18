import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlunoRequests from '../../../fetch/AlunoRequests';
import type {AlunoDTO} from '../../../dto/AlunoDTO';
import Utilitario from '../../../utils/Utilitario.ts';

function FormAluno() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<AlunoDTO>({
        nome: '',
        sobrenome: '',
        cpf: '',
        dataNascimento: new Date(),
        endereco: '',
        email: '',
        celular: '',
        senha: '',
        statusAluno: 'ATIVO'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === 'celular') {
            const celularFormatado = Utilitario.formatarTelefone(value);
            setFormData(prev => ({ ...prev, [name]: celularFormatado }));
            return;
        }

        if (name === 'cpf') {
            const cpfFormatado = Utilitario.formatarCPF(value);
            setFormData(prev => ({ ...prev, [name]: cpfFormatado }));
            return;
        }

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!Utilitario.validarEmail(formData.email)) {
            alert("E-mail inválido");
            return;
        }

        const dadosParaEnviar: AlunoDTO = {
            ...formData,
            cpf: formData.cpf.replace(/\D/g, '')
        };

        const resposta = await AlunoRequests.enviarFormularioAluno(dadosParaEnviar);
        if (resposta) {
            alert("Aluno cadastrado com sucesso");
        } else {
            alert("Erro ao cadastrar aluno");
        }
    };

    return (
        <main className="bg-gray-100 flex-1 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 overflow-y-auto">
            <div className="max-w-3xl mx-auto">
                <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-2xl p-6 sm:p-10 border border-slate-200">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl text-center font-bold text-slate-800 mb-8 sm:mb-12 color: gradient-text">
                        Cadastro de Aluno
                    </h1>

                    <div className="space-y-6 sm:space-y-8">
                        {/* Linha 1: Nome e Sobrenome */}
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1">
                                <label htmlFor="nome" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Nome
                                </label>
                                <input
                                    type="text"
                                    name="nome"
                                    id="nome"
                                    required
                                    minLength={3}
                                    onChange={handleChange}
                                    placeholder="Digite o nome"
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>

                            <div className="flex-1">
                                <label htmlFor="sobrenome" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Sobrenome
                                </label>
                                <input
                                    type="text"
                                    name="sobrenome"
                                    id="sobrenome"
                                    required
                                    minLength={3}
                                    onChange={handleChange}
                                    placeholder="Digite o sobrenome"
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>
                        </div>

                        {/* Linha 2: CPF e Data de Nascimento */}
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1">
                                <label htmlFor="cpf" className="block text-sm font-semibold text-slate-700 mb-2">
                                    CPF
                                </label>
                                <input
                                    type="text"
                                    name="cpf"
                                    id="cpf"
                                    required
                                    value={formData.cpf}
                                    onChange={handleChange}
                                    placeholder="000.000.000-00"
                                    maxLength={14}
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>

                            <div className="flex-1">
                                <label htmlFor="dataNascimento" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Data de Nascimento
                                </label>
                                <input
                                    type="date"
                                    name="dataNascimento"
                                    id="dataNascimento"
                                    required
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Linha 3: Celular e E-mail */}
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1">
                                <label htmlFor="celular" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Celular
                                </label>
                                <input
                                    type="tel"
                                    name="celular"
                                    id="celular"
                                    value={formData.celular}
                                    onChange={handleChange}
                                    placeholder="(xx) x xxxx-xxxx"
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>

                            <div className="flex-1">
                                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                                    E-mail
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                    onChange={handleChange}
                                    placeholder="exemplo@email.com"
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>
                        </div>

                        {/* Linha 4: Endereço */}
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1">
                                <label htmlFor="endereco" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Endereço
                                </label>
                                <input
                                    type="text"
                                    name="endereco"
                                    id="endereco"
                                    minLength={6}
                                    onChange={handleChange}
                                    placeholder="Rua, número, bairro..."
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>

                            <div className="flex-1">
                                <label htmlFor="senha" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Senha
                                </label>
                                <input
                                    type="password"
                                    name="senha"
                                    id="senha"
                                    minLength={6}
                                    onChange={handleChange}
                                    placeholder="Digite a senha"
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 sm:mt-14 space-y-4">
                        <input
                            type="submit"
                            value="CADASTRAR ALUNO"
                            style={{ backgroundColor: '#F97316' }}
                            className="w-full bg-slate-800 text-white py-4 rounded-xl font-bold text-lg cursor-pointer hover:bg-slate-700 shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
                        />
                        <button
                            type="button"
                            style={{ backgroundColor: '#F97316' }}
                            onClick={() => navigate('/lista/alunos')}
                            className="w-full bg-slate-800 text-white py-4 rounded-xl font-bold text-lg cursor-pointer hover:bg-slate-700 shadow-lg hover:shadow-xl transition-all active:scale-[0.98"
                        >
                            VOLTAR PARA LISTAGEM
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default FormAluno;