document.addEventListener('DOMContentLoaded', function() {
    fetch('data/projects.json')
        .then(response => response.json())
        .then(data => {
            const authorsSet = new Set();
            data.forEach(project => {
                authorsSet.add(project.author);
            });
            const authorsList = document.getElementById('authors-list');
            authorsSet.forEach(author => {
                const li = document.createElement('li');
                li.textContent = author;
                authorsList.appendChild(li);
            });
        })
        .catch(error => console.error('Error loading projects:', error));
});
