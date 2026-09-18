import { type JSX } from "react";
import DetalhesMatricula from "../../../components/Listagens/DetalhesMatricula/DetalhesMatricula";
import Rodape from "../../../components/Rodape/Rodape";
import { useParams } from "react-router-dom";
import Navegacao from "../../../components/Navegacao/Navegacao";    

function PDetalhesMatricula(): JSX.Element {
    const { id_matricula } = useParams();

    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Navegacao />
            <DetalhesMatricula idMatricula={parseInt(id_matricula as string)} />
            <Rodape />
        </div>
    );
}

export default PDetalhesMatricula;