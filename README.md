# TrackMetrics – Plateforme de Télémétrie Racing en Temps Réel

<p align="center">
  <img src="https://raw.githubusercontent.com/studentmovi/TrackMetrics/main/src/assets/logo_banner/bannertrackmetrics.png" 
       alt="TrackMetrics Banner" width="100%" />
</p>


<p align="center">
  <img src="https://raw.githubusercontent.com/studentmovi/TrackMetrics/main/src/assets/logo_banner/logotrack.png"
       alt="TrackMetrics Logo" width="150" />
</p>


<p align="center">
  Une plateforme moderne, rapide et personnalisable permettant aux pilotes et ingénieurs virtuels d’accéder à une télémétrie claire et lisible.<br/>
  Compatible avec <strong>F1 · ACC · Assetto Corsa · iRacing</strong> et toute source SimHub-like.
</p>

<p align="center">
  <a href="#"><img src="https://img.shields.io/badge/Framework-Next.js%2016-black"/></a>
  <a href="#"><img src="https://img.shields.io/badge/Status-Actif-success"/></a>
  <a href="#"><img src="https://img.shields.io/badge/Plateforme-Web-blue"/></a>
  <a href="#"><img src="https://img.shields.io/badge/Licence-MIT-lightgrey"/></a>
  <a href="#"><img src="https://img.shields.io/badge/Free-Available-00c853"/></a>
  <a href="#"><img src="https://img.shields.io/badge/Premium-Optional-2962ff"/></a>

</p>


---

## 📘 Qu'est-ce que TrackMetrics ?

**TrackMetrics** est une plateforme de télémétrie destinée aux simracers, streamers, équipes et ingénieurs virtuels.

Elle permet d’afficher et analyser en direct :

- Données moteur & voiture
- Pneus
- ERS & Fuel
- Damage Model
- Temps au tour, secteurs, delta
- Position
- Et plus encore…

---

## 🏎️ Fonctionnalités

### ⭐ Dashboard Pilote
- Statut complet voiture
- ERS & Fuel
- Damage Model
- Température & pression pneus
- Lap infos + delta
- UI responsive

---

### 🟦 Live Engineer Dashboard
- Accès via Join Code sécurisé
- Widgets flottants :
  - Brake / Throttle %
  - Lap Times
  - Delta
  - Position
- Idéal pour ingénieurs & coachs

---

### 👤 Profil & Paramètres
- Nom / Email
- Avatar
- Numéro de pilote
- Drapeau F1 officiel
- Unités (km/h ou mph)
- Langue
- Format d’heure
- Mot de passe (ancien + double validation)

---

## 📚 Historique des Sessions
- Design moderne
- Correction du scroll horizontal

À venir :
- Comparaison tours
- Graphiques
- Analyse IA
- Export PDF

---

# ⚙️ Technologies

| Domaine | Technologie |
|--------|-------------|
| Frontend | Next.js 16, React, TypeScript |
| Backend | Next.js Server Actions |
| Style | SCSS Modules |
| Base de données | PostgreSQL + TypeORM |
| Auth | JWT |
| Télémetrie | SimHub / TrackTitan |

---
# 🧭 Comment utiliser TrackMetrics ?

## 1️⃣ Crée ton compte
Configure ton avatar, ton numéro de pilote, ton drapeau F1 et toutes tes préférences.

## 2️⃣ Lance ton jeu + SimHub (ou toute source télémétrie compatible)
TrackMetrics recevra automatiquement les données transmises.

## 3️⃣ Ouvre ton Dashboard Pilote
Toutes les informations de télémétrie s’affichent en temps réel :
- vitesse
- delta
- pneus
- ERS / Fuel
- dégâts
- secteurs et lap times

## 4️⃣ Invite ton ingénieur
Partage ton **Join Code** à ton coach / ingénieur →  
Il pourra ouvrir le **Live Engineer Dashboard** en temps réel.

## 5️⃣ Analyse tes anciennes sessions
Via la page **Historic**, tu peux retrouver toutes tes sessions passées.

