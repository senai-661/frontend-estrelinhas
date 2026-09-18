import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlanoRequests from '../../../fetch/PlanoRequests';
import type { PlanoDTO } from '../../../dto/PlanoDTO';
import Utilitario from '../../../utils/Utilitario';

function FormPlano() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<Omit<PlanoDTO, 'cod_plano'>>({
        tipo_plano: '',
        duracao_dias: 0,
        valor: 0,
        descricao: '',
        status_plano: 'ATIVO',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === 'duracao_dias' || name === 'valor') {
            setFormData(prev => ({ ...prev, [name]: Number(value) }));
            return;
        }

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const resposta = await PlanoRequests.enviarFormularioPlano(formData as PlanoDTO);
        if (resposta) {
            alert("Plano cadastrado com sucesso");
            navigate('/lista/planos');
        } else {
            alert("Erro ao cadastrar plano");
        }
    };

    return (
        <main className="bg-gray-100 flex-1 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 overflow-y-auto">
            <div className="max-w-3xl mx-auto">
                <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-2xl p-6 sm:p-10 border border-slate-200">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl text-center font-bold text-slate-800 mb-8 sm:mb-12">
                        Cadastro de Plano
                    </h1>

                    <div className="space-y-6 sm:space-y-8">
                        {/* Linha 1: Tipo do Plano e Duração */}
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1">
                                <label htmlFor="tipo_plano" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Tipo do Plano
                                </label>
                                <input
                                    type="text"
                                    name="tipo_plano"
                                    id="tipo_plano"
                                    required
                                    minLength={3}
                                    onChange={handleChange}
                                    placeholder="Ex: Mensal, Trimestral..."
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>

                            <div className="flex-1">
                                <label htmlFor="duracao_dias" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Duração (dias)
                                </label>
                                <input
                                    type="number"
                                    name="duracao_dias"
                                    id="duracao_dias"
                                    required
                                    min={1}
                                    onChange={handleChange}
                                    placeholder="Ex: 30"
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>
                        </div>

                        {/* Linha 2: Valor e Status */}
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1">
                                <label htmlFor="valor" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Valor (R$)
                                </label>
                                <input
                                    type="number"
                                    name="valor"
                                    id="valor"
                                    required
                                    min={0}
                                    step={0.01}
                                    onChange={handleChange}
                                    placeholder="Ex: 99.90"
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>

                            
                        </div>

                        {/* Linha 3: Descrição */}
                        <div>
                            <label htmlFor="descricao" className="block text-sm font-semibold text-slate-700 mb-2">
                                Descrição
                            </label>
                            <textarea
                                name="descricao"
                                id="descricao"
                                rows={3}
                                onChange={handleChange}
                                placeholder="Descreva os benefícios do plano..."
                                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400 resize-none"
                            />
                        </div>
                    </div>

                    <div className="mt-10 sm:mt-14 space-y-4">
                        <input
                            type="submit"
                            
                            value="CADASTRAR PLANO"
                             style={{ backgroundColor: '#F97316' }}
                            className="w-full bg-slate-800 text-white py-4 rounded-xl font-bold text-lg cursor-pointer hover:bg-slate-700 shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
                        />
                        <button
                            type="button"
                            onClick={() => navigate('/lista/planos')}
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

export default FormPlano;