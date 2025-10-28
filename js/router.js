// Espera o DOM carregar
document.addEventListener('DOMContentLoaded', () => {

    // 1. ONDE O CONTEÚDO SERÁ INJETADO
    const mainContent = document.getElementById('main-content');
    
    // 2. FUNÇÃO PARA ATUALIZAR O LINK ATIVO NO MENU
    const updateActiveNav = (path) => {
        const navLinks = document.querySelectorAll('.nav-link');
        const ctaButton = document.querySelector('.cta-button');

        // Primeiro, limpa o 'active' de todos os links e botões
        navLinks.forEach(link => link.classList.remove('active'));
        if (ctaButton) {
            ctaButton.classList.remove('active');
        }

        // 'path' é o que está na barra de URL (ex: "/membros.html" ou "/")
        
        if (path.includes('cadastro.html')) {
            // Caso 1: A página de cadastro
            if (ctaButton) ctaButton.classList.add('active');
        
        } else if (path === '/' || path.includes('index.html')) {
            // Caso 2: A página inicial
            const homeLink = document.querySelector('.nav-link[href="index.html"]');
            if (homeLink) homeLink.classList.add('active');
        
        } else {
            // Caso 3: Outras páginas (projetos, membros)
            // Tenta encontrar um link cujo 'href' esteja contido no 'path'
            // ex: href="membros.html" está contido em path="/membros.html"
            const activeLink = Array.from(navLinks).find(link => {
                const href = link.getAttribute('href');
                return path.includes(href);
            });
            
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    };

    // 3. FUNÇÃO PARA BUSCAR E INJETAR O CONTEÚDO
    // 'url' = o link que foi clicado
    // 'updateHistory' = se devemos ou não salvar no histórico do navegador
    const loadPage = async (url, updateHistory = true, scrollToTop = true) => {
        try {
            // Mostra um "loading" simples
            mainContent.style.opacity = '0.5';

            // Busca o HTML da página de destino
            const response = await fetch(url);
            const htmlText = await response.text();

            // Usa o DOMParser para "ler" o HTML buscado sem exibi-lo
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlText, 'text/html');

            // Pega o <main> da página buscada
            const newContent = doc.getElementById('main-content').innerHTML;
            // Pega o <title> da página buscada
            const newTitle = doc.querySelector('title').innerText;

            // Injeta o novo conteúdo no "palco"
            mainContent.innerHTML = newContent;
            // Atualiza o título da aba do navegador
            document.title = newTitle;

            // PÓS-PROCESSAMENTO DO SPA
            // Se a página que acabamos de carregar for a 'membros',
            // chame a função para "desenhar" os membros para evitar o bug de não carregar.
            if (url.includes('membros.html')) {
                renderizarPaginaMembros();
            }

            // Força a rolagem para o topo, se for uma nova navegação
            if (scrollToTop) {
                window.scrollTo(0, 0);
            }

            // Esconde o "loading"
            mainContent.style.opacity = '1';

            // Atualiza qual link está "ativo" no menu
            updateActiveNav(url);

            // Se for uma navegação normal (não um "voltar"),
            // salva a nova URL no histórico do navegador.
            if (updateHistory) {
                // 'pushState' atualiza a URL na barra do navegador sem recarregar!
                history.pushState({ path: url }, newTitle, url);
            }

        } catch (error) {
            console.error('Erro ao carregar a página:', error);
            // Se falhar, apenas redireciona da forma antiga
            window.location.href = url;
        }
    };

    // 4. INTERCEPTOR DE CLIQUES
    document.body.addEventListener('click', (e) => {
        
        // Pega o link mais próximo que foi clicado
        const link = e.target.closest('a');
        
        // Se não foi um link, ou se o link abre em nova aba, ignora.
        if (!link || link.target === '_blank') {
            return;
        }
        
        // Se o link é para uma âncora (#) na MESMA página, ignora.
        if (link.pathname === window.location.pathname && link.hash) {
            return;
        }

        // Se o link é para um site externo, ignora.
        if (link.hostname !== window.location.hostname) {
            return;
        }

        // *** A EXCEÇÃO MAIS IMPORTANTE ***
        // Se o link for para a página de cadastro, NÃO FAÇA NADA.
        // O 'return' vai deixar o navegador fazer o recarregamento normal.
        if (link.pathname.includes('cadastro.html')) {
            console.log('Navegando para Cadastro (full load), recarregamento completo.');
            return; 
        }

        // Se o link passou por todos os filtros:
        e.preventDefault(); // 1. Impede o recarregamento da página
        loadPage(link.pathname, true, true); // 2. Carrega o conteúdo (true = scroll to top)
    });

    // 5. LIDANDO COM OS BOTÕES "VOLTAR" E "AVANÇAR"
    window.addEventListener('popstate', (e) => {
        // 'popstate' é disparado quando o usuário clica em voltar/avançar
        // Carrega a página do histórico sem salvar um novo estado
        loadPage(window.location.pathname, false, false); // false = não scrollar (manter pos.)
    });
});