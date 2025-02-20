// Récupérez tous les éléments DOM avec la classe "katex"
const katexElements = document.querySelectorAll(".katex");

// Créez un objet contenant les associations entre les id et les expressions LaTeX pour la loi exponentielle
const latexExpressionsExponentielle = {
    "exponential-distribution__notation": "\\text{Exp} (\\lambda)", // Notation
    "exponential-distribution__parameter": "\\lambda", // Paramètre
    "exponential-distribution__support": "\\text{Support} = [0, +\\infty)", // Support
    "exponential-distribution__probability-density-function": "f(x; \\lambda) = \\begin{cases} \\lambda e^{-\\lambda x} & \\text{si } x \\geq 0, \\\\ 0 & \\text{sinon.} \\end{cases}", // Densité de probabilité
    "exponential-distribution__cumulative-distribution-function": "F(x; \\lambda) = \\begin{cases} 1 - e^{-\\lambda x} & \\text{si } x \\geq 0, \\\\ 0 & \\text{sinon.} \\end{cases}", // Fonction de répartition
    "exponential-distribution__mean": "\\frac{1}{\\lambda}", // Moyenne
    "exponential-distribution__median": "\\frac{\\ln(2)}{\\lambda}", // Médiane
    "exponential-distribution__mode": "0", // Mode
    "exponential-distribution__variance": "\\frac{1}{\\lambda^2}", // Variance
    "exponential-distribution__average-absolute-deviation": "\\frac{1}{\\lambda}", // Average Absolute Deviation
    "exponential-distribution__skewness": "2", // Asymétrie
    "exponential-distribution__kurtosis": "6", // Kurtosis
    "exponential-distribution__entropy": "1 - \\ln(\\lambda)" // Entropie
};

// Parcourez les éléments avec la classe "katex" et affichez les équations KaTeX en utilisant les id et les expressions LaTeX
katexElements.forEach((element) => {
    const id = element.id;
    if (id && latexExpressionsExponentielle.hasOwnProperty(id)) {
        const latexExpression = latexExpressionsExponentielle[id];
        try {
            katex.render(latexExpression, element);
        } catch (error) {
            console.error("Erreur KaTeX : " + error);
        }
    }
});