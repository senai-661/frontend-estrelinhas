import type { JSX } from "react";
import Navegacao from "../../components/Navegacao/Navegacao";
import BoasVindas from "../../components/BoasVindas/BoasVindas";
import Rodape from "../../components/Rodape/Rodape";

 
function PHome(): JSX.Element {
    return (
        <>
            <Navegacao />
            <BoasVindas />
            <Rodape />
        </>
    );
}

export default PHome;