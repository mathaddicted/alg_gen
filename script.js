var começou = false;

function setup() {
    noCanvas();
    botao = select('#botao');
}

function draw() {
    botao.mousePressed(function () {
        if (começou) {
            começou = false;
            botao.value('Começar');
        } else {
            começou = true;
            botao.value('Parar');
            p = select('#frase').value();
            mut = select('#taxa').value() / 100;
            num = select('#individuos').value();
            if (p == '' || mut == 0 || num == '') {
                começou = false;
                botao.value('Começar');
            } else {
                popul = new Population(p, num, mut);
            }

        }
    });

    if (começou) {
        popul.naturalSelection();
        if (popul.matingPool.length == 0) {
            popul = new Population(p, num, mut);
        } else {
            popul.naturalSelection();
            popul.generate();
            popul.calcFitness();
            popul.evaluate();
        }
        select('#best').html('Melhor da geração: <span style="color:#10cd00">' + popul.getBest() + '</span>');
        select('#generations').html('Número total de gerações: <span style="color:#10cd00">' + popul.generations + '</span>');
        select('#aptidao').html('Aptidão média (max = <span style="color:#10cd00">' + popul.target.length + '): ' + round(popul.avgFitness()) + '</span>');
        select('#mutt').html('Taxa de mutação: <span style="color:#10cd00">' + popul.mutationRate * 100 + '%' + '</span>');

        select('#geradas').html(popul.getFrases());

        if (popul.acabou()) {
            começou = false;
            botao.value('Começar');
        }
    }
}