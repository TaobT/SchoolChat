# Imagen de node para construir la aplicación
FROM node:18 AS build

# Directorio de trabajo
WORKDIR /app

# Copiar los archivos necesarios
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar los archivos necesarios
COPY . .

# Construir la aplicación
RUN npm run build

# Imagen de nginx para servir la aplicación
FROM nginx:stable-alpine

# Eliminar los archivos por defecto
RUN rm -rf /usr/share/nginx/html/*

# Copiar los archivos necesarios
COPY --from=build /app/dist/schoolchat_front /usr/share/nginx/html
COPY mime.types /etc/nginx/mime.types
COPY nginx.conf /etc/nginx/nginx.conf

# Exponer el puerto 80
EXPOSE 80

# Comando para iniciar nginx
CMD ["nginx", "-g", "daemon off;"]