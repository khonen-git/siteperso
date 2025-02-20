// Sélectionnez tous les éléments "toctree" ayant les classes "has-children"
const menuItems = document.querySelectorAll('.toctree-l1--has-children, .toctree-l2--has-children, .toctree-l3--has-children, .toctree-l4--has-children');

// Ajoutez un gestionnaire d'événements pour chaque élément
menuItems.forEach(item => {
    const arrow = item.querySelector('.arrow-down');
    item.addEventListener('click', () => {
        // Basculer la classe "collapsed"
        item.classList.toggle('collapsed');
        // Effectuer la rotation de la flèche
        arrow.classList.toggle('collapsed');
        // Afficher ou masquer les sous-listes
        const sublist = item.querySelector('ul');
        sublist.style.display = sublist.style.display === 'none' ? 'block' : 'none';
    });
});