# Dockerfile para ML Server con TensorFlow y PyTorch
FROM nvidia/cuda:11.8-runtime-ubuntu20.04

# Evitar prompts interactivos
ENV DEBIAN_FRONTEND=noninteractive

# Instalar Python y dependencias del sistema
RUN apt-get update && apt-get install -y \
    python3.9 \
    python3.9-pip \
    python3.9-dev \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

# Crear enlaces simbólicos
RUN ln -s /usr/bin/python3.9 /usr/bin/python
RUN ln -s /usr/bin/pip3 /usr/bin/pip

# Crear directorio de trabajo
WORKDIR /app

# Instalar dependencias de ML
RUN pip install --no-cache-dir \
    tensorflow==2.13.0 \
    torch==2.0.1 \
    torchvision==0.15.2 \
    scikit-learn==1.3.0 \
    pandas==2.0.3 \
    numpy==1.24.3 \
    fastapi==0.103.0 \
    uvicorn==0.23.2 \
    pydantic==2.3.0 \
    joblib==1.3.2

# Copiar modelos y código ML
COPY ml-models/ ./models/
COPY ml-server/ ./

# Crear usuario no root
RUN groupadd -r mluser && useradd -r -g mluser mluser
RUN chown -R mluser:mluser /app
USER mluser

# Variables de entorno
ENV MODEL_PATH=/app/models
ENV CUDA_VISIBLE_DEVICES=0
ENV TF_CPP_MIN_LOG_LEVEL=2

# Puerto de exposición
EXPOSE 8001

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:8001/health || exit 1

# Comando de inicio
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001", "--workers", "2"]
