import { type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import ListagemAlunos from "../../../components/Listagens/ListagemAluno/ListagemAluno";
import Rodape from "../../../components/Rodape/Rodape";


function PListagemAluno(): JSX.Element {
    return (
        <>
            <Navegacao />
            <ListagemAlunos />
            <Rodape />
        </>
    );
}

export default PListagemAluno;