document.addEventListener('DOMContentLoaded', function () {
    const btnSimular = document.getElementById('btn-simular');
    
    // Banco de Dados das Culturas e Recomendações Sustentáveis
    const planoDeRotacao = {
        soja: {
            nome: "Soja",
            impacto: "Positivo",
            score: "Excelente",
            classeScore: "bg-excelente",
            statusSolo: "Enriquecido com Nitrogênio",
            progresso: 85,
            dica: "A soja fixa nitrogênio no solo através de simbiose com bactérias. Excelente escolha comercial e ecológica para abrir o ciclo!",
            ciclo: [
                { titulo: "Soja (Verão)", desc: "Cultura atual. Fixa nitrogênio no solo de forma natural, economizando adubos químicos no futuro." },
                { titulo: "Milho Safrinha (Outono)", desc: "Excelente sucessor. Aproveita os nutrientes deixados pela soja e gera grande quantidade de palhada protetora." },
                { titulo: "Brachiaria / Aveia (Inverno)", desc: "Planta de cobertura. Suas raízes profundas descompactam o solo e evitam a erosão pelas chuvas de inverno." },
                { titulo: "Algodão ou Trigo (Ano 2)", desc: "Quebra o ciclo de pragas da soja. O solo estará extremamente fértil e pronto para alta produtividade." }
            ]
        },
        milho: {
            nome: "Milho",
            impacto: "Moderado",
            score: "Bom",
            classeScore: "bg-bom",
            statusSolo: "Consumo de Nitrogênio Alto",
            progresso: 65,
            dica: "O milho produz muita biomassa (palhada), protegendo o solo contra erosão, mas consome muito nitrogênio. Precisa de uma leguminosa a seguir.",
            ciclo: [
                { titulo: "Milho (Verão)", desc: "Cultura atual. Excelente produtor de palhada e matéria orgânica para a superfície do solo." },
                { titulo: "Feijão ou Ervilha (Outono)", desc: "Indispensável. Uma leguminosa de ciclo curto para repor o nitrogênio que o milho absorveu em grande quantidade." },
                { titulo: "Nabo Forrageiro (Inverno)", desc: "Cultura de cobertura fantástica. Recicla nutrientes profundos e descompacta o solo mecanicamente." },
                { titulo: "Soja (Ano 2)", desc: "O retorno da rainha das safras. Encontra um solo bem estruturado e com palhada em decomposição." }
            ]
        },
        trigo: {
            nome: "Trigo",
            impacto: "Moderado",
            score: "Regular",
            classeScore: "bg-regular",
            statusSolo: "Estrutura Física Boa",
            progresso: 55,
            dica: "O trigo estabiliza o solo no inverno, mas o monocultivo de gramíneas satura a terra. Intercale urgentemente com plantas fixadoras de nutrientes.",
            ciclo: [
                { titulo: "Trigo (Cereal de Inverno)", desc: "Cultura atual. Mantém o caixa da fazenda ativo no inverno e protege o solo contra geadas e vento." },
                { titulo: "Soja (Verão Inicial)", desc: "Entra imediatamente após a colheita do trigo. Aproveita o solo limpo e faz o aporte biológico de nitrogênio." },
                { titulo: "Crotalária (Outono/Inverno)", desc: "Planta fantástica para controle de nematoides (vermes do solo) e enriquecimento verde." },
                { titulo: "Milho (Ano 2)", desc: "Garante o balanço ideal de carbono e nitrogênio após o revesamento com soja e crotalária." }
            ]
        },
        algodao: {
            nome: "Algodão",
            impacto: "Exigente",
            score: "Crítico",
            classeScore: "bg-critico",
            statusSolo: "Solo Altamente Desgastado",
            progresso: 35,
            dica: "O algodão é muito exigente em nutrientes e defensivos. É obrigatório fazer rotação com gramíneas agressivas (como Milho/Brachiaria) para recuperar o solo.",
            ciclo: [
                { titulo: "Algodão (Safra Principal)", desc: "Cultura atual. Alta rentabilidade, porém deixa o solo vulnerável e desprotetido após a colheita." },
                { titulo: "Brachiaria ruziziensis (Outono)", desc: "Urgente! Cria uma raiz poderosa que recupera a biologia do solo estressada pelo algodão." },
                { titulo: "Milheto (Inverno)", desc: "Planta rústica que aguenta a seca e produz biomassa rápida, protegendo a terra contra os raios solares fortes." },
                { titulo: "Soja (Ano 2)", desc: "Essencial para trazer vida e nitrogênio de volta, preparando a terra para um futuro ciclo de algodão daqui a 2 anos." }
            ]
        }
    };

    btnSimular.addEventListener('click', function () {
        const culturaSelecionada = document.getElementById('cultura-atual').value;
        const condicaoSolo = document.getElementById('historico-solo').value;
        const tamanhoArea = document.getElementById('tamanho-area').value;

        // Recupera a estratégia baseada na cultura
        const dadosPlano = planoDeRotacao[culturaSelecionada];

        // Ajuste fino lógico baseado na condição inicial informada pelo usuário
        let progressoFinal = dadosPlano.progresso;
        let scoreTexto = dadosPlano.score;
        let classeScoreFinal = dadosPlano.classeScore;

        if (condicaoSolo === 'esgotado') {
            progressoFinal = Math.max(20, progressoFinal - 20);
            scoreTexto = "Crítico (Solo Esgotado)";
            classeScoreFinal = "bg-critico";
        } else if (condicaoSolo === 'bom') {
            progressoFinal = Math.min(100, progressoFinal + 15);
            if (progressoFinal > 75) {
                scoreTexto = "Sustentável Avançado";
                classeScoreFinal = "bg-excelente";
            }
        }

        // 1. Atualizar Indicadores Visualmente
        const progressBar = document.getElementById('progresso-solo');
        const txtStatusSolo = document.getElementById('texto-status-solo');
        const badgeScore = document.getElementById('score-ambiental');
        const alertaDica = document.getElementById('alerta-dica');

        progressBar.style.width = progressoFinal + '%';
        
        // Altera a cor da barra dependendo do nível de perigo
        if (progressoFinal < 40) {
            progressBar.style.backgroundColor = '#d32f2f';
        } else if (progressoFinal < 70) {
            progressBar.style.backgroundColor = '#ff9800';
        } else {
            progressBar.style.backgroundColor = '#2e7d32';
        }

        txtStatusSolo.innerText = `${dadosPlano.statusSolo} (${progressoFinal}% de Saúde)`;
        
        badgeScore.innerText = scoreTexto;
        badgeScore.className = `badge-score ${classeScoreFinal}`;

        alertaDica.className = "alert-box success";
        alertaDica.innerHTML = `<strong>Recomendação Técnica para ${tamanhoArea} Hectares:</strong> ${dadosPlano.dica}`;

        // 2. Atualizar o Calendário de Linha do Tempo (4 Estações) dinamicamente
        for (let i = 0; i < 4; i++) {
            document.getElementById(`cal-title-${i+1}`).innerText = dadosPlano.ciclo[i].titulo;
            document.getElementById(`cal-desc-${i+1}`).innerText = dadosPlano.ciclo[i].desc;
        }

        // Rola a tela suavemente até os resultados para melhorar o feedback visual
        document.getElementById('resultado-container').scrollIntoView({ behavior: 'smooth' });
    });
});