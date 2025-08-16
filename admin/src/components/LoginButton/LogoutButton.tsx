type PropTypes = {
    name: string;
    onClick?: () => void;
}

export const LogoutButton = ({name, onClick}: PropTypes) => {


    return (
        <a className="logout" onClick={onClick}>{name}</a>
    )
}