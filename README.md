# ecommerce

Sistema de gestão de um e-commerce

## Configuração

Faça uma copia de `env.example` e renomei para `.env`

| Variável          | Configuração                           |
| ----------------- | -------------------------------------- |
| NODE_ENV          | Definir ambiente. [development]        |
| PORT              | Porta da API. [3000]                   |
| DATABASE_HOST     | Endereço do banco de dados [localhost] |
| DATABASE_PORT     | Porta do banco de dados [5432]         |
| DATABASE_USERNAME | Nome do usuário do banco de dados      |
| DATABASE_PASSWORD | Senha do usuáŕio do banco de dados     |
| DATABASE_NAME     | Nome do banco de dados                 |

## Executar

1. Clone:
   ```bash
   git clone https://github.com/jonlima/url-shortener.git
   ```
2. Instalar dependência:
   ```bash
   npm install
   ```
3. Executar Banco de Dados (postgre):
   ```bash
   docker-compose up -d
   ```
4. Executar aplicação:
   ```bash
   npm start
   ```

## Documentação

Executando aplicação, acesse `http://localhost:<PORT>/doc`

> Para obter documentação em json: `http://localhost:<PORT>/doc/json`

## Teste

#### Unitário

```bash
   npm run test
```

## Funcionalidade

- [ ] Autenticação
- [ ] Autorização
- [ ] Gestão de Usuário (User)
- [ ] Gestão de Cliente (Client)
- [ ] Gestão de Produto (Product)
- [ ] Gestão de Pedido (Order)
- [ ] Geração de relatório (Report)

## Melhorias

- [ ] Integração S3
- [ ] Integração Pagamento
- [ ] Cache em Produto
- [ ] Cache em Produto
- [ ] Deploy automatizado (aws)
