(function () {
    'use strict';

    const page = document.querySelector('.sharing-page');
    if (!page) return;

    const filters = page.querySelector('.sharing-filters');
    const buttons = Array.from(page.querySelectorAll('[data-sharing-filter]'));
    const entries = Array.from(page.querySelectorAll('.sharing-entry'));
    const empty = page.querySelector('#sharing-empty');
    const status = page.querySelector('#sharing-status');
    const emptyMessages = {
        all: ['No entries shared yet.', 'Photos and notes will appear here as they are added.'],
        photos: ['No photos shared yet.', 'Conference moments and personal photographs will appear here.'],
        notes: ['No notes shared yet.', 'Personal notes and reflections will appear here.']
    };

    function applyFilter(filter) {
        let visibleCount = 0;
        entries.forEach(function (entry) {
            const visible = filter === 'all' ||
                (filter === 'photos' && entry.dataset.hasPhotos === 'true') ||
                (filter === 'notes' && entry.dataset.hasNote === 'true');
            entry.hidden = !visible;
            if (visible) visibleCount += 1;
        });
        buttons.forEach(function (button) {
            button.setAttribute('aria-pressed', String(button.dataset.sharingFilter === filter));
        });
        empty.hidden = visibleCount > 0;
        empty.querySelector('[data-empty-title]').textContent = emptyMessages[filter][0];
        empty.querySelector('[data-empty-description]').textContent = emptyMessages[filter][1];
        status.textContent = visibleCount + (visibleCount === 1 ? ' entry shown.' : ' entries shown.');
    }

    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            applyFilter(button.dataset.sharingFilter);
        });
    });
    filters.hidden = false;
}());
