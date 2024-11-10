cd backend
npm init -y
npm install express mongoose bcryptjs jsonwebtoken cors dotenv

express: Framework web para Node.js.
mongoose: Biblioteca para modelagem de dados no MongoDB.
bcryptjs: Para criptografar senhas.
jsonwebtoken: Para gerar tokens JWT para autenticação.
cors: Middleware para permitir o acesso ao backend de um frontend em outro domínio.
dotenv: Para gerenciar variáveis de ambiente.

backend
├── .env
├── server.js
└── models
    └── User.js
└── routes
    └── auth.js



Iniciar o back end
node server.js
