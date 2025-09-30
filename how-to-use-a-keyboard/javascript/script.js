// script.js - VERSIÓN COMPLETA CON LECCIÓN 1
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Iniciando sistema de navegación...');

    // Variables globales para la lección 1
    let lesson1Manager = null;

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
            
            // Inicializar lección específica si es necesario
            if (pageId === 'lesson-1' && !lesson1Manager) {
                initLesson1();
            }
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

    // ===== LECCIÓN 1: TECLADO ALFANUMÉRICO =====
    function initLesson1() {
        console.log('🎯 Inicializando Lección 1...');
        lesson1Manager = new Lesson1Manager();
    }

    class Lesson1Manager {
        constructor() {
            this.foundVowels = new Set();
            this.vowels = ['A', 'E', 'I', 'O', 'U'];
            this.completedExercises = new Set();
            this.keys = new Map();
            
            this.init();
        }

        init() {
            this.registerKeyboardKeys();
            this.setupVowelExercise();
            this.setupNameExercise();
            this.setupLastnameExercise();
            this.setupKeyboardListeners();
            this.highlightVowels();
            
            console.log('✅ Lección 1 inicializada correctamente');
        }

        registerKeyboardKeys() {
            // Registrar todas las teclas del teclado principal
            const keyElements = document.querySelectorAll('#main-keyboard .key');
            keyElements.forEach(keyElement => {
                const code = keyElement.dataset.code;
                if (code) {
                    this.keys.set(code, keyElement);
                }
            });
            console.log(`📋 Registradas ${this.keys.size} teclas`);
        }

        setupVowelExercise() {
            console.log('🎵 Configurando ejercicio de vocales...');
            // Las vocales ya están resaltadas visualmente por CSS
        }

        setupNameExercise() {
            const nameInput = document.getElementById('name-input');
            const nameFeedback = document.getElementById('name-feedback');
            
            nameInput.addEventListener('input', (e) => {
                const value = e.target.value.trim();
                if (value.length > 0) {
                    this.markExerciseComplete('name');
                    nameFeedback.textContent = `¡Excelente! Has escrito: "${value}"`;
                    nameFeedback.className = 'exercise-feedback success';
                }
            });
            
            nameInput.addEventListener('focus', () => {
                nameFeedback.textContent = '¡Perfecto! Ahora escribe tu nombre usando el teclado. Cada tecla que presiones se iluminará arriba.';
                nameFeedback.className = 'exercise-feedback info';
            });

            // Resaltar teclas cuando el input está enfocado
            nameInput.addEventListener('focus', () => {
                this.highlightAllLetters();
            });

            nameInput.addEventListener('blur', () => {
                this.removeAllHighlights();
            });
        }

        setupLastnameExercise() {
            const lastnameInput = document.getElementById('lastname-input');
            const lastnameFeedback = document.getElementById('lastname-feedback');
            
            lastnameInput.addEventListener('input', (e) => {
                const value = e.target.value.trim();
                if (value.length > 0) {
                    this.markExerciseComplete('lastname');
                    lastnameFeedback.textContent = `¡Muy bien! Has escrito: "${value}"`;
                    lastnameFeedback.className = 'exercise-feedback success';
                }
            });
            
            lastnameInput.addEventListener('focus', () => {
                lastnameFeedback.textContent = 'Ahora escribe tu apellido. ¡Tú puedes!';
                lastnameFeedback.className = 'exercise-feedback info';
                this.highlightAllLetters();
            });

            lastnameInput.addEventListener('blur', () => {
                this.removeAllHighlights();
            });
        }

        setupKeyboardListeners() {
            // Escuchar teclas físicas
            document.addEventListener('keydown', (event) => {
                this.handleKeyPress(event, true);
            });

            document.addEventListener('keyup', (event) => {
                this.handleKeyPress(event, false);
            });

            console.log('⌨️ Listeners de teclado configurados');
        }

        handleKeyPress(event, isKeyDown) {
            const code = event.code;
            const key = event.key.toUpperCase();
            
            // Resaltar tecla en el teclado virtual
            const keyElement = this.keys.get(code);
            if (keyElement) {
                if (isKeyDown) {
                    keyElement.classList.add('active');
                    
                    // Verificar si es una vocal
                    if (this.vowels.includes(key)) {
                        this.foundVowels.add(key);
                        this.updateVowelDisplay();
                        this.checkVowelCompletion();
                    }
                } else {
                    keyElement.classList.remove('active');
                }
            }
            
            // Mostrar información de la tecla (para debugging)
            if (isKeyDown) {
                console.log(`Tecla presionada: ${key} (Código: ${code})`);
            }
        }

        updateVowelDisplay() {
            this.vowels.forEach(vowel => {
                const vowelElement = document.querySelector(`.vowel-key[data-vowel="${vowel}"]`);
                const keyboardKey = this.keys.get(`Key${vowel}`);
                
                if (this.foundVowels.has(vowel) && vowelElement) {
                    vowelElement.classList.add('found');
                }
                if (this.foundVowels.has(vowel) && keyboardKey) {
                    keyboardKey.classList.add('highlight-vowel');
                }
            });
        }

        checkVowelCompletion() {
            if (this.foundVowels.size === this.vowels.length) {
                this.markExerciseComplete('vowels');
                const feedback = document.getElementById('vowels-feedback');
                feedback.textContent = '¡Felicidades! Has encontrado todas las vocales: A, E, I, O, U';
                feedback.className = 'exercise-feedback success';
                
                // Efecto especial cuando se completan las vocales
                this.celebrateVowels();
            }
        }

        celebrateVowels() {
            const vowelsContainer = document.querySelector('.vowels-container');
            vowelsContainer.style.animation = 'pulse 0.5s ease-in-out 3';
            
            // Reset animation after completion
            setTimeout(() => {
                vowelsContainer.style.animation = '';
            }, 1500);
        }

        highlightVowels() {
            // Resaltar visualmente las teclas de vocales
            this.vowels.forEach(vowel => {
                const keyboardKey = this.keys.get(`Key${vowel}`);
                if (keyboardKey) {
                    keyboardKey.classList.add('highlight-lesson');
                }
            });
            console.log('🔤 Vocales resaltadas en el teclado');
        }

        highlightAllLetters() {
            // Resaltar todas las letras para el ejercicio de escritura
            const letterKeys = document.querySelectorAll('.key-letter');
            letterKeys.forEach(key => {
                key.classList.add('highlight-lesson');
            });
        }

        removeAllHighlights() {
            // Quitar todos los resaltados (excepto vocales si no están completas)
            const allKeys = document.querySelectorAll('.key');
            allKeys.forEach(key => {
                key.classList.remove('highlight-lesson');
            });
            
            // Volver a resaltar vocales si el ejercicio no está completo
            if (this.foundVowels.size < this.vowels.length) {
                this.highlightVowels();
            }
        }

        markExerciseComplete(exerciseName) {
            if (!this.completedExercises.has(exerciseName)) {
                this.completedExercises.add(exerciseName);
                console.log(`✅ Ejercicio completado: ${exerciseName}`);
                this.updateProgress();
            }
        }

        updateProgress() {
            const totalExercises = 3;
            const progress = (this.completedExercises.size / totalExercises) * 100;
            
            const progressFill = document.getElementById('lesson-progress');
            const progressText = document.getElementById('progress-text');
            
            if (progressFill && progressText) {
                progressFill.style.width = `${progress}%`;
                progressText.textContent = `${Math.round(progress)}% completado`;
                
                if (progress === 100) {
                    progressText.innerHTML = '🎉 ¡Lección completada! Puedes continuar a la siguiente lección.';
                    
                    // Efecto de confeti visual
                    this.showCompletionEffect();
                }
            }
        }

        showCompletionEffect() {
            const progressSection = document.querySelector('.progress-section');
            if (progressSection) {
                progressSection.style.animation = 'celebrate 1s ease-in-out';
                
                // Añadir estilos de animación temporalmente
                const style = document.createElement('style');
                style.textContent = `
                    @keyframes celebrate {
                        0% { transform: scale(1); }
                        50% { transform: scale(1.05); background: #f0fff4; }
                        100% { transform: scale(1); }
                    }
                    @keyframes pulse {
                        0% { transform: scale(1); }
                        50% { transform: scale(1.1); }
                        100% { transform: scale(1); }
                    }
                `;
                document.head.appendChild(style);
                
                // Remover animación después de completarse
                setTimeout(() => {
                    progressSection.style.animation = '';
                    document.head.removeChild(style);
                }, 1000);
            }
        }
    }

    // Navegación por teclado para toda la aplicación
    document.addEventListener('keydown', function(event) {
        // Solo procesar si no estamos en un campo de texto
        if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
            switch(event.key) {
                case 'ArrowRight':
                    // Avanzar a siguiente lección
                    const currentPage = document.querySelector('.page-container:not(.hidden)').id;
                    const nextPage = getNextPage(currentPage);
                    if (nextPage) goToPage(nextPage);
                    break;
                case 'ArrowLeft':
                    // Retroceder a lección anterior
                    const currentPage2 = document.querySelector('.page-container:not(.hidden)').id;
                    const prevPage = getPreviousPage(currentPage2);
                    if (prevPage) goToPage(prevPage);
                    break;
                case 'Escape':
                    // Volver al inicio
                    goToPage('welcome-screen');
                    break;
            }
        }
    });

    function getNextPage(currentPage) {
        const pages = [
            'welcome-screen', 'lesson-1', 'lesson-2', 'lesson-3', 
            'lesson-4', 'lesson-5', 'lesson-6', 'lesson-7'
        ];
        const currentIndex = pages.indexOf(currentPage);
        return currentIndex < pages.length - 1 ? pages[currentIndex + 1] : null;
    }

    function getPreviousPage(currentPage) {
        const pages = [
            'welcome-screen', 'lesson-1', 'lesson-2', 'lesson-3', 
            'lesson-4', 'lesson-5', 'lesson-6', 'lesson-7'
        ];
        const currentIndex = pages.indexOf(currentPage);
        return currentIndex > 0 ? pages[currentIndex - 1] : null;
    }

    // Debug helper
    window.debugLesson1 = function() {
        if (lesson1Manager) {
            console.log('📊 Estado Lección 1:', {
                vocalesEncontradas: Array.from(lesson1Manager.foundVowels),
                ejerciciosCompletados: Array.from(lesson1Manager.completedExercises),
                teclasRegistradas: lesson1Manager.keys.size
            });
        } else {
            console.log('Lección 1 no está inicializada');
        }
    };

    console.log('✅ Sistema de navegación listo');
});