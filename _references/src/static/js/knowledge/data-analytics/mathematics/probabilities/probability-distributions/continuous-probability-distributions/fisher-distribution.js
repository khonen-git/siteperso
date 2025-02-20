// Récupérez tous les éléments DOM avec la classe "katex"
const katexElements = document.querySelectorAll(".katex");

// Créez un objet contenant les associations entre les id et les expressions LaTeX pour la loi de Fisher
const latexExpressionsFisher = {
    "fisher-distribution__notation": "F(d_1, d_2)", // Notation
    "fisher-distribution__parameters": "(d_1, d_2)", // Paramètres
    "fisher-distribution__support": "\\text{Support} = [0, +\\infty)", // Support
    "fisher-distribution__probability-density-function": "f(x; d_1, d_2) = \\frac{\\Gamma\\left(\\frac{d_1 + d_2}{2}\\right)}{\\Gamma\\left(\\frac{d_1}{2}\\right)\\Gamma\\left(\\frac{d_2}{2}\\right)}\\left(\\frac{d_1}{d_2}\\right)^{\\frac{d_1}{2}}x^{\\frac{d_1}{2}-1}\\left(1+\\frac{d_1x}{d_2}\\right)^{-\\frac{d_1 + d_2}{2}}", // Densité de probabilité
    "fisher-distribution__cumulative-distribution-function": "Pas d'équation pour la fonction de répartition", // Fonction de répartition (non standardisée)
    "fisher-distribution__mean": "\\frac{d_2}{d_2 - 2}", // Moyenne (pour d_2 > 2)
    "fisher-distribution__median": "Pas d'équation standard pour la médiane", // Médiane (non standardisée)
    "fisher-distribution__mode": "\\frac{d_1 - 2}{d_1}\\left(\\frac{d_2}{d_2 + 2}\\right)", // Mode
    "fisher-distribution__variance": "2\\left(\\frac{d_2^2(d_1 + d_2 - 2)}{d_1(d_2 - 2)^2(d_2 - 4)}\\right)", // Variance (pour d_2 > 4)
    "fisher-distribution__average-absolute-deviation": "Pas d'équation standard pour l'Average Absolute Deviation", // Average Absolute Deviation (non standardisé)
    "fisher-distribution__skewness": "\\frac{2(d_2 + d_1 - 2)\\sqrt{8(d_2-4)}}{d_1(d_2-6)}", // Asymétrie (pour d_2 > 6)
    "fisher-distribution__kurtosis": "\\frac{12d_1(d_2+2)(5d_2^2 - 22d_2 + 22)}{d_2(d_2-4)(d_2-6)(d_2-8)}", // Kurtosis (pour d_2 > 8)
    "fisher-distribution__entropy": "Pas d'équation standard pour l'entropie" // Entropie (non standardisée)
};

// Parcourez les éléments avec la classe "katex" et affichez les équations KaTeX en utilisant les id et les expressions LaTeX
katexElements.forEach((element) => {
    const id = element.id;
    if (id && latexExpressionsFisher.hasOwnProperty(id)) {
        const latexExpression = latexExpressionsFisher[id];
        try {
            katex.render(latexExpression, element);
        } catch (error) {
            console.error("Erreur KaTeX : " + error);
        }
    }
});