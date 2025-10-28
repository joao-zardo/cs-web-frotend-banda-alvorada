// Aguarda o documento carregar completamente
document.addEventListener('DOMContentLoaded', () => {
  
  // Seleciona o botão e a lista de links
  const hamburgerBtn = document.querySelector('.hamburger-menu');
  const navLinks = document.querySelector('#nav-links');

  // Verifica se os dois elementos existem antes de adicionar o evento
  if (hamburgerBtn && navLinks) {
    
    // --- Código Hamburguer ---
    hamburgerBtn.addEventListener('click', () => {
      
      // Alterna (adiciona/remove) a classe 'is-active' na lista de links
      navLinks.classList.toggle('is-active');

      // Verifica se o menu está ativo (aberto)
      const isActive = navLinks.classList.contains('is-active');

      // Atualiza os atributos de acessibilidade
      hamburgerBtn.setAttribute('aria-expanded', isActive);

      //Muda o ícone e o rótulo do botão
      if (isActive) {
        hamburgerBtn.innerHTML = '&times;'; // Ícone 'X' (fechar)
        hamburgerBtn.setAttribute('aria-label', 'Fechar menu');
      } else {
        hamburgerBtn.innerHTML = '&#9776;'; // Ícone Hamburguer
        hamburgerBtn.setAttribute('aria-label', 'Abrir menu');
      }
    });

    // Lógica para fechar o menu ao clicar em um link.
    // Seleciona TODOS os links (<a>) que estão dentro do menu (#nav-links)
    const allLinks = navLinks.querySelectorAll('a');
    // Cria um loop e adiciona um "escutador de clique" em CADA link
    allLinks.forEach(link => {
      link.addEventListener('click', () => {
        // FORÇA o fechamento do menu
        //    (Não usamos 'toggle', e sim 'remove' para garantir que feche)
        navLinks.classList.remove('is-active');
        // Reseta o botão do hamburger para o estado "fechado"
        //    (Isso garante que o botão volte ao normal)
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        hamburgerBtn.innerHTML = '&#9776;'; // Ícone Hamburguer
        hamburgerBtn.setAttribute('aria-label', 'Abrir menu');
      });
    });
  }
});