# Projeto Dockerizado React + Laravel

Este é um projeto que combina um front-end React e um back-end Laravel, ambos dockerizados para facilitar o desenvolvimento e a implantação.

## Instruções de Uso

Para iniciar o projeto, certifique-se de ter o Docker e o Docker Compose instalados em sua máquina. Depois, siga as instruções abaixo:

1. **Clone o Repositório**
```bash
git clone https://github.com/ChristianSants/testeDevFullStack.git
```

2. **Acessar a Pasta do Projeto**
```bash
cd testeDevFullStack
```

3. **Inicie os Contêineres Docker**
Antes de iniciar os contêineres, verifique se as portas 3000 e 8000 em sua máquina local estão livres. Para iniciar o projeto, execute o seguinte comando:
```bash
docker compose up
```

Este comando iniciará os contêineres Docker para o front-end React e o back-end Laravel. Os serviços estarão disponíveis em: http://localhost:3000

## Usuários para login
O projeto já possui usuários pré-cadastrados para fins de autenticação. Aqui estão os detalhes dos usuários disponíveis:

- **Administrador:**
    - E-mail: admin@teste.com
    - Senha: 123456

- **Moderador:**
    - E-mail: moderador@teste.com
    - Senha: 123456

- **Leitor:**
    - E-mail: leitor@teste.com
    - Senha: 123456

Você pode usar essas credenciais para fazer login na aplicação e testar as funcionalidades de acordo com o papel de cada usuário.