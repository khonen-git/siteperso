// Récupérez tous les éléments DOM avec la classe "katex"
const katexElements = document.querySelectorAll(".katex");

// Créez un objet contenant les associations entre les id et les expressions LaTeX pour la loi géométrique
const latexExpressionsGeometrique = {
    "geometric-distribution__notation": "\\text{Loi géométrique}", // Notation
    "geometric-distribution__parameter": "p", // Paramètre (probabilité de succès p)
    "geometric-distribution__support": "x \\in \\{1, 2, 3, \\ldots\\}", // Support
    "geometric-distribution__probability-mass-function": "f(x) = p(1 - p)^{x-1}", // Fonction de masse de probabilité
    "geometric-distribution__mean": "\\mu = \\frac{1}{p}", // Moyenne
    "geometric-distribution__variance": "\\sigma^2 = \\frac{1-p}{p^2}", // Variance
    "geometric-distribution__median": "\\text{Médiane} = \\lceil \\log_2(2-p) \\rceil", // Médiane
    "geometric-distribution__mode": "\\text{Mode} = 1", // Mode
    "geometric-distribution__entropy": "H(p) = -\\sum_{x=1}^{\\infty} p(1 - p)^{x-1} \\log(p(1 - p)^{x-1})" // Entropie
};

// Parcourez les éléments avec la classe "katex" et affichez les équations KaTeX en utilisant les id et les expressions LaTeX
katexElements.forEach((element) => {
    const id = element.id;
    if (id && latexExpressionsGeometrique.hasOwnProperty(id)) {
        const latexExpression = latexExpressionsGeometrique[id];
        try {
            katex.render(latexExpression, element);
        } catch (error) {
            console.error("Erreur KaTeX : " + error);
        }
    }
});