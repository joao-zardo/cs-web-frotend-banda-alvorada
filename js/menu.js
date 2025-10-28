/* Espera o DOM (a página) carregar completamente */
document.addEventListener('DOMContentLoaded', () => {

    // --- PARTE 1: LÓGICA DO MENU HAMBURGER (MOBILE) ---
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    const navLinksContainer = document.querySelector('#nav-links');

    if (!hamburgerBtn || !navLinksContainer) return; // Proteção

    const focusableItemsMobile = navLinksContainer.querySelectorAll('a[href]:not([disabled]), button:not([disabled])');
    const firstFocusableItemMobile = focusableItemsMobile[0];
    const lastFocusableItemMobile = focusableItemsMobile[focusableItemsMobile.length - 1];

    function openMenu() {
        navLinksContainer.classList.add('is-active');
        hamburgerBtn.classList.add('is-active');
        hamburgerBtn.setAttribute('aria-expanded', 'true');
        hamburgerBtn.setAttribute('aria-label', 'Fechar menu');
        firstFocusableItemMobile.focus();
    }

    function closeMenu() {
        navLinksContainer.classList.remove('is-active');
        hamburgerBtn.classList.remove('is-active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        hamburgerBtn.setAttribute('aria-label', 'Abrir menu');
        hamburgerBtn.focus();
    }

    hamburgerBtn.addEventListener('click', () => {
        const isMenuOpen = navLinksContainer.classList.contains('is-active');
        isMenuOpen ? closeMenu() : openMenu();
    });

    // ## REMOVIDO ## Listener específico de clique na UL foi removido daqui.
    // navLinksContainer.addEventListener('click', (e) => { ... });


    // --- PARTE 2: LÓGICA DO DROPDOWN (DESKTOP) ---
    const dropdownItems = document.querySelectorAll('.nav-links .dropdown-item');

    function closeAllDropdowns() {
        dropdownItems.forEach(item => {
            item.classList.remove('is-open');
            const link = item.querySelector('.nav-link');
            if (link) link.setAttribute('aria-expanded', 'false');
        });
    }

    dropdownItems.forEach(item => {
        // ... (Toda a lógica do dropdown com ArrowDown, Escape, Tab loop permanece igual) ...
         const mainLink = item.querySelector('.nav-link');
         const submenu = item.querySelector('.submenu');
         const submenuLinks = submenu.querySelectorAll('a');

         if (!mainLink || !submenu || submenuLinks.length === 0) return;

         const firstSubmenuLink = submenuLinks[0];
         const lastSubmenuLink = submenuLinks[submenuLinks.length - 1];

         mainLink.addEventListener('keydown', (e) => {
             const isDesktop = hamburgerBtn.offsetParent === null;
             if (isDesktop && e.key === 'ArrowDown') {
                 e.preventDefault();
                 closeAllDropdowns();
                 item.classList.add('is-open');
                 mainLink.setAttribute('aria-expanded', 'true');
                 firstSubmenuLink.focus();
             }
         });

         submenu.addEventListener('keydown', (e) => {
              const isDesktop = hamburgerBtn.offsetParent === null;
              if (!isDesktop) return;

             if (e.key === 'Escape') {
                 e.preventDefault();
                 item.classList.remove('is-open');
                 mainLink.setAttribute('aria-expanded', 'false');
                 mainLink.focus();
             }
             // ... (Tab loop no submenu) ...
             if (e.key === 'Tab' && !e.shiftKey && document.activeElement === lastSubmenuLink) { e.preventDefault(); firstSubmenuLink.focus(); }
             if (e.key === 'Tab' && e.shiftKey && document.activeElement === firstSubmenuLink) { e.preventDefault(); lastSubmenuLink.focus(); }
         });
    });


    // --- PARTE 3: LISTENERS GLOBAIS (ESC, Click-Out, Tab Trap Mobile) ---
    document.addEventListener('keydown', (e) => {
        // ... (Lógica do ESCAPE permanece igual) ...
         if (e.key === 'Escape') {
            if (navLinksContainer.classList.contains('is-active')) { e.preventDefault(); closeMenu(); }
            const openDropdown = document.querySelector('.dropdown-item.is-open');
            if (openDropdown) {
                 e.preventDefault();
                 const mainLink = openDropdown.querySelector('.nav-link');
                 openDropdown.classList.remove('is-open');
                 if (mainLink) {
                    mainLink.setAttribute('aria-expanded', 'false');
                    mainLink.focus();
                 }
            }
        }

        // ... (Lógica do FOCUS TRAP do Hamburger permanece igual) ...
        if (navLinksContainer.classList.contains('is-active')) {
            const isMobile = hamburgerBtn.offsetParent !== null;
            if (isMobile && e.key === 'Tab') {
                // ... (código do focus trap) ...
                 const focusableItemsMobile = navLinksContainer.querySelectorAll('a[href]:not([disabled]), button:not([disabled])');
                 const firstFocusableItemMobile = focusableItemsMobile[0];
                 const lastFocusableItemMobile = focusableItemsMobile[focusableItemsMobile.length - 1];
                 if (e.shiftKey) { if (document.activeElement === firstFocusableItemMobile) { e.preventDefault(); lastFocusableItemMobile.focus(); } }
                 else { if (document.activeElement === lastFocusableItemMobile) { e.preventDefault(); firstFocusableItemMobile.focus(); } }
            }
        }
    });

    // ## MODIFICADO ## Listener de clique GLOBAL
    document.addEventListener('click', (e) => {

        // 1. Fecha o dropdown de desktop se clicar fora dele
        if (!e.target.closest('.dropdown-item')) {
            closeAllDropdowns();
        }

        // 2. ## ADICIONADO ## Fecha o menu mobile ao clicar em um link DENTRO dele
        const isMobile = hamburgerBtn.offsetParent !== null;
        // Verifica se estamos no mobile E se o clique foi DENTRO do navLinksContainer E se o alvo foi um link <a>
        if (isMobile && navLinksContainer.classList.contains('is-active') && e.target.closest('#nav-links') && e.target.tagName === 'A') {
             closeMenu();
        }
    });

});