class Population {
    constructor(target_phrase, max, mutationRate) {
        this.population;
        this.matingPool;
        this.generations = 0;
        this.finished = false;
        this.target = target_phrase;
        this.mutationRate = mutationRate;
        this.perfectScore = this.target.length;

        this.best = '';

        this.population = [];
        for (let i = 0; i < max; i++) {
            this.population[i] = new DNA(this.target.length);
        }

        this.matingPool = [];
        this.calcFitness();
    }
    calcFitness() {
        for (var indiv of this.population) {
            indiv.calcfitness(this.target);
        }
    }
    naturalSelection() {
        this.matingPool = [];

        for (var indiv of this.population) {
            for (let i = 0; i < indiv.fitness; i++) {
                this.matingPool.push(indiv);
            }
        }
    }
    generate() {
        for (let i = 0; i < this.population.length; i++) {
            let a = floor(random(this.matingPool.length));
            let b = floor(random(this.matingPool.length));

            let partnerA = this.matingPool[a];
            let partnerB = this.matingPool[b];

            let child = partnerA.crossover(partnerB);
            child.mutate(this.mutationRate);

            this.population[i] = child;
        }
        this.generations++;

    }
    getBest() {
        return this.best;
    }
    evaluate() {
        let worldRecord = 0;
        let index = 0;
        for (let i = 0; i < this.population.length; i++) {
            if (this.population[i].fitness > worldRecord) {
                index = i;
                worldRecord = this.population[i].fitness;
            }
        }
        this.best = this.population[index].getFrase();
        if (worldRecord == this.perfectScore) {
            this.finished = true;
        }

    }
    acabou() {
        return this.finished;
    }
    avgFitness() {
        var soma = 0;
        for (var indiv of this.population) {
            soma += indiv.fitness;
        }
        return soma / this.population.length;
    }
    getFrases() {
        var texto = '';
        for (var indiv of this.population) {
            texto += indiv.getFrase() + ', ';
        }
        return texto;
    }

}