---

# 🛣️ Roadmap

- Widgets personnalisables (drag & drop)
- Analyse IA des performances
- Comparaison de tours
- Export PDF complet
- Overlay pour streamers
- Support total ACC / iRacing
- Timeline télémétrique avancée

---

# 🌟 TrackMetrics Premium

TrackMetrics proposera bientôt une **version Premium** permettant d’aller beaucoup plus loin dans l’analyse, le suivi et la visualisation de vos performances.

La version gratuite restera entièrement fonctionnelle, mais la version Premium débloquera des outils avancés destinés aux pilotes, ingénieurs, ligues et équipes exigeantes.

## 🚀 Fonctionnalités Premium prévues

### 🟦 Vue Live Engineer Complète
- Telemetry en temps réel 100% déverrouillée
- Widgets avancés (delta prédictif, micro-secteurs, throttle map…)
- Positionnement dynamique des widgets
- Vue ingénieur entièrement personnalisable

---

### 🧠 Analyse IA des Tours
- Analyse automatique de chaque tour effectué
- Détection des points faibles : freinage, accélération, trajectoire
- Suggestions d’amélioration basées sur vos données réelles
- Comparaison intelligente entre vos différents tours

---

### 🎛 Drag & Drop Ingénieur Avancé
- Réorganisation complète des widgets
- Sauvegarde de layouts personnalisés
- Profil "Engineer Workspace" pour créer plusieurs setups selon les circuits

---

### 🔔 Webhooks & Alertes Discord
Envoyez automatiquement certaines alertes vers vos serveurs Discord :

- Alerte dégâts (collision, courbe rouge…)
- Surchauffe pneus
- ERS trop bas
- Fuel critique
- Fin de session / meilleurs temps
- Notifs personnalisées via Webhook

---

# 💎 Pourquoi TrackMetrics Premium ?

Le but n’est pas de limiter la version gratuite, mais d’offrir une couche "pro" pensée pour :

- les ligues sérieuses
- les ingénieurs virtuels
- les teams e-sport
- les pilotes qui veulent une analyse avancée
- ceux qui veulent une expérience complète sans restriction

---
# 🆚 Comparatif Gratuit vs Premium

| Fonctionnalité |   Gratuit   | Premium |
|----------------|:-----------:|:-------:|
| Dashboard pilote complet |      ✅      | ✅ |
| Live Engineer (basique) | ⚠️ Partiel  | ✅ Vue complète |
| IA analyse des tours |      ❌      | ✅ |
| Comparaison de tours |      ❌      | ✅ Avancée |
| Widgets flottants |     ❌       | ✅ Illimité + Drag & Drop |
| Alertes Discord (webhooks) |      ❌      | ✅ |
| Analyse pneus / dommages avancée |      ❌      | ✅ |
| Export PDF professionnel |      ❌      | ✅ |
| Support multi-pilotes / ligues |      ❌      | ✅ |
| Accès futur aux features prioritaires |      ❌      | ⭐ Premium only |
---
# ❤️ Soutenir TrackMetrics

TrackMetrics n’acceptera **ni issues publiques, ni pull requests externes**.  
Le développement reste **interne**, mais votre soutien via la version Premium aide à financer :

- les serveurs
- le développement continu
- les nouvelles fonctionnalités
- l'amélioration des outils d’analyse

Merci à tous ceux qui utiliseront la version Premium pour soutenir le projet 🏎️💨

---

<p align="center"><strong>TrackMetrics – Maîtrise ta performance. Comprends ta télémétrie.</strong></p>

---

# 🇬🇧 ENGLISH VERSION

<p align="center">
  <img src="https://via.placeholder.com/1200x300/0c1a24/FFFFFF?text=TrackMetrics+Telemetry+Platform" alt="TrackMetrics Banner"/>
</p>

<p align="center">
  <img src="https://via.placeholder.com/150x150/0c1a24/FFFFFF?text=TM" width="120" alt="TrackMetrics Logo"/>
</p>

