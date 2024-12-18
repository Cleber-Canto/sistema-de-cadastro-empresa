O comando `npm tsc --init` está incorreto. O correto é usar o comando `tsc --init` diretamente, pois o TypeScript Compiler (`tsc`) não é um comando do npm. Antes de rodar `tsc --init`, você precisa garantir que o TypeScript está instalado globalmente ou no seu projeto.

### Passos para resolver o problema

1. **Instalar o TypeScript globalmente (opcional, mas recomendado)**:
   
   Se você deseja usar o `tsc` de qualquer lugar no seu sistema, instale o TypeScript globalmente:

   ```bash
   npm install -g typescript
   ```

2. **Instalar o TypeScript localmente no projeto**:
   
   Se você prefere instalar o TypeScript apenas para o seu projeto, execute:

   ```bash
   npm install typescript --save-dev
   ```

3. **Inicializar o TypeScript no projeto**:

   Se você instalou o TypeScript globalmente, pode simplesmente executar:

   ```bash
   tsc --init
   ```

   Se você instalou o TypeScript localmente, deve usar o npx para garantir que está usando a versão instalada no seu projeto:

   ```bash
   npx tsc --init
   ```

### Verificação
Para garantir que o TypeScript está instalado corretamente, você pode verificar a versão:

```bash
tsc -v
```

ou

```bash
npx tsc -v
```

### Conclusão
Após executar `tsc --init` ou `npx tsc --init`, um arquivo `tsconfig.json` será criado no seu projeto, que pode ser editado para configurar seu ambiente TypeScript conforme necessário.