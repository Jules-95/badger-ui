import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Etat initial avec token qui est récupérér depuis le local storage 

const decodeToken = (token: string) => {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    return decoded.user; 
}

// Si il n'existe pas alors string vide
const initialState: { token: string; user: any} = {
    token: localStorage.getItem("token") || "",
    user: localStorage.getItem("token") ? decodeToken(localStorage.getItem("token")!) : null
};

// C'est donc le slice qui va généré le token JWT
export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        //setToken permet de stocker le token dans le store et dans localstorage
        //nb : PayloadAction est un type TypeScript fourni par Redux qui vient décrire une action Redux.
        // Une action c'est un objet avec : le nom de l'action(type) / payload: la donnée qu'on envoie avec l'action
        // Ici le payload de cette action sera un string donc action.payload sera forcément un string (le token jwt)
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            localStorage.setItem("token", action.payload);
            state.user = decodeToken(action.payload);
        },

        // removeToken permet de supprimer le token du store et du local storage 
        removeToken: (state) => {
            state.token = "";
            state.user = null;
            localStorage.removeItem("token");
        }
    },
});

export const { setToken, removeToken } = authSlice.actions;
export default authSlice.reducer;