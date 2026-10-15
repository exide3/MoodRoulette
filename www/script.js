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
    }
};

// Функция генерации виджета Pinterest (ОБНОВЛЁННАЯ)
const generatePinterestWidget = (boardUrl) => {
    pinterestWidget.innerHTML = '';

    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'pinterest-embed';

    const widgetLink = document.createElement('a');
    widgetLink.setAttribute('data-pin-do', 'embedBoard');
    widgetLink.setAttribute('data-pin-board-width', '600');
    widgetLink.setAttribute('data-pin-scale-height', '400');
    widgetLink.setAttribute('data-pin-scale-width', '120');
    widgetLink.href = boardUrl;

    widgetContainer.appendChild(widgetLink);
    pinterestWidget.appendChild(widgetContainer);

    // Правильный способ перезагрузить виджеты Pinterest
    const reloadPinterest = () => {
        if (window.PinUtils && typeof window.PinUtils.load === 'function') {
            window.PinUtils.load();
        } else if (typeof window.pinterest !== 'undefined') {
            // Альтернативный API
            window.pinterest.load();
        }
    };

    // Пробуем несколько раз с задержкой
    setTimeout(reloadPinterest, 200);
    setTimeout(reloadPinterest, 1000);
    setTimeout(reloadPinterest, 3000);
};

const restart = () => {
    currentStepIndex = 0;
    characterBuild = {};
    summaryContainer.style.display = 'none';
    stepContainer.style.display = 'block';
    initStep();
};

// Слушатели событий
spinBtn.addEventListener('click', spinCurrentStep);
nextBtn.addEventListener('click', handleNext);
restartBtn.addEventListener('click', restart);

// Запуск при загрузке
initStep();