// Récupérez tous les éléments DOM avec la classe "katex"
const katexElements = document.querySelectorAll(".katex");

// Créez un objet contenant les associations entre les id et les expressions LaTeX pour la loi binomiale
const latexExpressionsBinomiale = {
    "binomial-distribution__notation": "\\text{Loi binomiale}", // Notation
    "binomial-distribution__parameters": "(n, p)", // Paramètres (nombre d'essais n, probabilité de succès p)
    "binomial-distribution__support": "x \\in \\{0, 1, 2, \\ldots, n\\}", // Support
    "binomial-distribution__probability-mass-function": "f(x) = \\binom{n}{x} p^x (1 - p)^{n - x}", // Fonction de masse de probabilité
    "binomial-distribution__mean": "\\mu = np", // Moyenne
    "binomial-distribution__variance": "\\sigma^2 = np(1 - p)", // Variance
    "binomial-distribution__median": "\\text{Médiane} \\approx np", // Médiane (approximée)
    "binomial-distribution__mode": "\\text{Mode} = \\lfloor (n + 1)p \\rfloor", // Mode
    "binomial-distribution__entropy": "H(p) = -\\sum_{x=0}^{n} \\binom{n}{x} p^x (1 - p)^{n - x} \\log\\left(\\binom{n}{x} p^x (1 - p)^{n - x}\\right)" // Entropie
};

// Parcourez les éléments avec la classe "katex" et affichez les équations KaTeX en utilisant les id et les expressions LaTeX
katexElements.forEach((element) => {
    const id = element.id;
    if (id && latexExpressionsBinomiale.hasOwnProperty(id)) {
        const latexExpression = latexExpressionsBinomiale[id];
        try {
            katex.render(latexExpression, element);
        } catch (error) {
            console.error("Erreur KaTeX : " + error);
        }
    }
});