import { type JSX } from "react";
import LoginForm from "../../components/FormLogin/FormLogin";
import Rodape from "../../components/Rodape/Rodape";

function PLogin(): JSX.Element {
    return (
        <div className="h-full">
            <div className="pagina-grid">
                <LoginForm />
                <Rodape />
            </div>
        </div>
    );
}

export default PLogin;

