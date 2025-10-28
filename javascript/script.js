// script.js - VERSIÓN UNIFICADA COMPLETA

document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Iniciando sistema de navegación...');

    // Variables globales para las lecciones
    let currentLessonManager = null;
    let lesson1Manager = null;
    let lesson2Manager = null;
    let lesson3Manager = null;
    let lesson4Manager = null;

    // Variables globales Módulo 3
    let estadoModulo3 = {
        leccion5: { 
            completada: false, 
            ejercicios: { 
                copiar: [false, false],
                pegar: [false],
                cortar: [false, false],
                combinados: [false, false]
            } 
        },
        leccion6: { 
            completada: false, 
            ejercicios: { 
                deshacer: [false, false],
                seleccionar: [false, false],
                buscar: [false, false],
                combinados: [false, false]
            } 
        },
        leccion7: { 
            completada: false, 
            ejercicios: { 
                zoom: [false, false, false],
                final: false
            } 
        }
    };

    let ultimaAccion = null;
    let textoCopiado = '';
    let textoCortado = '';
    let ejerciciosCompletados = new Set();
    let ejerciciosCompletadosLeccion6 = new Set();
    let zoomEjerciciosCompletados = new Set();
    let pasosCompletados = new Set();

    // ===== SISTEMA DE NAVEGACIÓN PRINCIPAL =====
    function goToPage(pageId) {
        console.log('🔄 Navegando a:', pageId);
        
        // Limpiar zoom si estamos saliendo de la lección 7
        const leccionActual = document.querySelector('.page-container:not(.hidden)');
        if (leccionActual && leccionActual.id === 'lesson-7' && pageId !== 'lesson-7') {
            if (typeof limpiarZoom === 'function') {
                limpiarZoom();
            }
        }
        
        // Limpiar manejador actual
        if (currentLessonManager && currentLessonManager.cleanup) {
            currentLessonManager.cleanup();
        }
        currentLessonManager = null;

        // Ocultar todas las páginas
        document.querySelectorAll('.page-container').forEach(page => {
            page.classList.add('hidden');
        });
        
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.remove('hidden');
            window.scrollTo(0, 0);
            
            // Inicializar lecciones específicas
            if (pageId === 'lesson-1') {
                if (!lesson1Manager) {
                    lesson1Manager = new Lesson1Manager();
                }
                currentLessonManager = lesson1Manager;
                currentLessonManager.activate();
            } else if (pageId === 'lesson-2') {
                if (!lesson2Manager) {
                    lesson2Manager = new Lesson2Manager();
                }
                currentLessonManager = lesson2Manager;
                currentLessonManager.activate();
            } else if (pageId === 'lesson-3') {
                if (!lesson3Manager) {
                    lesson3Manager = new Lesson3Manager();
                }
                currentLessonManager = lesson3Manager;
                currentLessonManager.activate();
            } else if (pageId === 'lesson-4') {
                if (!lesson4Manager) {
                    lesson4Manager = new Lesson4Manager();
                }
                currentLessonManager = lesson4Manager;
                currentLessonManager.activate();
            } else if (pageId === 'lesson-5') {
                inicializarLeccion5();
            } else if (pageId === 'lesson-6') {
                inicializarLeccion6();
            } else if (pageId === 'lesson-7') {
                inicializarLeccion7();
            }
        }
    }

    function closeCredits() {
        const credits = document.getElementById('developers-credits');
        if (!credits) return;
    
        // evitar ejecución doble
        if (credits.dataset.closing === 'true') return;
        credits.dataset.closing = 'true';
    
        // accesibilidad: guardar foco y bloquear interacción
        const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        credits.setAttribute('aria-hidden', 'true');
        // inert puede no estar soportado en todos los navegadores
        if ('inert' in credits) credits.inert = true;
    
        // aplicar clase de cierre (preferible a escribir inline style)
        credits.classList.add('closing'); // define .closing { animation: fadeOut 0.5s ease forwards; } en CSS
    
        const finish = () => {
            if (credits.parentNode) credits.remove();
            if (previousFocus && typeof previousFocus.focus === 'function') previousFocus.focus();
        };
    
        // esperar al final de la animación
        const onAnimEnd = (e) => {
            if (e.target === credits) {
                credits.removeEventListener('animationend', onAnimEnd);
                finish();
            }
        };
        credits.addEventListener('animationend', onAnimEnd, { once: true });
    
        // fallback en caso de que animationend no se dispare
        setTimeout(() => {
            if (document.body.contains(credits)) finish();
        }, 800);
    }

    // Exponer la función para compatibilidad con onclick inline y permitir uso desde la consola
    if (typeof window !== 'undefined') {
        window.closeCredits = closeCredits;
    }

    // Listener delegado para botones de la tarjeta de créditos (.btn-credits, .credits-close)
    document.addEventListener('click', function (e) {
        const btn = e.target.closest('.btn-credits, .credits-close');
        if (btn) {
            e.preventDefault();
            closeCredits();
        }
    });

    function setupNavigation() {
        console.log('🎯 Configurando navegación...');
        
        // Usar event delegation para todos los botones de navegación
        document.addEventListener('click', function (event) {
            const target = event.target;

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

        // Configurar textos para selección
        configurarTextosSeleccionables();
    }

    // ===== LECCIÓN 1: TECLADO ALFANUMÉRICO =====
    class Lesson1Manager {
        constructor() {
            this.foundVowels = new Set();
            this.vowels = ['A', 'E', 'I', 'O', 'U'];
            this.completedExercises = new Set();
            this.keys = new Map();
            this.isActive = false;

            this.init();
        }

        init() {
            this.registerKeyboardKeys();
            this.setupVowelExercise();
            this.setupNameExercise();
            this.setupLastnameExercise();
            this.highlightVowels();

            console.log('Lección 1 inicializada correctamente');
        }

        activate() {
            this.isActive = true;
            console.log('Lección 1 activada');
            this.setupKeyboardListeners();
        }

        deactivate() {
            this.isActive = false;
            console.log('Lección 1 desactivada');
            this.removeKeyboardListeners();
            this.removeAllHighlights();
        }

        cleanup() {
            this.deactivate();
        }

        registerKeyboardKeys() {
            const keyElements = document.querySelectorAll('#main-keyboard-1 .key');
            keyElements.forEach(keyElement => {
                const code = keyElement.dataset.code;
                if (code) {
                    this.keys.set(code, keyElement);
                }
            });
            console.log(`Lección 1: Registradas ${this.keys.size} teclas`);
        }

        setupKeyboardListeners() {
            this.boundKeyHandler = this.handleKeyPress.bind(this);
            document.addEventListener('keydown', this.boundKeyHandler);
            document.addEventListener('keyup', this.boundKeyHandler);
            console.log('Lección 1: Listeners de teclado activados');
        }

        removeKeyboardListeners() {
            if (this.boundKeyHandler) {
                document.removeEventListener('keydown', this.boundKeyHandler);
                document.removeEventListener('keyup', this.boundKeyHandler);
                console.log('Lección 1: Listeners de teclado removidos');
            }
        }

        handleKeyPress(event) {
            if (!this.isActive) return;

            const code = event.code;
            const key = event.key.toUpperCase();
            const isKeyDown = event.type === 'keydown';

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

            if (isKeyDown) {
                console.log(`Lección 1 - Tecla: ${key} (Código: ${code})`);
            }
        }

        setupVowelExercise() {
            console.log('Lección 1: Ejercicio de vocales configurado');
        }

        setupNameExercise() {
            const nameInput = document.getElementById('name-input');
            const nameFeedback = document.getElementById('name-feedback');

            if (!nameInput) return;

            nameInput.addEventListener('input', (e) => {
                const value = e.target.value.trim();
                if (value.length > 0) {
                    this.markExerciseComplete('name');
                    nameFeedback.textContent = `¡Excelente! Has escrito: "${value}"`;
                    nameFeedback.className = 'exercise-feedback success';
                }
            });

            nameInput.addEventListener('focus', () => {
                nameFeedback.textContent = '¡Perfecto! Ahora escribe tu nombre usando el teclado ¡Tú puedes!';
                nameFeedback.className = 'exercise-feedback info';
                this.highlightAllLetters();
            });

            nameInput.addEventListener('blur', () => {
                this.removeAllHighlights();
                this.highlightVowels();
            });
        }

        setupLastnameExercise() {
            const lastnameInput = document.getElementById('lastname-input');
            const lastnameFeedback = document.getElementById('lastname-feedback');

            if (!lastnameInput) return;

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
                this.highlightVowels();
            });
        }

        updateVowelDisplay() {
            this.vowels.forEach(vowel => {
                const vowelElement = document.querySelector(`.vowel-key[data-vowel="${vowel}"]`);
                const keyboardKey = this.keys.get(`Key${vowel}`);

                if (this.foundVowels.has(vowel) && vowelElement) {
                    vowelElement.classList.add('found');
                }
                if (this.foundVowels.has(vowel) && keyboardKey) {
                    // CORREGIR: Cambiar 'highlight-vowel-found' por 'highlight-vowel-found'
                    keyboardKey.classList.add('highlight-vowel-found');
                    keyboardKey.classList.remove('highlight-lesson');
                }
            });
        }

        checkVowelCompletion() {
            if (this.foundVowels.size === this.vowels.length) {
                this.markExerciseComplete('vowels');
                const feedback = document.getElementById('vowels-feedback');
                if (feedback) {
                    feedback.textContent = '¡Felicidades! Has encontrado todas las vocales: A, E, I, O, U';
                    feedback.className = 'exercise-feedback success';
                    this.celebrateVowels();
                }
            }
        }

        celebrateVowels() {
            const vowelsContainer = document.querySelector('.vowels-container');
            if (vowelsContainer) {
                vowelsContainer.style.animation = 'pulse 0.5s ease-in-out 3';
                setTimeout(() => {
                    vowelsContainer.style.animation = '';
                }, 1500);
            }
        }

        highlightVowels() {
            console.log('Lección 1: Resaltando vocales...');
            this.vowels.forEach(vowel => {
                const keyboardKey = this.keys.get(`Key${vowel}`);
                if (keyboardKey) {
                    keyboardKey.classList.add('highlight-lesson');
                    console.log(`Vocal ${vowel} resaltada`);
                } else {
                    console.log(`No se encontró tecla para vocal ${vowel}`);
                }
            });
        }

        highlightAllLetters() {
            const letterKeys = document.querySelectorAll('.key-letter');
            letterKeys.forEach(key => {
                key.classList.add('highlight-lesson');
            });
        }

        removeAllHighlights() {
            const allKeys = document.querySelectorAll('.key');
            allKeys.forEach(key => {
                key.classList.remove('highlight-lesson', 'highlight-vowel', 'highlight-vowel-found');
            });

            if (this.foundVowels.size < this.vowels.length) {
                this.highlightVowels();
            }
        }

        markExerciseComplete(exerciseName) {
            if (!this.completedExercises.has(exerciseName)) {
                this.completedExercises.add(exerciseName);
                console.log(`Lección 1 - Ejercicio completado: ${exerciseName}`);
                this.updateProgress();
            }
        }

        updateProgress() {
            const progressFill = document.getElementById('lesson-progress');
            const progressText = document.getElementById('progress-text');

            if (progressFill && progressText) {
                const totalExercises = 3;
                const progress = (this.completedExercises.size / totalExercises) * 100;

                progressFill.style.width = `${progress}%`;
                progressText.textContent = `${Math.round(progress)}% completado`;

                if (progress === 100) {
                    progressText.innerHTML = '🎉 ¡Lección completada! Puedes continuar a la siguiente lección.';
                    this.showCompletionEffect();
                }
            }
        }

        showCompletionEffect() {
            // Busca la sección de progreso solo dentro de la lección activa
            let progressSection = null;
            if (document.getElementById('lesson-1') && !document.getElementById('lesson-1').classList.contains('hidden')) {
                progressSection = document.querySelector('#lesson-1 .progress-section');
            } else if (document.getElementById('lesson-2') && !document.getElementById('lesson-2').classList.contains('hidden')) {
                progressSection = document.querySelector('#lesson-2 .progress-section');
            } else if (document.getElementById('lesson-3') && !document.getElementById('lesson-3').classList.contains('hidden')) {
                progressSection = document.querySelector('#lesson-3 .progress-section');
            }
            if (progressSection) {
                progressSection.style.animation = 'celebrate 1s ease-in-out';
                setTimeout(() => {
                    progressSection.style.animation = '';
                }, 1000);
            }
        }
    }

    // ===== LECCIÓN 2: TECLADO NUMÉRICO SUPERIOR =====
    class Lesson2Manager {
        constructor() {
            this.foundNumbers = new Set();
            this.numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
            this.completedExercises = new Set();
            this.keys = new Map();
            this.isActive = false;

            this.init();
        }

        init() {
            this.registerKeyboardKeys();
            this.setupNumbersExercise();
            this.setupBirthyearExercise();
            this.setupAgeExercise();
            this.setupCurrentYearExercise();
            this.highlightNumbers();

            console.log('✅ Lección 2 inicializada correctamente');
        }

        activate() {
            this.isActive = true;
            console.log('Lección 2 activada');
            this.setupKeyboardListeners();
        }

        deactivate() {
            this.isActive = false;
            console.log('Lección 2 desactivada');
            this.removeKeyboardListeners();
            this.removeAllHighlights();
        }

        cleanup() {
            this.deactivate();
        }

        registerKeyboardKeys() {
            const keyElements = document.querySelectorAll('#main-keyboard-2 .key');
            keyElements.forEach(keyElement => {
                const code = keyElement.dataset.code;
                if (code) {
                    this.keys.set(code, keyElement);
                }
            });
            console.log(`Lección 2: Registradas ${this.keys.size} teclas`);
        }

        setupKeyboardListeners() {
            this.boundKeyHandler = this.handleKeyPress.bind(this);
            document.addEventListener('keydown', this.boundKeyHandler);
            document.addEventListener('keyup', this.boundKeyHandler);
            console.log('Lección 2: Listeners de teclado activados');
        }

        removeKeyboardListeners() {
            if (this.boundKeyHandler) {
                document.removeEventListener('keydown', this.boundKeyHandler);
                document.removeEventListener('keyup', this.boundKeyHandler);
                console.log('Lección 2: Listeners de teclado removidos');
            }
        }

        handleKeyPress(event) {
            if (!this.isActive) return;

            const code = event.code;
            const key = event.key;
            const isKeyDown = event.type === 'keydown';

            const keyElement = this.keys.get(code);
            if (keyElement) {
                if (isKeyDown) {
                    keyElement.classList.add('active');

                    if (this.numbers.includes(key)) {
                        this.foundNumbers.add(key);
                        this.updateNumbersDisplay();
                        this.checkNumbersCompletion();
                    }
                } else {
                    keyElement.classList.remove('active');
                }
            }

            if (isKeyDown) {
                console.log(`Lección 2 - Tecla: ${key} (Código: ${code})`);
            }
        }

        setupNumbersExercise() {
            console.log('Lección 2: Ejercicio de números configurado');
        }

        setupBirthyearExercise() {
            const birthyearInput = document.getElementById('birthyear-input');
            const birthyearFeedback = document.getElementById('birthyear-feedback');

            if (!birthyearInput) return;

            birthyearInput.addEventListener('input', (e) => {
                const value = e.target.value.trim();
                if (this.isValidYear(value)) {
                    this.markExerciseComplete('birthyear');
                    birthyearFeedback.textContent = `¡Perfecto! Año de nacimiento: ${value}`;
                    birthyearFeedback.className = 'exercise-feedback success';
                } else if (value.length > 0) {
                    birthyearFeedback.textContent = 'Por favor, escribe un año válido de 4 números (ej: 1960)';
                    birthyearFeedback.className = 'exercise-feedback info';
                }
            });

            birthyearInput.addEventListener('focus', () => {
                birthyearFeedback.textContent = 'Escribe tu año de nacimiento usando los números de arriba.';
                birthyearFeedback.className = 'exercise-feedback info';
                this.highlightNumberRow();
            });

            birthyearInput.addEventListener('blur', () => {
                this.removeAllHighlights();
                this.highlightNumbers();
            });
        }

        setupAgeExercise() {
            const ageInput = document.getElementById('age-input');
            const ageFeedback = document.getElementById('age-feedback');

            if (!ageInput) return;

            ageInput.addEventListener('input', (e) => {
                const value = e.target.value.trim();
                if (this.isValidAge(value)) {
                    this.markExerciseComplete('age');
                    ageFeedback.textContent = `¡Muy bien! Edad: ${value} años`;
                    ageFeedback.className = 'exercise-feedback success';
                } else if (value.length > 0) {
                    ageFeedback.textContent = 'Por favor, escribe una edad válida (solo números)';
                    ageFeedback.className = 'exercise-feedback info';
                }
            });

            ageInput.addEventListener('focus', () => {
                ageFeedback.textContent = 'Ahora escribe tu edad actual. Usa los números del teclado.';
                ageFeedback.className = 'exercise-feedback info';
                this.highlightNumberRow();
            });

            ageInput.addEventListener('blur', () => {
                this.removeAllHighlights();
                this.highlightNumbers();
            });
        }

        setupCurrentYearExercise() {
            const currentyearInput = document.getElementById('currentyear-input');
            const currentyearFeedback = document.getElementById('currentyear-feedback');

            if (!currentyearInput) return;

            currentyearInput.addEventListener('input', (e) => {
                const value = e.target.value.trim();
                if (this.isValidYear(value)) {
                    this.markExerciseComplete('currentyear');
                    currentyearFeedback.textContent = `¡Excelente! Año actual: ${value}`;
                    currentyearFeedback.className = 'exercise-feedback success';
                } else if (value.length > 0) {
                    currentyearFeedback.textContent = 'Por favor, escribe un año válido de 4 números (ej: 2024)';
                    currentyearFeedback.className = 'exercise-feedback info';
                }
            });

            currentyearInput.addEventListener('focus', () => {
                currentyearFeedback.textContent = 'Finalmente, escribe el año actual. ¡Ya casi terminas!';
                currentyearFeedback.className = 'exercise-feedback info';
                this.highlightNumberRow();
            });

            currentyearInput.addEventListener('blur', () => {
                this.removeAllHighlights();
                this.highlightNumbers();
            });
        }

        updateNumbersDisplay() {
            this.numbers.forEach(number => {
                const numberElement = document.querySelector(`.number-key[data-number="${number}"]`);
                const keyboardKey = this.keys.get(`Digit${number}`);

                if (this.foundNumbers.has(number) && numberElement) {
                    numberElement.classList.add('found');
                }
                if (this.foundNumbers.has(number) && keyboardKey) {
                    keyboardKey.classList.add('highlight-number-found');
                }
            });
        }

        checkNumbersCompletion() {
            if (this.foundNumbers.size === this.numbers.length) {
                this.markExerciseComplete('numbers');
                const feedback = document.getElementById('numbers-feedback');
                if (feedback) {
                    feedback.textContent = '¡Felicidades! Has encontrado todos los números';
                    feedback.className = 'exercise-feedback success';
                    this.celebrateNumbers();
                }
            }
        }

        celebrateNumbers() {
            const numbersContainer = document.querySelector('.numbers-container');
            if (numbersContainer) {
                numbersContainer.style.animation = 'pulse 0.5s ease-in-out 3';
                setTimeout(() => {
                    numbersContainer.style.animation = '';
                }, 1500);
            }
        }

        highlightNumbers() {
            console.log('Lección 2: Resaltando números...');
            this.numbers.forEach(number => {
                const keyboardKey = this.keys.get(`Digit${number}`);
                if (keyboardKey) {
                    keyboardKey.classList.add('highlight-number');
                }
            });
        }

        highlightNumberRow() {
            const numberKeys = document.querySelectorAll('.key-number');
            numberKeys.forEach(key => {
                key.classList.add('highlight-number');
            });
        }

        removeAllHighlights() {
            const allKeys = document.querySelectorAll('.key');
            allKeys.forEach(key => {
                key.classList.remove('highlight-number', 'highlight-number-found');
            });

            if (this.foundNumbers.size < this.numbers.length) {
                this.highlightNumbers();
            }
        }

        isValidYear(value) {
            return /^\d{4}$/.test(value) && parseInt(value) > 1900 && parseInt(value) <= new Date().getFullYear();
        }

        isValidAge(value) {
            return /^\d{1,3}$/.test(value) && parseInt(value) > 0 && parseInt(value) < 150;
        }

        markExerciseComplete(exerciseName) {
            if (!this.completedExercises.has(exerciseName)) {
                this.completedExercises.add(exerciseName);
                console.log(`Lección 2 - Ejercicio completado: ${exerciseName}`);
                this.updateProgress();
            }
        }

        updateProgress() {
            const progressFill = document.getElementById('lesson-progress-2');
            const progressText = document.getElementById('progress-text-2');

            if (progressFill && progressText) {
                const totalExercises = 4;
                const progress = (this.completedExercises.size / totalExercises) * 100;

                progressFill.style.width = `${progress}%`;
                progressText.textContent = `${Math.round(progress)}% completado`;

                if (progress === 100) {
                    progressText.innerHTML = '🎉 ¡Lección 2 completada! Puedes continuar a la siguiente lección.';
                    this.showCompletionEffect();
                }
            }
        }

        showCompletionEffect() {
            const progressSection = document.querySelector('.progress-section');
            if (progressSection) {
                progressSection.style.animation = 'celebrate 1s ease-in-out';
                setTimeout(() => {
                    progressSection.style.animation = '';
                }, 1000);
            }
        }
    }

    // ===== LECCIÓN 3: TECLAS ESPECIALES =====
    class Lesson3Manager {
        constructor() {
            this.completedExercises = new Set();
            this.keys = new Map();
            this.isActive = false;
            this.currentGroup = 'writing';

            this.init();
        }

        init() {
            this.setupNavigation();
            this.registerKeyboardKeys();
            this.setupAllExercises();
            console.log('✅ Lección 3 inicializada correctamente');
        }

        activate() {
            this.isActive = true;
            console.log('Lección 3 activada');
            this.setupKeyboardListeners();
            this.highlightCurrentGroupKeys();
        }

        deactivate() {
            this.isActive = false;
            console.log('Lección 3 desactivada');
            this.removeKeyboardListeners();
            this.removeAllHighlights();
        }

        cleanup() {
            this.deactivate();
        }

        // ===== SISTEMA DE NAVEGACIÓN =====
        setupNavigation() {
            const navButtons = document.querySelectorAll('.key-nav-btn');

            navButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const targetGroup = e.target.closest('.key-nav-btn').dataset.target;
                    this.switchGroup(targetGroup);
                });
            });

            this.switchGroup('writing');
        }

        switchGroup(targetGroup) {
            console.log(`Cambiando al grupo: ${targetGroup}`);

            this.removeAllActiveStates();
            this.activateGroup(targetGroup);
            this.currentGroup = targetGroup;
            this.highlightCurrentGroupKeys();
            this.updateGroupTitle(targetGroup);
        }

        removeAllActiveStates() {
            document.querySelectorAll('.key-nav-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.key-cards-group').forEach(group => group.classList.remove('active'));
            document.querySelectorAll('.keyboard-variant').forEach(keyboard => keyboard.classList.remove('active'));
        }

        activateGroup(targetGroup) {
            const navBtn = document.querySelector(`[data-target="${targetGroup}"]`);
            const cardsGroup = document.getElementById(`cards-${targetGroup}`);
            const keyboard = document.getElementById(`keyboard-lesson-3-${targetGroup}`);

            if (navBtn) navBtn.classList.add('active');
            if (cardsGroup) cardsGroup.classList.add('active');
            if (keyboard) keyboard.classList.add('active');
        }

        updateGroupTitle(targetGroup) {
            const titleMap = {
                'writing': 'Escritura y Formato ✏️',
                'modification': 'Modificación 🔑',
                'editing': 'Edición ✂️',
                'system': 'Sistema 🪟'
            };

            const titleElement = document.getElementById('current-group-title');
            if (titleElement && titleMap[targetGroup]) {
                titleElement.textContent = titleMap[targetGroup];
            }
        }

        // ===== REGISTRO DE TECLAS =====
        registerKeyboardKeys() {
            const keyboardVariants = [
                'keyboard-lesson-3-writing',
                'keyboard-lesson-3-modification',
                'keyboard-lesson-3-editing',
                'keyboard-lesson-3-system'
            ];

            keyboardVariants.forEach(keyboardId => {
                const keyElements = document.querySelectorAll(`#${keyboardId} .key`);
                keyElements.forEach(keyElement => {
                    const code = keyElement.dataset.code;
                    if (code) {
                        this.keys.set(code, keyElement);
                    }
                });
            });

            console.log(`Lección 3: Registradas ${this.keys.size} teclas`);
        }

        // ===== MANEJO DE TECLADO =====
        setupKeyboardListeners() {
            this.boundKeyHandler = this.handleKeyPress.bind(this);
            document.addEventListener('keydown', this.boundKeyHandler);
            document.addEventListener('keyup', this.boundKeyHandler);
            console.log('Lección 3: Listeners de teclado activados');
        }

        removeKeyboardListeners() {
            if (this.boundKeyHandler) {
                document.removeEventListener('keydown', this.boundKeyHandler);
                document.removeEventListener('keyup', this.boundKeyHandler);
                this.boundKeyHandler = null;
            }
        }

        handleKeyPress(event) {
            if (!this.isActive) return;

            const code = event.code;
            const isKeyDown = event.type === 'keydown';

            const keyElement = this.keys.get(code);
            if (keyElement) {
                if (isKeyDown) {
                    keyElement.classList.add('active');
                    this.handleSpecificKeyPress(event);
                } else {
                    keyElement.classList.remove('active');
                }
            }

            if (isKeyDown) {
                console.log(`Lección 3 - Tecla: ${event.key} (Código: ${code})`);
            }
        }

        handleSpecificKeyPress(event) {
            const code = event.code;

            switch (this.currentGroup) {
                case 'writing':
                    if (code === 'Space' || code === 'Enter' || code === 'Tab' || code === 'CapsLock') {
                        this.showKeyPressFeedback(code);
                    }
                    break;

                case 'modification':
                    if (code.includes('Shift') || code.includes('Control') || code.includes('Alt')) {
                        this.showKeyPressFeedback(code);
                    }
                    break;

                case 'editing':
                    if (code === 'Backspace') {
                        this.showKeyPressFeedback(code);
                    }
                    break;

                case 'system':
                    if (code.includes('Meta')) {
                        this.showKeyPressFeedback(code);
                    }
                    break;
            }
        }

        showKeyPressFeedback(keyCode) {
            const feedbackMessages = {
                'Space': '¡Perfecto! Has usado la tecla Espacio para separar palabras.',
                'Enter': '¡Excelente! Has usado Enter para crear nueva línea.',
                'Tab': '¡Muy bien! Has usado Tab para navegar entre campos.',
                'CapsLock': '¡Caps Lock activado/desactivado! Ahora puedes escribir en mayúsculas.',
                'ShiftLeft': '¡Bien! Mantienes Shift para mayúsculas o símbolos.',
                'ShiftRight': '¡Bien! Mantienes Shift para mayúsculas o símbolos.',
                'ControlLeft': '¡Bien! Mantienes Control para atajos de teclado.',
                'ControlRight': '¡Bien! Mantienes Control para atajos de teclado.',
                'AltLeft': '¡Bien! Mantienes Alt para funciones alternativas.',
                'AltRight': '¡Bien! Mantienes Alt Gr para caracteres especiales.',
                'Backspace': '¡Correcto! Has usado Backspace para corregir.',
                'MetaLeft': '¡Menú Windows abierto! Accede a funciones del sistema.',
                'MetaRight': '¡Menú Windows abierto! Accede a funciones del sistema.'
            };

            const message = feedbackMessages[keyCode];
            if (message) {
                this.showTemporaryFeedback(message, 'info');
            }
        }

        showTemporaryFeedback(message, type = 'info') {
            const tempFeedback = document.createElement('div');
            tempFeedback.className = `exercise-feedback ${type}`;
            tempFeedback.textContent = message;
            tempFeedback.style.position = 'fixed';
            tempFeedback.style.top = '20px';
            tempFeedback.style.right = '20px';
            tempFeedback.style.zIndex = '1000';
            tempFeedback.style.maxWidth = '300px';
            tempFeedback.style.padding = '15px';
            tempFeedback.style.borderRadius = '8px';
            tempFeedback.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';

            document.body.appendChild(tempFeedback);

            setTimeout(() => {
                if (tempFeedback.parentNode) {
                    tempFeedback.parentNode.removeChild(tempFeedback);
                }
            }, 3000);
        }

        // ===== HIGHLIGHTS DE TECLAS =====
        highlightCurrentGroupKeys() {
            this.removeAllHighlights();

            switch (this.currentGroup) {
                case 'writing':
                    this.highlightWritingKeys();
                    break;
                case 'modification':
                    this.highlightModificationKeys();
                    break;
                case 'editing':
                    this.highlightEditingKeys();
                    break;
                case 'system':
                    this.highlightSystemKeys();
                    break;
            }
        }

        highlightWritingKeys() {
            const writingKeys = [
                this.keys.get('Space'),
                this.keys.get('Enter'),
                this.keys.get('Tab'),
                this.keys.get('CapsLock')
            ];

            writingKeys.forEach(key => {
                if (key) key.classList.add('highlight-writing');
            });
        }

        highlightModificationKeys() {
            const modificationKeys = [
                this.keys.get('ShiftLeft'), this.keys.get('ShiftRight'),
                this.keys.get('ControlLeft'), this.keys.get('ControlRight'),
                this.keys.get('AltLeft'), this.keys.get('AltRight')
            ];

            modificationKeys.forEach(key => {
                if (key) key.classList.add('highlight-modification');
            });
        }

        highlightEditingKeys() {
            const editingKey = this.keys.get('Backspace');
            if (editingKey) editingKey.classList.add('highlight-editing');
        }

        highlightSystemKeys() {
            const systemKeys = [
                this.keys.get('MetaLeft'),
                this.keys.get('MetaRight')
            ];

            systemKeys.forEach(key => {
                if (key) key.classList.add('highlight-system');
            });
        }

        removeAllHighlights() {
            this.keys.forEach(key => {
                key.classList.remove(
                    'highlight-writing',
                    'highlight-modification',
                    'highlight-editing',
                    'highlight-system'
                );
            });
        }

        // ===== EJERCICIOS =====
        setupAllExercises() {
            this.setupSpaceExercise();
            this.setupEnterExercise();
            this.setupBackspaceExercise();
            this.setupUppercaseExercise();
            this.setupSymbolsExercise();
            this.setupEmailExercise();
            this.setupTabExercise();
        }

        // ===== Ejercicio 1: Separar palabras con Espacio =====
        setupSpaceExercise() {
            const spaceInput = document.getElementById('space-ex1-input');
            const spaceFeedback = document.getElementById('space-ex1-feedback');

            if (spaceInput && spaceFeedback) {
                spaceInput.addEventListener('input', (e) => {
                    const value = e.target.value.trim();
                    if (this.isValidSpaceExercise(value)) {
                        this.markExerciseComplete('space1');
                        spaceFeedback.textContent = '¡Perfecto! Has separado correctamente las palabras.';
                        spaceFeedback.className = 'exercise-feedback success';
                    } else if (value.length > 0) {
                        spaceFeedback.textContent = 'Recuerda separar las palabras correctamente: "la manzana es dulce"';
                        spaceFeedback.className = 'exercise-feedback info';
                    } else {
                        spaceFeedback.textContent = '';
                        spaceFeedback.className = 'exercise-feedback';
                    }
                });
            }
        }

        // ===== Ejercicio 2: Lista de compras (Enter) =====
        setupEnterExercise() {
            const enterInput = document.getElementById('enter-ex1-input');
            const enterFeedback = document.getElementById('enter-ex1-feedback');

            if (enterInput && enterFeedback) {
                enterInput.addEventListener('input', (e) => {
                    const value = e.target.value.trim();
                    const lines = value.split('\n').filter(line => line.trim() !== '');
                    if (lines.length >= 3) {
                        this.markExerciseComplete('enter1');
                        enterFeedback.textContent = '¡Muy bien! Has creado tu lista usando Enter.';
                        enterFeedback.className = 'exercise-feedback success';
                    } else if (value.length > 0) {
                        enterFeedback.textContent = 'Recuerda presionar Enter después de cada elemento (deben ser al menos 3).';
                        enterFeedback.className = 'exercise-feedback info';
                    } else {
                        enterFeedback.textContent = '';
                        enterFeedback.className = 'exercise-feedback';
                    }
                });
            }
        }

        // ===== Ejercicio 3: Corrige errores con Backspace =====
        setupBackspaceExercise() {
            const backspaceInput = document.getElementById('backspace-ex1-input');
            const backspaceFeedback = document.getElementById('backspace-ex1-feedback');

            if (backspaceInput && backspaceFeedback) {
                let backspaceUsed = false;
                const correctedText = "El computador es una herramienta genial";

                backspaceInput.addEventListener('keydown', (e) => {
                    if (e.key === 'Backspace') {
                        backspaceUsed = true;
                    }
                });

                backspaceInput.addEventListener('input', (e) => {
                    const value = e.target.value.trim();

                    if (backspaceUsed && value === correctedText) {
                        this.markExerciseComplete('backspace1');
                        backspaceFeedback.textContent = '¡Muy bien! Has corregido todos los errores usando Borrar.';
                        backspaceFeedback.className = 'exercise-feedback success';
                    } else if (backspaceUsed && value !== correctedText) {
                        backspaceFeedback.textContent = '¡Vas bien! Asegúrate de corregir todas las letras incorrectas.';
                        backspaceFeedback.className = 'exercise-feedback info';
                    } else {
                        backspaceFeedback.textContent = 'Haz clic al lado derecho de la letra incorrecta y presiona Borrar.';
                        backspaceFeedback.className = 'exercise-feedback info';
                    }
                });
            }
        }

        // ===== Ejercicio 4: Escribir en mayúsculas =====
        setupUppercaseExercise() {
            const uppercaseInput = document.getElementById('uppercase-ex1-input');
            const uppercaseFeedback = document.getElementById('uppercase-ex1-feedback');

            if (uppercaseInput && uppercaseFeedback) {
                uppercaseInput.addEventListener('input', (e) => {
                    const value = e.target.value.trim();
                    if (value === value.toUpperCase() && value === "EL TECLADO TIENE MUCHAS TECLAS") {
                        this.markExerciseComplete('uppercase1');
                        uppercaseFeedback.textContent = '¡Perfecto! Has escrito la frase completamente en mayúsculas.';
                        uppercaseFeedback.className = 'exercise-feedback success';
                    } else if (value.length > 0) {
                        uppercaseFeedback.textContent = 'Recuerda escribir toda la frase en mayúsculas: "EL TECLADO ES ÚTIL"';
                        uppercaseFeedback.className = 'exercise-feedback info';
                    } else {
                        uppercaseFeedback.textContent = '';
                        uppercaseFeedback.className = 'exercise-feedback';
                    }
                });
            }
        }

        // ===== Ejercicio 5: Escribir símbolos con Shift =====
        setupSymbolsExercise() {
            const symbolsInput = document.getElementById('symbols-ex1-input');
            const symbolsFeedback = document.getElementById('symbols-ex1-feedback');

            if (symbolsInput && symbolsFeedback) {
                symbolsInput.addEventListener('input', (e) => {
                    const value = e.target.value.trim();
                    if (value === "#$%") {
                        this.markExerciseComplete('symbols1');
                        symbolsFeedback.textContent = '¡Excelente! Has escrito correctamente todos los símbolos.';
                        symbolsFeedback.className = 'exercise-feedback success';
                    } else if (value.length > 0) {
                        symbolsFeedback.textContent = 'Asegúrate de escribir los símbolos en el orden correcto: # $ %';
                        symbolsFeedback.className = 'exercise-feedback info';
                    } else {
                        symbolsFeedback.textContent = '';
                        symbolsFeedback.className = 'exercise-feedback';
                    }
                });
            }
        }

        // ===== Ejercicio 6: Escribir correo con @ =====
        setupEmailExercise() {
            const emailInput = document.getElementById('email-ex1-input');
            const emailFeedback = document.getElementById('email-ex1-feedback');

            if (emailInput && emailFeedback) {
                emailInput.addEventListener('input', (e) => {
                    const value = e.target.value.trim();
                    if (value.includes('@') && value.includes('.')) {
                        this.markExerciseComplete('email1');
                        emailFeedback.textContent = '¡Muy bien! Has escrito un correo correctamente.';
                        emailFeedback.className = 'exercise-feedback success';
                    } else if (value.length > 0) {
                        emailFeedback.textContent = 'Recuerda incluir el símbolo @ y el dominio. Ej: ejemplo@gmail.com';
                        emailFeedback.className = 'exercise-feedback info';
                    } else {
                        emailFeedback.textContent = '';
                        emailFeedback.className = 'exercise-feedback';
                    }
                });
            }
        }

        // ===== Ejercicio 7: Navegar con Tab =====
        setupTabExercise() {
            const tabFields = document.querySelectorAll('.tab-field');
            const tabFeedback = document.getElementById('tab-ex1-feedback');

            if (tabFields.length > 0 && tabFeedback) {
                tabFields.forEach(field => {
                    field.addEventListener('input', () => {
                        this.checkTabExerciseCompletion(tabFields, tabFeedback);
                    });
                });

                this.checkTabExerciseCompletion(tabFields, tabFeedback);
            }
        }

        checkTabExerciseCompletion(fields, feedback) {
            const allFilled = Array.from(fields).every(field => field.value.trim().length > 0);

            if (allFilled) {
                this.markExerciseComplete('tab1');
                feedback.textContent = '¡Excelente! Has completado todos los campos usando Tab.';
                feedback.className = 'exercise-feedback success';
            } else {
                const filledCount = Array.from(fields).filter(field => field.value.trim().length > 0).length;
                feedback.textContent = `Has completado ${filledCount} de ${fields.length} campos. Usa Tab para navegar.`;
                feedback.className = 'exercise-feedback info';
            }
        }

        // ===== VALIDACIONES =====
        isValidSpaceExercise(value) {
            return value.toLowerCase() === 'la manzana es dulce';
        }

        // ===== SISTEMA DE PROGRESO =====
        markExerciseComplete(exerciseName) {
            if (!this.completedExercises.has(exerciseName)) {
                this.completedExercises.add(exerciseName);
                console.log(`Lección 3 - Ejercicio completado: ${exerciseName}`);
                this.updateProgress();
            }
        }

        updateProgress() {
            const progressFill = document.getElementById('lesson-progress-3');
            const progressText = document.getElementById('progress-text-3');

            if (progressFill && progressText) {
                const totalExercises = 7;
                const progress = (this.completedExercises.size / totalExercises) * 100;

                progressFill.style.width = `${progress}%`;
                progressText.textContent = `${Math.round(progress)}% completado`;

                if (progress === 100) {
                    progressText.innerHTML = '🎉 ¡Lección 3 completada! Puedes continuar a la siguiente lección.';
                    this.showCompletionEffect();
                }
            }
        }

        showCompletionEffect() {
            const progressSection = document.querySelector('#lesson-3 .progress-section');
            if (progressSection) {
                progressSection.style.animation = 'celebrate 1s ease-in-out';
                setTimeout(() => {
                    progressSection.style.animation = '';
                }, 1000);
            }
        }
    }

    // ===== LECCIÓN 4: TECLADO NUMÉRICO LATERAL =====
    class Lesson4Manager {
        constructor() {
            this.completedExercises = new Set();
            this.keys = new Map();
            this.isActive = false;
            this.numLockActive = false;

            this.init();
        }

        init() {
            this.registerNumpadKeys();
            this.setupNumLockExercise();
            this.setupSequenceExercise();
            this.setupOperationExercise();

            console.log('✅ Lección 4 inicializada correctamente');
        }

        activate() {
            this.isActive = true;
            console.log('Lección 4 activada');
            this.setupKeyboardListeners();
        }

        deactivate() {
            this.isActive = false;
            console.log('Lección 4 desactivada');
            this.removeKeyboardListeners();
            this.removeAllHighlights();
        }

        cleanup() {
            this.deactivate();
        }

        // ====== REGISTRO DE TECLAS ======
        registerNumpadKeys() {
            const keyElements = document.querySelectorAll('#numpad .key');
            keyElements.forEach(keyElement => {
                const code = keyElement.dataset.code;
                if (code) {
                    this.keys.set(code, keyElement);
                }
            });
            console.log(`Lección 4: Registradas ${this.keys.size} teclas del teclado numérico`);
        }

        setupKeyboardListeners() {
            this.boundKeyHandler = this.handleKeyPress.bind(this);
            document.addEventListener('keydown', this.boundKeyHandler);
            document.addEventListener('keyup', this.boundKeyHandler);
        }

        removeKeyboardListeners() {
            if (this.boundKeyHandler) {
                document.removeEventListener('keydown', this.boundKeyHandler);
                document.removeEventListener('keyup', this.boundKeyHandler);
                this.boundKeyHandler = null;
            }
        }

        handleKeyPress(event) {
            if (!this.isActive) return;

            const code = event.code;
            const keyElement = this.keys.get(code);
            const isKeyDown = event.type === 'keydown';

            // Resaltar tecla
            if (keyElement) {
                if (isKeyDown) {
                    keyElement.classList.add('active');
                } else {
                    keyElement.classList.remove('active');
                }
            }

            // Detectar Num Lock activado/desactivado
            if (isKeyDown && code === 'NumLock') {
                this.numLockActive = !this.numLockActive;
                console.log(`Num Lock ${this.numLockActive ? 'activado' : 'desactivado'}`);
            }
        }

        // ===== Ejercicio 1: Activar Num Lock =====
        setupNumLockExercise() {
            const checkButton = document.getElementById('check-numlock');
            const feedback = document.getElementById('numlock-feedback');

            if (checkButton && feedback) {
                checkButton.addEventListener('click', () => {
                    if (this.numLockActive) {
                        this.markExerciseComplete('numlock');
                        feedback.textContent = '✅ ¡Perfecto! Num Lock está activado. Ahora puedes usar el teclado numérico.';
                        feedback.className = 'exercise-feedback success';
                    } else {
                        feedback.textContent = '⚠️ Num Lock está desactivado. Presiona la tecla Num Lock hasta que la luz se encienda.';
                        feedback.className = 'exercise-feedback info';
                    }
                });
            }
        }

        // ===== Ejercicio 2: Escribir secuencia =====
        setupSequenceExercise() {
            const input = document.getElementById('numpad-sequence-input');
            const feedback = document.getElementById('numpad-sequence-feedback');

            if (input && feedback) {
                input.addEventListener('input', (e) => {
                    const value = e.target.value.trim();
                    if (!this.numLockActive) {
                        feedback.textContent = '⚠️ Primero activa Num Lock para usar el teclado numérico.';
                        feedback.className = 'exercise-feedback info';
                        return;
                    }

                    if (value === '7531') {
                        this.markExerciseComplete('sequence');
                        feedback.textContent = '✅ ¡Muy bien! Has escrito la secuencia correctamente.';
                        feedback.className = 'exercise-feedback success';
                    } else if (value.length > 0) {
                        feedback.textContent = '✏️ Revisa la secuencia. Debe ser: 7531';
                        feedback.className = 'exercise-feedback info';
                    } else {
                        feedback.textContent = '';
                        feedback.className = 'exercise-feedback';
                    }
                });
            }
        }

        // ===== Ejercicio 3: Escribir operación =====
        setupOperationExercise() {
            const input = document.getElementById('numpad-operation-input');
            const feedback = document.getElementById('numpad-operation-feedback');

            if (input && feedback) {
                input.addEventListener('input', (e) => {
                    const value = e.target.value.trim();
                    if (!this.numLockActive) {
                        feedback.textContent = '⚠️ Primero activa Num Lock para usar el teclado numérico.';
                        feedback.className = 'exercise-feedback info';
                        return;
                    }

                    if (value === '45+27') {
                        this.markExerciseComplete('operation');
                        feedback.textContent = '✅ ¡Excelente! Has escrito la operación correctamente.';
                        feedback.className = 'exercise-feedback success';
                    } else if (value.length > 0) {
                        feedback.textContent = '✏️ La operación debe ser: 45+27';
                        feedback.className = 'exercise-feedback info';
                    } else {
                        feedback.textContent = '';
                        feedback.className = 'exercise-feedback';
                    }
                });
            }
        }

        // ===== HIGHLIGHTS =====
        removeAllHighlights() {
            this.keys.forEach(key => {
                key.classList.remove('active');
            });
        }

        // ===== PROGRESO =====
        markExerciseComplete(exerciseName) {
            if (!this.completedExercises.has(exerciseName)) {
                this.completedExercises.add(exerciseName);
                console.log(`Lección 4 - Ejercicio completado: ${exerciseName}`);
                this.updateProgress();
            }
        }

        updateProgress() {
            const progressFill = document.getElementById('lesson-progress-4');
            const progressText = document.getElementById('progress-text-4');

            if (progressFill && progressText) {
                const totalExercises = 3;
                const progress = (this.completedExercises.size / totalExercises) * 100;

                progressFill.style.width = `${progress}%`;
                progressText.textContent = `${Math.round(progress)}% completado`;

                if (progress === 100) {
                    progressText.innerHTML = '🎉 ¡Lección 4 completada! Puedes continuar a la siguiente lección.';
                    this.showCompletionEffect();
                }
            }
        }

        showCompletionEffect() {
            const progressSection = document.querySelector('#lesson-4 .progress-section');
            if (progressSection) {
                progressSection.style.animation = 'celebrate 1s ease-in-out';
                setTimeout(() => {
                    progressSection.style.animation = '';
                }, 1000);
            }
        }
    }

    // ===== FUNCIONES COMUNES MÓDULO 3 =====
    function mostrarFeedbackEjercicio(feedbackId, mensaje, esExitoso = true) {
        const feedback = document.getElementById(feedbackId);
        if (feedback) {
            feedback.textContent = mensaje;
            feedback.className = `exercise-feedback ${esExitoso ? 'success' : 'error'}`;
            feedback.style.display = 'block';
            feedback.style.animation = 'fadeIn 0.5s ease-in-out';
            
            feedback.style.fontSize = '18px';
            feedback.style.padding = '15px';
            feedback.style.marginTop = '15px';
            
            setTimeout(() => {
                feedback.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }, 300);
        }
    }

    function mostrarFeedbackAccion(accion) {
        const feedback = document.createElement('div');
        feedback.className = 'feedback-accion';
        feedback.innerHTML = `✅ ${accion}`;
        feedback.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: #4caf50;
            color: white;
            padding: 12px 16px;
            border-radius: 8px;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            font-weight: bold;
            font-size: 16px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        `;
        
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => feedback.remove(), 300);
        }, 2000);
    }

    function actualizarProgresoLeccion(leccion) {
        const leccionKey = `leccion${leccion}`;
        if (!estadoModulo3[leccionKey]) return;
        
        const ejercicios = estadoModulo3[leccionKey].ejercicios;
        let completados = 0;
        let total = 0;
        
        for (const tipo in ejercicios) {
            if (Array.isArray(ejercicios[tipo])) {
                ejercicios[tipo].forEach(completado => {
                    total++;
                    if (completado) completados++;
                });
            } else if (typeof ejercicios[tipo] === 'boolean') {
                total++;
                if (ejercicios[tipo]) completados++;
            }
        }
        
        const porcentaje = Math.round((completados / total) * 100);
        
        console.log(`📊 Progreso Lección ${leccion}: ${completados}/${total} ejercicios = ${porcentaje}%`);
        
        // ACTUALIZAR TANTO LA BARRA COMO EL TEXTO
        const barraProgreso = document.getElementById(`lesson-${leccion}-progress`);
        if (barraProgreso) {
            barraProgreso.style.width = `${porcentaje}%`;
        }
        
        const progresoTexto = document.getElementById(`lesson-${leccion}-progress-text`);
        if (progresoTexto) {
            progresoTexto.textContent = `${porcentaje}% completado`;
            progresoTexto.style.fontSize = '18px';
            
            if (porcentaje === 100) {
                progresoTexto.innerHTML = '🎉 ¡Lección completada! Puedes continuar.';
                estadoModulo3[leccionKey].completada = true;
            }
        }
        
        // ESPECÍFICO PARA LECCIÓN 7: También actualizar el elemento genérico
        if (leccion === 7) {
            const progresoTextoGen = document.getElementById('progress-text');
            if (progresoTextoGen) {
                progresoTextoGen.textContent = `${porcentaje}% completado`;
                if (porcentaje === 100) {
                    progresoTextoGen.innerHTML = '🎉 ¡Lección completada! Puedes continuar.';
                }
            }
        }
    }

    // ===== LECCIÓN 5: ATAJOS BÁSICOS =====
    function inicializarLeccion5() {
        console.log('🎯 Inicializando Módulo 3 - Lección 5...');
        
        if (!estadoModulo3.leccion5) {
            estadoModulo3.leccion5 = { 
                completada: false, 
                ejercicios: { 
                    copiar: [false, false],
                    pegar: [false],
                    cortar: [false, false],
                    combinados: [false, false]
                } 
            };
        }
        
        ejerciciosCompletados = new Set();
        configurarEventosTecladoLeccion5();
        configurarAreasEditables();
        configurarTextosSeleccionablesLeccion5();
        actualizarProgresoLeccion(5);
    }

    function configurarTextosSeleccionablesLeccion5() {
        const textosCopiar = [
            'texto-copiar-1',
            'texto-copiar-2', 
            'texto-original-1'
        ];
        
        textosCopiar.forEach(id => {
            const elemento = document.getElementById(id);
            if (elemento) {
                elemento.classList.add('no-auto-select', 'seleccionable');
                
                elemento.addEventListener('mouseup', function() {
                    const seleccion = window.getSelection().toString();
                    if (seleccion.length > 0) {
                        this.classList.add('manual-selected');
                        setTimeout(() => {
                            this.classList.remove('manual-selected');
                        }, 2000);
                    }
                });
            }
        });
    }

    function configurarEventosTecladoLeccion5() {
        document.addEventListener('keydown', function(event) {
            const leccionActual = document.querySelector('.page-container:not(.hidden)');
            if (!leccionActual || leccionActual.id !== 'lesson-5') return;

            if (event.ctrlKey) {
                const elementoActivo = document.activeElement;
                
                switch(event.key.toLowerCase()) {
                    case 'c':
                        ultimaAccion = 'copiar';
                        textoCopiado = window.getSelection().toString();
                        console.log('📋 Texto copiado:', textoCopiado);
                        verificarEjercicioAutomaticoLeccion5('copiar');
                        mostrarFeedbackAccion('Ctrl+C - Copiar');
                        break;
                        
                    case 'v':
                        ultimaAccion = 'pegar';
                        console.log('📎 Acción de pegar detectada');
                        
                        if (elementoActivo.classList.contains('exercise-input')) {
                            setTimeout(() => {
                                verificarEjercicioAutomaticoLeccion5('pegar', elementoActivo);
                            }, 100);
                        }
                        mostrarFeedbackAccion('Ctrl+V - Pegar');
                        break;
                        
                    case 'x':
                        ultimaAccion = 'cortar';
                        textoCortado = window.getSelection().toString();
                        console.log('✂️ Texto cortado:', textoCortado);
                        verificarEjercicioAutomaticoLeccion5('cortar');
                        mostrarFeedbackAccion('Ctrl+X - Cortar');
                        break;
                }
            }
        });

        document.addEventListener('input', function(event) {
            const leccionActual = document.querySelector('.page-container:not(.hidden)');
            if (!leccionActual || leccionActual.id !== 'lesson-5') return;

            if (event.target.classList.contains('exercise-input')) {
                const elemento = event.target;
                
                if (ultimaAccion === 'pegar' && elemento.value.length > 0) {
                    setTimeout(() => {
                        verificarEjercicioAutomaticoLeccion5('pegar', elemento);
                    }, 50);
                }
            }
        });
    }

    function verificarEjercicioAutomaticoLeccion5(tipo, elemento = null) {
        if (!estadoModulo3.leccion5) return;

        let ejercicioCompletado = false;
        let mensaje = '';
        let ejercicioId = '';
        let feedbackId = '';

        switch(tipo) {
            case 'copiar':
                if (textoCopiado.includes('tecnología nos ayuda') && !ejerciciosCompletados.has('copiar-1')) {
                    ejercicioCompletado = true;
                    ejercicioId = 'copiar-1';
                    feedbackId = 'feedback-copiar-1';
                    mensaje = '¡Correcto! Has copiado el primer texto usando Ctrl+C.';
                    estadoModulo3.leccion5.ejercicios.copiar[0] = true;
                }
                else if (textoCopiado.includes('Aprender cosas nuevas') && !ejerciciosCompletados.has('copiar-2')) {
                    ejercicioCompletado = true;
                    ejercicioId = 'copiar-2';
                    feedbackId = 'feedback-copiar-2';
                    mensaje = '¡Excelente! Has copiado el segundo texto correctamente.';
                    estadoModulo3.leccion5.ejercicios.copiar[1] = true;
                }
                break;

            case 'pegar':
                if (!elemento) return;
                
                const valor = elemento.value || elemento.textContent || '';
                
                if (elemento.id === 'area-pegar-1' && valor.length > 0 && !ejerciciosCompletados.has('pegar-1')) {
                    ejercicioCompletado = true;
                    ejercicioId = 'pegar-1';
                    feedbackId = 'feedback-pegar-1';
                    mensaje = '¡Perfecto! Has pegado el texto usando Ctrl+V.';
                    estadoModulo3.leccion5.ejercicios.pegar[0] = true;
                }
                break;

            case 'cortar':
                if (textoCortado.includes('paciencia es clave') && !ejerciciosCompletados.has('cortar-1')) {
                    ejercicioCompletado = true;
                    ejercicioId = 'cortar-1';
                    feedbackId = 'feedback-cortar-1';
                    mensaje = '¡Correcto! Has cortado el primer texto usando Ctrl+X.';
                    estadoModulo3.leccion5.ejercicios.cortar[0] = true;
                    
                    const textoElement = document.getElementById('texto-cortar-1');
                    if (textoElement) {
                        textoElement.classList.add('cortado');
                        textoElement.innerHTML = '✂️ Texto cortado correctamente';
                    }
                }
                else if (textoCortado.includes('pequeño progreso') && !ejerciciosCompletados.has('cortar-2')) {
                    ejercicioCompletado = true;
                    ejercicioId = 'cortar-2';
                    feedbackId = 'feedback-cortar-2';
                    mensaje = '¡Excelente! Has cortado el segundo texto correctamente.';
                    estadoModulo3.leccion5.ejercicios.cortar[1] = true;
                    
                    const textoElement = document.getElementById('texto-cortar-2');
                    if (textoElement) {
                        textoElement.classList.add('cortado');
                        textoElement.innerHTML = '✂️ Texto cortado correctamente';
                    }
                }
                break;
        }

        if (elemento && (tipo === 'pegar' || tipo === 'copiar' || tipo === 'cortar')) {
            const valor = elemento.value || elemento.textContent || '';
            
            if (elemento.id === 'area-combinado-1-leccion5' && 
                (valor.includes('práctica hace al maestro') || valor.length > 10) && 
                !ejerciciosCompletados.has('combinado-1')) {
                ejercicioCompletado = true;
                ejercicioId = 'combinado-1';
                feedbackId = 'feedback-combinado-1-leccion5';
                mensaje = '¡Excelente! Has copiado y pegado la primera frase correctamente.';
                estadoModulo3.leccion5.ejercicios.combinados[0] = true;
            }
            else if (elemento.id === 'area-cortar-combinado-1-leccion5' && 
                    valor.length > 0 && 
                    !ejerciciosCompletados.has('combinado-2')) {
                ejercicioCompletado = true;
                ejercicioId = 'combinado-2';
                feedbackId = 'feedback-combinado-2-leccion5';
                mensaje = '¡Perfecto! Has cortado y pegado el texto correctamente.';
                estadoModulo3.leccion5.ejercicios.combinados[1] = true;
            }
        }

        if (ejercicioCompletado && ejercicioId && feedbackId) {
            ejerciciosCompletados.add(ejercicioId);
            
            mostrarFeedbackEjercicio(feedbackId, mensaje, true);
            actualizarProgresoLeccion(5);
            
            setTimeout(() => {
                ultimaAccion = null;
                textoCopiado = '';
                textoCortado = '';
            }, 2000);
        }
    }

    function configurarAreasEditables() {
        document.querySelectorAll('.texto-practica.editable').forEach(editable => {
            editable.setAttribute('contenteditable', 'true');
            editable.addEventListener('input', function() {
                if (this.textContent.trim() === '' && ultimaAccion === 'cortar') {
                    this.classList.add('cortado');
                }
            });
        });

        const areaCombinado1 = document.getElementById('area-combinado-1-leccion5');
        const areaCortarCombinado1 = document.getElementById('area-cortar-combinado-1-leccion5');
        
        if (areaCombinado1) {
            areaCombinado1.addEventListener('input', function() {
                // Lógica específica para este textarea si es necesaria
            });
        }
        
        if (areaCortarCombinado1) {
            areaCortarCombinado1.addEventListener('input', function() {
                // Lógica específica para este textarea si es necesaria
            });
        }
    }

    // ===== LECCIÓN 6: NAVEGACIÓN AVANZADA =====
    function inicializarLeccion6() {
        console.log('🎯 Inicializando Módulo 3 - Lección 6...');
        
        if (!estadoModulo3.leccion6) {
            estadoModulo3.leccion6 = { 
                completada: false, 
                ejercicios: { 
                    deshacer: [false, false],
                    seleccionar: [false, false],
                    buscar: [false, false],
                    combinados: [false, false]
                } 
            };
        }
        
        ejerciciosCompletadosLeccion6 = new Set();
        
        configurarEventosTecladoLeccion6();
        configurarTextosSeleccionablesLeccion6();
        actualizarProgresoLeccion(6);
        
        setInterval(() => {
            const leccionActual = document.querySelector('.page-container:not(.hidden)');
            if (leccionActual && leccionActual.id === 'lesson-6') {
                verificarProgresoCombinadoLeccion6();
            }
        }, 1000);
    }

    function configurarEventosTecladoLeccion6() {
        document.addEventListener('keydown', function(event) {
            const leccionActual = document.querySelector('.page-container:not(.hidden)');
            if (!leccionActual || leccionActual.id !== 'lesson-6') return;

            if (event.ctrlKey) {
                const elementoActivo = document.activeElement;
                
                switch(event.key.toLowerCase()) {
                    case 'z':
                        console.log('↶ Acción de deshacer detectada');
                        verificarEjercicioLeccion6('deshacer', elementoActivo);
                        mostrarFeedbackAccion('Ctrl+Z - Deshacer');
                        break;
                        
                    case 'a':
                        console.log('☑️ Acción de seleccionar todo detectada');
                        if (elementoActivo && (elementoActivo.id === 'area-seleccionar-1' || elementoActivo.id === 'area-seleccionar-2')) {
                            setTimeout(() => {
                                verificarEjercicioLeccion6('seleccionar', elementoActivo);
                            }, 100);
                        }
                        mostrarFeedbackAccion('Ctrl+A - Seleccionar Todo');
                        break;
                        
                    case 'f':
                        console.log('🔍 Acción de buscar detectada');
                        if (!ejerciciosCompletadosLeccion6.has('buscar-1')) {
                            ejerciciosCompletadosLeccion6.add('buscar-1');
                            estadoModulo3.leccion6.ejercicios.buscar[0] = true;
                            mostrarFeedbackEjercicio('feedback-buscar-1', '¡Correcto! Has usado Ctrl+F para buscar texto', true);
                            actualizarProgresoLeccion(6);
                        } else if (!ejerciciosCompletadosLeccion6.has('buscar-2')) {
                            ejerciciosCompletadosLeccion6.add('buscar-2');
                            estadoModulo3.leccion6.ejercicios.buscar[1] = true;
                            mostrarFeedbackEjercicio('feedback-buscar-2', '¡Excelente! Has dominado la búsqueda con Ctrl+F', true);
                            actualizarProgresoLeccion(6);
                        }
                        mostrarFeedbackAccion('Ctrl+F - Buscar');
                        break;
                }
            }
        });

        document.addEventListener('input', function(event) {
            const leccionActual = document.querySelector('.page-container:not(.hidden)');
            if (!leccionActual || leccionActual.id !== 'lesson-6') return;

            const elemento = event.target;
            
            if (elemento.id === 'texto-combinado-2') {
                verificarBuscarReemplazar();
            }
            
            if (elemento.id === 'area-combinado-1-leccion6') {
                verificarEjercicioCombinadoDeshacer(elemento);
            }
        });

        document.addEventListener('mouseup', function() {
            const leccionActual = document.querySelector('.page-container:not(.hidden)');
            if (!leccionActual || leccionActual.id !== 'lesson-6') return;

            const seleccion = window.getSelection();
            const elementoActivo = document.activeElement;
            
            if (seleccion.toString().length > 0 && elementoActivo && 
                (elementoActivo.id === 'area-seleccionar-1' || elementoActivo.id === 'area-seleccionar-2')) {
                
                if (elementoActivo.tagName === 'TEXTAREA') {
                    const textoCompleto = elementoActivo.value;
                    const textoSeleccionado = seleccion.toString();
                    
                    if (textoSeleccionado === textoCompleto && textoCompleto.length > 0) {
                        console.log('✅ Selección completa detectada (probablemente Ctrl+A)');
                        setTimeout(() => {
                            verificarEjercicioLeccion6('seleccionar', elementoActivo);
                        }, 200);
                    }
                }
            }
        });
    }

    function verificarEjercicioLeccion6(tipo, elemento = null) {
        if (!estadoModulo3.leccion6) return;

        let ejercicioCompletado = false;
        let mensaje = '';
        let ejercicioId = '';
        let feedbackId = '';

        console.log(`🔍 Verificando ejercicio Lección 6: ${tipo}`, elemento ? elemento.id : 'sin elemento');

        switch(tipo) {
            case 'deshacer':
                if (elemento && elemento.id === 'area-deshacer-1' && !ejerciciosCompletadosLeccion6.has('deshacer-1')) {
                    ejercicioCompletado = true;
                    ejercicioId = 'deshacer-1';
                    feedbackId = 'feedback-deshacer-1';
                    mensaje = '¡Correcto! Has usado Ctrl+Z para deshacer cambios';
                    estadoModulo3.leccion6.ejercicios.deshacer[0] = true;
                }
                else if (elemento && elemento.id === 'area-deshacer-2' && !ejerciciosCompletadosLeccion6.has('deshacer-2')) {
                    ejercicioCompletado = true;
                    ejercicioId = 'deshacer-2';
                    feedbackId = 'feedback-deshacer-2';
                    mensaje = '¡Excelente! Has dominado el uso de Deshacer';
                    estadoModulo3.leccion6.ejercicios.deshacer[1] = true;
                }
                break;

            case 'seleccionar':
                if (elemento && elemento.id === 'area-seleccionar-1' && !ejerciciosCompletadosLeccion6.has('seleccionar-1')) {
                    ejercicioCompletado = true;
                    ejercicioId = 'seleccionar-1';
                    feedbackId = 'feedback-seleccionar-1';
                    mensaje = '¡Perfecto! Has seleccionado todo el texto con Ctrl+A';
                    estadoModulo3.leccion6.ejercicios.seleccionar[0] = true;
                    
                    elemento.style.backgroundColor = '#e3f2fd';
                    elemento.style.borderColor = '#2196f3';
                    setTimeout(() => {
                        elemento.style.backgroundColor = '';
                        elemento.style.borderColor = '';
                    }, 2000);
                }
                else if (elemento && elemento.id === 'area-seleccionar-2' && !ejerciciosCompletadosLeccion6.has('seleccionar-2')) {
                    ejercicioCompletado = true;
                    ejercicioId = 'seleccionar-2';
                    feedbackId = 'feedback-seleccionar-2';
                    mensaje = '¡Excelente! Has seleccionado todo correctamente';
                    estadoModulo3.leccion6.ejercicios.seleccionar[1] = true;
                    
                    elemento.style.backgroundColor = '#e3f2fd';
                    elemento.style.borderColor = '#2196f3';
                    setTimeout(() => {
                        elemento.style.backgroundColor = '';
                        elemento.style.borderColor = '';
                    }, 2000);
                }
                break;
        }

        if (ejercicioCompletado && ejercicioId && feedbackId) {
            ejerciciosCompletadosLeccion6.add(ejercicioId);
            console.log(`✅ Ejercicio completado: ${ejercicioId}`);
            mostrarFeedbackEjercicio(feedbackId, mensaje, true);
            actualizarProgresoLeccion(6);
        }
    }

    function verificarEjercicioCombinadoDeshacer(elemento) {
        console.log('🔍 Verificando ejercicio combinado deshacer...');
        
        if (!ejerciciosCompletadosLeccion6.has('combinado-1') && elemento.value === '') {
            const feedback = document.getElementById('feedback-combinado-1-leccion6');
            if (feedback) {
                feedback.textContent = '¡Bien! Has borrado el texto correctamente. Ahora usa Ctrl+Z para deshacer el borrado.';
                feedback.className = 'exercise-feedback info';
                feedback.style.display = 'block';
            }
            
            elemento.classList.add('texto-borrado');
            elemento.dataset.borrado = 'true';
            console.log('✅ Texto borrado detectado, esperando Ctrl+Z...');
        }
        
        if (elemento.dataset.borrado === 'true' && elemento.value.length > 0) {
            ejerciciosCompletadosLeccion6.add('combinado-1');
            estadoModulo3.leccion6.ejercicios.combinados[0] = true;
            
            elemento.classList.remove('texto-borrado');
            elemento.classList.add('texto-recuperado');
            
            const feedback = document.getElementById('feedback-combinado-1-leccion6');
            if (feedback) {
                feedback.innerHTML = '🎉 <strong>¡EJERCICIO COMPLETADO!</strong><br>Has usado Ctrl+A para seleccionar todo, borraste el texto y usaste Ctrl+Z para deshacer - ¡Dominas los atajos!';
                feedback.className = 'exercise-feedback success';
                feedback.style.display = 'block';
            }
            
            console.log('✅ Ejercicio combinado 1 completado');
            actualizarProgresoLeccion(6);
            
            setTimeout(() => {
                elemento.classList.remove('texto-recuperado');
            }, 3000);
        }
    }

    function verificarBuscarReemplazar() {
        const textoCombinado2 = document.getElementById('texto-combinado-2');
        if (textoCombinado2 && !ejerciciosCompletadosLeccion6.has('combinado-2')) {
            
            const textoActual = textoCombinado2.value;
            const textoOriginal = "Usar atajos de teclado hace que el trabajo sea más rápido y sencillo. Cuando trabajas de forma rápida, terminas tus tareas antes. Ser rápido no significa hacer las cosas mal, sino hacerlas mejor.";
            
            const seCambioRapido = textoActual.includes('eficiente') || !textoActual.includes('rápido');
            const hayCambios = textoActual !== textoOriginal;
            
            console.log('🔍 Verificando buscar/reemplazar:', { seCambioRapido, hayCambios, textoActual });
            
            if (seCambioRapido && hayCambios) {
                ejerciciosCompletadosLeccion6.add('combinado-2');
                estadoModulo3.leccion6.ejercicios.combinados[1] = true;
                
                const feedback = document.getElementById('feedback-combinado-2-leccion6');
                if (feedback) {
                    feedback.innerHTML = '🎉 <strong>¡EJERCICIO COMPLETADO!</strong><br>Has buscado y reemplazado el texto correctamente usando Ctrl+F y edición manual.';
                    feedback.className = 'exercise-feedback success';
                    feedback.style.display = 'block';
                    
                    textoCombinado2.classList.add('texto-recuperado');
                    setTimeout(() => {
                        textoCombinado2.classList.remove('texto-recuperado');
                    }, 3000);
                }
                
                console.log('✅ Ejercicio combinado 2 completado');
                actualizarProgresoLeccion(6);
            }
        }
    }

    function configurarTextosSeleccionablesLeccion6() {
        document.querySelectorAll('.texto-preseleccionado').forEach(textarea => {
            textarea.style.fontSize = '18px';
            textarea.style.lineHeight = '1.5';
            textarea.style.padding = '15px';
            
            textarea.addEventListener('focus', function() {
                this.setSelectionRange(0, 0);
            });
            
            textarea.classList.add('no-auto-select');
        });

        const textoCombinado2 = document.getElementById('texto-combinado-2');
        if (textoCombinado2) {
            textoCombinado2.readOnly = false;
            textoCombinado2.classList.add('exercise-input', 'no-auto-select');
            textoCombinado2.style.fontSize = '18px';
            textoCombinado2.style.lineHeight = '1.5';
            textoCombinado2.style.padding = '15px';
        }

        document.querySelectorAll('.exercise-input').forEach(input => {
            if (input.tagName === 'TEXTAREA') {
                input.style.fontSize = '18px';
                input.style.lineHeight = '1.5';
                input.style.padding = '15px';
                input.style.minHeight = '100px';
                input.classList.add('no-auto-select');
            }
        });
        
        const areasSeleccion = ['area-seleccionar-1', 'area-seleccionar-2', 'area-combinado-1-leccion6'];
        areasSeleccion.forEach(id => {
            const elemento = document.getElementById(id);
            if (elemento) {
                elemento.classList.add('no-auto-select');
            }
        });
    }

    function verificarProgresoCombinadoLeccion6() {
        const textoCombinado2 = document.getElementById('texto-combinado-2');
        if (textoCombinado2 && !ejerciciosCompletadosLeccion6.has('combinado-2')) {
            
            const textoActual = textoCombinado2.value;
            const textoOriginal = "Usar atajos de teclado hace que el trabajo sea más rápido y sencillo. Cuando trabajas de forma rápida, terminas tus tareas antes. Ser rápido no significa hacer las cosas mal, sino hacerlas mejor.";
            
            const seCambioRapido = textoActual.includes('eficiente') || !textoActual.includes('rápido');
            const hayCambios = textoActual !== textoOriginal;
            
            if (seCambioRapido && hayCambios) {
                ejerciciosCompletadosLeccion6.add('combinado-2');
                estadoModulo3.leccion6.ejercicios.combinados[1] = true;
                
                const feedback = document.getElementById('feedback-combinado-2-leccion6');
                if (feedback) {
                    feedback.innerHTML = '🎉 <strong>¡EJERCICIO COMPLETADO!</strong><br>Has buscado y reemplazado el texto correctamente.';
                    feedback.className = 'exercise-feedback success';
                    feedback.style.display = 'block';
                }
                
                actualizarProgresoLeccion(6);
            }
        }
    }

    // ===== LECCIÓN 7: CONTROL DE VISUALIZACIÓN (DETECTANDO ZOOM REAL DEL NAVEGADOR) =====
    function inicializarLeccion7() {
        console.log('🎯 Inicializando Lección 7 (detectando zoom real del navegador)...');
        
        // Resetear estado
        zoomEjerciciosCompletados = new Set();
        pasosCompletados = new Set();
        
        if (!estadoModulo3.leccion7) {
            estadoModulo3.leccion7 = { 
                completada: false, 
                ejercicios: { 
                    zoom: [false, false, false],
                    final: false
                } 
            };
        }
        
        configurarEventosZoomConObjetivos();
        configurarEjercicioFinalSimple();
        actualizarDisplayZoom(); // Actualizar display inicial
        actualizarProgresoLeccion(7);
        
        console.log('✅ Lección 7 con objetivos de zoom inicializada');
    }

    function obtenerZoomNavegador() {
        // Método para detectar el nivel de zoom actual del navegador
        return Math.round((window.outerWidth / window.innerWidth) * 100);
    }

    function configurarEventosZoomConObjetivos() {
        // Permitimos que el navegador controle el zoom, pero detectamos los atajos
        // y verificamos el nivel de zoom actual
        document.addEventListener('keydown', function(event) {
            const leccionActual = document.querySelector('.page-container:not(.hidden)');
            if (!leccionActual || leccionActual.id !== 'lesson-7') return;

            if (event.ctrlKey) {
                let accion = '';
                let zoomAntes = obtenerZoomNavegador();
                
                switch(event.key) {
                    case '+':
                    case '=':
                        accion = 'zoom_in';
                        // Permitir que el navegador haga el zoom
                        setTimeout(() => {
                            actualizarDisplayZoom();
                            verificarObjetivosZoom();
                        }, 300); // Dar tiempo a que el zoom se aplique
                        break;
                        
                    case '-':
                        accion = 'zoom_out';
                        // Permitir que el navegador haga el zoom
                        setTimeout(() => {
                            actualizarDisplayZoom();
                            verificarObjetivosZoom();
                        }, 300);
                        break;
                        
                    case '0':
                        accion = 'zoom_reset';
                        // Para Ctrl+0, verificamos si realmente reseteó desde un nivel diferente
                        setTimeout(() => {
                            actualizarDisplayZoom();
                            const zoomDespues = obtenerZoomNavegador();
                            
                            // Verificar ejercicio 3: usar Ctrl+0 para resetear
                            if (zoomAntes !== 100 && zoomDespues === 100 && 
                                !zoomEjerciciosCompletados.has('zoom_reset')) {
                                zoomEjerciciosCompletados.add('zoom_reset');
                                estadoModulo3.leccion7.ejercicios.zoom[2] = true;
                                mostrarFeedbackEjercicio('feedback-zoom-3', 
                                    '¡Fantástico! Has usado Ctrl+0 para resetear rápidamente el zoom', true);
                                actualizarProgresoLeccion(7);
                            }
                            
                            verificarObjetivosZoom();
                        }, 300);
                        break;
                }
                
                if (accion) {
                    mostrarFeedbackAccion(`Ctrl+${event.key} - ${accion.replace('_', ' ')}`);
                }
            }
        });

        // También detectar cambios de zoom con la rueda del mouse + Ctrl
        document.addEventListener('wheel', function(event) {
            if (event.ctrlKey) {
                setTimeout(() => {
                    actualizarDisplayZoom();
                    verificarObjetivosZoom();
                }, 300);
            }
        }, { passive: true });

        // Actualizar periódicamente el display por si cambia el zoom de otras formas
        setInterval(() => {
            const leccionActual = document.querySelector('.page-container:not(.hidden)');
            if (leccionActual && leccionActual.id === 'lesson-7') {
                actualizarDisplayZoom();
                verificarObjetivosZoom();
            }
        }, 1000);
    }

    function actualizarDisplayZoom() {
        const zoomActual = obtenerZoomNavegador();
        const zoomDisplays = document.querySelectorAll('.zoom-value');
        
        zoomDisplays.forEach(display => {
            if (display) display.textContent = `${zoomActual}%`;
        });

        // Actualizar también elementos específicos
        const elementosZoom = ['zoom-value-1', 'zoom-value-2', 'zoom-value-3', 'zoom-display-value'];
        elementosZoom.forEach(id => {
            const elemento = document.getElementById(id);
            if (elemento) elemento.textContent = `${zoomActual}%`;
        });

        // Mostrar indicador visual
        mostrarIndicadorZoom(zoomActual);
    }

    function mostrarIndicadorZoom(zoomActual) {
        let indicador = document.getElementById('zoom-global-indicator');
        
        if (!indicador) {
            indicador = document.createElement('div');
            indicador.id = 'zoom-global-indicator';
            indicador.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(67, 97, 238, 0.9);
                color: white;
                padding: 10px 15px;
                border-radius: 20px;
                font-weight: bold;
                font-size: 14px;
                z-index: 10000;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                transition: all 0.3s ease;
            `;
            document.body.appendChild(indicador);
        }
        
        indicador.textContent = `Zoom del Navegador: ${zoomActual}%`;
        indicador.style.display = 'block';

        // Cambiar color según el nivel de zoom
        if (zoomActual > 100) {
            indicador.style.background = 'rgba(40, 167, 69, 0.9)'; // Verde cuando está aumentado
        } else if (zoomActual < 100) {
            indicador.style.background = 'rgba(220, 53, 69, 0.9)'; // Rojo cuando está disminuido
        } else {
            indicador.style.background = 'rgba(67, 97, 238, 0.9)'; // Azul cuando es normal
        }

        // Ocultar después de 4 segundos si está en 100%
        if (zoomActual === 100) {
            setTimeout(() => {
                if (obtenerZoomNavegador() === 100) {
                    indicador.style.display = 'none';
                }
            }, 4000);
        }
    }

    function verificarObjetivosZoom() {
        const zoomActual = obtenerZoomNavegador();
        
        console.log(`🔍 Verificando objetivos de zoom: ${zoomActual}%`);

        // Ejercicio 1: Llegar al 150% o más
        if (zoomActual >= 150 && !zoomEjerciciosCompletados.has('zoom_150')) {
            zoomEjerciciosCompletados.add('zoom_150');
            estadoModulo3.leccion7.ejercicios.zoom[0] = true;
            mostrarFeedbackEjercicio('feedback-zoom-1', 
                `¡Perfecto! Has llegado al ${zoomActual}% de zoom usando Ctrl++`, true);
            actualizarProgresoLeccion(7);
            
            // Mostrar siguiente objetivo
            setTimeout(() => {
                mostrarFeedbackEjercicio('feedback-zoom-2', 
                    '¡Excelente! Ahora usa Ctrl+- para volver al 100%', false);
            }, 2000);
        }

        // Ejercicio 2: Volver al 100% (después de haber llegado al 150%)
        if (zoomActual <= 100 && zoomEjerciciosCompletados.has('zoom_150') && 
            !zoomEjerciciosCompletados.has('zoom_100')) {
            zoomEjerciciosCompletados.add('zoom_100');
            estadoModulo3.leccion7.ejercicios.zoom[1] = true;
            mostrarFeedbackEjercicio('feedback-zoom-2', 
                `¡Excelente! Has vuelto al ${zoomActual}% usando Ctrl+-`, true);
            actualizarProgresoLeccion(7);
            
            // Mostrar siguiente objetivo
            setTimeout(() => {
                mostrarFeedbackEjercicio('feedback-zoom-3', 
                    '¡Muy bien! Ahora prueba Ctrl+0 para resetear rápidamente desde cualquier nivel', false);
            }, 2000);
        }
    }

    function configurarEjercicioFinalSimple() {
        console.log('🔧 Configurando examen final SIMPLIFICADO...');
        
        const areaA = document.getElementById('area-final-A');
        const areaB = document.getElementById('area-final-B');
        const estadoA = document.getElementById('estado-area-A');
        const estadoB = document.getElementById('estado-area-B');

        if (!areaA || !areaB) {
            console.error('❌ No se encontraron las áreas de trabajo');
            return;
        }

        // Resetear todo
        areaA.value = '';
        areaB.value = '';
        resetearPasosFinal();
        pasosCompletados.clear();

        // SOLO 3 PASOS SIMPLES:
        
        // Paso 1: Escribir en A
        areaA.addEventListener('input', function() {
            if (this.value.length > 5 && !pasosCompletados.has('paso1')) {
                pasosCompletados.add('paso1');
                marcarPasoCompletado('paso-final-1');
                if (estadoA) estadoA.textContent = 'Texto escrito ✓';
                verificarExamenFinalCompleto();
            }
        });

        // Paso 2: Cortar de A y Pegar en B (detectamos el resultado, no el proceso)
        areaB.addEventListener('input', function() {
            if (areaA.value === '' && this.value.length > 0 && 
                pasosCompletados.has('paso1') && !pasosCompletados.has('paso2')) {
                pasosCompletados.add('paso2');
                marcarPasoCompletado('paso-final-2');
                if (estadoB) estadoB.textContent = 'Texto pegado ✓';
                verificarExamenFinalCompleto();
            }
        });

        // Paso 3: Modificar B
        areaB.addEventListener('input', function() {
            if (this.value.length > 10 && pasosCompletados.has('paso2') && !pasosCompletados.has('paso3')) {
                pasosCompletados.add('paso3');
                marcarPasoCompletado('paso-final-3');
                if (estadoB) estadoB.textContent = 'Texto modificado ✓';
                verificarExamenFinalCompleto();
            }
        });
    }

    function verificarExamenFinalCompleto() {
        const feedbackFinal = document.getElementById('feedback-final');
        
        if (pasosCompletados.size === 3) {
            // ¡EXAMEN COMPLETADO!
            estadoModulo3.leccion7.ejercicios.final = true;
            estadoModulo3.leccion7.completada = true;
            
            if (feedbackFinal) {
                feedbackFinal.innerHTML = '🎉 <strong>¡FELICIDADES!</strong><br>Has completado el examen final. ¡Dominas los atajos esenciales!';
                feedbackFinal.className = 'exercise-feedback success';
                feedbackFinal.style.display = 'block';
            }
            
            actualizarProgresoLeccion(7);
            console.log('🎉 Examen final completado');
        } else {
            // Mostrar progreso actual
            const mensajes = {
                1: '✅ Paso 1: Escribe algo en el Cuadro A',
                2: '✅ Paso 2: Corta el texto de A y pégado en B',
                3: '✅ Paso 3: Modifica el texto en B'
            };
            
            if (feedbackFinal) {
                feedbackFinal.textContent = mensajes[pasosCompletados.size + 1] || `Completado ${pasosCompletados.size}/3 pasos`;
                feedbackFinal.className = 'exercise-feedback info';
                feedbackFinal.style.display = 'block';
            }
        }
    }

    function resetearPasosFinal() {
        document.querySelectorAll('.paso-tarea').forEach(paso => {
            paso.classList.remove('completado');
        });
    }

    function marcarPasoCompletado(pasoId) {
        const paso = document.getElementById(pasoId);
        if (paso) paso.classList.add('completado');
    }

    function limpiarZoom() {
        const indicador = document.getElementById('zoom-global-indicator');
        if (indicador) indicador.style.display = 'none';
    }

    // ===== CONFIGURACIÓN GENERAL =====
    function configurarTextosSeleccionables() {
        document.addEventListener('mouseover', function(event) {
            if (event.target.classList.contains('texto-practica') && 
                !event.target.classList.contains('editable')) {
                event.target.style.cursor = 'text';
            }
        });
        
        document.addEventListener('mouseup', function(event) {
            if (event.target.classList.contains('texto-practica') && 
                !event.target.classList.contains('editable')) {
                const seleccion = window.getSelection().toString();
                if (seleccion.length > 0) {
                    event.target.classList.add('manual-selected');
                    
                    if (event.target.id === 'texto-practica-seleccion') {
                        const feedback = document.getElementById('feedback-seleccion');
                        if (feedback) {
                            feedback.textContent = '¡Perfecto! Has seleccionado el texto manualmente. Ahora puedes practicar copiarlo con Ctrl+C.';
                            feedback.className = 'exercise-feedback success';
                            feedback.style.display = 'block';
                        }
                    }
                    
                    setTimeout(() => {
                        event.target.classList.remove('manual-selected');
                    }, 2000);
                }
            }
        });
    }

    

    // ===== INICIALIZACIÓN FINAL =====
    setupNavigation();
    console.log('✅ Sistema de navegación listo y funcionando');

    // Navegación por teclado
    document.addEventListener('keydown', function(event) {
        if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
            const currentPage = document.querySelector('.page-container:not(.hidden)');
            if (!currentPage) return;
            
            const currentId = currentPage.id;
            const pages = ['welcome-screen', 'lesson-1', 'lesson-2', 'lesson-3', 'lesson-4', 'lesson-5', 'lesson-6', 'lesson-7'];
            const currentIndex = pages.indexOf(currentId);
            
            switch(event.key) {
                case 'ArrowRight':
                    if (currentIndex < pages.length - 1) goToPage(pages[currentIndex + 1]);
                    break;
                case 'ArrowLeft':
                    if (currentIndex > 0) goToPage(pages[currentIndex - 1]);
                    break;
                case 'Escape':
                    goToPage('welcome-screen');
                    break;
            }
        }
    });
});
