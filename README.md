# Back-end - Serviço de Leitura de Imagens

Um back-end desenvolvido com **Node.js** para processar imagens e integrá-las com a API do Google Gemini. O projeto conta com **três endpoints principais** para upload, processamento e consulta de imagens.

---

## Índice

1. [Descrição](#descrição)  
2. [Pré-requisitos](#pré-requisitos)  
3. [Instalação](#instalação)  
4. [Uso](#uso)  
5. [Endpoints](#endpoints)  
6. [Integração com Google Gemini](#integração-com-google-gemini)  
7. [Contato](#contato)

---

## Descrição

O **Back-end - Serviço de Leitura de Imagens** permite realizar upload de imagens, processá-las com a API do Google Gemini e recuperar informações extraídas. Ele utiliza **Node.js** para um desenvolvimento modular e escalável.

---

## Pré-requisitos

- Node.js instalado.  
- Criar um **Token de Acesso** para a API do Google Gemini.  
  1. Acesse: [Google API Console](https://console.cloud.google.com/)
  2. Gere uma chave de API com permissão para utilizar o serviço Gemini.
  3. Crie um arquivo `.env` e adicione a variável:
     ```env
     GOOGLE_GEMINI_API_KEY=sua_chave_aqui
     ```

---

## Instalação

1. Clone o repositório:
   ```sh
   git clone https://github.com/seu-usuario/backend-imagens.git
   cd backend-imagens
   ```

2. Instale as dependências:
   ```sh
   npm install
   ```

---

## Uso

1. Inicie o servidor de desenvolvimento:
   ```sh
   npm run start
   ```
2. O servidor será executado na porta definida no `.env`, por padrão `http://localhost:3000`.

---

## Endpoints

### 🔹 Upload de Imagem  
**Rota:** `POST /api/upload`  
**Descrição:** Envia uma imagem para processamento.  

**Parâmetros:**  
- `file` (form-data): Imagem a ser processada.  

**Exemplo de Resposta:**  
```json
{
  "imageId": "abc123",
  "status": "uploaded"
}
```

---

### 🔹 Processamento de Imagem  
**Rota:** `POST /api/process`  
**Descrição:** Envia a imagem para o Google Gemini e retorna o resultado.  

**Parâmetros:**  
- `imageId` (string): ID da imagem previamente enviada.  

**Exemplo de Resposta:**  
```json
{
  "imageId": "abc123",
  "result": "Texto extraído da imagem"
}
```

---

### 🔹 Consulta de Resultado  
**Rota:** `GET /api/result/{imageId}`  
**Descrição:** Retorna os resultados do processamento de uma imagem.  

**Parâmetros:**  
- `imageId` (string): ID da imagem.  

**Exemplo de Resposta:**  
```json
{
  "imageId": "abc123",
  "result": "Texto extraído da imagem"
}
```

---

## Integração com Google Gemini

Este back-end utiliza a API do Google Gemini para processamento de imagens. A API é acessada via requisições HTTP autenticadas.

Exemplo de requisição para a API:
```javascript
const response = await fetch("https://api.google.com/gemini/process", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${process.env.GOOGLE_GEMINI_API_KEY}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ image: "data:image/jpeg;base64,..." })
});
```

---

## Contato

Se você tiver dúvidas ou sugestões, entre em contato:

Autor: Ederson Vinicius

LinkedIn: https://www.linkedin.com/in/ederson-vinicius-ferreira-rosa-b97550239

Email: evfr.trabalho@gmail.com 
