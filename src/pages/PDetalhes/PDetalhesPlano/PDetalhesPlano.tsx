import { type JSX } from "react";
import DetalhesPlano from "../../../components/Listagens/DetalhesPlanos/DetalhesPlanos";
import Rodape from "../../../components/Rodape/Rodape";
import { useParams } from "react-router-dom";
import Navegacao from "../../../components/Navegacao/Navegacao";

function PDetalhesPlano(): JSX.Element {
    const { id_plano } = useParams();

    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Navegacao />
            <DetalhesPlano cod_plano={id_plano as string} />
            <Rodape />
        </div>
    );
}

export default PDetalhesPlano;