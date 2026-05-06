# API REST — Node.js + TypeScript + SQLite

API para gerenciamento de e-commerce com suporte a usuários, produtos, carrinho, compras, quizzes e suporte ao cliente.

---

## Tecnologias

- **Node.js** + **TypeScript**
- **Express**
- **better-sqlite3** (banco SQLite local)

---

## Instalação

```bash
npm install
```

## Executar em desenvolvimento

```bash
npm run dev
```

## Build e produção

```bash
npm run build
npm start
```

O banco de dados `banco.db` é criado automaticamente na raiz do projeto na primeira execução.

---

## Variáveis de ambiente

| Variável | Padrão | Descrição            |
|----------|--------|----------------------|
| `PORT`   | `3000` | Porta do servidor    |

---

## Endpoints

### Usuários `/usuarios`

| Método   | Rota              | Descrição               |
|----------|-------------------|-------------------------|
| `GET`    | `/usuarios`       | Lista todos os usuários |
| `GET`    | `/usuarios/:id`   | Busca usuário por ID    |
| `POST`   | `/usuarios`       | Cria novo usuário       |
| `PUT`    | `/usuarios/:id`   | Atualiza usuário        |
| `DELETE` | `/usuarios/:id`   | Remove usuário          |

**Body (POST/PUT):**
```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "telefone": "11999999999",
  "cpf": "123.456.789-00"
}
```

---

### Produtos `/produtos`

| Método    | Rota                          | Descrição                        |
|-----------|-------------------------------|----------------------------------|
| `GET`     | `/produtos`                   | Lista todos (`?nome=` opcional)  |
| `GET`     | `/produtos/:id`               | Busca por ID                     |
| `POST`    | `/produtos`                   | Cria produto                     |
| `PUT`     | `/produtos/:id`               | Atualiza produto                 |
| `PATCH`   | `/produtos/:id/estoque`       | Atualiza somente o estoque       |
| `DELETE`  | `/produtos/:id`               | Remove produto                   |
| `GET`     | `/produtos/:produto_id/rotulo`| Retorna rótulo do produto        |
| `GET`     | `/produtos/:produto_id/bula`  | Retorna bula do produto          |

**Body (POST/PUT):**
```json
{
  "nome": "Vitamina C",
  "preco": 29.90,
  "estoque": 100,
  "especificacoes": "500mg",
  "composicao": "Ácido ascórbico",
  "descricao": "Suplemento vitamínico"
}
```

**Body (PATCH estoque):**
```json
{ "estoque": 50 }
```

---

### Carrinho `/carrinhos`

| Método   | Rota                                     | Descrição                              |
|----------|------------------------------------------|----------------------------------------|
| `GET`    | `/carrinhos/:usuario_id`                 | Retorna carrinho do usuário            |
| `POST`   | `/carrinhos/:usuario_id/itens`           | Adiciona item (cria carrinho se vazio) |
| `DELETE` | `/carrinhos/:usuario_id/itens/:item_id`  | Remove item específico                 |
| `DELETE` | `/carrinhos/:usuario_id`                 | Limpa todos os itens do carrinho       |

**Body (POST itens):**
```json
{
  "produto_id": 1,
  "quantidade": 2
}
```

---

### Compras `/compras`

| Método | Rota                            | Descrição                 |
|--------|---------------------------------|---------------------------|
| `GET`  | `/compras`                      | Lista todas as compras    |
| `GET`  | `/compras/usuario/:usuario_id`  | Compras de um usuário     |
| `POST` | `/compras`                      | Realiza nova compra       |

> A compra valida estoque automaticamente e desconta as quantidades ao confirmar.

**Body (POST):**
```json
{
  "usuario_id": 1,
  "forma_pagamento": "cartao_credito",
  "endereco": "Rua Exemplo, 123 - São Paulo/SP",
  "itens": [
    { "produto_id": 1, "quantidade": 2 },
    { "produto_id": 3, "quantidade": 1 }
  ]
}
```

---

### Quizzes `/quizzes`

| Método   | Rota            | Descrição          |
|----------|-----------------|--------------------|
| `GET`    | `/quizzes`      | Lista todos        |
| `GET`    | `/quizzes/:id`  | Busca por ID       |
| `POST`   | `/quizzes`      | Cria quiz          |
| `PUT`    | `/quizzes/:id`  | Atualiza quiz      |
| `DELETE` | `/quizzes/:id`  | Remove quiz        |

**Body (POST/PUT):**
```json
{
  "pergunta": "Qual vitamina é produzida pelo sol?",
  "resposta": "Vitamina D"
}
```

---

### Suporte `/suporte`

#### Mensagens

| Método | Rota                    | Descrição                  |
|--------|-------------------------|----------------------------|
| `GET`  | `/suporte/mensagens`    | Lista mensagens (desc)     |
| `POST` | `/suporte/mensagens`    | Envia mensagem de suporte  |

**Body (POST):**
```json
{
  "usuario_id": 1,
  "mensagem": "Não recebi meu pedido."
}
```

> `usuario_id` é opcional para mensagens anônimas.

#### FAQ

| Método   | Rota                  | Descrição        |
|----------|-----------------------|------------------|
| `GET`    | `/suporte/faq`        | Lista FAQs       |
| `POST`   | `/suporte/faq`        | Cria FAQ         |
| `PUT`    | `/suporte/faq/:id`    | Atualiza FAQ     |
| `DELETE` | `/suporte/faq/:id`    | Remove FAQ       |

**Body (POST/PUT):**
```json
{
  "pergunta": "Como rastrear meu pedido?",
  "resposta": "Acesse 'Meus Pedidos' e clique em rastrear."
}
```

---

## Estrutura do projeto

```
src/
├── controllers/
│   ├── CarrinhoController.ts
│   ├── CompraController.ts
│   ├── ProdutoController.ts
│   ├── QuizController.ts
│   ├── RotuloController.ts
│   ├── SuporteController.ts
│   └── UsuarioController.ts
├── database/
│   ├── database.ts
│   └── schema.sql
├── models/
│   ├── Carrinho.ts
│   ├── Compra.ts
│   ├── Produto.ts
│   ├── Quiz.ts
│   ├── Rotulo.ts
│   ├── Suporte.ts
│   └── Usuario.ts
├── repositories/
│   ├── CarrinhoRepository.ts
│   ├── CompraRepository.ts
│   ├── ProdutoRepository.ts
│   ├── QuizRepository.ts
│   ├── RotuloRepository.ts
│   ├── SuporteRepository.ts
│   └── UsuarioRepository.ts
└── server.ts
```

---

## Códigos de resposta

| Código | Significado                        |
|--------|------------------------------------|
| `200`  | OK                                 |
| `201`  | Criado com sucesso                 |
| `400`  | Dados inválidos / estoque insuf.   |
| `404`  | Recurso não encontrado             |
| `409`  | Conflito (email/CPF duplicado)     |
| `500`  | Erro interno do servidor           |