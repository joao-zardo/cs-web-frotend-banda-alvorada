document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SELEÇÃO DE ELEMENTOS ---
    const form = document.getElementById('form-cadastro');
    const submitButton = document.getElementById('btn-enviar');
    const cpfInput = document.getElementById('cpf');
    const telefoneInput = document.getElementById('telefone');
    const cepInput = document.getElementById('cep');
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const enderecoInput = document.getElementById('endereco');
    const cidadeInput = document.getElementById('cidade');
    const estadoInput = document.getElementById('estado');
    const tagsContainer = document.getElementById('tags-interesses');
    const allTags = tagsContainer.querySelectorAll('.tag');

    // Componentes de Feedback
    const formAlert = document.getElementById('form-alert');
    const modal = document.getElementById('modal-confirmacao');
    const modalConfirmBtn = document.getElementById('modal-botao-confirmar');
    const modalCancelBtn = document.getElementById('modal-botao-cancelar');
    const toast = document.getElementById('form-toast');
    const statusContainer = document.getElementById('status-candidato');
    const badgeElement = document.getElementById('badge-tipo-membro');
    
    // Lista de todos os inputs que precisam de validação
    const allInputs = [nomeInput, emailInput, cpfInput, telefoneInput, cepInput, enderecoInput, cidadeInput, estadoInput];

    // --- 2. FUNÇÕES DE AJUDA (Helpers) ---
    
    // Validação Visual
    function showError(input, message) {
        const formGroup = input.parentElement;
        formGroup.classList.remove('success');
        formGroup.classList.add('error');
        const errorMessage = formGroup.querySelector('.validation-message');
        errorMessage.textContent = message;
    }

    function showSuccess(input) {
        const formGroup = input.parentElement;
        formGroup.classList.remove('error');
        formGroup.classList.add('success');
        const errorMessage = formGroup.querySelector('.validation-message');
        errorMessage.textContent = '';
    }
    
    // Limpa a validação (para quando o usuário está digitando)
    function clearValidation(input) {
        const formGroup = input.parentElement;
        formGroup.classList.remove('error');
        formGroup.classList.remove('success');
        const errorMessage = formGroup.querySelector('.validation-message');
        errorMessage.textContent = '';
    }

    // Feedback (Modal/Toast)
    function showModal() { modal.style.display = 'flex'; setTimeout(() => modal.classList.add('show'), 10); }
    function hideModal() { modal.classList.remove('show'); setTimeout(() => modal.style.display = 'none', 300); }
    function showToast() {
        toast.style.display = 'block';
        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.style.display = 'none', 400);
        }, 3000);
    }

    function updateBadgeStatus() {
        const selectedTags = tagsContainer.querySelectorAll('.tag.selected');
        let isMusico = false;
        let isApoio = false;

        selectedTags.forEach(tag => {
            const valor = tag.dataset.valor; // Pega o 'data-valor' da tag
            if (['percussao', 'sopros', 'corpo-coreografico', 'bandeiras'].includes(valor)) {
                isMusico = true;
            }
            if (valor === 'logistica') {
                isApoio = true;
            }
        });

    // Lógica de prioridade: "Músico" tem prioridade sobre "Apoio"
        if (isMusico) {
            badgeElement.textContent = "Músico/Artista";
            badgeElement.className = "badge"; // Reseta para a classe/cor padrão
            statusContainer.style.display = "block"; // Mostra o container
        } else if (isApoio) {
            badgeElement.textContent = "Voluntário/Apoio";
            badgeElement.className = "badge badge-apoio"; // Aplica a cor de "apoio"
            statusContainer.style.display = "block"; // Mostra o container
        } else {
            // Se nenhuma tag for selecionada, esconde o badge
            statusContainer.style.display = "none";
        }   
    }

    // --- 3. FUNÇÕES DE VALIDAÇÃO ESPECÍFICAS ---
    // Cada campo agora tem sua própria lógica de validação
    
    function validateNome() {
        if (nomeInput.value.trim() === "") return showError(nomeInput, 'Nome completo é obrigatório.');
        if (nomeInput.value.trim().split(' ').length < 2) return showError(nomeInput, 'Por favor, digite nome e sobrenome.');
        return showSuccess(nomeInput);
    }

    function validateEmail() {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (emailInput.value.trim() === "") return showError(emailInput, 'Email é obrigatório.');
        if (!re.test(String(emailInput.value).toLowerCase())) return showError(emailInput, 'Formato de email inválido.');
        return showSuccess(emailInput);
    }
    
    function validateCpf() {
        if (cpfInput.value.trim() === "") return showError(cpfInput, 'CPF obrigatório.');
        if (cpfInput.value.length < 14) return showError(cpfInput, 'CPF incompleto. Formato: 000.000.000-00');
        return showSuccess(cpfInput);
    }

    function validateTelefone() {
        if (telefoneInput.value.trim() === "") return showError(telefoneInput, 'Telefone obrigatório.');
        if (telefoneInput.value.length < 15) return showError(telefoneInput, 'Telefone incompleto. Formato: (00) 00000-0000');
        return showSuccess(telefoneInput);
    }

    function validateCep() {
        if (cepInput.value.trim() === "") return showError(cepInput, 'CEP obrigatório.');
        if (cepInput.value.length < 9) return showError(cepInput, 'CEP incompleto. Formato: 00000-000');
        return showSuccess(cepInput);
    }
    
    // Validador genérico para campos de texto obrigatórios
    function validateRequiredText(input) {
        if (input.value.trim() === "") return showError(input, 'Este campo é obrigatório.');
        return showSuccess(input);
    }

    // Validação das Tags
    function validateTags() {
        const selectedTags = tagsContainer.querySelectorAll('.tag.selected').length;
        const tagsErrorEl = tagsContainer.nextElementSibling;
        const tagsFormGroup = tagsContainer.parentElement;

        if (selectedTags === 0) {
            tagsFormGroup.classList.add('error');
            tagsFormGroup.classList.remove('success');
            tagsErrorEl.textContent = 'Selecione pelo menos um interesse.';
            return false;
        } else {
            tagsFormGroup.classList.remove('error');
            tagsFormGroup.classList.add('success');
            tagsErrorEl.textContent = '';
            return true;
        }
    }

    // --- 4. FUNÇÃO DE CHECAGEM DO BOTÃO ---
    // NÃO MOSTRA erros, apenas checa os valores para o botão.
    function checkButtonState() {
        const cpfValido = cpfInput.value.length === 14;
        const telefoneValido = telefoneInput.value.length === 15;
        const cepValido = cepInput.value.length === 9;
        const nomeValido = nomeInput.value.trim() !== "" && nomeInput.value.trim().split(' ').length >= 2;
        const emailValido = emailInput.value.includes('@') && /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(emailInput.value);
        const enderecoValido = enderecoInput.value.trim() !== "";
        const cidadeValido = cidadeInput.value.trim() !== "";
        const estadoValido = estadoInput.value.trim() !== "";
        const tagsValidas = tagsContainer.querySelectorAll('.tag.selected').length > 0;

        if (cpfValido && telefoneValido && cepValido && nomeValido && emailValido && enderecoValido && cidadeValido && estadoValido && tagsValidas) {
            submitButton.disabled = false; // Habilita o botão
        } else {
            submitButton.disabled = true; // Desabilita o botão
        }
    }


    // --- 5. EVENT LISTENERS ---

    // Máscaras para chamar 'checkButtonState' (silencioso)
    cpfInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, ''); 
        value = value.replace(/(\d{3})(\d)/, '$1.$2'); 
        value = value.replace(/(\d{3})(\d)/, '$1.$2'); 
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); 
        e.target.value = value;
        checkButtonState(); // Apenas checa o botão
    });
    telefoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/^(\d{2})(\d)/g, '($1) $2'); 
        value = value.replace(/(\d{5})(\d)/, '$1-$2'); 
        e.target.value = value;
        checkButtonState(); // Apenas checa o botão
    });
    cepInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, ''); 
        value = value.replace(/^(\d{5})(\d)/, '$1-$2'); 
        e.target.value = value; 
        checkButtonState(); // Apenas checa o botão
    });

    // Outros inputs também chamam a checagem silenciosa
    nomeInput.addEventListener('input', checkButtonState);
    emailInput.addEventListener('input', checkButtonState);
    enderecoInput.addEventListener('input', checkButtonState);
    cidadeInput.addEventListener('input', checkButtonState);
    estadoInput.addEventListener('input', checkButtonState);

    // Validadores "on blur" (quando o usuário SAI do campo). Erros vermelhos aparecem aqui
    nomeInput.addEventListener('blur', validateNome);
    emailInput.addEventListener('blur', validateEmail);
    cpfInput.addEventListener('blur', validateCpf);
    telefoneInput.addEventListener('blur', validateTelefone);
    cepInput.addEventListener('blur', validateCep);
    enderecoInput.addEventListener('blur', () => validateRequiredText(enderecoInput));
    cidadeInput.addEventListener('blur', () => validateRequiredText(cidadeInput));
    estadoInput.addEventListener('blur', () => validateRequiredText(estadoInput));

    // Tags (clique)
    allTags.forEach(tag => {
        tag.addEventListener('click', () => {
            tag.classList.toggle('selected');
            checkButtonState(); // Checa o botão
            validateTags();     // Mostra erro/sucesso nas tags
            updateBadgeStatus();
        });
        tag.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tag.click(); }
        });
    });

    // Envio do Formulário (Submit)
    form.addEventListener('submit', (e) => {
        e.preventDefault(); 
        
        // Roda TODAS as validações visuais uma última vez
        validateNome();
        validateEmail();
        validateCpf();
        validateTelefone();
        validateCep();
        validateRequiredText(enderecoInput);
        validateRequiredText(cidadeInput);
        validateRequiredText(estadoInput);
        validateTags();
        
        // Checa o botão
        checkButtonState(); 

        if (!submitButton.disabled) {
            formAlert.style.display = 'none';
            showModal(); // Mostra o MODAL
        } else {
            formAlert.textContent = 'Por favor, corrija os erros no formulário antes de enviar.';
            formAlert.style.display = 'block'; // Mostra o ALERTA
        }
    });

    // Listeners do MODAL
    modalCancelBtn.addEventListener('click', hideModal);
    modalConfirmBtn.addEventListener('click', () => {
        hideModal();
        console.log('Formulário enviado com sucesso!'); 
        form.reset(); 
        allTags.forEach(tag => tag.classList.remove('selected'));
        
        // Limpa todos os status visuais
        allInputs.forEach(clearValidation);
        const tagsFormGroup = tagsContainer.parentElement;
        tagsFormGroup.classList.remove('success', 'error');
        tagsFormGroup.querySelector('.validation-message').textContent = '';
        
        statusContainer.style.display = 'none';
        
        submitButton.disabled = true;
        showToast();
    });

    // Chamada inicial para definir o estado do botão ao carregar a página
    checkButtonState(); 
});