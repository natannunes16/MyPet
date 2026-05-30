# MyPet — Aplicativo Mobile de Rede Social para Tutores de Pets

# MyPet — Aplicativo Mobile de Rede Social para Tutores de Pets

## 📌 Sobre o projeto

O **MyPet** é um aplicativo mobile desenvolvido para a disciplina **Desenvolver Aplicativos para Dispositivos Móveis e IoT**.

A proposta do aplicativo é ser uma **rede social pet**, voltada para tutores de animais de estimação. O app permite que os usuários interajam com conteúdos relacionados a pets, visualizem publicações, participem de discussões, acessem um marketplace, acompanhem informações de localização do animal e gerenciem o perfil do usuário.

Nesta primeira fase, o projeto apresenta uma versão inicial funcional, com foco na criação das telas principais, organização da interface, navegação entre telas e uso de dados simulados.

---

## 👤 Integrante da equipe

- **Natan Nunes da Silva**
- **Matrícula:** 2313080057

---

## 💻 Língua / linguagem em que o projeto foi feito

O projeto foi desenvolvido em **JavaScript**, utilizando **React Native** com o ambiente **Expo**.

O **React Native** foi escolhido por permitir o desenvolvimento de aplicativos mobile com uma única base de código, facilitando a criação de interfaces para dispositivos Android e iOS.

---

## 🛠️ Tecnologias utilizadas

As principais tecnologias utilizadas no projeto são:

- **JavaScript**
- **React Native**
- **Expo**
- **Node.js**
- **npm**
- **React Navigation**
- **React Navigation Bottom Tabs**
- **React Navigation Native Stack**
- **Expo Vector Icons**
- **Expo Status Bar**
- **Expo Image Picker**
- **Expo Image Manipulator**
- **Expo Linear Gradient**
- **Async Storage**
- **React Native Safe Area Context**
- **React Native Screens**
- **React Native Reanimated**

---

## 🧩 Como o projeto foi feito

O **MyPet** foi desenvolvido como uma primeira versão funcional de um aplicativo mobile em **React Native**.

Nesta fase, o foco principal foi construir a estrutura visual e funcional inicial do aplicativo, criando telas que representam as principais áreas da proposta da rede social pet.

Foram desenvolvidas telas como:

- Feed inicial;
- Discussões/comunidade;
- Marketplace;
- Localização do pet;
- Perfil do usuário;
- Cadastro e gerenciamento de pets;
- Telas de autenticação e onboarding.

A navegação entre telas foi organizada com **React Navigation**, permitindo que o usuário acesse diferentes áreas do aplicativo por meio de uma estrutura semelhante à de um app real.

Como esta é a **Fase 1** do projeto, o aplicativo utiliza **dados mockados**, ou seja, dados simulados. Esses dados servem para representar publicações, produtos, discussões, pets e outras informações enquanto ainda não há integração com backend e banco de dados.

---

## ✅ Funcionalidades implementadas

Nesta versão inicial, o projeto possui:

- Tela inicial/Home/Feed;
- Navegação entre telas;
- Tela de discussões/comunidade;
- Tela de marketplace;
- Tela de localização do pet;
- Tela de perfil do usuário;
- Telas relacionadas ao cadastro e gerenciamento de pets;
- Telas de autenticação e onboarding;
- Uso de dados simulados/mockados;
- Interface organizada e utilizável.

As funcionalidades ainda não possuem persistência real em banco de dados, pois o objetivo desta etapa é apresentar a estrutura inicial do aplicativo mobile.

---

## 📁 Estrutura do projeto

A estrutura principal do projeto está organizada da seguinte forma:

```bash
MyPet/
├── assets/
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── mocks/
│   ├── navigation/
│   ├── screens/
│   └── theme/
├── App.js
├── app.json
├── index.js
├── package.json
├── package-lock.json
└── README.md
```

### 📂 Explicação das principais pastas e arquivos

