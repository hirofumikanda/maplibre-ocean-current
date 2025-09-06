import { DATE_OPTIONS } from '../utils/config.js';

export class DateSelector {
  constructor(onDateChange) {
    this.onDateChange = onDateChange;
    this.init();
  }

  init() {
    window.addEventListener('DOMContentLoaded', () => {
      this.createUI();
      this.setupEventListeners();
    });
  }

  createUI() {
    const uiDiv = document.createElement('div');
    this.applyContainerStyles(uiDiv);

    DATE_OPTIONS.forEach(option => {
      const radioContainer = this.createRadioOption(option);
      uiDiv.appendChild(radioContainer);
    });

    document.body.appendChild(uiDiv);
  }

  applyContainerStyles(element) {
    Object.assign(element.style, {
      position: 'absolute',
      top: '10px',
      left: '10px',
      zIndex: '1000',
      background: 'rgba(255,255,255,0.8)',
      padding: '8px 12px',
      borderRadius: '6px',
      display: 'flex',
      flexDirection: 'column',
      gap: '4px'
    });
  }

  createRadioOption(option) {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.alignItems = 'center';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'dateSelect';
    radio.id = option.id;
    radio.value = option.value;
    radio.checked = option.default || false;

    const label = document.createElement('label');
    label.htmlFor = option.id;
    label.textContent = option.label;
    label.style.marginLeft = '6px';

    container.appendChild(radio);
    container.appendChild(label);

    return container;
  }

  setupEventListeners() {
    const radios = document.querySelectorAll('input[name="dateSelect"]');
    radios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        if (e.target.checked && this.onDateChange) {
          this.onDateChange(e.target.value);
        }
      });
    });
  }
}
