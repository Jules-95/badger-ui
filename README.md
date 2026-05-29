# Badger UI

Interface web de gestion de serveurs, machines virtuelles et utilisateurs, consommant une API REST avec authentification JWT.
Réalisé dans le cadre d'un TP sur REACT

---

## Stack technique

- Create React App
- TypeScript
- React Router DOM (routing + routes protégées)
- Redux Toolkit (état global : token JWT, utilisateur connecté)
- CSS vanilla (aucun framework CSS)

---

## Installation et lancement

### Prérequis

- Node.js installé
- XAMPP (utilisé pour servir le projet en local)

> L'API est distante, aucun backend local n'est nécessaire.  
> Base URL : `https://badger.arcplex.dev/api/v2`

### Lancement

```bash
# Installer les dépendances
npm install

# Lancer le projet en développement
npm start
```

---

## Fonctionnalités

- **Login** — authentification via JWT ; token stocké dans Redux et `localStorage`, rechargé automatiquement à l'ouverture si non expiré
- **Utilisateurs** — CRUD complet (liste, création, modification, suppression)
- **Serveurs** — affichage de la liste ; boutons d'action présents selon le rôle mais désactivés (TODO)
- **VMs** — CRUD complet (liste, création, modification, suppression)
- **Home** — page d'accueil simple après connexion
- **Layout** — Topbar commune à toute l'application contenant logo (/home), les liens de navigation, infos sur l'utilisateur connecté, bouton logout
- **Permissions par rôle** — hook `usePermissions` exposant `canWrite` et `canDelete` selon le rôle JWT (`ROLE_SUPER_ADMIN`, `ROLE_CLIENT_ADMIN`, `ROLE_DEVELOPER`) - `ROLE_USER` permet la lecture seule
- **Notifications** — retours visuels succès / erreur sur chaque action

---

## Architecture

```
src/
├── pages/          Pages principales (login, home, user, serveur, vm)
├── components/     Composants réutilisables (formulaires, notifications)
├── hooks/          Hooks métier (usePermissions, useNotification)
├── routes/         Gestion du routing (NeedAuth, Layout)
├── store/          Configuration Redux et slices (authSlice)
├── styles/         Fichiers CSS partagés (Form.css)
```

---

## TODO

- [ ] CRUD serveurs — boutons affichés selon le rôle mais non fonctionnels (manque de temps)
- [ ] Barre de recherche sur les pages liste
- [ ] Améliorer la page Home : récapitulatif des données et raccourcis de navigation
- [ ] Préciser les messages d'erreur renvoyés par l'API
- [ ] Améliorer le style global : Rien ne se passe pendant les chargements / Bouton login pas desactivé pendant le fetch 
- [ ] Mes composants et la plupart de mes pages sont en jsx. Il faudrait passer en tsx et définir des interfaces
- [ ] Refacto : L'URL est répétée plusieurs fois et pourrait être dans un .env / La logique FETCH est épparpillée et pourrait être dans un fichier api.ts pour centraliser...
- [ ] Suppression des commentaires qui servaient pour l'apprentissage 

---

## Notes

### Méthode de travail
- Développement commencé par la page **User**, qui sert de référence. La logique a ensuite été dupliquée et adaptée pour **VM** et **Serveur**.
- Le projet a évolué de manière itérative : affichage d'abord, puis ajout du CRUD, puis gestion des permissions
- Le style a été fait une fois la page user complète et s'est bien adapté aux autres pages

### Pourquoi certaines fonctionnalités sont incomplètes
- Beaucoup de temps passé sur la logique de **login et d'authentification JWT** : stockage dans Redux, rechargement depuis le `localStorage`, et aussi le décodage du token pour récupérer les informations utilisateur. Prise de retard à ce moment là.
- Le CRUD Serveurs n'a pas pu être finalisé faute de temps.