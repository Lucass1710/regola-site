# Regola — maquette du site

Maquette (prototype non officiel) du site Regola Bikes : 5 pages statiques en HTML/CSS/JS, en italien par défaut (FR et EN disponibles).

- `index.html`, `atelier.html`, `modeles.html`, `peinture.html`, `contact.html`
- `assets/` : style, scripts (`site.js`, `i18n.js` pour les traductions, `atelier.js` pour le configurateur), images et logo

En ligne : https://regola-prototipo.ls-ac3.workers.dev

Publication : chaque envoi sur la branche `main` est déployé automatiquement par Cloudflare (Workers Builds, voir `wrangler.jsonc`). Les fichiers listés dans `.assetsignore` ne sont pas publiés.

Déploiement automatique Cloudflare relié le 25/11/2026.
