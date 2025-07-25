# Imagen base oficial, ligera y segura
FROM python:3.11-slim

# Establece el directorio de trabajo
WORKDIR /app

# Copia solo los archivos necesarios al principio para aprovechar el cache
COPY requirements.txt .

# Instala dependencias de forma segura y sin caché
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copia el resto del código
COPY . .

# Crea un usuario no root para mayor seguridad
RUN useradd -m greenuser

# Usa el usuario seguro
USER greenuser

# Expone el puerto para Flask
EXPOSE 5000

# Comando de ejecución
CMD ["python", "app.py"]