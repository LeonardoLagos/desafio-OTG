## Project Setup

1. Instale as dependências do projeto:

   ```bash
   $ npm install
   ```

2. Crie um banco de dados em um servidor PostgreSQL de sua escolha.

3. Após a criação do banco, insira os dados de conexão em um arquivo `.env` na raiz do projeto, seguindo o modelo fornecido em `.env.example`.

### Criação das Tabelas do Banco

Existem duas maneiras de criar as tabelas no banco de dados:

- **Opção 1:** Execute as migrações com o seguinte comando:

  ```bash
  # Run migrations
  $ npm run migration:run
  ```

- **Opção 2:** Execute o script presente no arquivo `ddl.sql` diretamente no banco de dados criado.

---

## Compilando e Rodando o Projeto

Para rodar o projeto em diferentes modos, utilize um dos seguintes comandos:

- **Modo Desenvolvimento:**

  ```bash
  $ npm run start
  ```

- **Modo Watch:** (com hot reload)

  ```bash
  $ npm run start:dev
  ```

- **Modo Produção:**

  ```bash
  $ npm run start:prod
  ```

---

## Rodando os Testes

Para rodar os testes do projeto, utilize os seguintes comandos:

- **Testes Unitários:**

  ```bash
  $ npm run test
  ```

- **Cobertura de Testes:**

  ```bash
  $ npm run test:cov
  ```
