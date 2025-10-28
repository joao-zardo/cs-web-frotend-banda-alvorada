# Entrega 3: Interatividade e Funcionalidades
## Especificações Técnicas Obrigatórias
### Manipulação do DOM
* [X] Implementar sistema de Single Page Application (SPA) básico;
    * Local: js/router.js
* [X] Criar sistema de templates JavaScript.
    * Local: Utilizado em membros.js e na página da equipe (membros.html). O template carrega todos os membros da banda

## Funcionalidades Específicas Obrigatórias
* [X] Sistema de verificação de consistência de dados em formulários, com aviso ao usuário de preenchimento incorreto.
    * Objetivo alcançado na entrega 2.
    * Local: formulário de cadastro da página cadastro.html e em cadastro.js

## O que deverá ser entregue:
### Código JavaScript Modular
* [X] Estrutura de pastas organizada (pastas, HTML, imagens, CSS e JS);
    * Pastas divididas em html (pasta principal), css (base, components, layout e pages) e js
* [X] No arquivo organizar os códigos por funcionalidade.
    * Funcionalidades:
    * cadastro.js: Gerencia a validação visual (erros/sucesso) e o fluxo de envio do formulário de cadastro, controlando os componentes de feedback (modal, toast e badges)
    * templates.js: Contém a lógica de "templating". Define os dados (ex: array de membros) e a função que gera o HTML dinâmico para ser injetado na página
    * menu.js: Controla a interatividade do menu de navegação, como a lógica para abrir e fechar o menu "hamburger" em dispositivos móveis
    * router.js: Implementa a lógica de SPA (Single Page Application). Intercepta cliques nos links, carrega o conteúdo da página via fetch e o injeta no DOM sem recarregar a página

### Forma de Entrega
* [X] Link PÚBLICO do projeto no GitHub, com todo o código fonte, os arquivos HTML, imagens e CSS organizados em pastas.