// Récupérez tous les éléments DOM avec la classe "katex"
const katexElements = document.querySelectorAll(".katex");

// Créez un objet contenant les associations entre les id et les expressions LaTeX pour la loi de Pareto généralisée
const latexExpressionsParetoGeneralisee = {
    "pareto-generalisee-distribution__notation": "\\text{Loi de Pareto généralisée}", // Notation
    "pareto-generalisee-distribution__parameters": "(x_m, \\alpha, \\beta)", // Paramètres
    "pareto-generalisee-distribution__support": "x \\geq x_m", // Support
    "pareto-generalisee-distribution__probability-density-function": "f(x) = \\frac{\\alpha x_m^\\alpha}{(x + \\beta)^{\\alpha+1}}", // Fonction de densité de probabilité
    "pareto-generalisee-distribution__cumulative-distribution-function": "F(x) = 1 - \\left(\\frac{x_m}{x + \\beta}\\right)^\\alpha", // Fonction de distribution cumulative
    "pareto-generalisee-distribution__mean": "\\text{Non définie}", // Moyenne (non définie pour certaines valeurs de \\alpha et \\beta)
    "pareto-generalisee-distribution__variance": "\\text{Non définie}", // Variance (non définie pour certaines valeurs de \\alpha et \\beta)
    "pareto-generalisee-distribution__median": "x_m \\cdot (2^{1/\\alpha} - 1) + \\beta", // Médiane
    "pareto-generalisee-distribution__mode": "x_m - \\beta", // Mode
    "pareto-generalisee-distribution__entropy": "1 + \\ln(\\alpha) - \\frac{1}{\\alpha} + \\ln(\\beta)" // Entropie
};

// Parcourez les éléments avec la classe "katex" et affichez les équations KaTeX en utilisant les id et les expressions LaTeX
katexElements.forEach((element) => {
    const id = element.id;
    if (id && latexExpressionsParetoGeneralisee.hasOwnProperty(id)) {
        const latexExpression = latexExpressionsParetoGeneralisee[id];
        try {
            katex.render(latexExpression, element);
        } catch (error) {
            console.error("Erreur KaTeX : " + error);
        }
    }
});