# Posicionados

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)
![Status](https://img.shields.io/badge/status-em%20andamento-yellow)

Bem-vindo ao repositório do **Posicionados**, um site moderno, responsivo e pensado para conectar pessoas, divulgar eventos, compartilhar devocionais e fortalecer a comunidade!

## 💻 Visualização

Para visualizá-lo acesse: https://posicionados-site.vercel.app/

## ✨ Sobre o Projeto

O site **Posicionados** foi desenvolvido com o objetivo de ser o ponto de encontro digital do ministério jovem, trazendo:

- Navegação simples e intuitiva
- Design responsivo
- Organização clara de conteúdo
- Experiência agradável para dispositivos móveis e desktop
- Sistema seguro com cadastro e login

## 🚀 Funcionalidades

- Página inicial com banner de destaque
- Galeria de fotos com grid e modal ampliado
- Cadastro de usuários com opção de receber novidades pelo WhatsApp
- Login com painel lateral deslizante
- Autenticação com JWT e senhas criptografadas
- Banco de dados com RLS ativado
- Seções dedicadas para eventos, loja, devocionais e informações institucionais
- Carrossel de fotos nos cards de eventos
- Menu hambúrguer para navegação em dispositivos móveis
- Links diretos para redes sociais

## 📱 Responsividade

O site foi projetado para funcionar perfeitamente em computadores, tablets e celulares, mantendo a identidade visual e a experiência do usuário em todos os tamanhos de tela.

## 🛠️ Tecnologias Utilizadas

### Frontend
- HTML5
- CSS3 (Flexbox, Grid, Media Queries)
- JavaScript
- Ionicons para ícones
- Swiper.js para carrossel de imagens

### Backend
- Node.js
- Express
- bcryptjs — criptografia de senhas
- JSON Web Token (JWT) — autenticação
- dotenv — variáveis de ambiente

### Banco de Dados
- Supabase (PostgreSQL)
- Row Level Security (RLS) ativado
 
### Deploy
- Vercel

## 📂 Estrutura de Pastas

```
/
├── index.html
├── eventos.html
├── loja.html
├── devocionais.html
├── sobrenos.html
├── cadastro.html
├── contato.html
├── galeria.html
├── style.css
├── script.js
├── devocionais.json
├── vercel.json
├── package.json
├── api/
│   ├── supabase.js
│   ├── functions/
│   │   ├── cadastrar.js
│   │   └── login.js
│   ├── routes/
│   │   └── authRoutes.js
│   ├── controllers/
│   │   └── authController.js
│   └── middleware/
│       └── authMiddleware.js
└── img/
    ├── eventos/
    ├── fotos/
    ├── mat_idvisual/
    └── prods/
```

## 📢 Observações

- Imagens e textos podem ser personalizados conforme a necessidade do ministério.
- Sugestões e melhorias são sempre bem-vindas!

---

Feito com 💛 por Posicionados e colaboradores.

**Projeto em andamento**
