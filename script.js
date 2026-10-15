import { characterSteps } from './data.js';

// Состояние приложения
let currentStepIndex = 0;
let characterBuild = {};

// Элементы DOM
const progressBarSteps = document.querySelectorAll('.progress-bar__step');
const stepContainer = document.getElementById('step-container');
const stepTitle = document.getElementById('step-title');
const stepResultText = document.querySelector('.step-container__result-text');
const spinBtn = document.getElementById('spin-btn');
const nextBtn = document.getElementById('next-btn');
const summaryContainer = document.getElementById('summary-container');
const summaryTags = document.getElementById('summary-tags');
const pinterestLink = document.getElementById('pinterest-link');
const pinterestWidget = document.getElementById('pinterest-widget');
const restartBtn = document.getElementById('restart-btn');

// Инициализация первого шага
const initStep = () => {
    const currentStep = characterSteps[currentStepIndex];
    stepTitle.textContent = currentStep.title;
    stepResultText.textContent = 'Ready to spin?';
    stepResultText.style.setProperty('--result-color', '#ffffff');

    progressBarSteps.forEach((step, index) => {
        if (index <= currentStepIndex) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });

    spinBtn.style.display = 'inline-flex';
    nextBtn.style.display = 'none';
    spinBtn.disabled = false;
    spinBtn.querySelector('.btn__text').textContent = 'Spin';
};

// Логика вращения
const spinCurrentStep = () => {
    const currentStep = characterSteps[currentStepIndex];
    const options = currentStep.options;

    spinBtn.disabled = true;
    spinBtn.querySelector('.btn__text').textContent = 'Spinning...';

    let shuffleCount = 0;
    const shuffleInterval = setInterval(() => {
        const randomOption = options[Math.floor(Math.random() * options.length)];
        stepResultText.textContent = randomOption.name;
        stepResultText.style.setProperty('--result-color', randomOption.color);
        shuffleCount++;

        if (shuffleCount > 10) {
            clearInterval(shuffleInterval);
            finalizeSpin();
        }
    }, 100);
};

const finalizeSpin = () => {
    const currentStep = characterSteps[currentStepIndex];
    const options = currentStep.options;
    const finalOption = options[Math.floor(Math.random() * options.length)];

    stepResultText.textContent = finalOption.name;
    stepResultText.style.setProperty('--result-color', finalOption.color);
    characterBuild[currentStep.id] = finalOption;

    spinBtn.disabled = false;
    spinBtn.querySelector('.btn__text').textContent = 'Spin Again';
    nextBtn.style.display = 'inline-flex';
};

const handleNext = () => {
    currentStepIndex++;
    if (currentStepIndex < characterSteps.length) {
        initStep();
    } else {
        showSummary();
    }
};

const showSummary = () => {
    stepContainer.style.display = 'none';
    progressBarSteps.forEach(s => s.classList.add('active'));
    summaryContainer.style.display = 'block';
    summaryTags.innerHTML = '';

    const vibeData = characterBuild['vibe'];

    Object.values(characterBuild).forEach(trait => {
        const tag = document.createElement('div');
        tag.className = 'summary-tag';
        tag.innerHTML = `
            <span class="summary-tag__dot" style="background: ${trait.color}"></span>
            ${trait.name}
        `;
        summaryTags.appendChild(tag);
    });

    if (vibeData && vibeData.pinterestBoard) {
        pinterestLink.href = vibeData.pinterestBoard;
        generatePinterestWidget(vibeData.pinterestBoard);
    } else {
        pinterestWidget.innerHTML = '<p style="color: var(--color-text-secondary);">No board available for this aesthetic.</p>';
    }
};

// Функция генерации виджета Pinterest с retry-логикой
const generatePinterestWidget = (boardUrl) => {
    // Очищаем старый виджет
    pinterestWidget.innerHTML = '';

    // Создаём ссылку-виджет согласно документации Pinterest
    const widgetLink = document.createElement('a');
    widgetLink.setAttribute('data-pin-do', 'embedBoard');
    widgetLink.setAttribute('data-pin-board-width', '600');
    widgetLink.setAttribute('data-pin-scale-height', '400');
    widgetLink.setAttribute('data-pin-scale-width', '120');
    widgetLink.href = boardUrl;

    pinterestWidget.appendChild(widgetLink);

    // Retry-логика: пробуем загрузить виджет несколько раз
    let attempts = 0;
    const maxAttempts = 6;

    const tryLoadPinterest = () => {
        attempts++;

        if (window.PinUtils && typeof window.PinUtils.load === 'function') {
            window.PinUtils.load();
            console.log('Pinterest widget loaded successfully');
        } else if (attempts < maxAttempts) {
            console.log(`PinUtils not ready yet, attempt ${attempts}/${maxAttempts}`);
            setTimeout(tryLoadPinterest, 500);
        } else {
            console.warn('Pinterest PinUtils failed to load after', maxAttempts, 'attempts');
            // Fallback: показываем ссылку на доску
            pinterestWidget.innerHTML = `
                <p style="color: var(--color-text-secondary); margin-bottom: 16px;">
                    Widget couldn't load. Open the board directly:
                </p>
                <a href="${boardUrl}" target="_blank" rel="noopener" class="btn btn--primary" style="text-decoration:none;">
                    Open Pinterest Board
                </a>
            `;
        }
    };

    // Первый вызов через небольшую задержку (ждём загрузки pinit.js)
    setTimeout(tryLoadPinterest, 300);
};

const restart = () => {
    currentStepIndex = 0;
    characterBuild = {};
    summaryContainer.style.display = 'none';
    stepContainer.style.display = 'block';
    pinterestWidget.innerHTML = '';
    initStep();
};

// Слушатели событий
spinBtn.addEventListener('click', spinCurrentStep);
nextBtn.addEventListener('click', handleNext);
restartBtn.addEventListener('click', restart);

// Запуск при загрузке
initStep();