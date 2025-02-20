// Récupérez tous les éléments DOM avec la classe "katex"
const katexElements = document.querySelectorAll(".katex");

// Créez un objet contenant les associations entre les id et les expressions LaTeX pour la loi de Weibull
const latexExpressionsWeibull = {
    "weibull-distribution__notation": "\\text{Loi de Weibull}", // Notation
    "weibull-distribution__parameters": "(\\lambda, k)", // Paramètres (lambda et k)
    "weibull-distribution__support": "x \\geq 0", // Support
    "weibull-distribution__probability-density-function": "f(x) = \\begin{cases} \\frac{k}{\\lambda} \\left(\\frac{x}{\\lambda}\\right)^{k-1} e^{-(x/\\lambda)^k}, & x \\geq 0 \\\\ 0, & x < 0 \\end{cases}", // Fonction de densité de probabilité
    "weibull-distribution__cumulative-distribution-function": "F(x) = \\begin{cases} 1 - e^{-(x/\\lambda)^k}, & x \\geq 0 \\\\ 0, & x < 0 \\end{cases}", // Fonction de distribution cumulative
    "weibull-distribution__mean": "\\mu = \\lambda \\Gamma\\left(1 + \\frac{1}{k}\\right)", // Moyenne
    "weibull-distribution__variance": "\\sigma^2 = \\lambda^2 \\left[ \\Gamma\\left(1 + \\frac{2}{k}\\right) - \\left(\\Gamma\\left(1 + \\frac{1}{k}\\right)\\right)^2 \\right]", // Variance
    "weibull-distribution__median": "\\text{Médiane} = \\lambda \\left(\\ln(2)\\right)^{1/k}", // Médiane
    "weibull-distribution__mode": "\\text{Mode} = \\lambda \\left(\\frac{k-1}{k}\\right)^{1/k}", // Mode
    "weibull-distribution__entropy": "\\text{Entropie} = \\ln(\\lambda) + \\gamma\\left(1 + \\frac{1}{k}\\right) + \\frac{1}{k}" // Entropie
};

// Parcourez les éléments avec la classe "katex" et affichez les équations KaTeX en utilisant les id et les expressions LaTeX
katexElements.forEach((element) => {
    const id = element.id;
    if (id && latexExpressionsWeibull.hasOwnProperty(id)) {
        const latexExpression = latexExpressionsWeibull[id];
        try {
            katex.render(latexExpression, element);
        } catch (error) {
            console.error("Erreur KaTeX : " + error);
        }
    }
});