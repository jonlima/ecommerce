# ecommerce

Sistema de gestão de um e-commerce

## Tecnologias Utilizadas

- **NestJS**: Framework para construir aplicações server-side.
- **TypeORM**: ORM para PostgreSQL.
- **JWT**: Para autenticação e autorização.
- **Swagger**: Para documentar os endpoints da API.
- **Docker**: Para conteinerização.
- **MailHog**: Para simular serviços de email durante o desenvolvimento.

## To Do

- [x] Autenticação
- [x] Autorização
- [ ] Gestão de Usuário (User)
- [ ] Gestão de Cliente (Client)
- [ ] Gestão de Produto (Product)
- [ ] Gestão de Pedido (Order)
- [ ] Geração de Relatório (Report)

## Funcionalidade

- **Autenticação e Autorização**
  - Login baseado em email e senha (autenticação via JWT).
  - Confirmação de email para validação de contas de usuário.
  - Controle de acesso baseado em função (RBAC) para diferentes tipos de usuários (Admin e Cliente).

## Instruções de Configuração

### 1. Clonar o repositório

```bash
git clone https://github.com/jonlima/ecommerce-api.git
cd ecommerce-api
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` com base no template `.env.example`:

```bash
cp .env.example .env
```

| Variável          | Configuração                           |
| ----------------- | -------------------------------------- |
| NODE_ENV          | Definir ambiente. [development]        |
| PORT              | Porta da API. [3000]                   |
| HOST              | Endereço da API. [http://localhost]    |
| DATABASE_HOST     | Endereço do banco de dados [localhost] |
| DATABASE_PORT     | Porta do banco de dados [5432]         |
| DATABASE_USERNAME | Nome do usuário do banco de dados      |
| DATABASE_PASSWORD | Senha do usuáŕio do banco de dados     |
| DATABASE_NAME     | Nome do banco de dados                 |
| JWT_SECRET        |                                        |
| JWT_EXPIRES_IN    |                                        |
| MAIL_HOST         |                                        |
| MAIL_PORT         |                                        |
| MAIL_PASS         |                                        |
| MAIL_FROM         |                                        |

### 4. Rodando com Docker (opcional)

Para rodar a aplicação utilizando Docker (postgres, mailhog):

```bash
docker-compose up --build -d
```

> Necessário caso não tenha banco de dados instalado e um serviço smtp

### 5. Executar as migrações e popular o banco de dados

```bash
npm run migration:run
npm run seed:run
```

> Credenciais: admin@test.com : loomi2024

### 6. Iniciar a aplicação

```bash
npm run start
```

Para iniciar em modo de desenvolvimento com recarga automática:

```bash
npm run start:dev
```

## Documentação

Executando aplicação, acesse `http://localhost:<PORT>/doc`

> Para obter documentação em json: `http://localhost:<PORT>/doc/json`

## Teste

#### Unitário

```bash
   npm run test
```

## Endpoints

- **Autenticação**:

  - POST `/auth/login`: Login do usuário.
  - POST `/user/register`: Registro de usuário (Admin/Cliente).
  - GET `/user/confirm`: Confirmação de email.

## Melhorias

- [ ] Integração S3
- [ ] Integração Pagamento
- [ ] Cache em Produto
- [ ] Cache em Produto
- [ ] Deploy automatizado (aws)

---

Sinta-se à vontade para entrar em contato em caso de dúvidas.
