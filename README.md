<div align="center">

# Pasifika Tourism Hub&nbsp;🌺  
**Version 1.0** · *13 May 2025*

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](#license)
[![React](https://img.shields.io/badge/Frontend-React-blue.svg)](https://react.dev/)
[![Expo](https://img.shields.io/badge/Mobile-Expo-lightgrey.svg)](https://expo.dev/)

**Authors:** Graham Blackledge · Akuila Tovola · Joe Walker  

</div>

---

## 📑 Table of Contents
1. [Overview](#overview)  
2. [Key Features](#key-features)  
3. [Technology Stack](#technology-stack)  
4. [Project Structure](#project-structure)  
5. [Prerequisites](#prerequisites)  
6. [Getting Started](#getting-started)  
7. [Deployment](#deployment)  
8. [License](#license)

---

## Overview
**Pasifika Tourism Hub** is a cross-platform platform that lets tourists and locals explore Pasifika culture in Aotearoa New Zealand. Browse country pages, like activities, learn key phrases, and enjoy a child-friendly **Kids Zone**.  
*(Level 6 capstone – Whitecliffe College).*

---

## Key Features

| Area | Highlights |
|------|------------|
| **Activity Explorer** | Browse ➜ Like activities by country |
| **Language & Culture** | Quick phrases, etiquette, history |
| **Kids Zone** | Interactive stories & videos |
| **User-Generated Content** | Create · Edit · Delete posts |
| **Role-Based Access** | Admin moderation  |
| **Cross-Platform** | React web **+** Expo mobile, single API |
| **Robust Validation** | `express-validator` + global JSON errors |

---

## Technology Stack

| Layer | Tech |
|-------|------|
| **Frontend-Web** | React 18 ╱ React Router ╱
| **Frontend-Mobile** | Expo SDK 50 ╱ React Native |
| **Backend** | Node 18 ╱ Express 4 ╱ Mongoose |
| **Database** | MongoDB Atlas |
| **Auth** | Firebase Auth · JWT sessions |


---

## Project Structure
```text
Pasifika_Tourism_Hub/
├─ backend/
│  ├─ controllers/ middleware/ models/ routes/
│  ├─ .env.example
│  └─ server.js
├─ frontend-web/
│  ├─ src/
│  └─ .env.example
├─ frontend-mobile/
│  └─ .env.example
├─ serviceAccountKey.example.json
└─ README.md


## 🚀 Prerequisites
- **Node.js** ≥ 18 & npm  
- **Expo CLI** – `npm i -g expo-cli` (mobile)  
- **MongoDB Atlas** cluster  
- **Firebase** project (Web SDK + Admin key)  

---

## ⚡ Getting Started

### 1 · Clone the repo
```bash
git clone https://github.com/GrahamBlackledge/Pasifika_Tourism_Hub.git
cd Pasifika_Tourism_Hub

# project-root
cp serviceAccountKey.example.json  serviceAccountKey.json   # → paste Firebase Admin key

# backend
cp backend/.env.example           backend/.env              # Mongo URI, JWT_SECRET, etc.

# web frontend
cp frontend-web/.env.example      frontend-web/.env         # REACT_APP_* vars

# mobile frontend
cp frontend-mobile/.env.example   frontend-mobile/.env      # EXPO_PUBLIC_API_URL / API_URL


# 🔹 backend API
cd backend
npm install
npm run dev              # http://localhost:5000

# 🔹 web app
cd ../frontend-web
npm install
npm start                # http://localhost:3000

# 🔹 mobile app (optional)
cd ../frontend-mobile
npm install
expo start               # Expo Go / emulator


🚢 Deployment
Target	Notes
Backend	Render or Railway – supply vars from backend/.env + serviceAccountKey.json.
Web	Firebase Hosting / Netlify – update REACT_APP_API_URL.
Mobile	Expo EAS Publish – prod URLs set in app.config.js.

📝 License
MIT © 2025 Graham Blackledge, Akuila Tovola & Joe Walker
See LICENSE for full text.