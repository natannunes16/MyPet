# 🐾 MyPet — Aplicativo Mobile de Rede Social para Tutores de Pets

## 📌 Sobre o projeto

O **MyPet** é um aplicativo mobile desenvolvido para tutores de animais de estimação. A proposta do app é funcionar como uma **rede social pet**, reunindo em uma única plataforma recursos de **feed**, **comunidade**, **marketplace**, **cadastro de pets**, **perfil do usuário** e **localização do animal**.

Este projeto foi desenvolvido para a disciplina **Desenvolver Aplicativos para Dispositivos Móveis e IoT**.

Na **Fase 1**, o projeto possuía foco na interface, navegação entre telas e uso de dados simulados.
Na **Fase 2**, o MyPet evoluiu para uma aplicação integrada, com **frontend em React Native**, **backend em Node.js**, **banco de dados MongoDB**, **autenticação**, **requisições HTTP** e **CRUD de uma entidade principal**.

---

## 👤 Integrante da equipe

* **Natan Nunes da Silva**
* **Matrícula:** 2313080057

---

## 🔗 Repositório

```text
https://github.com/natannunes16/MyPet.git
```

---

## 🎯 Objetivo da aplicação

O objetivo do **MyPet** é oferecer um ambiente digital para tutores de animais, permitindo que o usuário possa:

* 🐶 cadastrar e gerenciar seus pets;
* 📸 visualizar publicações no feed;
* 💬 participar de discussões com outros tutores;
* 🛒 acessar anúncios no marketplace;
* 📍 acompanhar informações de localização do animal;
* 👤 gerenciar seu perfil;
* 🔐 realizar cadastro e login;
* 🌐 consumir dados reais por meio de uma API integrada ao backend.

---

## 🚀 Evolução da Fase 1 para a Fase 2

### Fase 1

Na primeira fase, o projeto contava com:

* aplicativo mobile em **React Native com Expo**;
* telas principais do app;
* navegação entre telas;
* interface visual organizada;
* uso de dados mockados/simulados.

### Fase 2

Na segunda fase, o projeto evoluiu com:

* backend em **Node.js e Express**;
* banco de dados **MongoDB**;
* modelagem com **Mongoose**;
* autenticação com **JWT**;
* criptografia de senhas com **bcrypt**;
* comunicação HTTP com **Axios**;
* persistência real de dados;
* CRUD completo da entidade **Pet**;
* tratamento básico de erros.

---

## 🛠️ Tecnologias utilizadas

### 📱 Frontend

* React Native
* Expo
* JavaScript
* React Navigation
* Axios
* Context API
* AsyncStorage

### 🖥️ Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* CORS
* dotenv
* nodemon

### 🗄️ Banco de dados

* MongoDB
* Mongoose

---

## 🧩 Funcionalidades principais

* ✅ Cadastro de usuário;
* ✅ Login de usuário;
* ✅ Autenticação com token JWT;
* ✅ Perfil do usuário;
* ✅ Feed de publicações;
* ✅ Área de discussões;
* ✅ Marketplace;
* ✅ Cadastro de pets;
* ✅ Listagem de pets;
* ✅ Detalhamento de pet;
* ✅ Edição de pet;
* ✅ Exclusão de pet;
* ✅ Área de localização do animal;
* ✅ Comunicação entre app e backend;
* ✅ Persistência de dados no MongoDB;
* ✅ Tratamento básico de erros.

---

## 🏗️ Arquitetura do projeto

O projeto segue uma arquitetura cliente-servidor:

```text
📱 Aplicativo Mobile
React Native + Expo
        ↓
🌐 Requisições HTTP
Axios
        ↓
🖥️ Backend
Node.js + Express
        ↓
🗄️ Banco de Dados
MongoDB + Mongoose
```

O aplicativo envia requisições para a API. O backend processa as regras de negócio, realiza autenticação, valida os dados e se comunica com o banco de dados.

---

## 📁 Estrutura do projeto

```bash
MyPet/
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── mocks/
│   ├── navigation/
│   ├── screens/
│   ├── services/
│   ├── theme/
│   └── utils/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── App.js
├── app.json
├── index.js
├── package.json
└── README.md
```

