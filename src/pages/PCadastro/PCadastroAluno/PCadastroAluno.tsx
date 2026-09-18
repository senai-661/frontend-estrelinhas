import { type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import Rodape from "../../../components/Rodape/Rodape";
import FormAluno from "../../../components/Formularios/FormAluno/FormAluno";

function PCadastroAluno(): JSX.Element {
    return (
        <div className="min-h-screen flex flex-col">
            <Navegacao />
            <FormAluno />
            <Rodape />
        </div>
    );
}

export default PCadastroAluno;