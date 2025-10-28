# Entrega 2: Estilização e Leiautes
## Especificações Técnicas Obrigatórias
### Sistema de Design
* [X] Desenvolver design system consistente com variáveis CSS customizadas;
    * Local: css/base/designsystem.css
* [X] Definir paleta de cores com no mínimo 8 cores (primárias, secundárias, neutras);
    * Local: css/base/designsystem.css
* [X] Estabelecer tipografia hierárquica com no mínimo 5 tamanhos de fonte;
    * Local: css/base/designsystem.css e aplicada em css/base/typography.css
* [X] Criar sistema de espaçamento modular (8px, 16px, 24px, 32px, 48px, 64px).
    * Local: css/base/designsystem.css

### Leiautes Responsivos com Flexbox e Grid
* [X] Implementar leiaute principal usando CSS grid para estrutura geral;
    * Local: diferentes locais, exemplo: grid em .cards-section (css/layout/sections.css) e flex no .card (css/components/cards.css)
* [X] Utilizar flexbox para componentes internos e alinhamentos;
    * Local: diferentes locais, exemplo: css/components/cards.css
* [X] Criar no mínimo 5 breakpoints responsivos bem definidos; 
    * Local: página da equipe (membros.html) e no css desta página (css/pages/membros.css)
* [X] Desenvolver sistema de grid customizado (12 colunas);
    * Local: página da equipe (membros.html) e no css desta página (css/pages/membros.css)
* [X] Implementar leiautes específicos para diferentes tipos de conteúdo.
    * Local: diferentes locais, pricipalmente nos arquivos css/layout/.css

### Navegação Sofisticada e Interativa
* [X] Criar menu principal responsivo com submenu dropdown;
    * Local: todas as páginas html e no css/layout/navigation.css
* [X] Implementar navegação mobile com menu hambúrguer.
    * Local: todas as páginas html e no css/layout/navigation.css

### Componentes de Interface
* [X] Desenvolver sistema de cards responsivos para projetos;
    * Local: cards no index.html, estilizados em css/layout/sections.css e botões (css/components/buttons.css)
* [X] Criar botões com estados visuais (hover, focus, active, disabled);
    * Os estados visuais foram utilizados em diferentes locais. Alguns exemplos:
    * hover: botão cta do cabeçalho (css/components/buttons.css)
    * focus: formulário da página cadastre-se (cadastro.html) no css (css/components/forms.css)
    * active: barra horizontal abaixo do link da página atual na navegação (css/layout/navigation.css)
    * disabled: botão de envio do formulário (cadastro.html), js na mesmo arquivo e estilo em (css/components/buttons.css)
* [X] Implementar formulários estilizados com validação visual;
    * Local: Formulário da página cadastro.html (cadastro.js e forms.css)
* [X] Desenvolver componentes de feedback (alerts, toasts, modals);
    * Local: Formulário da página cadastro.html (cadastro.js e forms.css)
* [X] Criar sistema de badges e tags para categorização.
    * Local: Formulário da página cadastro.html (cadastro.js e forms.css)

---
## O que deverá ser entregue:
### 1. CSS Organizados
* [X] Estrutura de pastas organizada (pastas, HTML, imagens e CSS);
    * Pastas divididas em html (pasta principal), css (base, components, layout e pages) e js
* [X] Estrutura modular de CSS.
    * Módulos do CSS:
        * Main: localizado na página principal, carrega todos os arquivos .css, com exceção dos estilos específicos para as páginas cadastro e membros
        * Base: designsystem.css (variáveis), reset.css (reset geral), typography.css (tipografia utilizada)
        * Components: buttons.css (botões), cards.css (cards e contato), fomrs.css (formulário)
        * Layout: footer.css (rodapé), navigation.css (cabeçalho e navegação), sections.css (estilos das seções gerais)
        * Pages: contêm estilos que são utilizados apenas em páginas específicas (cadastro.css e membros.css)
### 2. Forma de Entrega
* [X] Link PÚBLICO do projeto no GitHub, com todo o código fonte e os arquivos HTML e imagens organizados em pastas.