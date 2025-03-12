This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Para rodar local, execute:

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador de internet.

## Docker

Listar os containers
- docker ps

Criar container
- docker build -t meu-frontend .

Rodar container
- docker run -p 3000:3000 meu-frontend

Deletar container
- docker stop meu-frontend
