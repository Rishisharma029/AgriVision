# LeafSense AI – Deployment & Operations Guide (v1.0)

LeafSense AI is containerized to deploy in clustered or single-instance environments using Docker Compose, Nginx, and Uvicorn.

---

## 1. Local Run & Development

### Backend (FastAPI)
1. Navigate to backend: `cd backend`
2. Install packages: `pip install -r requirements.txt`
3. Launch Uvicorn: `python -m uvicorn app.main:app --port 8050 --reload`
4. Access interactive docs at `http://127.0.0.1:8050/docs`.

### Frontend (React PWA)
1. Navigate to frontend: `cd frontend`
2. Install packages: `npm install --legacy-peer-deps`
3. Run dev server: `npm run dev` (proxies `/api` to port `8050`).

---

## 2. Docker Compose Deployment

We use a two-container setup separating frontend assets and backend processes:

```yaml
version: '3.8'

services:
  backend:
    build: 
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8050:8050"
    volumes:
      - backend-logs:/app/logs
      - backend-db:/app/data
    environment:
      - PROJECT_NAME=LeafSense AI
      - VERSION=1.0.0
      - CORS_ORIGINS=["*"]
    restart: always

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "80:80"
    depends_on:
      - backend
    restart: always

volumes:
  backend-logs:
  backend-db:
```

---

## 3. Nginx Production Reverse Proxy

To handle SSL termination and proxy API calls to the backend container, configure Nginx as follows:

```nginx
server {
    listen 443 ssl http2;
    server_name leafsense.ai;

    ssl_certificate /etc/letsencrypt/live/leafsense.ai/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/leafsense.ai/privkey.pem;

    # Static frontend assets
    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # API endpoints route
    location /api/ {
        proxy_pass http://backend:8050/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
