// Récupérez tous les éléments DOM avec la classe "katex"
const katexElements = document.querySelectorAll(".katex");

// Créez un objet contenant les associations entre les id et les expressions LaTeX pour la loi de Student
const latexExpressionsStudent = {
    "student-distribution__notation": "\\text{Loi de Student}", // Notation
    "student-distribution__parameters": "(\\nu)", // Paramètres (degrés de liberté)
    "student-distribution__support": "-\\infty < x < +\\infty", // Support
    "student-distribution__probability-density-function": "f(x) = \\frac{\\Gamma\\left(\\frac{\\nu+1}{2}\\right)}{\\sqrt{\\nu\\pi}\\Gamma\\left(\\frac{\\nu}{2}\\right)} \\left(1+\\frac{x^2}{\\nu}\\right)^{-\\frac{\\nu+1}{2}}", // Fonction de densité de probabilité
    "student-distribution__cumulative-distribution-function": "F(x) = \\frac{1}{B\\left(\\frac{\\nu}{2},\\frac{1}{2}\\right)} \\int_{-\\infty}^{x} \\left(1+\\frac{t^2}{\\nu}\\right)^{-\\frac{\\nu+1}{2}} dt", // Fonction de distribution cumulative
    "student-distribution__mean": "\\text{Si } \\nu > 1, \\text{ alors } \\mu = 0", // Moyenne
    "student-distribution__variance": "\\text{Si } \\nu > 2, \\text{ alors } \\sigma^2 = \\frac{\\nu}{\\nu-2}", // Variance
    "student-distribution__median": "\\text{Médiane non définie pour } \\nu \\text{ impair}", // Médiane (non définie pour \\nu impair)
    "student-distribution__mode": "\\text{Mode non défini pour } \\nu \\leq 1", // Mode (non défini pour \\nu <= 1)
    "student-distribution__entropy": "\\text{Non définie}" // Entropie (non définie pour la loi de Student)
};

// Parcourez les éléments avec la classe "katex" et affichez les équations KaTeX en utilisant les id et les expressions LaTeX
katexElements.forEach((element) => {
    const id = element.id;
    if (id && latexExpressionsStudent.hasOwnProperty(id)) {
        const latexExpression = latexExpressionsStudent[id];
        try {
            katex.render(latexExpression, element);
        } catch (error) {
            console.error("Erreur KaTeX : " + error);
        }
    }
});