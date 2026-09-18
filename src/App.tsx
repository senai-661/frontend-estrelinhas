import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/Rotas/ProtectedRoutes';
import PHome from './pages/PHome/PHome';
import PLogin from './pages/PLogin/PLogin';
import PListagemAluno from './pages/PListagem/PListagemAluno/PListagemAluno';
import PListagemMatricula from './pages/PListagem/PListagemMatricula/PListagemMatricula';
import PListagemPlano from './pages/PListagem/PListagemPlano/PListagemPlano';
import PDetalhesAluno from './pages/PDetalhes/PDetalhesAlunos/PDetalhesAlunos';
import PDetalhesMatricula from './pages/PDetalhes/PDetalhesMatricula/PDetalhesMatricula';
import PDetalhesPlano from './pages/PDetalhes/PDetalhesPlano/PDetalhesPlano';
import PCadastroAluno from './pages/PCadastro/PCadastroAluno/PCadastroAluno';
import PCadastroPlano from './pages/PCadastro/PCadastroPlano/PCadastroPlano';
import PCadastroMatricula from './pages/PCadastro/PCadastroMatricula/PCadastroMatricula';
import { type JSX } from 'react';



function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<PHome />} />
                <Route path='/login' element={<PLogin />} />
                <Route path='/lista/alunos' element={
                    <ProtectedRoute element={PListagemAluno} />
                } />
                <Route path='/lista/matriculas' element={
                    <ProtectedRoute element={PListagemMatricula} />
                } />
                <Route path='/lista/planos' element={
                    <ProtectedRoute element={PListagemPlano} />
                } />


                <Route path='/detalhes/aluno/:id_aluno' element={
                    <ProtectedRoute element={PDetalhesAluno} />
                } />
                <Route path='/detalhes/matricula/:id_matricula' element={
                    <ProtectedRoute element={PDetalhesMatricula} />
                } />
                <Route path='/detalhes/plano/:id_plano' element={
                    <ProtectedRoute element={PDetalhesPlano} />
                } />

                <Route path='/cadastro/aluno' element={
                    <ProtectedRoute element={PCadastroAluno} />
                } />
                <Route path='/cadastro/plano' element={
                    <ProtectedRoute element={PCadastroPlano} />
                } />
                <Route path='/cadastro/matricula' element={
                    <ProtectedRoute element={PCadastroMatricula} />
                } />

            </Routes>



        </BrowserRouter>
    );
}

export default App;