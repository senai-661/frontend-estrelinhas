import { type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import FormAtualizarAluno from "../../../components/Atualizar/AtualizarAluno/AtualizarAluno";
import Rodape from "../../../components/Rodape/Rodape";


function PAtualizarAluno(): JSX.Element {
    return (
        <>
            <Navegacao />
            <FormAtualizarAluno />
            <Rodape />
        </>
    );
}

export default PAtualizarAluno;