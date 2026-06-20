FROM python:3.10-slim

WORKDIR /app

# Salin kebutuhan library
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Salin semua isi backend
COPY backend/ .

# Beri tahu Hugging Face secara tegas bahwa kita pakai port 7860
ENV PORT=7860
EXPOSE 7860

# Jalankan FastAPI dengan port yang dinamis sesuai bawaan Hugging Face
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]
