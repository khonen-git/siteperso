// Récupérez tous les éléments DOM avec la classe "katex"
const katexElements = document.querySelectorAll(".katex");

// Créez un objet contenant les associations entre les id et les expressions LaTeX pour la loi de Dirichlet
const latexExpressionsDirichlet = {
    "dirichlet-distribution__notation": "\\text{Dir}(\\mathbf{p}; \\mathbf{\\alpha})", // Notation
    "dirichlet-distribution__parameters": "\\mathbf{\\alpha}", // Paramètres
    "dirichlet-distribution__support": "\\text{Support} = \\{\\mathbf{p} \\mid p_i \\geq 0, \\sum_{i=1}^{K} p_i = 1\\}", // Support
    "dirichlet-distribution__probability-density-function": "f(\\mathbf{p}) = \\frac{1}{B(\\mathbf{\\alpha})}\\prod_{i=1}^{K} p_i^{\\alpha_i-1}", // Densité de probabilité (où B(\\mathbf{\\alpha}) est la fonction bêta multivariée)
    "dirichlet-distribution__cumulative-distribution-function": "\\text{Fonction de répartition non standard}", // Fonction de répartition (non standard)
    "dirichlet-distribution__moment-generating-function": "\\text{Fonction génératrice des moments non standard}", // Fonction génératrice des moments (non standard)
    "dirichlet-distribution__characteristic-function": "\\text{Fonction caractéristique non standard}", // Fonction caractéristique (non standard)
    "dirichlet-distribution__median": "\\text{Médiane non standard}", // Médiane (non standard)
    "dirichlet-distribution__mode": "\\mathbf{p} = \\frac{\\mathbf{\\alpha}}{\\sum_{i=1}^{K} \\alpha_i}", // Mode
    "dirichlet-distribution__variance": "\\text{Variance}_{p_i} = \\frac{\\alpha_i(\\alpha_0 - \\alpha_i)}{\\alpha_0^2(\\alpha_0 + 1)}", // Variance (pour chaque p_i)
    "dirichlet-distribution__average-absolute-deviation": "\\text{Average Absolute Deviation}_{p_i} = \\frac{\\alpha_i}{\\alpha_0(\\alpha_0 + 1)}", // Average Absolute Deviation (pour chaque p_i)
    "dirichlet-distribution__skewness": "\\text{Asymétrie non standard}", // Asymétrie (non standard)
    "dirichlet-distribution__kurtosis": "\\text{Kurtosis normalisé non standard}", // Kurtosis normalisé (non standard)
    "dirichlet-distribution__entropy": "H(\\mathbf{\\alpha}) = \\log B(\\mathbf{\\alpha}) - (K-1)\\psi(\\alpha_0) + \\sum_{i=1}^{K}(\\alpha_i-1)(\\psi(\\alpha_i)-\\psi(\\alpha_0))" // Entropie
};

// Parcourez les éléments avec la classe "katex" et affichez les équations KaTeX en utilisant les id et les expressions LaTeX
katexElements.forEach((element) => {
    const id = element.id;
    if (id && latexExpressionsDirichlet.hasOwnProperty(id)) {
        const latexExpression = latexExpressionsDirichlet[id];
        try {
            katex.render(latexExpression, element);
        } catch (error) {
            console.error("Erreur KaTeX : " + error);
        }
    }
});