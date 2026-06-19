document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Gestion du Menu et des Pages
    const menuItems = document.querySelectorAll('.menu-item');
    const pages = document.querySelectorAll('.page');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const pageId = item.getAttribute('data-page');
            if (pageId) {
                pages.forEach(p => p.classList.remove('active'));
                document.getElementById(pageId).classList.add('active');
                menuItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
            }
        });
    });

    // 2. Gestion du Dropdown (Galeries)
    const dropdowns = document.querySelectorAll('.has-dropdown');
    dropdowns.forEach(drop => {
        drop.addEventListener('click', () => {
            const submenuId = drop.getAttribute('data-dropdown');
            const submenu = document.getElementById(`${submenuId}-submenu`);
            const arrow = drop.querySelector('.arrow');
            submenu.classList.toggle('open');
            arrow.style.transform = submenu.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
        });
    });

    // 3. Filtrage des Photos
    const submenuItems = document.querySelectorAll('.submenu-item');
    const photoCards = document.querySelectorAll('.photo-card');

    submenuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const filter = item.getAttribute('data-filter');
            pages.forEach(p => p.classList.remove('active'));
            document.getElementById('gallery').classList.add('active');
            submenuItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            photoCards.forEach(card => {
                card.style.display = (filter === 'all' || card.getAttribute('data-category') === filter) ? 'block' : 'none';
            });
        });
    });

    // 4. Recherche
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        photoCards.forEach(card => {
            const alt = card.querySelector('img').alt.toLowerCase();
            card.style.display = alt.includes(term) ? 'block' : 'none';
        });
    });

    // 5. Ajouts Récents
    const revealBtn = document.getElementById('revealRecent');
    const recentGrid = document.getElementById('recentGrid');
    const btnText = revealBtn.querySelector('.btn-text');

    revealBtn.addEventListener('click', () => {
        recentGrid.classList.toggle('open');
        revealBtn.classList.toggle('active');
        btnText.innerText = recentGrid.classList.contains('open') ? "Masquer les photos" : "Découvrir les dernières photos";
    });

    // 6. Modal de Téléchargement
    const modal = document.getElementById('dlModal');
    const dlButtons = document.querySelectorAll('.dl-btn');
    const closeModal = document.getElementById('closeModal');
    const finalLink = document.getElementById('finalLink');

    dlButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const imgSrc = e.target.closest('.photo-card, .recent-card').querySelector('img').src;
            finalLink.href = imgSrc;
            modal.style.display = 'flex';
        });
    });

    closeModal.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });
});