- **assets/**: armazena imagens e recursos visuais do aplicativo.
- **src/assets/**: contém recursos utilizados dentro da estrutura principal do projeto.
- **src/components/**: reúne componentes reutilizáveis da interface.
- **src/context/**: contém arquivos de contexto usados para controlar dados internos da aplicação.
- **src/mocks/**: armazena dados simulados utilizados nas telas.
- **src/navigation/**: contém a configuração da navegação do aplicativo.
- **src/screens/**: reúne as telas principais do app.
- **src/theme/**: contém definições visuais, como cores e padrões de estilo.
- **App.js**: arquivo principal da aplicação.
- **index.js**: arquivo de entrada do projeto.
- **package.json**: contém scripts, dependências e informações do projeto.

---

# 🚀 Como rodar o projeto

Esta seção explica o passo a passo para executar o aplicativo **MyPet** no computador ou no celular.

---

## ✅ Pré-requisitos

Antes de iniciar, é necessário ter instalado:

- 🟢 **Node.js**
- 📦 **npm**
- 🔧 **Git**
- 📱 **Expo Go** no celular, caso queira testar em um dispositivo físico

Também é possível rodar o aplicativo usando um emulador Android ou simulador iOS.

---

## 📥 Passo 1 — Clonar o repositório

Abra o **CMD**, **PowerShell** ou terminal e execute o comando abaixo:

```bash
git clone https://github.com/natannunes16/MyPet.git
```

Esse comando baixa o projeto do GitHub para o seu computador.

---

## 📂 Passo 2 — Entrar na pasta do projeto

Após clonar o repositório, entre na pasta do projeto:

```bash
cd MyPet
```

---

## 📦 Passo 3 — Instalar as dependências

Dentro da pasta do projeto, execute:

```bash
npm install
```

Esse comando instala todas as bibliotecas necessárias para o funcionamento do aplicativo.

---

## ▶️ Passo 4 — Iniciar o projeto

Depois de instalar as dependências, execute:

```bash
npm start
```

Ou, se preferir, utilize:

```bash
npx expo start
```

Esse comando inicia o servidor de desenvolvimento do **Expo**.

---

## 📱 Passo 5 — Abrir o aplicativo

Depois que o projeto iniciar, o Expo exibirá um **QR Code** no terminal ou no navegador.

Você pode abrir o aplicativo de algumas formas:

---

### 📲 Opção 1 — Rodar no celular com Expo Go

1. Instale o aplicativo **Expo Go** no celular.
2. Abra o **Expo Go**.
3. Escaneie o **QR Code** exibido no terminal ou navegador.
4. Aguarde o carregamento do aplicativo.
5. O app **MyPet** será aberto no celular.

---

### 🤖 Opção 2 — Rodar no emulador Android

Caso tenha um emulador Android configurado, você pode pressionar a tecla:

```bash
a
```

Ou executar diretamente:

```bash
npm run android
```

---

### 🍎 Opção 3 — Rodar no simulador iOS

Caso esteja usando macOS com simulador iOS configurado, pressione:

```bash
i
```

Ou execute:

```bash
npm run ios
```

---

### 🌐 Opção 4 — Rodar no navegador

Caso queira abrir a versão web do projeto, pressione:

```bash
w
```

Ou execute:

```bash
npm run web
```

---

## ⚡ Resumo rápido dos comandos

```bash
git clone https://github.com/natannunes16/MyPet.git
cd MyPet
npm install
npm start
```

Também é possível iniciar o projeto com:

```bash
npx expo start
```

---

## 🧪 Observação sobre a execução

Nesta fase do projeto, o aplicativo utiliza **dados mockados**, ou seja, dados simulados.

Por isso, não é necessário configurar banco de dados ou backend para rodar a aplicação. Basta instalar as dependências e iniciar o projeto com o Expo.

---

## 📋 Requisitos atendidos da Fase 1

O projeto atende aos principais requisitos solicitados para a **Fase 1** da disciplina:

- Desenvolvido em **React Native**;
- Possui tela inicial/Home;
- Possui navegação entre telas;
- Possui no mínimo 3 telas funcionais;
- Possui interface organizada e utilizável;
- Utiliza dados mockados nesta fase;
- Está preparado para evolução futura.

---

## 🚧 O que está faltando fazer

Como esta é a primeira versão do aplicativo, algumas funcionalidades ainda precisam ser implementadas nas próximas fases.

Ainda falta:

- Integração com backend;
- Banco de dados para armazenar informações reais;
- Autenticação real de usuários;
- Cadastro real de posts, pets, discussões e anúncios;
- Persistência das informações cadastradas;
- Integração real com mapas e localização;
- Sistema de notificações;
- Integração futura com dispositivo rastreador/IoT;
- Melhorias na experiência do usuário;
- Validação de formulários;
- Tratamento de erros.

---

## 🔮 Possível próxima entrega

Para a próxima entrega, o projeto pode evoluir com a implementação de um backend em **Node.js** e integração com banco de dados, como **MongoDB** ou **Firebase**.

A próxima fase também pode incluir:

- Autenticação real de usuários;
- Cadastro real de pets;
- Criação e persistência de publicações;
- Salvamento de discussões;
- Cadastro de produtos no marketplace;
- Integração com recursos de localização;
- Preparação para integração futura com dispositivos IoT.

Além disso, o aplicativo poderá ser preparado para uma futura integração com dispositivos rastreadores, permitindo o acompanhamento da localização do animal por meio de um dispositivo conectado.

---

## 📌 Status do projeto

O projeto está **em desenvolvimento** e corresponde à **Fase 1** da disciplina **Desenvolver Aplicativos para Dispositivos Móveis e IoT**.

Nesta etapa, o objetivo principal foi criar uma primeira versão funcional, com telas, navegação e estrutura inicial do aplicativo.

---

## 📝 Observações finais

Nesta fase, o uso de dados mockados é adequado, pois o foco da entrega é validar a interface, a navegação e a proposta inicial do aplicativo mobile.

As funcionalidades mais avançadas, como backend, banco de dados, autenticação e integração com IoT, ficam como possibilidades para as próximas entregas.
