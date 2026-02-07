document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = parseInt(urlParams.get('id'));

    fetch('../data/projects.json')
        .then(response => response.json())
        .then(data => {
            const project = data.find(p => p.id === projectId);
            if (project) {
                document.getElementById('project-title').textContent = project.title;
                document.getElementById('project-author').textContent = `Autor: ${project.author}`;
                document.getElementById('project-description').textContent = project.fullDescription;

                const currentIndex = data.findIndex(p => p.id === projectId);
                const prevBtn = document.getElementById('prev-btn');
                const nextBtn = document.getElementById('next-btn');

                if (currentIndex > 0) {
                    prevBtn.onclick = () => window.location.href = `detail.html?id=${data[currentIndex - 1].id}`;
                } else {
                    prevBtn.disabled = true;
                }

                if (currentIndex < data.length - 1) {
                    nextBtn.onclick = () => window.location.href = `detail.html?id=${data[currentIndex + 1].id}`;
                } else {
                    nextBtn.disabled = true;
                }

                // View button functionality
                document.getElementById('view-btn').onclick = function() {
                    const modal = document.getElementById('presentation-modal');
                    const iframe = document.getElementById('presentation-iframe');
                    iframe.src = project.pdf + '#toolbar=0&view=Fit';
                    modal.style.display = 'flex';
                    // Request fullscreen for the iframe
                    setTimeout(() => {
                        if (iframe.requestFullscreen) {
                            iframe.requestFullscreen();
                        } else if (iframe.webkitRequestFullscreen) { // Safari
                            iframe.webkitRequestFullscreen();
                        } else if (iframe.msRequestFullscreen) { // IE11
                            iframe.msRequestFullscreen();
                        }
                    }, 100); // Small delay to ensure iframe is rendered
                };

                // Close modal functionality
                document.getElementById('close-modal-btn').onclick = function() {
                    const modal = document.getElementById('presentation-modal');
                    const iframe = document.getElementById('presentation-iframe');
                    modal.style.display = 'none';
                    iframe.src = ''; // Clear the src to stop loading
                };
            }
        })
        .catch(error => console.error('Error loading project:', error));

    document.getElementById('back-btn').onclick = () => window.location.href = 'index.html';
});
