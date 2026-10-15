import { characterSteps } from './data.js';

let currentStepIndex = 0;
let characterBuild = {};

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

const initStep = () => {
  const currentStep = characterSteps[currentStepIndex];
  stepTitle.textContent = currentStep.title;
  stepResultText.textContent = 'Ready to spin?';
  stepResultText.style.setProperty('--result-color', '#ffffff');

  progressBarSteps.forEach((step, index) => {
    step.classList.toggle('active', index <= currentStepIndex);
  });

  spinBtn.style.display = 'inline-flex';
  nextBtn.style.display = 'none';
  spinBtn.disabled = false;
  spinBtn.querySelector('.btn__text').textContent = 'Spin';
};

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

const generatePinterestWidget = (boardUrl) => {
  pinterestWidget.innerHTML = '';

  const widgetLink = document.createElement('a');
  widgetLink.setAttribute('data-pin-do', 'embedBoard');
  widgetLink.setAttribute('data-pin-board-width', '600');
  widgetLink.setAttribute('data-pin-scale-height', '400');
  widgetLink.setAttribute('data-pin-scale-width', '120');
  widgetLink.href = boardUrl;

  pinterestWidget.appendChild(widgetLink);

  // Надёжная система повторных попыток (Retry)
  let attempts = 0;
  const maxAttempts = 10;

  const tryLoadPinterest = () => {
    attempts++;
    if (window.PinUtils && typeof window.PinUtils.load === 'function') {
      window.PinUtils.load();
      console.log('✅ Pinterest widget loaded successfully on attempt', attempts);
    } else if (attempts < maxAttempts) {
      console.log('⏳ Waiting for PinUtils... attempt', attempts);
      setTimeout(tryLoadPinterest, 500);
    } else {
      console.error('❌ Pinterest PinUtils failed to load. Check if URL is a REAL BOARD.');
      pinterestWidget.innerHTML = `
        <p style="color: #ff0055; text-align: center; padding: 20px;">
          Widget failed to load.<br>
          Make sure the URL is a real board (e.g., pinterest.com/username/boardname/).
        </p>
      `;
    }
  };

  setTimeout(tryLoadPinterest, 500);
};

const restart = () => {
  currentStepIndex = 0;
  characterBuild = {};
  summaryContainer.style.display = 'none';
  stepContainer.style.display = 'block';
  pinterestWidget.innerHTML = '';
  initStep();
};

spinBtn.addEventListener('click', spinCurrentStep);
nextBtn.addEventListener('click', handleNext);
restartBtn.addEventListener('click', restart);

initStep();