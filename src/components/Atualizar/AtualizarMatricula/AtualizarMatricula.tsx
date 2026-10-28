import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MatriculaRequests from "../../../fetch/MatriculaRequests";

const toDateInput = (d: Date | string) => String(d).slice(0, 10);

export default function PAtualizarMatricula() {
  const { id_matricula } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    id_aluno: "",
    id_plano: "",
    data_inicio: "",
    data_fim: "",
    status_matricula: "ATIVA",
    forma_pagamento: "PIX",
    valor_final: "",
  });
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const id = Number(id_matricula);
    if (!Number.isInteger(id) || id < 1) {
      setErro("Identificador de matrícula inválido");
      setLoading(false);
      return;
    }

    MatriculaRequests.obterMatriculaPorId(id)
      .then((matricula) => {
        if (!matricula) throw new Error("Matrícula não encontrada");
        setForm({
          id_aluno: String(matricula.id_aluno),
          id_plano: String(matricula.id_plano),
          data_inicio: toDateInput(matricula.data_inicio),
          data_fim: toDateInput(matricula.data_fim),
          status_matricula: matricula.status_matricula,
          forma_pagamento: matricula.forma_pagamento ?? "PIX",
          valor_final: String(matricula.valor_final),
        });
      })
      .catch(() => setErro("Não foi possível carregar a matrícula"))
      .finally(() => setLoading(false));
  }, [id_matricula]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSalvando(true);
    setErro("");
    try {
      const atualizada = await MatriculaRequests.atualizarMatricula(id_matricula!, {
        ...form,
        cod_matricula: id_matricula!,
        id_aluno: Number(form.id_aluno),
        id_plano: Number(form.id_plano),
        valor_final: Number(form.valor_final),
      });
      if (!atualizada) throw new Error("Não foi possível atualizar a matrícula");
      navigate("/lista/matriculas");
    } catch {
      setErro("Não foi possível salvar a matrícula. Verifique os dados e tente novamente.");
    } finally {
      setSalvando(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f3f4f6] px-4 py-8 sm:px-8">
        <p className="mx-auto max-w-[1032px]">Carregando matrícula...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f3f4f6] px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-[1032px]">
        <div className="mb-6 flex items-center gap-2 text-sm">
          <button
            type="button"
            onClick={() => navigate("/lista/matriculas")}
            className="font-semibold text-[#ff7300] hover:text-[#e86500]"
          >
            Matrículas
          </button>
          <span className="text-gray-400">/</span>
          <span className="font-medium text-gray-700">
            M{String(id_matricula).padStart(6, "0")}
          </span>
        </div>

        <div className="mb-4 flex items-center gap-2 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-900">
          <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-5 w-5 shrink-0">
            <path d="m13.5 3.5 3 3M4 16l3.5-.7L16.3 6.5a1.4 1.4 0 0 0-2-2L5.5 13.3 4 16Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span><strong>Modo de edição:</strong> clique nos campos abaixo para alterar os dados da matrícula.</span>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 lg:flex-row">
          <aside className="flex w-full shrink-0 flex-col items-center gap-4 rounded-2xl border border-[#f0f0f0] bg-white p-6 lg:w-64">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#ff7300] text-base font-bold text-white">
              M{String(id_matricula).padStart(6, "0")}
            </div>

            <h1 className="text-center text-base font-bold text-black">
              Matrícula
            </h1>

            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                form.status_matricula === "ATIVA"
                  ? "bg-green-50 text-green-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  form.status_matricula === "ATIVA" ? "bg-green-500" : "bg-gray-500"
                }`}
              />
              {form.status_matricula}
            </span>

            <div className="my-2 w-full border-t border-gray-100" />

            <div className="flex w-full flex-col gap-2">
              <button
                type="submit"
                disabled={salvando}
                className="w-full rounded-[10px] bg-[#ff7300] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#e86500] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {salvando ? "Salvando..." : "Salvar alterações"}
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-full rounded-[10px] border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-black hover:bg-gray-50"
              >
                Voltar
              </button>
            </div>
          </aside>

          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <section className="rounded-2xl border border-[#f0f0f0] bg-white p-6">
              <div className="mb-5 flex items-center gap-2">
                <span className="h-7 w-7 rounded-lg bg-[#ff7300]" aria-hidden="true" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-black">
                  Informações da matrícula
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex min-h-[64px] gap-3 rounded-xl bg-[#f8f8f8] p-3">
                  <span className="h-8 w-8 shrink-0 rounded-lg border border-gray-100 bg-white" aria-hidden="true" />
                  <div className="min-w-0 flex-1">
                    <span className="block text-xs uppercase tracking-wide text-gray-500">Código da matrícula</span>
                    <span className="mt-1 block text-sm font-semibold text-black">
                      M{String(id_matricula).padStart(6, "0")}
                    </span>
                  </div>
                </div>

                <label className="flex min-h-[64px] cursor-text gap-3 rounded-xl border border-transparent bg-[#f8f8f8] p-3 transition-colors hover:border-orange-300 hover:bg-white focus-within:border-[#ff7300] focus-within:bg-white">
                  <span className="h-8 w-8 shrink-0 rounded-lg border border-gray-100 bg-white" aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs uppercase tracking-wide text-gray-500">ID do aluno</span>
                    <input type="number" min={1} name="id_aluno" value={form.id_aluno} onChange={handleChange} className="mt-1 w-full bg-transparent text-sm font-semibold text-black outline-none focus-visible:ring-1 focus-visible:ring-[#ff7300]" required />
                  </span>
                </label>

                <label className="flex min-h-[64px] cursor-text gap-3 rounded-xl border border-transparent bg-[#f8f8f8] p-3 transition-colors hover:border-orange-300 hover:bg-white focus-within:border-[#ff7300] focus-within:bg-white">
                  <span className="h-8 w-8 shrink-0 rounded-lg border border-gray-100 bg-white" aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs uppercase tracking-wide text-gray-500">ID do plano</span>
                    <input type="number" min={1} name="id_plano" value={form.id_plano} onChange={handleChange} className="mt-1 w-full bg-transparent text-sm font-semibold text-black outline-none focus-visible:ring-1 focus-visible:ring-[#ff7300]" required />
                  </span>
                </label>

                <label className="flex min-h-[64px] cursor-pointer gap-3 rounded-xl border border-transparent bg-[#f8f8f8] p-3 transition-colors hover:border-orange-300 hover:bg-white focus-within:border-[#ff7300] focus-within:bg-white">
                  <span className="h-8 w-8 shrink-0 rounded-lg border border-gray-100 bg-white" aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs uppercase tracking-wide text-gray-500">Status</span>
                    <select name="status_matricula" value={form.status_matricula} onChange={handleChange} className="mt-1 w-full bg-transparent text-sm font-semibold text-black outline-none focus-visible:ring-1 focus-visible:ring-[#ff7300]">
                      <option value="ATIVA">ATIVA</option>
                      <option value="FINALIZADA">FINALIZADA</option>
                    </select>
                  </span>
                </label>
              </div>
            </section>

            <section className="rounded-2xl border border-[#f0f0f0] bg-white p-6">
              <div className="mb-5 flex items-center gap-2">
                <span className="h-7 w-7 rounded-lg bg-[#ff7300]" aria-hidden="true" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-black">
                  Período e pagamento
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex min-h-[64px] cursor-text gap-3 rounded-xl border border-transparent bg-[#f8f8f8] p-3 transition-colors hover:border-orange-300 hover:bg-white focus-within:border-[#ff7300] focus-within:bg-white">
                  <span className="h-8 w-8 shrink-0 rounded-lg border border-gray-100 bg-white" aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs uppercase tracking-wide text-gray-500">Data de início</span>
                    <input type="date" name="data_inicio" value={form.data_inicio} onChange={handleChange} className="mt-1 w-full bg-transparent text-sm font-semibold text-black outline-none focus-visible:ring-1 focus-visible:ring-[#ff7300]" required />
                  </span>
                </label>

                <label className="flex min-h-[64px] cursor-text gap-3 rounded-xl border border-transparent bg-[#f8f8f8] p-3 transition-colors hover:border-orange-300 hover:bg-white focus-within:border-[#ff7300] focus-within:bg-white">
                  <span className="h-8 w-8 shrink-0 rounded-lg border border-gray-100 bg-white" aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs uppercase tracking-wide text-gray-500">Data de fim</span>
                    <input type="date" name="data_fim" value={form.data_fim} onChange={handleChange} className="mt-1 w-full bg-transparent text-sm font-semibold text-black outline-none focus-visible:ring-1 focus-visible:ring-[#ff7300]" required />
                  </span>
                </label>

                <label className="flex min-h-[64px] cursor-pointer gap-3 rounded-xl border border-transparent bg-[#f8f8f8] p-3 transition-colors hover:border-orange-300 hover:bg-white focus-within:border-[#ff7300] focus-within:bg-white">
                  <span className="h-8 w-8 shrink-0 rounded-lg border border-gray-100 bg-white" aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs uppercase tracking-wide text-gray-500">Forma de pagamento</span>
                    <select name="forma_pagamento" value={form.forma_pagamento} onChange={handleChange} className="mt-1 w-full bg-transparent text-sm font-semibold text-black outline-none focus-visible:ring-1 focus-visible:ring-[#ff7300]">
                      <option value="PIX">PIX</option>
                      <option value="CARTAO">CARTÃO</option>
                      <option value="DINHEIRO">DINHEIRO</option>
                    </select>
                  </span>
                </label>

                <label className="flex min-h-[64px] cursor-text gap-3 rounded-xl border border-transparent bg-[#f8f8f8] p-3 transition-colors hover:border-orange-300 hover:bg-white focus-within:border-[#ff7300] focus-within:bg-white">
                  <span className="h-8 w-8 shrink-0 rounded-lg border border-gray-100 bg-white" aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs uppercase tracking-wide text-gray-500">Valor final (R$)</span>
                    <input type="number" min={0} step="0.01" name="valor_final" value={form.valor_final} onChange={handleChange} className="mt-1 w-full bg-transparent text-sm font-semibold text-black outline-none focus-visible:ring-1 focus-visible:ring-[#ff7300]" required />
                  </span>
                </label>
              </div>
            </section>

            {erro && (
              <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {erro}
              </p>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}