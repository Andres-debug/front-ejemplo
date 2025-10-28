// Encabezado simple. Recibe un "title" por props para mostrar en la cabecera.
export const Header = ({ title }) => {
    return (
        // Corrección de clase (faltaba el cierre del ] y la comilla)
        <header className="bg-[#1c2541] py-6 shadow-md">
            <h1>
                {title}
            </h1>
        </header>
    )
}

export default Header