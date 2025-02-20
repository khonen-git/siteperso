// Sélectionnez tous les éléments "toctree" ayant les classes "has-children"
const menuItems = document.querySelectorAll('.toctree-l1--has-children, .toctree-l2--has-children, .toctree-l3--has-children, .toctree-l4--has-children');

// Ajoutez un gestionnaire d'événements pour chaque élément
menuItems.forEach(item => {
    const arrow = item.querySelector('.arrow-down');
    item.addEventListener('click', () => {
        item.classList.toggle('collapsed');
        arrow.classList.toggle('collapsed');
        const sublist = item.querySelector('ul');
        sublist.style.display = sublist.style.display === 'none' ? 'block' : 'none';
    });
});