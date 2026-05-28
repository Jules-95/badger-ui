import { useSelector } from "react-redux";

export default function usePermissions() {
    const currentUser = useSelector((state) => state.auth.user);

    const role = currentUser?.roles?.[0];


    return {
        // Créer et modifier : Super admin, dev, client admin
        canWrite: ["ROLE_SUPER_ADMIN", "ROLE_DEVELOPER", "ROLE_CLIENT_ADMIN"].includes(role),
        
        //Supprimer : Super admin, client admin
        canDelete: ["ROLE_SUPER_ADMIN", "ROLE_CLIENT_ADMIN"].includes(role),
    };
}