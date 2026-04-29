[![Backend CI](https://github.com/ClementVallois/ArtFolio/actions/workflows/backend-ci.yml/badge.svg?branch=main)](https://github.com/ClementVallois/ArtFolio/actions/workflows/backend-ci.yml)

## Démonstration 🎥

![Demo Artfolio](demo_artfolio-main.gif)


## Objectifs 🎯
Être artiste c’est bien souvent lutter pour être visible. En tant qu’artistes eux-mêmes, les membres de l’équipe derrière ArtFolio le savent très bien. C’est de ce constat qu’est née l’idée de créer une plateforme permettant aux artistes indépendants de s’exprimer pleinement, d’exposer leur art et de dialoguer avec leurs communautés.

ArtFolio est un réseau social destiné aux artistes de tous les horizons pour partager leur travail, leur processus créatif et leur activité artistique avec d'autres passionnés d'art. Les utilisateurs peuvent découvrir de nouveaux artistes, suivre leurs oeuvres.
Que vous soyez artiste ou amateur d’art, ArtFolio sera votre nouvelle source d’inspiration.

## Détails projet 📋

L'objectif est de développer un réseau social convivial pour les artistes et les amateurs d'art, comprenant :
- **Profils Utilisateurs** : Profils personnalisables permettant aux artistes de présenter leur portfolio, leur biographie et leurs coordonnées.
- **Partage de Contenu** : Les artistes peuvent importer des images, des vidéos et des descriptions de leurs oeuvres.
- **Engagement Communautaire** : Des fonctionnalités comme les commentaires, les likes et les partages pour favoriser l'interaction.
- **Outils de Découverte** : Options de recherche par artiste ou par catégorie.

## Specifications techniques 🛠️
Le développement implique plusieurs composants techniques :
- **Frontends** : 2 applications web : Une interface principale responsive pour la raison sociale de Artfolio et une autre interface administrateur pour modérer la communauté et le contenu de l’application. Ces deux frontends sont développés en Javascript avec l’utilisation de Vue.js
- **Backend** : Une architecture sophistiquée en Domain Driven Development pour gérer les interactions de données. Notre backend type ses données avec TypeScript et utilise NestJs.

- **Base de Données** : Une base de données relationnelle pour organiser et stocker les données des utilisateurs. Nous avons utilisé du SQL et PostgreSQL comme système de gestion de base de données.
- **Système de connexion Auth0** : Notre application intègre un système d'authentification robuste conçu pour remédier à plusieurs vulnérabilités majeures listées par l’OWASP en matière de sécurité.
- **Environnement de Production** : Déploiement sur un serveur Amazon EC2 utilisant la conteneurisation pour assurer évolutivité, sécurité et facilité de déploiement.




