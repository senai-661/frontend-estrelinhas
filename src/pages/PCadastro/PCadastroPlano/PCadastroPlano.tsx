import { type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import Rodape from "../../../components/Rodape/Rodape";
import  FormPlano from "../../../components/Formularios/FormPlano/FormPlano";

function PCadastroPlano(): JSX.Element {
    return (
        <div className="min-h-screen flex flex-col">
            <Navegacao />
            <FormPlano />
            <Rodape />
        </div>
    );
}

export default PCadastroPlano;