import type { JSX } from "react";

function Rodape(): JSX.Element {
    return (
        <footer style={{ backgroundColor: "#ff7300", height: "8vh", display: "flex", alignItems: "center", justifyContent: "space-around" }}>
            <p style={{ color: "#ffffff", fontSize: "1.25rem" }}>Copyright - Todos os direitos e esquerdos reservados</p>
            <p style={{ color: "#ffffff", fontSize: "1.25rem" }}>Laís Zanqueta</p>
        </footer>
    );
}

export default Rodape;