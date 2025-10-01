// script.js - VERSIÓN CORREGIDA CON SEPARACIÓN DE LECCIONES
document.addEventListener('DOMContentLoaded', function () {
    console.log('🔧 Iniciando sistema de navegación...');

    // Variables globales para las lecciones
    let currentLessonManager = null;
    let lesson1Manager = null;
    let lesson2Manager = null;
    let lesson3Manager = null;

    // Función para cambiar de página
    function goToPage(pageId) {
        console.log('Navegando a:', pageId);

        // Limpiar manejador actual
        if (currentLessonManager && currentLessonManager.cleanup) {
            currentLessonManager.cleanup();
        }
        currentLessonManager = null;

        // Ocultar todas las páginas
        const allPages = document.querySelectorAll('.page-container');
        allPages.forEach(page => page.classList.add('hidden'));

        // Mostrar página destino
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.remove('hidden');
            window.scrollTo(0, 0);

            // Inicializar lección específica
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
            }
        }
    }

    // Asignar eventos usando event delegation
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
                    keyboardKey.classList.add('highlight-vowel');
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
                key.classList.remove('highlight-lesson', 'highlight-vowel');
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

    (function ensureVowelFoundStyle() {
        if (!document.getElementById('vowel-found-style')) {
            const style = document.createElement('style');
            style.id = 'vowel-found-style';
            style.textContent = `
                .highlight-vowel-found {
                    background-color: #4caf50 !important;
                    color: #fff !important;
                    border-color: #388e3c !important;
                }
            `;
            document.head.appendChild(style);
        }
    })();

    // Parchea Lesson1Manager para aplicar el color verde a las teclas de vocales encontradas
    const origUpdateVowelDisplay = Lesson1Manager.prototype.updateVowelDisplay;
    Lesson1Manager.prototype.updateVowelDisplay = function () {
        this.vowels.forEach(vowel => {
            const vowelElement = document.querySelector(`.vowel-key[data-vowel="${vowel}"]`);
            const keyboardKey = this.keys.get(`Key${vowel}`);
            if (this.foundVowels.has(vowel)) {
                if (vowelElement) vowelElement.classList.add('found');
                if (keyboardKey) {
                    keyboardKey.classList.add('highlight-vowel-found');
                    keyboardKey.classList.remove('highlight-lesson');
                }
            } else {
                if (keyboardKey) {
                    keyboardKey.classList.remove('highlight-vowel-found');
                }
            }
        });
    };

    // Asegura que al quitar los highlights también se quite el color verde de las vocales
    const origRemoveAllHighlights = Lesson1Manager.prototype.removeAllHighlights;
    Lesson1Manager.prototype.removeAllHighlights = function () {
        const allKeys = document.querySelectorAll('.key');
        allKeys.forEach(key => {
            key.classList.remove('highlight-lesson', 'highlight-vowel', 'highlight-vowel-found');
        });
        if (this.foundVowels.size < this.vowels.length) {
            this.highlightVowels();
        }
    };

    // ===== LECCIÓN 3: TECLAS DE FUNCIÓN Y ESPECIALES =====
    class Lesson3Manager {
        constructor() {
            this.completedExercises = new Set();
            this.keys = new Map();
            this.isActive = false;
            this.init();
        }

        init() {
            this.registerKeyboardKeys();
            this.setupSpaceExercises();
            this.highlightSpace();
            console.log('✅ Lección 3 inicializada correctamente');
        }

        activate() {
            this.isActive = true;
            console.log('Lección 3 activada');
            this.setupKeyboardListeners();
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

        registerKeyboardKeys() {
            const keyElements = document.querySelectorAll('#main-keyboard-3-space .key');
            keyElements.forEach(keyElement => {
                const code = keyElement.dataset.code;
                if (code) {
                    this.keys.set(code, keyElement);
                }
            });
            console.log(`Lección 3: Registradas ${this.keys.size} teclas`);
        }

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
                console.log('Lección 3: Listeners de teclado removidos');
            }
        }

        andleKeyPress(event) {
            if (!this.isActive) return;
            const code = event.code;
            const isKeyDown = event.type === 'keydown';
            const keyElement = this.keys.get(code);

            if (keyElement) {
                if (isKeyDown) {
                    keyElement.classList.add('active');
                } else {
                    keyElement.classList.remove('active');
                }
            }
        }
        
        setupSpaceExercises() {
            // Ejercicio 1: Separar palabras
            const ex1Input = document.getElementById('space-ex1-input');
            const ex1Feedback = document.getElementById('space-ex1-feedback');
            if (ex1Input) {
                ex1Input.addEventListener('input', (e) => {
                    const value = e.target.value.trim();
                    if (value.toLowerCase() === 'la manzana es dulce') {
                        this.markExerciseComplete('space-ex1');
                        ex1Feedback.textContent = '¡Correcto! Has separado bien las palabras.';
                        ex1Feedback.className = 'exercise-feedback success';
                    } else if (value.length > 0) {
                        ex1Feedback.textContent = 'Intenta separar las palabras correctamente.';
                        ex1Feedback.className = 'exercise-feedback info';
                    } else {
                        ex1Feedback.textContent = '';
                        ex1Feedback.className = 'exercise-feedback';
                    }
                });
                ex1Input.addEventListener('focus', () => {
                    ex1Feedback.textContent = 'Agrega espacios donde corresponda.';
                    ex1Feedback.className = 'exercise-feedback info';
                    this.highlightSpace();
                });
                ex1Input.addEventListener('blur', () => {
                    this.removeAllHighlights();
                    this.highlightSpace();
                });
            }

            // Ejercicio 2: Nombre y apellido
            const ex2Input = document.getElementById('space-ex2-input');
            const ex2Feedback = document.getElementById('space-ex2-feedback');
            if (ex2Input) {
                ex2Input.addEventListener('input', (e) => {
                    const value = e.target.value.trim();
                    if (value.split(' ').length >= 2 && value.indexOf(' ') > 0) {
                        this.markExerciseComplete('space-ex2');
                        ex2Feedback.textContent = '¡Muy bien! Has usado el espacio correctamente.';
                        ex2Feedback.className = 'exercise-feedback success';
                    } else if (value.length > 0) {
                        ex2Feedback.textContent = 'Recuerda separar tu nombre y apellido con un espacio.';
                        ex2Feedback.className = 'exercise-feedback info';
                    } else {
                        ex2Feedback.textContent = '';
                        ex2Feedback.className = 'exercise-feedback';
                    }
                });
                ex2Input.addEventListener('focus', () => {
                    ex2Feedback.textContent = 'Escribe tu nombre y apellido separados por un espacio.';
                    ex2Feedback.className = 'exercise-feedback info';
                    this.highlightSpace();
                });
                ex2Input.addEventListener('blur', () => {
                    this.removeAllHighlights();
                    this.highlightSpace();
                });
            }

            // Ejercicio 3: Fecha de nacimiento con espacios
            const ex3Input = document.getElementById('space-ex3-input');
            const ex3Feedback = document.getElementById('space-ex3-feedback');
            if (ex3Input) {
                ex3Input.addEventListener('input', (e) => {
                    const value = e.target.value.trim();
                    // Debe tener al menos 2 espacios (día, mes, año)
                    if ((value.match(/ /g) || []).length >= 2 && value.length > 7) {
                        this.markExerciseComplete('space-ex3');
                        ex3Feedback.textContent = '¡Perfecto! Has separado correctamente la fecha.';
                        ex3Feedback.className = 'exercise-feedback success';
                    } else if (value.length > 0) {
                        ex3Feedback.textContent = 'Recuerda dejar un espacio entre día, mes y año.';
                        ex3Feedback.className = 'exercise-feedback info';
                    } else {
                        ex3Feedback.textContent = '';
                        ex3Feedback.className = 'exercise-feedback';
                    }
                });
                ex3Input.addEventListener('focus', () => {
                    ex3Feedback.textContent = 'Deja un espacio entre cada parte de la fecha.';
                    ex3Feedback.className = 'exercise-feedback info';
                    this.highlightSpace();
                });
                ex3Input.addEventListener('blur', () => {
                    this.removeAllHighlights();
                    this.highlightSpace();
                });
            }
        }

        highlightSpace() {
            const keyboardKey = this.keys.get('Space');
            if (keyboardKey) {
                keyboardKey.classList.add('highlight-lesson');
            }
        }

        removeAllHighlights() {
            const allKeys = document.querySelectorAll('#main-keyboard-3-space .key');
            allKeys.forEach(key => {
                key.classList.remove('highlight-lesson');
            });
        }

        markExerciseComplete(exerciseName) {
            if (!this.completedExercises.has(exerciseName)) {
                this.completedExercises.add(exerciseName);
                this.updateProgress();
            }
        }

        updateProgress() {
            const progressFill = document.getElementById('lesson-progress-3');
            const progressText = document.getElementById('progress-text-3');
            if (progressFill && progressText) {
                const totalExercises = 3;
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
            const progressSection = document.querySelector('.progress-section');
            if (progressSection) {
                progressSection.style.animation = 'celebrate 1s ease-in-out';
                setTimeout(() => {
                    progressSection.style.animation = '';
                }, 1000);
            }
        }
    }
    console.log('Sistema de navegación listo');
});