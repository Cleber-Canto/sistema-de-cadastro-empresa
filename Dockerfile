# Utiliza a imagem oficial do Node.js como imagem base. Atualizando para a versão 16.
FROM node:16

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o arquivo 'package.json' e 'package-lock.json' (se disponível)
COPY package*.json ./

# Instala as dependências do porto
RUN npm install

# Copia os arquivos da aplicação para o diretório de trabalho
COPY . .

# Expõe a porta 3000 do container
EXPOSE 3000

# Comando para executar a aplicação
CMD ["npm", "start"]