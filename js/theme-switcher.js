/* Espera o DOM carregar */
document.addEventListener('DOMContentLoaded', () => {

    const themeButtons = document.querySelectorAll('.theme-button');
    const body = document.body;
    const localStorageKey = 'themePreference';

    // Função para aplicar o tema
    function applyTheme(theme) {
        // 1. Limpa classes de tema anteriores do body
        body.classList.remove('dark-mode', 'high-contrast-mode');

        // 2. Adiciona a classe do tema novo (se não for 'light')
        if (theme === 'dark') {
            body.classList.add('dark-mode');
        } else if (theme === 'contrast') {
            body.classList.add('high-contrast-mode');
        }
        // Se theme === 'light', nenhuma classe é adicionada (padrão)

        // 3. Atualiza os botões (aria-checked)
        themeButtons.forEach(button => {
            const buttonTheme = button.dataset.theme;
            button.setAttribute('aria-checked', buttonTheme === theme ? 'true' : 'false');
        });

        // 4. Salva a preferência no localStorage
        try {
             localStorage.setItem(localStorageKey, theme);
        } catch (e) {
            console.warn('LocalStorage não disponível. Preferência de tema não será salva.');
        }
    }

    // Função para carregar o tema inicial
    function loadInitialTheme() {
        let preferredTheme = 'light'; // Padrão

        // 1. Tenta carregar do localStorage
        try {
            const savedTheme = localStorage.getItem(localStorageKey);
            if (savedTheme && ['light', 'dark', 'contrast'].includes(savedTheme)) {
                preferredTheme = savedTheme;
                console.log('Tema carregado do localStorage:', preferredTheme);
            } else {
                 // 2. Se não houver no localStorage, verifica a preferência do OS (para modo escuro)
                 if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                     preferredTheme = 'dark';
                     console.log('Preferência do OS detectada: dark');
                 }
                 // (Poderia adicionar lógica para 'prefers-contrast: more' aqui também, se quisesse)
            }
        } catch(e) {
             console.warn('LocalStorage não disponível. Usando tema padrão.');
        }


        applyTheme(preferredTheme);
    }

    // Adiciona o listener de clique aos botões
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedTheme = button.dataset.theme;
            applyTheme(selectedTheme);
        });
    });

    // Carrega o tema inicial assim que a página carrega
    loadInitialTheme();

    // (Opcional) Ouve mudanças na preferência do OS enquanto a página está aberta
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            // Só aplica se NENHUMA preferência explícita foi salva
             try {
                 const savedTheme = localStorage.getItem(localStorageKey);
                 if (!savedTheme) { // Se usuário nunca clicou em um botão
                     applyTheme(event.matches ? 'dark' : 'light');
                     console.log('Preferência do OS mudou:', event.matches ? 'dark' : 'light');
                 }
             } catch(e) { /* Ignora erro de localStorage */ }
        });
    }

});