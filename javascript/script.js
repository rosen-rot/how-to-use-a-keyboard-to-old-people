// script.js - VERSIÓN CORREGIDA CON SEPARACIÓN DE LECCIONES
document.addEventListener('DOMContentLoaded', function () {
    console.log('🔧 Iniciando sistema de navegación...');

    // Variables globales para las lecciones
    let currentLessonManager = null;
    let lesson1Manager = null;
    let lesson2Manager = null;
    let lesson3Manager = null;
    let lesson4Manager = null;

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
            } else if (pageId === 'lesson-4') {
                if (!lesson4Manager) {
                    lesson4Manager = new Lesson4Manager();
                }
                currentLessonManager = lesson4Manager;
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
    console.log('Sistema de navegación listo');
});