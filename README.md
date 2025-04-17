# Project Lytax

Projeto de aplicação fullstack utilizando:

-  **MongoDB** (Cluster Remoto)
-  **NestJS** (Backend)
-  **Angular** (Frontend)

---

## Requisitos

- Node.js `v22.14.0`
- npm `v10.9.2`
- NestJS CLI `v11`
- Angular CLI `v15` ou superior
- Git
---

# Instalação do Node.js com FNM

## Para Windows

### Instale o FNM
winget install Schniz.fnm

### Instale o NodeJS 22
fnm install 22

### Verifique as versões
node -v  # Deve retornar v22.14.0
npm -v   # Deve retornar 10.9.2

## Para Linux
### Instale o FNM
curl -o- https://fnm.vercel.app/install | bash

### Instale o Node.js v22
fnm install 22

### Verifique as versões
node -v  # Deve retornar v22.14.0
npm -v   # Deve retornar 10.9.2

---

## Instalando Dependencias
### NestJS CLI
npm install -g @nestjs/cli

### Angular CLI
npm install -g @angular/cli

---

# Configuração do MongoDB
Este projeto utiliza um cluster remoto MongoDB.

Crie um arquivo .env na raiz project-lytax (NestJS) com o seguinte conteúdo:

MONGO_USER
MONGO_PASSWORD
MONGO_CLUSTER
MONGO_DB

As variaveis serão utilizadas para o uri: `mongodb+srv://${user}:${pass}@${cluster}/${db}?retryWrites=true&w=majority`;

---

# Rodar o projeto
### Backend (NestJS)

cd project-lytax
npm run start:dev

A API estará disponível em: http://localhost:3000

### Frontend (Angular)

cd project-lytax-ui
ng serve

A aplicação estará disponível em: http://localhost:4200

---