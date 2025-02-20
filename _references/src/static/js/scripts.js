document.addEventListener('DOMContentLoaded', function() {
    const initToctree = () => {
        document.querySelectorAll('.has-children').forEach(item => {
            const subMenu = item.querySelector('ul');
            if (!subMenu) return;

            // Création de la flèche
            const arrow = document.createElement('span');
            arrow.className = 'arrow-down';
            arrow.innerHTML = `
                <svg viewBox="0 0 24 24" width="16" height="16">
                    <path fill="currentColor" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                </svg>
            `;
            
            // Gestion du clic
            const toggleMenu = (e) => {
                e.stopPropagation();
                item.classList.toggle('open');
                arrow.classList.toggle('upside-down');
                
                // Fermer les sous-menus non actifs
                if (!item.classList.contains('open')) {
                    item.querySelectorAll('.open').forEach(subItem => {
                        subItem.classList.remove('open');
                        subItem.querySelector('.arrow-down')?.classList.remove('upside-down');
                    });
                }
            };

            arrow.addEventListener('click', toggleMenu);
            
            // Ajout de la flèche après le lien
            const link = item.querySelector('.reference-internal');
            if (link) {
                link.parentNode.insertBefore(arrow, link.nextSibling);
            }

            // Gestion de l'état initial si nécessaire
            if (item.classList.contains('open')) {
                arrow.classList.add('upside-down');
            }
        });
    };

    // Réinitialiser lors des changements de page
    window.addEventListener('popstate', initToctree);
    initToctree();
});


fetch('/api/tasks')
  .then(response => response.json())
  .then(data => {
    console.log(data); // Manipulez vos données ici
  });
