Para ajudar a documentar como fazer as requisições para este projeto, aqui está uma descrição passo a passo que você pode colocar no seu arquivo `README.md`.

### Como Fazer Requisições para o Projeto

Este projeto inclui várias rotas para gerenciar usuários, roles (funções), permissões e suas associações. A seguir estão os exemplos de requisições para cada operação importante utilizando ferramentas como o Postman.

---

## Requisitos

- [Node.js](https://nodejs.org/)
- [Postman](https://www.postman.com/)
- Um servidor local ou hospedado rodando o projeto

---

## Endpoints Disponíveis

1. **Autenticação**
2. **Usuários**
3. **Unidades**
4. **Perfis**
5. **Empresas**
6. **Roles (Funções)**
7. **Permissões**
8. **PermissõesRoles (Associações entre Permissões e Funções)**
9. **UsersRoles (Associações entre Usuários e Funções)**

---

## Exemplos de Requisições

### 1. Autenticação

#### Login

**Método:** POST  
**URL:** `http://localhost:3000/api/auth/login`  
**Cabeçalhos:**  
- Content-Type: `application/json`

**Corpo (JSON):**

```json
{
  "username": "seu_usuario",
  "password": "sua_senha"
}
```

---

### 2. Usuários

#### Criar Usuário

**Método:** POST  
**URL:** `http://localhost:3000/api/usuarios`  
**Cabeçalhos:**  
- Content-Type: `application/json`

**Corpo (JSON):**

```json
{
  "nome": "Nome do Usuário",
  "email": "email@exemplo.com",
  "senha": "sua_senha"
}
```

#### Listar Usuários

**Método:** GET  
**URL:** `http://localhost:3000/api/usuarios`  
**Cabeçalhos:**  
- Authorization: `Bearer YOUR_JWT_TOKEN`

---

### 3. Unidades

#### Criar Unidade

**Método:** POST  
**URL:** `http://localhost:3000/api/unidades`  
**Cabeçalhos:**  
- Content-Type: `application/json`

**Corpo (JSON):**

```json
{
  "nome": "Nome da Unidade"
}
```

#### Listar Unidades

**Método:** GET  
**URL:** `http://localhost:3000/api/unidades`  
**Cabeçalhos:**  
- Authorization: `Bearer YOUR_JWT_TOKEN`

---

### 4. Perfis

#### Criar Perfil

**Método:** POST  
**URL:** `http://localhost:3000/api/perfis`  
**Cabeçalhos:**  
- Content-Type: `application/json`

**Corpo (JSON):**

```json
{
  "nome": "Nome do Perfil"
}
```

#### Listar Perfis

**Método:** GET  
**URL:** `http://localhost:3000/api/perfis`  
**Cabeçalhos:**  
- Authorization: `Bearer YOUR_JWT_TOKEN`

---

### 5. Empresas

#### Criar Empresa

**Método:** POST  
**URL:** `http://localhost:3000/api/empresas`  
**Cabeçalhos:**  
- Content-Type: `application/json`

**Corpo (JSON):**

```json
{
  "nome": "Nome da Empresa"
}
```

#### Listar Empresas

**Método:** GET  
**URL:** `http://localhost:3000/api/empresas`  
**Cabeçalhos:**  
- Authorization: `Bearer YOUR_JWT_TOKEN`

---

### 6. Roles (Funções)

#### Criar Role

**Método:** POST  
**URL:** `http://localhost:3000/api/roles`  
**Cabeçalhos:**  
- Content-Type: `application/json`

**Corpo (JSON):**

```json
{
  "id": "admin",
  "descricao": "Administrador do sistema"
}
```

#### Listar Roles

**Método:** GET  
**URL:** `http://localhost:3000/api/roles`  
**Cabeçalhos:**  
- Authorization: `Bearer YOUR_JWT_TOKEN`

#### Recuperar Role pelo ID

**Método:** GET  
**URL:** `http://localhost:3000/api/roles/{id}`  
- Substitua `{id}` pelo ID da role que você deseja recuperar.

**Cabeçalhos:**  
- Authorization: `Bearer YOUR_JWT_TOKEN`

---

### 7. Permissões

#### Criar Permissão

**Método:** POST  
**URL:** `http://localhost:3000/api/permissions`  
**Cabeçalhos:**  
- Content-Type: `application/json`

**Corpo (JSON):**

```json
{
  "name": "VIEW_USERS",
  "description": "Permissão para visualizar usuários"
}
```

#### Listar Permissões

**Método:** GET  
**URL:** `http://localhost:3000/api/permissions`  
**Cabeçalhos:**  
- Authorization: `Bearer YOUR_JWT_TOKEN`

#### Recuperar Permissão pelo ID

**Método:** GET  
**URL:** `http://localhost:3000/api/permissions/{id}`  
- Substitua `{id}` pelo ID da permissão que você deseja recuperar.

**Cabeçalhos:**  
- Authorization: `Bearer YOUR_JWT_TOKEN`

---

### 8. PermissõesRoles (Associações entre Permissões e Funções)

#### Criar Associação de Permissão a Role

**Método:** POST  
**URL:** `http://localhost:3000/api/permissions_roles`  
**Cabeçalhos:**  
- Content-Type: `application/json`

**Corpo (JSON):**

```json
{
  "roleId": "admin",
  "permissionId": "b3272093-764b-495e-a54c-8a93a86c381f"
}
```

#### Listar Todas as Associações de Permissões a Roles

**Método:** GET  
**URL:** `http://localhost:3000/api/permissions_roles`  
**Cabeçalhos:**  
- Authorization: `Bearer YOUR_JWT_TOKEN`

#### Recuperar Associação Específica de Permissão a Role

**Método:** GET  
**URL:** `http://localhost:3000/api/permissions_roles/{roleId}/{permissionId}`  
- Substitua `{roleId}` pelo ID da role e `{permissionId}` pelo ID da permissão que você deseja recuperar.

**Cabeçalhos:**  
- Authorization: `Bearer YOUR_JWT_TOKEN`

---

### 9. UsersRoles (Associações entre Usuários e Funções)

#### Criar Associação de Usuário a Role

**Método:** POST  
**URL:** `http://localhost:3000/api/users_roles`  
**Cabeçalhos:**  
- Content-Type: `application/json`

**Corpo (JSON):**

```json
{
  "userId": 1,  // Substitua pelo ID válido do usuário
  "roleId": "admin"
}
```

#### Listar Todas as Associações de Usuários a Roles

**Método:** GET  
**URL:** `http://localhost:3000/api/users_roles`  
**Cabeçalhos:**  
- Authorization: `Bearer YOUR_JWT_TOKEN`

#### Recuperar Associação Específica de Usuário a Role

**Método:** GET  
**URL:** `http://localhost:3000/api/users_roles/{userId}/{roleId}`  
- Substitua `{userId}` pelo ID do usuário e `{roleId}` pelo ID da role que você deseja recuperar.

**Cabeçalhos:**  
- Authorization: `Bearer YOUR_JWT_TOKEN`

---

### Conclusão

Com essas instruções, você pode criar, listar e recuperar entidades e suas associações utilizando o Postman. Certifique-se de que os endpoints estão configurados corretamente no seu servidor. Se precisar de mais assistência ou tiver dúvidas, estou à disposição! 🚀

Espero que isso ajude a documentar o uso das APIs no seu projeto. Alguma outra coisa que você gostaria de adicionar ou discutir? 🎉