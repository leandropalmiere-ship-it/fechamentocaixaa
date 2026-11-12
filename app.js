function extrairSoftcase(texto) {
    const itens = {};

    // 1. Remove quebras de linha e múltiplos espaços, transformando em uma string única limpa
    const textoLimpo = texto.replace(/\r/g, ' ').replace(/\n/g, ' ').replace(/\s+/g, ' ');
    const textoUpper = textoLimpo.toUpperCase();

    // 2. Mapeamento das regras com Expressões Regulares flexíveis
    const descricoes = [
        { regex: /DINHEIRO\s*:?\s*(\d+)\s*R\s*\$\s*([\d\.,]+)/i, cat: "DINHEIRO" },
        { regex: /CREDITO\s+AMEX\s*(\d+)\s*R\s*\$\s*([\d\.,]+)/i, cat: "CRÉDITO AMEX" },
        { regex: /CREDITO\s+ELO\s*(\d+)\s*R\s*\$\s*([\d\.,]+)/i, cat: "CRÉDITO ELO" },
        { regex: /CREDITO\s+MASTERCARD\s*(\d+)\s*R\s*\$\s*([\d\.,]+)/i, cat: "CRÉDITO MASTERCARD" },
        { regex: /CREDITO\s+VISA\s*(\d+)\s*R\s*\$\s*([\d\.,]+)/i, cat: "CRÉDITO VISA" },
        { regex: /DEBITO\s+ELO\s*(\d+)\s*R\s*\$\s*([\d\.,]+)/i, cat: "DÉBITO ELO" },
        { regex: /DEBITO\s+MAESTRO\s*(\d+)\s*R\s*\$\s*([\d\.,]+)/i, cat: "DÉBITO MASTERCARD" },
        { regex: /DEBITO\s+MASTERCARD\s*(\d+)\s*R\s*\$\s*([\d\.,]+)/i, cat: "DÉBITO MASTERCARD" },
        { regex: /DEBITO\s+VISA_ELECTRON\s*(\d+)\s*R\s*\$\s*([\d\.,]+)/i, cat: "DÉBITO VISA" }
    ];

    descricoes.forEach(item => {
        const match = textoUpper.match(item.regex);
        if (match) {
            const qtd = parseInt(match[1], 10);
            const valLimpo = match[2].replace(/\./g, '').replace(',', '.');
            const valor = parseFloat(valLimpo);

            if (!isNaN(qtd) && !isNaN(valor) && (qtd > 0 || valor > 0)) {
                if (!itens[item.cat]) itens[item.cat] = { qtd: 0, valor: 0 };
                itens[item.cat].qtd += qtd;
                itens[item.cat].valor += valor;
            }
        }
    });

    return itens;
}