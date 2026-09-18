import { type JSX } from "react";
import ListagemMatricula from "../../../components/Listagens/ListagemMatricula/ListagemMatricula";
import Rodape from "../../../components/Rodape/Rodape";
import Navegacao from "../../../components/Navegacao/Navegacao";

function PListagemMatricula(): JSX.Element {
    return (
        <>
            <Navegacao />
            <ListagemMatricula />
            <Rodape />
        </>
    );
}

export default PListagemMatricula;