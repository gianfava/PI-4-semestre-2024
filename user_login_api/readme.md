cd user_login_api
npm init -y
npm install express mongoose bcryptjs jsonwebtoken cors dotenv express-validator

express: Framework web para Node.js.
mongoose: Biblioteca para modelagem de dados no MongoDB.
bcryptjs: Para criptografar senhas.
jsonwebtoken: Para gerar tokens JWT para autenticação.
cors: Middleware para permitir o acesso ao backend de um frontend em outro domínio.
dotenv: Para gerenciar variáveis de ambiente.
express-validator: O express-validator é um middleware para Express.js que valida e sanitiza dados de requisições HTTP.

```markdown
user_login_api
│
├── src/
│   ├── api/
│   │   ├── v1/
│   │   │   ├── controllers/
│   │   │   │   └── authController.js
│   │   │   ├── models/
│   │   │   │   └── User.js
│   │   │   ├── routes/
│   │   │   │   └── authRoutes.js
│   │   │   ├── validators/
│   │   │   │   └── authValidator.js
│   │   │   └── services/
│   │   │       └── authService.js
│   │   └── index.js
│   ├── config/
│   │   └── database.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── validateRequest.js
│   └── app.js
│
├── .env
└── server.js
```

Iniciar a api
node server.js



