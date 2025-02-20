// Récupérez tous les éléments DOM avec la classe "katex"
const katexElements = document.querySelectorAll(".katex");

// Créez un objet contenant les associations entre les id et les expressions LaTeX pour la loi de Gumbel
const latexExpressionsGumbel = {
    "gumbel-distribution__notation": "G(\\mu, \\beta)", // Notation
    "gumbel-distribution__parameters": "(\\mu, \\beta)", // Paramètres
    "gumbel-distribution__support": "\\text{Support} = (-\\infty, +\\infty)", // Support
    "gumbel-distribution__probability-density-function": "f(x; \\mu, \\beta) = \\frac{1}{\\beta}e^{-(\\frac{x - \\mu}{\\beta} + e^{-(\\frac{x - \\mu}{\\beta})})}", // Densité de probabilité
    "gumbel-distribution__cumulative-distribution-function": "F(x; \\mu, \\beta) = e^{-e^{-(\\frac{x - \\mu}{\\beta})}}", // Fonction de répartition
    "gumbel-distribution__mean": "\\mu + \\beta\\gamma", // Moyenne (où γ est la constante d'Euler-Mascheroni)
    "gumbel-distribution__median": "\\mu - \\beta\\ln(\\ln(2))", // Médiane
    "gumbel-distribution__mode": "\\mu", // Mode
    "gumbel-distribution__variance": "\\frac{\\pi^2\\beta^2}{6}", // Variance
    "gumbel-distribution__average-absolute-deviation": "\\beta\\frac{\\pi}{2}", // Average Absolute Deviation
    "gumbel-distribution__skewness": "1.139547 \\text{ (approximatif)}", // Asymétrie (approximatif)
    "gumbel-distribution__kurtosis": "2.4", // Kurtosis
    "gumbel-distribution__entropy": "0.577216 + \\ln(\\beta) + 1", // Entropie
    "gumbel-distribution__location-shift": "Si la distribution est décalée, ajustez \\mu en conséquence.", // Décalage de location
    "gumbel-distribution__scale-shift": "Si l'échelle est modifiée, ajustez \\beta en conséquence." // Décalage d'échelle
};

// Parcourez les éléments avec la classe "katex" et affichez les équations KaTeX en utilisant les id et les expressions LaTeX
katexElements.forEach((element) => {
    const id = element.id;
    if (id && latexExpressionsGumbel.hasOwnProperty(id)) {
        const latexExpression = latexExpressionsGumbel[id];
        try {
            katex.render(latexExpression, element);
        } catch (error) {
            console.error("Erreur KaTeX : " + error);
        }
    }
});