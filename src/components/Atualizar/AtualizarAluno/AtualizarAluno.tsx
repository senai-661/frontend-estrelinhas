import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AlunoRequests from "../../../fetch/AlunoRequests";

const toDateInput = (d?: Date | string) => (d ? String(d).slice(0, 10) : "");

export default function PAtualizarAluno() {
  const { id_aluno } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    sobrenome: "",
    cpf: "",
    dataNascimento: "",
    celular: "",
    statusAluno: "ATIVO", // ajusta valores
    endereco: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const id = Number(id_aluno);
    if (!Number.isInteger(id) || id < 1) {
      setErro("Identificador de aluno inválido");
      setLoading(false);
      return;
    }

    AlunoRequests.obterAlunoPorId(id)
      .then((aluno) => {
        if (!aluno) throw new Error("Aluno não encontrado");
        setForm({
          nome: aluno.nome,
          sobrenome: aluno.sobrenome,
          cpf: aluno.cpf,
          dataNascimento: toDateInput(aluno.dataNascimento),
          celular: aluno.celular,
          statusAluno: aluno.statusAluno,
          endereco: aluno.endereco ?? "",
          email: aluno.email ?? "",
        });
      })
      .catch(() => setErro("Não foi possível carregar o aluno"))
      .finally(() => setLoading(false));
  }, [id_aluno]);

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
      const atualizado = await AlunoRequests.atualizarAluno(Number(id_aluno), {
        ...form,
        cpf: form.cpf.replace(/\D/g, ""),
        dataNascimento: new Date(form.dataNascimento),
      });
      if (!atualizado) throw new Error("Não foi possível atualizar o aluno");
      navigate("/lista/alunos");
    } catch {
      setErro("Não foi possível salvar o aluno. Verifique os dados e tente novamente.");
    } finally {
      setSalvando(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f3f4f6] px-4 py-8 sm:px-8">
        <p className="mx-auto max-w-[1032px]">Carregando aluno...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f3f4f6] px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-[1032px]">
        <div className="mb-6 flex items-center gap-2 text-sm">
          <button
            type="button"
            onClick={() => navigate("/lista/alunos")}
            className="font-semibold text-[#ff7300] hover:text-[#e86500]"
          >
            Alunos
          </button>
          <span className="text-gray-400">/</span>
          <span className="font-medium text-gray-700">
            {id_aluno ? `A${String(id_aluno).padStart(6, "0")}` : "Aluno"}
          </span>
        </div>

        <div className="mb-4 flex items-center gap-2 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-900">
          <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-5 w-5 shrink-0">
            <path d="m13.5 3.5 3 3M4 16l3.5-.7L16.3 6.5a1.4 1.4 0 0 0-2-2L5.5 13.3 4 16Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span><strong>Modo de edição:</strong> clique nos campos abaixo para alterar os dados do aluno.</span>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 lg:flex-row">
          <aside className="flex w-full shrink-0 flex-col items-center gap-4 rounded-2xl border border-[#f0f0f0] bg-white p-6 lg:w-64">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#ff7300] text-base font-bold text-white">
              A{String(id_aluno).padStart(6, "0")}
            </div>

            <h1 className="text-center text-base font-bold text-black">
              {[form.nome, form.sobrenome].filter(Boolean).join(" ") || "Aluno"}
            </h1>

            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                form.statusAluno === "ATIVO"
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  form.statusAluno === "ATIVO" ? "bg-green-500" : "bg-red-500"
                }`}
              />
              {form.statusAluno}
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
                  Informações do aluno
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex min-h-[64px] gap-3 rounded-xl bg-[#f8f8f8] p-3">
                  <span className="h-8 w-8 shrink-0 rounded-lg border border-gray-100 bg-white" aria-hidden="true" />
                  <div className="min-w-0 flex-1">
                    <span className="block text-xs uppercase tracking-wide text-gray-500">Código do aluno</span>
                    <span className="mt-1 block text-sm font-semibold text-black">
                      A{String(id_aluno).padStart(6, "0")}
                    </span>
                  </div>
                </div>

                <label className="flex min-h-[64px] cursor-text gap-3 rounded-xl border border-transparent bg-[#f8f8f8] p-3 transition-colors hover:border-orange-300 hover:bg-white focus-within:border-[#ff7300] focus-within:bg-white">
                  <span className="h-8 w-8 shrink-0 rounded-lg border border-gray-100 bg-white" aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs uppercase tracking-wide text-gray-500">Nome</span>
                    <input name="nome" value={form.nome} onChange={handleChange} className="mt-1 w-full bg-transparent text-sm font-semibold text-black outline-none focus-visible:ring-1 focus-visible:ring-[#ff7300]" required />
                  </span>
                </label>

                <label className="flex min-h-[64px] cursor-text gap-3 rounded-xl border border-transparent bg-[#f8f8f8] p-3 transition-colors hover:border-orange-300 hover:bg-white focus-within:border-[#ff7300] focus-within:bg-white">
                  <span className="h-8 w-8 shrink-0 rounded-lg border border-gray-100 bg-white" aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs uppercase tracking-wide text-gray-500">Sobrenome</span>
                    <input name="sobrenome" value={form.sobrenome} onChange={handleChange} className="mt-1 w-full bg-transparent text-sm font-semibold text-black outline-none focus-visible:ring-1 focus-visible:ring-[#ff7300]" required />
                  </span>
                </label>

                <label className="flex min-h-[64px] cursor-text gap-3 rounded-xl border border-transparent bg-[#f8f8f8] p-3 transition-colors hover:border-orange-300 hover:bg-white focus-within:border-[#ff7300] focus-within:bg-white">
                  <span className="h-8 w-8 shrink-0 rounded-lg border border-gray-100 bg-white" aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs uppercase tracking-wide text-gray-500">CPF</span>
                    <input name="cpf" value={form.cpf} onChange={handleChange} className="mt-1 w-full bg-transparent text-sm font-semibold text-black outline-none focus-visible:ring-1 focus-visible:ring-[#ff7300]" required />
                  </span>
                </label>

                <label className="flex min-h-[64px] cursor-pointer gap-3 rounded-xl border border-transparent bg-[#f8f8f8] p-3 transition-colors hover:border-orange-300 hover:bg-white focus-within:border-[#ff7300] focus-within:bg-white">
                  <span className="h-8 w-8 shrink-0 rounded-lg border border-gray-100 bg-white" aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs uppercase tracking-wide text-gray-500">Data de nascimento</span>
                    <input type="date" name="dataNascimento" value={form.dataNascimento} onChange={handleChange} className="mt-1 w-full bg-transparent text-sm font-semibold text-black outline-none focus-visible:ring-1 focus-visible:ring-[#ff7300]" required />
                  </span>
                </label>

                <label className="flex min-h-[64px] cursor-text gap-3 rounded-xl border border-transparent bg-[#f8f8f8] p-3 transition-colors hover:border-orange-300 hover:bg-white focus-within:border-[#ff7300] focus-within:bg-white">
                  <span className="h-8 w-8 shrink-0 rounded-lg border border-gray-100 bg-white" aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs uppercase tracking-wide text-gray-500">Status</span>
                    <select name="statusAluno" value={form.statusAluno} onChange={handleChange} className="mt-1 w-full bg-transparent text-sm font-semibold text-black outline-none focus-visible:ring-1 focus-visible:ring-[#ff7300]">
                      <option value="ATIVO">ATIVO</option>
                      <option value="INATIVO">INATIVO</option>
                    </select>
                  </span>
                </label>
              </div>
            </section>

            <section className="rounded-2xl border border-[#f0f0f0] bg-white p-6">
              <div className="mb-5 flex items-center gap-2">
                <span className="h-7 w-7 rounded-lg bg-[#ff7300]" aria-hidden="true" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-black">
                  Contato e endereço
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex min-h-[64px] cursor-text gap-3 rounded-xl border border-transparent bg-[#f8f8f8] p-3 transition-colors hover:border-orange-300 hover:bg-white focus-within:border-[#ff7300] focus-within:bg-white">
                  <span className="h-8 w-8 shrink-0 rounded-lg border border-gray-100 bg-white" aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs uppercase tracking-wide text-gray-500">Celular</span>
                    <input name="celular" value={form.celular} onChange={handleChange} className="mt-1 w-full bg-transparent text-sm font-semibold text-black outline-none focus-visible:ring-1 focus-visible:ring-[#ff7300]" required />
                  </span>
                </label>

                <label className="flex min-h-[64px] gap-3 rounded-xl bg-[#f8f8f8] p-3">
                  <span className="h-8 w-8 shrink-0 rounded-lg border border-gray-100 bg-white" aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs uppercase tracking-wide text-gray-500">E-mail</span>
                    <input type="email" name="email" value={form.email} onChange={handleChange} className="mt-1 w-full bg-transparent text-sm font-semibold text-black outline-none focus-visible:ring-1 focus-visible:ring-[#ff7300]" />
                  </span>
                </label>

                <label className="flex min-h-[64px] cursor-text gap-3 rounded-xl border border-transparent bg-[#f8f8f8] p-3 transition-colors hover:border-orange-300 hover:bg-white focus-within:border-[#ff7300] focus-within:bg-white sm:col-span-2">
                  <span className="h-8 w-8 shrink-0 rounded-lg border border-gray-100 bg-white" aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs uppercase tracking-wide text-gray-500">Endereço</span>
                    <input name="endereco" value={form.endereco} onChange={handleChange} className="mt-1 w-full bg-transparent text-sm font-semibold text-black outline-none focus-visible:ring-1 focus-visible:ring-[#ff7300]" />
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