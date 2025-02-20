// Récupérez tous les éléments DOM avec la classe "katex"
const katexElements = document.querySelectorAll(".katex");

// Créez un objet contenant les associations entre les id et les expressions LaTeX pour la loi hypergéométrique
const latexExpressionsHypergeometrique = {
    "hypergeometric-distribution__notation": "\\text{Loi hypergéométrique}", // Notation
    "hypergeometric-distribution__parameters": "N, K, n", // Paramètres (population totale N, nombre d'éléments de la classe K, taille de l'échantillon n)
    "hypergeometric-distribution__support": "x \\in \\{0, 1, 2, \\ldots, n\\}", // Support
    "hypergeometric-distribution__probability-mass-function": "f(x) = \\frac{\\binom{K}{x} \\binom{N-K}{n-x}}{\\binom{N}{n}}", // Fonction de masse de probabilité
    "hypergeometric-distribution__mean": "\\mu = \\frac{nK}{N}", // Moyenne
    "hypergeometric-distribution__variance": "\\sigma^2 = \\frac{nK(N-K)(N-n)}{N^2(N-1)}", // Variance
    "hypergeometric-distribution__median": "\\text{Médiane} = \\lfloor \\frac{n+1}{2} \\rfloor", // Médiane
    "hypergeometric-distribution__mode": "\\text{Mode} = \\max\\left(0, \\lfloor \\frac{(n+1)(K+1)}{N+2} \\rfloor - 1\\right)", // Mode
    "hypergeometric-distribution__entropy": "H(N, K, n) = \\log(N+1) + \\log(n+1) - \\log(K+1) - \\log(N-K+1) - \\log(n-k+1) - \\log(N-n-k+1)" // Entropie
};

// Parcourez les éléments avec la classe "katex" et affichez les équations KaTeX en utilisant les id et les expressions LaTeX
katexElements.forEach((element) => {
    const id = element.id;
    if (id && latexExpressionsHypergeometrique.hasOwnProperty(id)) {
        const latexExpression = latexExpressionsHypergeometrique[id];
        try {
            katex.render(latexExpression, element);
        } catch (error) {
            console.error("Erreur KaTeX : " + error);
        }
    }
});