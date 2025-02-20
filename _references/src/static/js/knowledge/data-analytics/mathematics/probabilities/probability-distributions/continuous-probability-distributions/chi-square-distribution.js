
// Récupérez tous les éléments DOM avec la classe "katex"
const katexElements = document.querySelectorAll(".katex");

// Créez un objet contenant les associations entre les id et les expressions LaTeX pour la loi du chi-carré
const latexExpressionsChiSquare = {
    "chi-square-distribution__notation": "\\chi^2(k)", // Notation
    "chi-square-distribution__parameters": "k", // Paramètres
    "chi-square-distribution__support": "\\text{Support} = [0, +\\infty)", // Support
    "chi-square-distribution__probability-density-function": "f(x) = \\frac{1}{2^{k/2}\\Gamma(k/2)}x^{k/2-1}e^{-x/2}", // Densité de probabilité
    "chi-square-distribution__cumulative-distribution-function": "P(X \\leq x) = \\frac{1}{\\Gamma(k/2)}\\gamma(k/2, x/2)", // Fonction de répartition (où \\gamma est la fonction gamma incomplète)
    "chi-square-distribution__moment-generating-function": "(1 - 2t)^{-k/2}", // Fonction génératrice des moments
    "chi-square-distribution__characteristic-function": "(1 - 2it)^{-k/2}", // Fonction caractéristique
    "chi-square-distribution__median": "\\text{Médiane} \\approx k", // Médiane (approximative)
    "chi-square-distribution__mode": "\\text{Mode} = k - 2", // Mode
    "chi-square-distribution__variance": "\\text{Variance} = 2k", // Variance
    "chi-square-distribution__average-absolute-deviation": "\\text{Average Absolute Deviation} \\approx \\sqrt{2k}\\left(1-\\frac{2}{\\pi}\\right)", // Average Absolute Deviation (approximatif)
    "chi-square-distribution__skewness": "\\text{Asymétrie} \\approx \\sqrt{8/k}", // Asymétrie (approximative)
    "chi-square-distribution__kurtosis": "\\text{Kurtosis normalisé} \\approx 12/k", // Kurtosis normalisé (approximatif)
    "chi-square-distribution__entropy": "\\text{Entropie} \\approx \\frac{1}{2}\\log\\left(2\\pi e k\\right) + \\frac{k-1}{2}\\left(\\gamma + \\log\\left(\\frac{2}{k}\\right)\\right)" // Entropie (approximative)
};

// Parcourez les éléments avec la classe "katex" et affichez les équations KaTeX en utilisant les id et les expressions LaTeX
katexElements.forEach((element) => {
    const id = element.id;
    if (id && latexExpressionsChiSquare.hasOwnProperty(id)) {
        const latexExpression = latexExpressionsChiSquare[id];
        try {
            katex.render(latexExpression, element);
        } catch (error) {
            console.error("Erreur KaTeX : " + error);
        }
    }
});
