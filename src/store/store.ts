import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"


export const store = configureStore({
    reducer: {
        auth: authReducer
    }
});


// RootState représnte le type complet du store -> Pour pouvoir utiliser dans les slices
// Appdispatch représente le type de dispatcher du store -> pour typer le dispatch dans les fonctions async
// nb : Le redux store c'est là où vont etre les données, pour modifier ces données je dois envoyer une action au store -> dispatch c'est la fonction qui envoie ce message/action au store -> dispatch doit etre du type AppDispatch !
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
