import { type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import FormAtualizarMatricula from "../../../components/Atualizar/AtualizarMatricula/AtualizarMatricula";
import Rodape from "../../../components/Rodape/Rodape";


function PAtualizarMatricula(): JSX.Element {
    return (
        <>
            <Navegacao />
            <FormAtualizarMatricula />
            <Rodape />
        </>
    );
}

export default PAtualizarMatricula;