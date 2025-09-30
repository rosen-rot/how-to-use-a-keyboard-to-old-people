// script.js - VERSIÓN SIMPLIFICADA Y SEGURA
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Iniciando sistema de navegación...');

    // Función para cambiar de página
    function goToPage(pageId) {
        console.log('Navegando a:', pageId);
        
        // Ocultar todas las páginas
        const allPages = document.querySelectorAll('.page-container');
        allPages.forEach(page => page.classList.add('hidden'));
        
        // Mostrar página destino
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.remove('hidden');
            window.scrollTo(0, 0);
        }
    }

    // Asignar eventos usando event delegation (más robusto)
    document.addEventListener('click', function(event) {
        const target = event.target;
        
        // Detectar clics en botones por su ID
        if (target.id === 'start-btn') {
            goToPage('lesson-1');
        }
        else if (target.id === 'next-to-2') {
            goToPage('lesson-2');
        }
        else if (target.id === 'next-to-3') {
            goToPage('lesson-3');
        }
        else if (target.id === 'next-to-4') {
            goToPage('lesson-4');
        }
        else if (target.id === 'next-to-5') {
            goToPage('lesson-5');
        }
        else if (target.id === 'next-to-6') {
            goToPage('lesson-6');
        }
        else if (target.id === 'next-to-7') {
            goToPage('lesson-7');
        }
        else if (target.id === 'back-to-welcome-1') {
            goToPage('welcome-screen');
        }
        else if (target.id === 'back-to-1') {
            goToPage('lesson-1');
        }
        else if (target.id === 'back-to-2') {
            goToPage('lesson-2');
        }
        else if (target.id === 'back-to-3') {
            goToPage('lesson-3');
        }
        else if (target.id === 'back-to-4') {
            goToPage('lesson-4');
        }
        else if (target.id === 'back-to-5') {
            goToPage('lesson-5');
        }
        else if (target.id === 'back-to-6') {
            goToPage('lesson-6');
        }
        else if (target.id === 'finish-course') {
            if (confirm('¡Felicidades! ¿Quieres volver al inicio?')) {
                goToPage('welcome-screen');
            }
        }
    });

    console.log('✅ Sistema de navegación listo');
});