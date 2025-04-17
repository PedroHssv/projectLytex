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
node -v  # Deve retornar v22.14.0 <br>
npm -v   # Deve retornar 10.9.2 <br>

## Para Linux
### Instale o FNM
curl -o- https://fnm.vercel.app/install | bash

### Instale o Node.js v22
fnm install 22

### Verifique as versões
node -v  # Deve retornar v22.14.0 <br>
npm -v   # Deve retornar 10.9.2 <br>

---

## Instalando Dependencias
### NestJS CLI
npm install -g @nestjs/cli <br>
cd project-lytax <br>
npm install <br>

### Angular CLI

npm install -g @angular/cli <br>
cd project-lytax-ui <br>
npm install <br>

---

# Configuração do MongoDB
Este projeto utiliza um cluster remoto MongoDB. <br><br>

Crie um arquivo .env na raiz project-lytax (NestJS) com o seguinte conteúdo: <br><br>

MONGO_USER <br>
MONGO_PASSWORD <br>
MONGO_CLUSTER <br>
MONGO_DB <br><br>

As variaveis serão utilizadas para o uri: `mongodb+srv://${user}:${pass}@${cluster}/${db}?retryWrites=true&w=majority`;

---

# Rodar o projeto
### Backend (NestJS)

cd project-lytax <br>
npm run start:dev <br><br>

A API estará disponível em: http://localhost:3000

### Frontend (Angular)

cd project-lytax-ui <br>
ng serve <br><br>

A aplicação estará disponível em: http://localhost:4200

---