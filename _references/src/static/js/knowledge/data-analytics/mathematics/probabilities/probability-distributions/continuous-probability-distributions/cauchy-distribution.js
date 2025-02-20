
// Récupérez tous les éléments DOM avec la classe "katex"
const katexElements = document.querySelectorAll(".katex");

// Créez un objet contenant les associations entre les id et les expressions LaTeX pour la loi de Cauchy
const latexExpressionsCauchy = {
    "cauchy-distribution__notation": "\\text{Cauchy}(x_0, \\gamma)", // Notation
    "cauchy-distribution__parameters": "x_0, \\gamma", // Paramètres
    "cauchy-distribution__support": "\\text{Support} = (-\\infty, +\\infty)", // Support
    "cauchy-distribution__probability-density-function": "f(x) = \\frac{1}{\\pi\\gamma\\left(1+\\left(\\frac{x-x_0}{\\gamma}\\right)^2\\right)}", // Densité de probabilité
    "cauchy-distribution__cumulative-distribution-function": "\\frac{1}{\\pi}\\text{atan}\\left(\\frac{x-x_0}{\\gamma}\\right)+\\frac{1}{2}", // Fonction de répartition
    "cauchy-distribution__moment-generating-function": "N'existe pas", // Fonction génératrice des moments
    "cauchy-distribution__characteristic-function": "N'existe pas", // Fonction caractéristique
    "cauchy-distribution__median": "\\text{Médiane} = x_0", // Médiane
    "cauchy-distribution__mode": "\\text{Mode} = x_0", // Mode
    "cauchy-distribution__variance": "N'existe pas", // Variance
    "cauchy-distribution__average-absolute-deviation": "N'existe pas", // Average Absolute Deviation
    "cauchy-distribution__skewness": "N'existe pas", // Asymétrie
    "cauchy-distribution__kurtosis": "N'existe pas", // Kurtosis normalisé
    "cauchy-distribution__entropy": "N'existe pas" // Entropie
};

// Parcourez les éléments avec la classe "katex" et affichez les équations KaTeX en utilisant les id et les expressions LaTeX
katexElements.forEach((element) => {
    const id = element.id;
    if (id && latexExpressionsCauchy.hasOwnProperty(id)) {
        const latexExpression = latexExpressionsCauchy[id];
        try {
            katex.render(latexExpression, element);
        } catch (error) {
            console.error("Erreur KaTeX : " + error);
        }
    }
});

