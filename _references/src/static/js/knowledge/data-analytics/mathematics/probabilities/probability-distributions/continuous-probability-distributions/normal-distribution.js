
/*
// Créez un objet contenant les associations entre les id et les expressions LaTeX
const mathExpressions = {
    "normal-distribution__mean": "\\mu", // Moyenne
    "normal-distribution__mode": "\\mu", // Mode
    "normal-distribution__median": "\\mu", // Médiane
    "normal-distribution__variance": "\\sigma^2", // Variance
    "normal-distribution__propability-density-function": "\\frac{1}{\\sigma\\sqrt{2\\pi}}e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}", // Densité de probabilité
    "normal-distribution__notation": "\\mathcal{N}(\\mu, \\sigma^2)", // Notation
    "normal-distribution__parameters": "\\mu, \\sigma", // Paramètres
    "normal-distribution__support": "(-\\infty, +\\infty)", // Support
    "normal-distribution__cumulative-distribution-function": "\\frac{1}{2} \\left(1 + \\text{erf}\\left(\\frac{x-\\mu}{\\sigma\\sqrt{2}}\\right)\\right)", // Fonction de répartition
    "normal-distribution__moment-generating-function": "e^{\\mu t + \\frac{1}{2}\\sigma^2 t^2}", // Fonction génératrice des moments
    "normal-distribution__characteristic-function": "e^{i\\mu t - \\frac{1}{2}\\sigma^2 t^2}", // Fonction caractéristique
    "normal-distribution__quantile": "\\mu + \\sigma\\sqrt{2}\\text{erf}^{-1}(2p-1)", // Quantile
    "normal-distribution__average-absolue-deviation": "\\sigma\\sqrt{2/\\pi}", // Average Absolute Deviation
    "normal-distribution__skewness": "0", // Asymétrie
    "normal-distribution__kurtosis": "0", // Kurtosis normalisé
    "normal-distribution__entropy": "\\frac{1}{2} \\left(1 + \\ln(2\\pi\\sigma^2)\\right)", // Entropie
    "normal-distribution__fisher-information": "\\frac{1}{\\sigma^2}", // Fisher Information
    "normal-distribution__kl-divergence": "\\frac{1}{2}\\left(\\frac{1}{\\sigma^2}-1+\\frac{(\\mu-\\mu_0)^2}{\\sigma^2}\\right)" // Kullback-Leibler Divergence
};

window.addEventListener('DOMContentLoaded', () => {
    // const container = document.getElementById("equation-container");

    // Parcours de l'objet mathExpressions et rendu de chaque expression
    for (const key in mathExpressions) {
        if (mathExpressions.hasOwnProperty(key)) {
            const container = document.getElementById(key);
            const expression = mathExpressions[key];
            const equationDiv = document.createElement("div");
            console.log(expression + "   " + key + "   " + equationDiv)
            equationDiv.textContent = key + ": ";
            container.appendChild(equationDiv);

            // Utilisation de katex.render pour afficher l'expression dans l'élément
            katex.render(expression, equationDiv);
        }
    }

    // Créez un objet contenant les associations entre les identifiants et les expressions LaTeX
    const latexLinks = {
        "link-normal-X": "X",
        "link-normal-dist": "\\mathcal{N}(\\mu, \\sigma^2)",
        "link-log-X": "\\exp(X)",
        "link-X": "X",
        "link-Y": "Y",
        "link-X1": "X_1",
        "link-X2": "X_2",
        "link-Xn": "X_n",
        "link-standard-normal": "\\mathcal{N}(0,1)",
        "link-chi-squared": "\\chi^2(n)",
        "link-student-t": "t(n)",
        "link-X-slash-U": "\\frac{X}{U}",
        "link-U": "U",
        "link-slasha": "\\text{Slasha}",
        "link-sign-X": "\\text{signe}(X)|X|^p",
        "link-Z1": "Z_1",
        "link-Z2": "Z_2",
        "link-cauchy": "\\text{Cau}(0,1)",
        "link-complex": "\\text{Complex}"
        // Ajoutez d'autres associations ici
    };

    // Parcourez les expressions LaTeX et remplacez-les dans le texte de l'élément li
    for (const latexId in latexLinks) {
        const latexExpression = latexLinks[latexId];
        const linkElement = document.getElementById(latexId);

        // Utilisez KaTeX pour afficher les expressions LaTeX dans les éléments li
        katex.render(latexExpression, linkElement);
    }
});
*/

