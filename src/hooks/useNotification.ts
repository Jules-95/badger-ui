import { useState } from "react";

interface INotification {
    message: string;
    type: string;
}

// Hook personnalisé pour gérer les notifications
export default function useNotification() {
    const [notification, setNotification] = useState<INotification | null>(null);

    // Affiche une notification qui disparaît après 5 secondes
    const showMessage = (message: string, type: string) => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 5000);
    };

    return { notification, showMessage };
}