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
    // Esta função "desenha" um membro. Ela é inteligente e sabe quais classes CSS usar com base no 'tipo' do membro.
    function criarCardDeMembro(membro) {
        
        let classeDivPrincipal = '';
        let classeParagrafo = '';
        let textoParagrafo = '';

        // Define as classes e o texto com base no 'tipo'
        if (membro.tipo === 'bandmaster') {
            classeDivPrincipal = 'bandmaster-member';
            classeParagrafo = 'bandmaster-member-name';
            // (Função <parágrafo> Nome)
            textoParagrafo = `${membro.funcao} <br> ${membro.nome}`;
        } 
        else if (membro.tipo === 'board') {
            classeDivPrincipal = 'board-member';
            classeParagrafo = 'board-member-name';
            textoParagrafo = `${membro.funcao} <br> ${membro.nome}`;
        } 
        else { // 'team'
            classeDivPrincipal = 'team-member';
            classeParagrafo = 'team-member-name';
            textoParagrafo = membro.nome;
        }

        // Retorna a string HTML final para este membro, usando as variáveis definidas.
        return `
            <div class="${classeDivPrincipal}">
                <img src="${membro.imagem}" alt="Foto de ${membro.nome}">
                <p class="${classeParagrafo}">${textoParagrafo}</p>
            </div>
        `;
    }


/* --- 3. A LÓGICA (O "RENDERIZADOR") --- */
    const gridContainer = document.getElementById('membros-grid-container');

    // IMPORTANTE: O gridContainer pode não existir se esta função for chamada
    // na página errada, então o 'if' é crucial.
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