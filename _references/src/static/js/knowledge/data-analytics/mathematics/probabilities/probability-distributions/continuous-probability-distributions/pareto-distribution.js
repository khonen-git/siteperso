// Récupérez tous les éléments DOM avec la classe "katex"
const katexElements = document.querySelectorAll(".katex");

// Créez un objet contenant les associations entre les id et les expressions LaTeX pour la loi de Pareto
const latexExpressionsPareto = {
    "pareto-distribution__notation": "\\text{Loi de Pareto}", // Notation
    "pareto-distribution__parameters": "(x_m, \\alpha)", // Paramètres
    "pareto-distribution__support": "x \\geq x_m", // Support
    "pareto-distribution__probability-density-function": "f(x) = \\frac{\\alpha x_m^\\alpha}{x^{\\alpha+1}}", // Fonction de densité de probabilité
    "pareto-distribution__cumulative-distribution-function": "F(x) = 1 - \\left(\\frac{x_m}{x}\\right)^\\alpha", // Fonction de distribution cumulative
    "pareto-distribution__mean": "\\text{Non définie}", // Moyenne (non définie pour certaines valeurs de \\alpha)
    "pareto-distribution__variance": "\\text{Non définie}", // Variance (non définie pour certaines valeurs de \\alpha)
    "pareto-distribution__median": "x_m \\cdot 2^{1/\\alpha}", // Médiane
    "pareto-distribution__mode": "x_m", // Mode
    "pareto-distribution__entropy": "\\ln(\\alpha) - \\frac{1}{\\alpha} - 1" // Entropie
};

// Parcourez les éléments avec la classe "katex" et affichez les équations KaTeX en utilisant les id et les expressions LaTeX
katexElements.forEach((element) => {
    const id = element.id;
    if (id && latexExpressionsPareto.hasOwnProperty(id)) {
        const latexExpression = latexExpressionsPareto[id];
        try {
            katex.render(latexExpression, element);
        } catch (error) {
            console.error("Erreur KaTeX : " + error);
        }
    }
});