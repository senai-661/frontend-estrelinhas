import { type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import FormAtualizarPlano from "../../../components/Atualizar/AtualizarPlano/AtualizarPlano";
import Rodape from "../../../components/Rodape/Rodape";


function PAtualizarPlano(): JSX.Element {
    return (
        <>
            <Navegacao />
            <FormAtualizarPlano />
            <Rodape />
        </>
    );
}

export default PAtualizarPlano;