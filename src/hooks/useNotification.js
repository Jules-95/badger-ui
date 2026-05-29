import { useState } from "react";

// Hook personnalisé pour gérer les notifications
export default function useNotification() {
    const [notification, setNotification] = useState(null);

    // Affiche une notification qui disparaît après 5 secondes
    const showMessage = (message, type) => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 5000);
    };

    return { notification, showMessage };
}