<h1 align="center">TrackMetrics – Real-Time Racing Telemetry Platform</h1>

<p align="center">
  A modern telemetry platform for simracers, teams, content creators, and race engineers.
</p>

---

# 📘 What is TrackMetrics?

TrackMetrics provides real-time telemetry for racing simulations, including:

- Car data
- Tyres
- ERS / Fuel
- Damage model
- Lap times, sectors, delta
- Race position

Built for clarity, performance and customization.

---

# 🏎️ Features

## ⭐ Driver Dashboard
- Car status
- ERS & Fuel
- Damage Model
- Tyre temperatures & pressures
- Lap timing & delta
- Responsive design

## 🟦 Live Engineer Dashboard
- Secure Join Code
- Floating telemetry widgets
- Perfect for coaching and team racing

## 👤 User Profile
Users can customize:
- Username, Email
- Avatar
- Driver number
- F1 flag
- Units (km/h or mph)
- Language
- Time format
- Password update with validation

## 📚 Session History
Future features:
- Lap comparisons
- Graphs
- AI analysis
- PDF export

---

# 🛣️ Roadmap (EN)

- Custom widgets
- Lap analytics with AI
- Stream overlay
- Full ACC / iRacing support
- Export tools

---

# 🤝 Contributing

# 🌟 TrackMetrics Premium

TrackMetrics will soon offer a **Premium version** that unlocks powerful tools for advanced analysis, telemetry monitoring, and engineering workflows.

The free version will remain fully functional, but Premium will provide enhanced features built for competitive drivers, engineers, leagues, and e-sport teams.

## 🚀 Planned Premium Features

### 🟦 Full Live Engineer View
- 100% unlocked real-time telemetry
- Advanced widgets (predictive delta, micro-sectors, throttle maps…)
- Dynamic widget positioning
- Fully customizable engineering workspace

---

### 🧠 AI-Powered Lap Analysis
- Automatic analysis of every completed lap
- Detection of weaknesses: braking, acceleration, racing line
- Improvement suggestions based on your real telemetry
- Smart comparisons between multiple laps

---

### 🎛 Advanced Engineer Drag & Drop
- Full widget rearrangement
- Save multiple custom layouts
- Create "Engineer Workspaces" tailored to each circuit or situation

---

### 🔔 Webhooks & Discord Alerts
Automatically send alerts to your Discord server:

- Damage alerts (contact, red curve…)
- Tyre overheating
- Low ERS
- Critical fuel
- End-of-session / personal best alerts
- Fully customizable webhook notifications

---

# 💎 Why TrackMetrics Premium?

The goal is not to restrict the free version, but to offer a **professional layer** designed for:

- Competitive leagues
- Virtual engineers
- E-sport racing teams
- Drivers seeking in-depth analytics
- Users who want the complete TrackMetrics experience

---
# 🆚 Free vs Premium Comparison

| Feature |     Free     | Premium |
|---------|:------------:|:-------:|
| Full Driver Dashboard |      ✅       | ✅ |
| Live Engineer View |  ⚠️ Limited  | ✅ Full access |
| AI Lap Analysis |      ❌       | ✅ |
| Lap Comparison |      ❌       | ✅ Advanced |
| Floating Widgets |     ❌        | ✅ Unlimited + Drag & Drop |
| Discord Webhook Alerts |      ❌       | ✅ |
| Advanced Tyre/Damage Analytics |      ❌       | ✅ |
| Professional PDF Export |      ❌       | ✅ |
| Multi-driver / League Tools |      ❌       | ✅ |
| Priority Access to Future Features |      ❌       | ⭐ Premium only |

---
# ❤️ Supporting TrackMetrics

TrackMetrics will **not accept public issues or external pull requests**.  
Development remains **internal**, but Premium support helps fund:

- Infrastructure & servers
- Continuous development
- New features
- More advanced analysis tools

Thank you to everyone choosing Premium to support the project 🏎️💨

---

<p align="center"><strong>TrackMetrics – Drive smarter. Understand faster.</strong></p>
