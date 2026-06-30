# Cadastro e Lista de Recados

Aplicação full stack para criar, listar e apagar recados pessoais, com autenticação por token. Cada usuário só vê e gerencia os próprios recados.

## Tecnologias

- **Frontend:** React (Create React App) + Axios
- **Backend:** Laravel 11 + Sanctum (autenticação por token)
- **Banco:** MySQL 8

## Funcionalidades

- Cadastro de usuário (nome, e-mail, senha)
- Login com e-mail e senha
- Logout (limpa o token e redireciona para o login)
- Rotas de recados protegidas — só acessíveis autenticado
- Criar, listar e apagar recados (cada usuário só vê os seus)

## Pré-requisitos

Antes de começar, garanta que você tem instalado:

- Node.js v20+
- PHP 8.2+
- Composer 2
- MySQL 8 rodando localmente

## 1. Banco de dados

Crie um banco vazio antes de rodar as migrations. Pelo terminal do MySQL:

```sql
CREATE DATABASE recados;
```


## 2. Como rodar o backend

```bash
cd backend
composer install
cp .env.example .env
```

Abra o `.env` e edite as credenciais do MySQL:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=recados
DB_USERNAME=root
DB_PASSWORD=
```

Continue com:

```bash
php artisan key:generate
php artisan migrate
php artisan serve
```

O backend sobe em `http://localhost:8000`.

> **Importante:** se o frontend rodar em uma porta diferente de `3000`, é necessário liberar a nova origem em `config/cors.php` (`allowed_origins`), senão o navegador vai bloquear as requisições por CORS.

## 3. Como rodar o frontend

Em outro terminal:

```bash
cd frontend
npm install
npm start
```

O frontend sobe em `http://localhost:3000` e já aponta para a API em `http://localhost:8000/api`.

## 4. Usando a aplicação

1. Acesse `http://localhost:3000`
2. Clique em **"Cadastre-se"** e crie uma conta (nome, e-mail, senha — mínimo 6 caracteres)
3. Após o cadastro, você já entra logado automaticamente
4. Crie, visualize e apague seus recados pela tela inicial
5. Use o botão **"Sair"** para fazer logout

Não existe usuário pré-cadastrado — o banco sobe zerado e o primeiro acesso deve ser feito pelo cadastro.

## Endpoints da API

| Método | Rota | Protegida | Descrição |
|---|---|---|---|
| POST | `/api/register` | Não | Cria um novo usuário |
| POST | `/api/login` | Não | Autentica e retorna o token |
| POST | `/api/logout` | Sim | Revoga o token atual |
| GET | `/api/recados` | Sim | Lista os recados do usuário logado |
| POST | `/api/recados` | Sim | Cria um novo recado |
| PUT | `/api/recados/{id}` | Sim | Atualiza um recado do usuário logado |
| DELETE | `/api/recados/{id}` | Sim | Apaga um recado do usuário logado |

Rotas protegidas exigem o header `Authorization: Bearer <token>`, retornado no login/cadastro.

## Resolução de problemas

- **Erro de CORS no navegador:** confira se `http://localhost:3000` está em `allowed_origins` no `config/cors.php` do backend.
- **401 em todas as rotas de recados:** confirme se está logado e se o token está sendo enviado (DevTools → Network → Headers → `Authorization`).
- **Erro ao rodar `php artisan migrate`:** confirme se o banco criado no passo 1 existe e se as credenciais no `.env` estão corretas.
