// Récupérez tous les éléments DOM avec la classe "katex"
const katexElements = document.querySelectorAll(".katex");

// Créez un objet contenant les associations entre les id et les expressions LaTeX pour la loi multinomiale
const latexExpressionsMultinomiale = {
    "multinomial-distribution__notation": "\\text{Multinomiale}", // Notation
    "multinomial-distribution__parameters": "(n, p_1, p_2, \\ldots, p_k)", // Paramètres
    "multinomial-distribution__support": "x_1 + x_2 + \\ldots + x_k = n, \\text{ où } x_i \\geq 0", // Support
    "multinomial-distribution__probability-mass-function": "P(X_1 = x_1, X_2 = x_2, \\ldots, X_k = x_k) = \\frac{n!}{x_1!x_2!\\ldots x_k!}p_1^{x_1}p_2^{x_2}\\ldots p_k^{x_k}", // Fonction de masse de probabilité
    "multinomial-distribution__mean": "(np_1, np_2, \\ldots, np_k)", // Moyenne
    "multinomial-distribution__variance": "(np_1(1 - p_1), np_2(1 - p_2), \\ldots, np_k(1 - p_k))", // Variance
    "multinomial-distribution__entropy": "-\\sum_{i=1}^{k} p_i \\ln(p_i)" // Entropie
};

// Parcourez les éléments avec la classe "katex" et affichez les équations KaTeX en utilisant les id et les expressions LaTeX
katexElements.forEach((element) => {
    const id = element.id;
    if (id && latexExpressionsMultinomiale.hasOwnProperty(id)) {
        const latexExpression = latexExpressionsMultinomiale[id];
        try {
            katex.render(latexExpression, element);
        } catch (error) {
            console.error("Erreur KaTeX : " + error);
        }
    }
});