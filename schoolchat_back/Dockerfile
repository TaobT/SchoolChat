# Imagen de node para construir la aplicación
FROM node:18

# Directorio de trabajo
WORKDIR /usr/src/app

# Copiar los archivos necesarios
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar los archivos necesarios
COPY . .

# Exponer el puerto 3000
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]