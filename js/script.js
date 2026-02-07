document.addEventListener('DOMContentLoaded', function() {
    fetch('data/projects.json')
        .then(response => response.json())
        .then(data => {
            const timeline = document.getElementById('timeline');
            data.forEach(project => {
                const item = document.createElement('div');
                item.className = 'timeline-item';
                item.innerHTML = `
                    <h2>${project.title}</h2>
                    <p class="author">Por: ${project.author}</p>
                    <p>${project.description}</p>
                `;
                item.addEventListener('click', function() {
                    window.open(`detail.html?id=${project.id}`, '_blank');
                });
                timeline.appendChild(item);
            });
        })
        .catch(error => console.error('Error loading projects:', error));
});
