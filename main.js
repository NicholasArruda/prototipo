// Função para confirmar a presença
function confirmPresence(button) {
    const listItem = button.closest('li');
    const statusSpan = listItem.querySelector('.status');
    const matriculaInput = listItem.querySelector('.matricula-input');
    const reviseBtn = listItem.querySelector('.revise-btn');
    const revisionCountSpan = listItem.querySelector('.revision-count');

    if (matriculaInput.value.trim() !== "") {
        statusSpan.classList.remove('absent');
        statusSpan.classList.add('present');
        statusSpan.textContent = "Presente";
        matriculaInput.disabled = true;
        button.style.display = 'none';
        reviseBtn.style.display = 'inline-block';
        reviseBtn.disabled = false;
        revisionCountSpan.style.display = 'inline-block';
    } else {
        alert('Por favor, insira a matrícula.');
    }
}

// Função para revisar a matrícula
function reviseMatricula(button) {
    const listItem = button.closest('li');
    const statusSpan = listItem.querySelector('.status');
    const matriculaInput = listItem.querySelector('.matricula-input');
    const confirmBtn = listItem.querySelector('.confirm-btn');
    const revisionCountSpan = listItem.querySelector('.revision-count');
    let remainingRevisions = parseInt(revisionCountSpan.textContent.split(': ')[1]);

    if (remainingRevisions > 0) {
        statusSpan.classList.remove('present');
        statusSpan.classList.add('absent');
        statusSpan.textContent = "Ausente";
        matriculaInput.disabled = false;
        confirmBtn.style.display = 'inline-block';
        button.style.display = 'none';
        remainingRevisions--;
        revisionCountSpan.textContent = `Revisões restantes: ${remainingRevisions}`;
        if (remainingRevisions === 0) {
            button.disabled = true;
        }
    } else {
        alert('Número máximo de revisões alcançado.');
    }
}

// Seleciona todos os botões de confirmação
document.querySelectorAll('.confirm-btn').forEach(function(button) {
    button.addEventListener('click', function() {
        confirmPresence(this);
    });
});

// Seleciona todos os botões de revisão
document.querySelectorAll('.revise-btn').forEach(function(button) {
    button.addEventListener('click', function() {
        reviseMatricula(this);
    });
});
function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Data e hora atual
    const currentDate = new Date();
    const dateString = currentDate.toLocaleDateString('pt-BR');
    const timeString = currentDate.toLocaleTimeString('pt-BR');

    // Adiciona título, data e hora ao PDF
    doc.setFontSize(22);
    doc.text('Lista de Presença', 105, 20, null, null, 'center');
    doc.setFontSize(12);
    doc.text(`Data: ${dateString}`, 20, 30);
    doc.text(`Hora: ${timeString}`, 150, 30);

    // Linha de cabeçalho
    doc.setFontSize(14);
    doc.text('Nome', 20, 45);
    doc.text('Status', 160, 45);
    doc.line(20, 47, 190, 47); // Linha horizontal abaixo do cabeçalho

    // Adiciona a lista ao PDF
    let yPosition = 55;
    document.querySelectorAll("#attendanceList li").forEach(function(item) {
        const name = item.querySelector("span:first-child").textContent;
        const status = item.querySelector(".status").textContent;
        doc.text(name, 20, yPosition);
        doc.text(status, 160, yPosition);
        yPosition += 10;
    });

    // Salva o PDF com um nome padrão
    doc.save(`Lista_de_Presenca_${dateString}.pdf`);
}
