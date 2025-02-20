// Récupérez tous les éléments DOM avec la classe "katex"
const katexElements = document.querySelectorAll(".katex");

// Créez un objet contenant les associations entre les id et les expressions LaTeX pour la loi de Poisson
const latexExpressionsPoisson = {
    "poisson-distribution__notation": "\\text{Loi de Poisson}", // Notation
    "poisson-distribution__parameters": "\\lambda", // Paramètre (taux de moyenne)
    "poisson-distribution__support": "x \\in \\{0, 1, 2, \\ldots\\}", // Support
    "poisson-distribution__probability-mass-function": "f(x) = \\frac{e^{-\\lambda} \\lambda^x}{x!}", // Fonction de masse de probabilité
    "poisson-distribution__mean": "\\mu = \\lambda", // Moyenne
    "poisson-distribution__variance": "\\sigma^2 = \\lambda", // Variance
    "poisson-distribution__median": "\\text{Médiane} = \\lfloor \\lambda + \\frac{1}{3} - \\frac{0,02}{\\lambda} \\rfloor", // Médiane (approximative)
    "poisson-distribution__mode": "\\text{Mode} = \\lfloor \\lambda \\rfloor", // Mode
    "poisson-distribution__skewness": "\\text{Asymétrie} = \\frac{1}{\\sqrt{\\lambda}}", // Asymétrie
    "poisson-distribution__kurtosis": "\\text{Kurtosis} = \\frac{1}{\\lambda}" // Kurtosis
};

// Parcourez les éléments avec la classe "katex" et affichez les équations KaTeX en utilisant les id et les expressions LaTeX
katexElements.forEach((element) => {
    const id = element.id;
    if (id && latexExpressionsPoisson.hasOwnProperty(id)) {
        const latexExpression = latexExpressionsPoisson[id];
        try {
            katex.render(latexExpression, element);
        } catch (error) {
            console.error("Erreur KaTeX : " + error);
        }
    }
});