window.addEventListener('DOMContentLoaded', () => {
    
    renderMathInElement(document.body, {
        // customised options
        // • auto-render specific keys, e.g.:
        delimiters: [
            {left: '$$', right: '$$', display: true},
            {left: '$', right: '$', display: false},
            {left: '\\(', right: '\\)', display: false},
            {left: '\\[', right: '\\]', display: true}
        ],
        // • rendering keys, e.g.:
        throwOnError : false
      });

    // Rendu des expressions mathématiques dans le code HTML
    const mathExpressions = {
        "normal-distribution__mean": "\\mu", // Moyenne
        "normal-distribution__mode": "\\mu", // Mode
        "normal-distribution__median": "\\mu", // Médiane
        "normal-distribution__variance": "\\sigma^2", // Variance
        "normal-distribution__propability-density-function": "\\frac{1}{\\sigma\\sqrt{2\\pi}}e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}", // Densité de probabilité
        "normal-distribution__notation": "\\mathcal{N}(\\mu, \\sigma^2)", // Notation
        "normal-distribution__parameters": "\\mu, \\sigma", // Paramètres
        "normal-distribution__support": "(-\\infty, +\\infty)", // Support
        "normal-distribution__cumulative-distribution-function": "\\frac{1}{2} \\left(1 + \\text{erf}\\left(\\frac{x-\\mu}{\\sigma\\sqrt{2}}\\right)\\right)", // Fonction de répartition
        "normal-distribution__moment-generating-function": "e^{\\mu t + \\frac{1}{2}\\sigma^2 t^2}", // Fonction génératrice des moments
        "normal-distribution__characteristic-function": "e^{i\\mu t - \\frac{1}{2}\\sigma^2 t^2}", // Fonction caractéristique
        "normal-distribution__quantile": "\\mu + \\sigma\\sqrt{2}\\text{erf}^{-1}(2p-1)", // Quantile
        "normal-distribution__average-absolue-deviation": "\\sigma\\sqrt{2/\\pi}", // Average Absolute Deviation
        "normal-distribution__skewness": "0", // Asymétrie
        "normal-distribution__kurtosis": "0", // Kurtosis normalisé
        "normal-distribution__entropy": "\\frac{1}{2} \\left(1 + \\ln(2\\pi\\sigma^2)\\right)", // Entropie
        "normal-distribution__fisher-information": "\\frac{1}{\\sigma^2}", // Fisher Information
        "normal-distribution__kl-divergence": "\\frac{1}{2}\\left(\\frac{1}{\\sigma^2}-1+\\frac{(\\mu-\\mu_0)^2}{\\sigma^2}\\right)" // Kullback-Leibler Divergence
    };

    for (const key in mathExpressions) {
        if (mathExpressions.hasOwnProperty(key)) {
            const container = document.querySelector(`.katex.${key}`);
            const expression = mathExpressions[key];

            // Créez un élément div pour afficher l'expression
            const equationDiv = document.createElement("div");
            equationDiv.textContent = key + ": ";

            // Utilisez KaTeX pour afficher l'expression dans l'élément div
            katex.render(expression, equationDiv);

            // Ajoutez l'élément div au conteneur approprié
            container.appendChild(equationDiv);
        }
    }

    // Associations entre les identifiants et les expressions LaTeX
    const latexLinks = {
        "link-normal-X": "X",
        "link-normal-dist": "\\mathcal{N}(\\mu, \\sigma^2)",
        "link-log-X": "\\exp(X)",
        "link-X": "X",
        "link-Y": "Y",
        "link-X1": "X_1",
        "link-X2": "X_2",
        "link-Xn": "X_n",
        "link-standard-normal": "\\mathcal{N}(0,1)",
        "link-chi-squared": "\\chi^2(n)",
        "link-student-t": "t(n)",
        "link-X-slash-U": "\\frac{X}{U}",
        "link-U": "U",
        "link-slasha": "\\text{Slasha}",
        "link-sign-X": "\\text{signe}(X)|X|^p",
        "link-Z1": "Z_1",
        "link-Z2": "Z_2",
        "link-cauchy": "\\text{Cau}(0,1)",
        "link-complex": "\\text{Complex}"
        // Ajoutez d'autres associations ici
    };

    for (const latexId in latexLinks) {
        const latexExpression = latexLinks[latexId];
        const linkElement = document.querySelector(`.katex.${latexId}`);

        // Utilisez KaTeX pour afficher les expressions LaTeX dans les éléments span
        katex.render(latexExpression, linkElement);
    }

    // Sélectionnez tous les éléments avec la classe "katex-expression"
    const katexExpressions = document.querySelectorAll('.katex.katex-expression');

    katexExpressions.forEach((element) => {
        katex.render(element.textContent, element);
    });

});
