// Récupérez tous les éléments DOM avec la classe "katex"
const katexElements = document.querySelectorAll(".katex");

// Créez un objet contenant les associations entre les id et les expressions LaTeX pour la loi log-normale
const latexExpressionsLogNormale = {
    "log-normal-distribution__notation": "\\text{Log-Normal}", // Notation
    "log-normal-distribution__parameters": "(\\mu, \\sigma)", // Paramètres
    "log-normal-distribution__support": "\\text{Support} = (0, +\\infty)", // Support
    "log-normal-distribution__probability-density-function": "f(x; \\mu, \\sigma) = \\frac{1}{x\\sigma\\sqrt{2\\pi}}e^{-\\frac{(\\ln(x) - \\mu)^2}{2\\sigma^2}}", // Densité de probabilité
    "log-normal-distribution__cumulative-distribution-function": "F(x; \\mu, \\sigma) = \\frac{1}{2} + \\frac{1}{2}\\text{erf}\\left(\\frac{\\ln(x) - \\mu}{\\sigma\\sqrt{2}}\\right)", // Fonction de répartition
    "log-normal-distribution__mean": "e^{\\mu + \\frac{\\sigma^2}{2}}", // Moyenne
    "log-normal-distribution__median": "e^{\\mu}", // Médiane
    "log-normal-distribution__mode": "e^{\\mu - \\sigma^2}", // Mode
    "log-normal-distribution__variance": "\\left(e^{\\sigma^2} - 1\\right)e^{2\\mu + \\sigma^2}", // Variance
    "log-normal-distribution__average-absolute-deviation": "\\text{Non standard}", // Average Absolute Deviation (non standard)
    "log-normal-distribution__skewness": "\\left(e^{\\sigma^2} + 2\\right)\\sqrt{e^{\\sigma^2} - 1}", // Asymétrie
    "log-normal-distribution__kurtosis": "e^{4\\sigma^2} + 2e^{3\\sigma^2} + 3e^{2\\sigma^2} - 6", // Kurtosis
    "log-normal-distribution__entropy": "\\frac{1}{2}\\ln(2\\pi e\\sigma^2) + 1", // Entropie
    "log-normal-distribution__location-shift": "Si la distribution est décalée, ajustez \\mu en conséquence.", // Décalage de location
    "log-normal-distribution__scale-shift": "Si l'échelle est modifiée, ajustez \\sigma en conséquence." // Décalage d'échelle
};

// Parcourez les éléments avec la classe "katex" et affichez les équations KaTeX en utilisant les id et les expressions LaTeX
katexElements.forEach((element) => {
    const id = element.id;
    if (id && latexExpressionsLogNormale.hasOwnProperty(id)) {
        const latexExpression = latexExpressionsLogNormale[id];
        try {
            katex.render(latexExpression, element);
        } catch (error) {
            console.error("Erreur KaTeX : " + error);
        }
    }
});