### 📂 Explicação das principais pastas

* **src/assets/**: imagens e recursos visuais do aplicativo.
* **src/components/**: componentes reutilizáveis da interface.
* **src/context/**: estados globais da aplicação.
* **src/mocks/**: dados simulados usados como base na Fase 1.
* **src/navigation/**: configuração da navegação entre telas.
* **src/screens/**: telas principais do aplicativo.
* **src/services/**: configuração do Axios e chamadas para a API.
* **src/theme/**: cores e estilos globais.
* **backend/config/**: configuração do banco de dados.
* **backend/controllers/**: regras de negócio das requisições.
* **backend/middleware/**: middlewares, como autenticação por token.
* **backend/models/**: modelos do banco de dados.
* **backend/routes/**: rotas/endpoints da API.

---

# 🗄️ Banco de dados

O banco de dados utilizado é o **MongoDB**, com modelagem feita por meio do **Mongoose**.

A aplicação utiliza coleções para armazenar informações de usuários, pets, publicações, discussões, anúncios do marketplace e dados de localização.

---

## 🧱 Modelagem do banco de dados

### 👤 User

Armazena os dados dos usuários cadastrados.

| Campo       | Descrição           |
| ----------- | ------------------- |
| `name`      | Nome do usuário     |
| `email`     | E-mail do usuário   |
| `password`  | Senha criptografada |
| `avatar`    | Imagem de perfil    |
| `createdAt` | Data de criação     |

---

### 🐶 Pet

Entidade principal utilizada para demonstrar o CRUD da Fase 2.

| Campo           | Descrição                     |
| --------------- | ----------------------------- |
| `name`          | Nome do pet                   |
| `species`       | Espécie do animal             |
| `breed`         | Raça                          |
| `age`           | Idade                         |
| `gender`        | Sexo                          |
| `image`         | Imagem do pet                 |
| `ownerId`       | Usuário dono do pet           |
| `trackerStatus` | Status do rastreador          |
| `lastLocation`  | Última localização registrada |
| `health`        | Informações de saúde          |
| `notes`         | Observações                   |
| `createdAt`     | Data de criação               |

---

### 📸 Post

Armazena publicações exibidas no feed.

| Campo       | Descrição            |
| ----------- | -------------------- |
| `authorId`  | Autor da publicação  |
| `petId`     | Pet relacionado      |
| `image`     | Imagem da publicação |
| `caption`   | Legenda              |
| `likes`     | Curtidas             |
| `comments`  | Comentários          |
| `createdAt` | Data de criação      |

---

### 💬 Discussion

Armazena tópicos criados na comunidade.

| Campo       | Descrição           |
| ----------- | ------------------- |
| `title`     | Título da discussão |
| `content`   | Conteúdo            |
| `category`  | Categoria           |
| `authorId`  | Autor               |
| `likes`     | Curtidas            |
| `comments`  | Comentários         |
| `createdAt` | Data de criação     |

---

### 🛒 MarketplaceItem

Armazena anúncios do marketplace.

| Campo         | Descrição          |
| ------------- | ------------------ |
| `name`        | Nome do item       |
| `description` | Descrição          |
| `type`        | Tipo de anúncio    |
| `price`       | Preço              |
| `isDonation`  | Indica se é doação |
| `location`    | Localização        |
| `image`       | Imagem             |
| `ownerId`     | Dono do anúncio    |
| `createdAt`   | Data de criação    |

---

### 📍 Location

Armazena informações de localização do animal.

| Campo        | Descrição                    |
| ------------ | ---------------------------- |
| `petId`      | Pet relacionado              |
| `ownerId`    | Dono do pet                  |
| `latitude`   | Latitude                     |
| `longitude`  | Longitude                    |
| `address`    | Endereço aproximado          |
| `status`     | Status da localização        |
| `isLost`     | Indica se o pet está perdido |
| `lastSeenAt` | Última vez que foi visto     |
| `updatedAt`  | Última atualização           |

---

# 🌐 Endpoints da API

## 🔐 Autenticação

| Método | Endpoint             | Descrição                    |
| ------ | -------------------- | ---------------------------- |
| `POST` | `/api/auth/register` | Cadastra um novo usuário     |
| `POST` | `/api/auth/login`    | Realiza login                |
| `GET`  | `/api/auth/profile`  | Retorna o perfil autenticado |
| `PUT`  | `/api/auth/profile`  | Atualiza dados do perfil     |

---

## 🐶 Pets

| Método   | Endpoint            | Descrição                  |
| -------- | ------------------- | -------------------------- |
| `GET`    | `/api/pets`         | Lista todos os pets        |
| `POST`   | `/api/pets`         | Cadastra um novo pet       |
| `GET`    | `/api/pets/my-pets` | Lista os pets do usuário   |
| `GET`    | `/api/pets/:id`     | Retorna detalhes de um pet |
| `PUT`    | `/api/pets/:id`     | Atualiza dados de um pet   |
| `DELETE` | `/api/pets/:id`     | Remove um pet              |

---

## 📸 Posts

| Método   | Endpoint         | Descrição             |
| -------- | ---------------- | --------------------- |
| `GET`    | `/api/posts`     | Lista publicações     |
| `POST`   | `/api/posts`     | Cria uma publicação   |
| `DELETE` | `/api/posts/:id` | Remove uma publicação |

---

## 💬 Discussões

| Método   | Endpoint               | Descrição             |
| -------- | ---------------------- | --------------------- |
| `GET`    | `/api/discussions`     | Lista discussões      |
| `POST`   | `/api/discussions`     | Cria uma discussão    |
| `GET`    | `/api/discussions/:id` | Detalha uma discussão |
| `DELETE` | `/api/discussions/:id` | Remove uma discussão  |

---

## 🛒 Marketplace

| Método | Endpoint               | Descrição          |
| ------ | ---------------------- | ------------------ |
| `GET`  | `/api/marketplace`     | Lista anúncios     |
| `POST` | `/api/marketplace`     | Cria um anúncio    |
| `GET`  | `/api/marketplace/:id` | Detalha um anúncio |

---

## 📍 Localização

| Método   | Endpoint             | Descrição                |
| -------- | -------------------- | ------------------------ |
| `GET`    | `/api/locations`     | Lista localizações       |
| `POST`   | `/api/locations`     | Cria uma localização     |
| `GET`    | `/api/locations/:id` | Detalha uma localização  |
| `PUT`    | `/api/locations/:id` | Atualiza uma localização |
| `DELETE` | `/api/locations/:id` | Remove uma localização   |

---

# 🔄 CRUD principal da Fase 2

A entidade principal escolhida para demonstrar o CRUD foi **Pet**.

| Operação | Endpoint                | Função                        |
| -------- | ----------------------- | ----------------------------- |
| Create   | `POST /api/pets`        | Cadastrar um novo pet         |
| Read     | `GET /api/pets/my-pets` | Listar os pets do usuário     |
| Read     | `GET /api/pets/:id`     | Visualizar detalhes de um pet |
| Update   | `PUT /api/pets/:id`     | Editar informações de um pet  |
| Delete   | `DELETE /api/pets/:id`  | Excluir um pet                |

Com isso, o projeto atende ao requisito de possuir **persistência de dados** e **CRUD completo de pelo menos uma entidade principal**.

---

# 🔗 Comunicação entre app e backend

A comunicação entre o aplicativo mobile e o backend é feita por meio de **requisições HTTP**, utilizando a biblioteca **Axios**.

O fluxo básico é:

```text
Usuário realiza uma ação no app
        ↓
O app envia uma requisição HTTP
        ↓
O backend processa a requisição
        ↓
O backend consulta ou altera dados no MongoDB
        ↓
A API retorna uma resposta
        ↓
O app atualiza a tela do usuário
```

Em rotas protegidas, o token JWT é enviado no cabeçalho da requisição:

```text
Authorization: Bearer token_do_usuario
```

---

# 🔐 Autenticação

A autenticação do MyPet utiliza **JWT**.

O funcionamento é simples:

1. O usuário realiza login com e-mail e senha.
2. O backend valida as credenciais.
3. A API retorna um token JWT.
4. O aplicativo armazena o token.
5. Nas próximas requisições protegidas, o token é enviado no cabeçalho.
6. O backend valida o token antes de liberar o acesso.

As senhas são criptografadas com **bcrypt** antes de serem salvas no banco de dados.

---

# ⚙️ Como rodar o projeto

Para executar o projeto corretamente, é necessário rodar o **backend** e o **frontend** ao mesmo tempo.

Por isso, utilize **dois terminais**:

* 🖥️ **Terminal 1:** Backend/API
* 📱 **Terminal 2:** Frontend/App Mobile

Antes de iniciar, certifique-se de que o **MongoDB** está instalado e rodando na sua máquina.

---

## ✅ Pré-requisitos

* Node.js
* npm
* MongoDB
* Expo Go, caso queira testar no celular
* Android Studio, caso queira testar no emulador Android

---

# 🖥️ Rodando o Backend — API

## 1. Acessar a pasta do backend

No primeiro terminal, entre na pasta do backend:

```bash
cd backend
```

---

## 2. Configurar o arquivo `.env`

Dentro da pasta `backend`, crie ou confira o arquivo `.env` com as variáveis de ambiente:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/mypet
JWT_SECRET=sua_chave_secreta
```

---

## 3. Instalar as dependências do backend

Ainda dentro da pasta `backend`, execute:

```bash
npm install
```

---

## 4. Iniciar o servidor

Após instalar as dependências, execute:

```bash
npm run dev
```

Se tudo estiver correto, o servidor será iniciado na porta `3000` e a conexão com o MongoDB será realizada.

A API ficará disponível em:

```text
http://localhost:3000
```

E os endpoints estarão disponíveis a partir de:

```text
http://localhost:3000/api
```

---

# 📱 Rodando o Frontend — Aplicativo Mobile

## 1. Abrir um segundo terminal

Abra um **segundo terminal** na pasta principal do projeto, ou seja, na raiz do `MyPet`.

Atenção: o frontend deve ser iniciado **fora da pasta `backend`**.

---

## 2. Instalar as dependências do app

Na raiz do projeto, execute:

```bash
npm install
```

---

## 3. Conferir a URL da API

Antes de iniciar o app, confira se a URL da API está configurada corretamente no arquivo de serviços, geralmente localizado em:

```text
src/services/api.js
```

A URL muda dependendo de onde o app será executado.

### 🤖 Emulador Android

Use:

```text
http://10.0.2.2:3000/api
```

### 📱 Celular físico com Expo Go

Use o IP local do computador na rede Wi-Fi.

Exemplo:

```text
http://192.168.0.100:3000/api
```

Nesse caso, o celular e o computador precisam estar conectados na **mesma rede Wi-Fi**.

### 💻 Navegador ou ambiente local

Use:

```text
http://localhost:3000/api
```

---

## 4. Iniciar o Expo

Na raiz do projeto, execute:

```bash
npx expo start
```

Após isso, o Expo exibirá um QR Code e algumas opções de execução.

---

# 📲 Como abrir o aplicativo

## Celular físico com Expo Go

1. Instale o aplicativo **Expo Go** no celular.
2. Conecte o celular na mesma rede Wi-Fi do computador.
3. Abra o Expo Go.
4. Escaneie o QR Code exibido no terminal.
5. Aguarde o carregamento do app.

## Emulador Android

1. Abra o emulador pelo Android Studio.
2. Volte para o terminal onde o Expo está rodando.
3. Pressione a tecla:

```bash
a
```

O aplicativo será aberto no emulador Android.

---

# ⚡ Resumo rápido dos comandos

## Terminal 1 — Backend

```bash
cd backend
npm install
npm run dev
```

## Terminal 2 — Frontend

```bash
npm install
npx expo start
```

---

# 🧪 Testando a integração

Para verificar se a integração está funcionando:

1. Confirme que o MongoDB está rodando.
2. Inicie o backend com `npm run dev`.
3. Inicie o frontend com `npx expo start`.
4. Cadastre um novo usuário.
5. Faça login.
6. Cadastre um pet.
7. Liste os pets cadastrados.
8. Edite ou exclua um pet.
9. Reinicie o app e veja se os dados continuam salvos.

Se os dados permanecerem após reiniciar o aplicativo, significa que a integração com o backend e a persistência no banco de dados estão funcionando corretamente.

---

# 🛡️ Tratamento básico de erros

O projeto possui tratamento básico de erros no frontend e no backend.

No backend, as respostas seguem status HTTP apropriados:

| Status | Significado                                     |
| ------ | ----------------------------------------------- |
| `400`  | Dados inválidos ou campos obrigatórios ausentes |
| `401`  | Usuário não autenticado                         |
| `404`  | Registro não encontrado                         |
| `500`  | Erro interno do servidor                        |

No frontend, o aplicativo trata situações como erro de login, falha de conexão com a API, campos obrigatórios vazios e erro ao buscar ou salvar dados.

---

# 🧠 Decisões técnicas adotadas

* **React Native com Expo:** escolhido para facilitar o desenvolvimento mobile e os testes.
* **Node.js com Express:** utilizado para criar uma API REST simples e organizada.
* **MongoDB com Mongoose:** escolhido pela flexibilidade na modelagem dos dados.
* **JWT:** utilizado para autenticação e proteção de rotas.
* **bcrypt:** utilizado para criptografar senhas.
* **Axios:** usado para realizar as requisições HTTP entre o app e a API.
* **AsyncStorage:** usado para armazenar dados locais, como o token de autenticação.

---

# 📋 Requisitos atendidos da Fase 2

| Requisito solicitado                      | Status     |
| ----------------------------------------- | ---------- |
| Aplicativo mobile em React Native         | ✅ Atendido |
| Backend desenvolvido em Node.js           | ✅ Atendido |
| Banco de dados MongoDB                    | ✅ Atendido |
| Integração entre app, backend e banco     | ✅ Atendido |
| Comunicação com API por requisições HTTP  | ✅ Atendido |
| Persistência de dados                     | ✅ Atendido |
| CRUD de pelo menos uma entidade principal | ✅ Atendido |
| Tratamento básico de erros                | ✅ Atendido |
| README estruturado                        | ✅ Atendido |
| Projeto evoluindo a partir da Fase 1      | ✅ Atendido |

---

# 🎤 Roteiro sugerido para apresentação

Durante a apresentação da Fase 2, o projeto pode ser demonstrado nesta ordem:

1. Apresentar o objetivo do **MyPet**.
2. Explicar a evolução da Fase 1 para a Fase 2.
3. Mostrar cadastro e login do usuário.
4. Demonstrar o CRUD de pets.
5. Explicar a integração com backend.
6. Mostrar que os dados são persistidos no MongoDB.
7. Comentar as principais tecnologias utilizadas.
8. Finalizar com os próximos passos do projeto.

---

# 🚧 Status do projeto

O projeto encontra-se funcional para a proposta da **Fase 2**, contendo aplicativo mobile, backend, banco de dados, autenticação, comunicação via API e CRUD completo da entidade **Pet**.

Algumas funcionalidades podem continuar evoluindo em versões futuras, como upload real de imagens, notificações, mapas dinâmicos e integração com dispositivos IoT.

---

# 🔮 Próximos passos

Como melhorias futuras, o projeto pode evoluir com:

* ☁️ deploy do backend;
* 🗄️ migração do banco para MongoDB Atlas;
* 🖼️ upload real de imagens;
* 🗺️ integração com mapas dinâmicos;
* 🔔 sistema de notificações;
* 📍 rastreamento em tempo real;
* 🐾 integração futura com coleira rastreadora/IoT.

---

# 📝 Considerações finais

O **MyPet** evoluiu de uma primeira versão com telas e dados simulados para uma aplicação mobile integrada a backend e banco de dados.

A **Fase 2** consolida o projeto como uma aplicação full stack mobile, demonstrando autenticação, persistência de dados, comunicação HTTP e CRUD completo da entidade **Pet**.

Dessa forma, o projeto atende aos principais requisitos solicitados, apresentando uma base funcional, organizada e preparada para futuras melhorias.
