import { type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import Rodape from "../../../components/Rodape/Rodape";
import FormMatricula from "../../../components/Formularios/FormMatricula/FormMatricula";

function PCadastroMatricula(): JSX.Element {
    return (
        <div className="min-h-screen flex flex-col">
            <Navegacao />
            <FormMatricula />
            <Rodape />
        </div>
    );
}

export default PCadastroMatricula;