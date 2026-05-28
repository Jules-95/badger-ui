// Composant de notification 
// Props : 
// message => Le texte a afficher 
// type : success ou error

export default function Notification({ message, type }) {

    // Si pas de message, pas d'affichage 
    if (!message) return null;

    return (
        <div className={`notification notification-${type}`}>
            {message}
        </div>
    );
}

