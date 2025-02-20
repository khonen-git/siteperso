// Récupérez tous les éléments DOM avec la classe "katex"
const katexElements = document.querySelectorAll(".katex");

// Créez un objet contenant les associations entre les id et les expressions LaTeX pour la loi de Bernoulli
const latexExpressionsBernoulli = {
    "bernoulli-distribution__notation": "\\text{Loi de Bernoulli}", // Notation
    "bernoulli-distribution__parameters": "(p)", // Paramètre (probabilité de succès p)
    "bernoulli-distribution__support": "x \\in \\{0, 1\\}", // Support
    "bernoulli-distribution__probability-mass-function": "f(x) = \\begin{cases} p, & x = 1 \\\\ 1 - p, & x = 0 \\end{cases}", // Fonction de masse de probabilité
    "bernoulli-distribution__mean": "\\mu = p", // Moyenne
    "bernoulli-distribution__variance": "\\sigma^2 = p(1 - p)", // Variance
    "bernoulli-distribution__median": "\\text{Médiane} = \\begin{cases} 1, & p > 0.5 \\\\ 0, & p \\leq 0.5 \\end{cases}", // Médiane
    "bernoulli-distribution__mode": "\\text{Mode} = \\begin{cases} 1, & p > 0.5 \\\\ 0, & p \\leq 0.5 \\end{cases}", // Mode
    "bernoulli-distribution__entropy": "H(p) = -p \\log(p) - (1 - p) \\log(1 - p)" // Entropie
};

// Parcourez les éléments avec la classe "katex" et affichez les équations KaTeX en utilisant les id et les expressions LaTeX
katexElements.forEach((element) => {
    const id = element.id;
    if (id && latexExpressionsBernoulli.hasOwnProperty(id)) {
        const latexExpression = latexExpressionsBernoulli[id];
        try {
            katex.render(latexExpression, element);
        } catch (error) {
            console.error("Erreur KaTeX : " + error);
        }
    }
});