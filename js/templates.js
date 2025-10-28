/* 'DOMContentLoaded' NÃO é necessário aqui, pois este script será chamado manualmente pelo roteador (router.js). */

// "Envelopamos" tudo em uma função com um nome claro
function renderizarPaginaMembros() {
    console.log('Renderizando template de membros...');

    /* --- 1. OS DADOS (DATA) --- */
    const membrosDaBanda = [
        {
            nome: "Geraldo Souza",
            funcao: "Presidente e Maestro",
            imagem: "https://placehold.co/150x150/2563EB/FFFFFF?text=GS",
            tipo: "bandmaster" 
        },
        {
            nome: "Emanuela Pereira",
            funcao: "Vice-presidente",
            imagem: "https://placehold.co/150x150/2563EB/FFFFFF?text=EP",
            tipo: "board"
        },
        {
            nome: "Manuel da Costa",
            funcao: "Secretário",
            imagem: "https://placehold.co/150x150/2563EB/FFFFFF?text=MS",
            tipo: "board"
        },
        {
            nome: "Miguel Machado",
            funcao: "Tesoureiro",
            imagem: "https://placehold.co/150x150/2563EB/FFFFFF?text=MM",
            tipo: "board"
        },
        { nome: "Lucas Silva", funcao: "", imagem: "https://placehold.co/150x150/2563EB/FFFFFF?text=LS", tipo: "team" },
        { nome: "Sofia Santos", funcao: "", imagem: "https://placehold.co/150x150/2563EB/FFFFFF?text=SS", tipo: "team" },
        { nome: "Miguel Oliveira", funcao: "", imagem: "https://placehold.co/150x150/2563EB/FFFFFF?text=MO", tipo: "team" },
        { nome: "Julia Souza", funcao: "", imagem: "https://placehold.co/150x150/2563EB/FFFFFF?text=JS", tipo: "team" },
        { nome: "Arthur Rodrigues", funcao: "", imagem: "https://placehold.co/150x150/2563EB/FFFFFF?text=AR", tipo: "team" },
        { nome: "Isabella Ferreira", funcao: "", imagem: "https://placehold.co/150x150/2563EB/FFFFFF?text=IF", tipo: "team" },
        { nome: "Heitor Alves", funcao: "", imagem: "https://placehold.co/150x150/2563EB/FFFFFF?text=HA", tipo: "team" },
        { nome: "Manuela Pereira", funcao: "", imagem: "https://placehold.co/150x150/2563EB/FFFFFF?text=MP", tipo: "team" },
        { nome: "Bernardo Lima", funcao: "", imagem: "https://placehold.co/150x150/2563EB/FFFFFF?text=BL", tipo: "team" },
        { nome: "Laura Gomes", funcao: "", imagem: "https://placehold.co/150x150/2563EB/FFFFFF?text=LG", tipo: "team" },
        { nome: "Davi Costa", funcao: "", imagem: "https://placehold.co/150x150/2563EB/FFFFFF?text=DC", tipo: "team" },
        { nome: "Valentina Ribeiro", funcao: "", imagem: "https://placehold.co/150x150/2563EB/FFFFFF?text=VR", tipo: "team" },
        { nome: "Théo Martins", funcao: "", imagem: "https://placehold.co/150x150/2563EB/FFFFFF?text=TM", tipo: "team" },
        { nome: "Alice Carvalho", funcao: "", imagem: "https://placehold.co/150x150/2563EB/FFFFFF?text=AC", tipo: "team" },
        { nome: "Gabriel Almeida", funcao: "", imagem: "https://placehold.co/150x150/2563EB/FFFFFF?text=GA", tipo: "team" },
        { nome: "Helena Lopes", funcao: "", imagem: "https://placehold.co/150x150/2563EB/FFFFFF?text=HL", tipo: "team" },
        { nome: "Pedro Silva", funcao: "", imagem: "https://placehold.co/150x150/2563EB/FFFFFF?text=PS", tipo: "team" },
        { nome: "Luiza Santos", funcao: "", imagem: "https://placehold.co/150x150/2563EB/FFFFFF?text=LS", tipo: "team" },
        { nome: "Enzo Oliveira", funcao: "", imagem: "https://placehold.co/150x150/2563EB/FFFFFF?text=EO", tipo: "team" },
        { nome: "Maria Souza", funcao: "", imagem: "https://placehold.co/150x150/2563EB/FFFFFF?text=MS", tipo: "team" },
        { nome: "Lorenzo Rodrigues", funcao: "", imagem: "https://placehold.co/150x150/2563EB/FFFFFF?text=LR", tipo: "team" },
        { nome: "Yasmin Ferreira", funcao: "", imagem: "https://placehold.co/150x150/2563EB/FFFFFF?text=YF", tipo: "team" },
        { nome: "Matheus Alves", funcao: "", imagem: "https://placehold.co/150x150/2563EB/FFFFFF?text=MA", tipo: "team" },
        { nome: "Mariana Pereira", funcao: "", imagem: "https://placehold.co/150x150/2563EB/FFFFFF?text=MP", tipo: "team" },
        { nome: "Benjamin Lima", funcao: "", imagem: "https://placehold.co/150x150/2563EB/FFFFFF?text=BL", tipo: "team" },
        { nome: "Giovanna Gomes", funcao: "", imagem: "https://placehold.co/150x150/2563EB/FFFFFF?text=GG", tipo: "team" },
        { nome: "Nicolas Costa", funcao: "", imagem: "https://placehold.co/150x150/2563EB/FFFFFF?text=NC", tipo: "team" },
        { nome: "Cecília Ribeiro", funcao: "", imagem: "https://placehold.co/150x150/2563EB/FFFFFF?text=CR", tipo: "team" },
        { nome: "Guilherme Martins", funcao: "", imagem: "https://placehold.co/150x150/2563EB/FFFFFF?text=GM", tipo: "team" },
        { nome: "Maria Carvalho", funcao: "", imagem: "https://placehold.co/150x150/2563EB/FFFFFF?text=MC", tipo: "team" },
        { nome: "Samuel Almeida", funcao: "", imagem: "https://placehold.co/150x150/2563EB/FFFFFF?text=SA", tipo: "team" },
        { nome: "Heloísa Lopes", funcao: "", imagem: "https://placehold.co/150x150/2563EB/FFFFFF?text=HL", tipo: "team" },
        { nome: "Rafael Silva", funcao: "", imagem: "https://placehold.co/150x150/2563EB/FFFFFF?text=RS", tipo: "team" },
        { nome: "Beatriz Santos", funcao: "", imagem: "https://placehold.co/150x150/2563EB/FFFFFF?text=BS", tipo: "team" },
        { nome: "Joaquim Oliveira", funcao: "", imagem: "https://placehold.co/150x150/2563EB/FFFFFF?text=JO", tipo: "team" },
        { nome: "Lívia Souza", funcao: "", imagem: "https://placehold.co/150x150/2563EB/FFFFFF?text=LS", tipo: "team" }
    ];

    
/* --- 2. O TEMPLATE (O "MOLDE" HTML) --- */
    function criarCardDeMembro(membro) {
        
        let classeArticle = '';
        let classeHeading = ''; // O nome da classe para o H2
        let funcaoHtml = '';    // O HTML para o parágrafo da função

        // Define as classes e o texto com base no 'tipo'
        if (membro.tipo === 'bandmaster') {
            classeArticle = 'bandmaster-member';
            // A sua classe de nome será aplicada ao H2
            classeHeading = 'bandmaster-member-name'; 
            // Criamos um <p> separado para a função
            funcaoHtml = `<p class="bandmaster-member-role">${membro.funcao}</p>`;
        } 
        else if (membro.tipo === 'board') {
            classeArticle = 'board-member';
            classeHeading = 'board-member-name';
            funcaoHtml = `<p class="board-member-role">${membro.funcao}</p>`;
        } 
        else { // 'team'
            classeArticle = 'team-member';
            classeHeading = 'team-member-name';
            // A função está vazia, então não geramos o <p>
            funcaoHtml = ''; 
        }

        // Retorna a string HTML final com a estrutura semântica correta
        return `
            <article class="${classeArticle}">
                <img src="${membro.imagem}" alt="Foto de ${membro.nome}">
                
                <h2 class="${classeHeading}">${membro.nome}</h2>
                
                ${funcaoHtml}
            </article>
        `;
    }


/* --- 3. A LÓGICA (O "RENDERIZADOR") --- */
    // (Esta seção permanece 100% idêntica)
    const gridContainer = document.getElementById('membros-grid-container');

    if (gridContainer) {
        
        let htmlFinalDosCards = '';
        membrosDaBanda.forEach(membro => {
            htmlFinalDosCards += criarCardDeMembro(membro);
        });
        gridContainer.innerHTML = htmlFinalDosCards;

    } else {
        console.error('Container #membros-grid-container não encontrado!');
    }

}