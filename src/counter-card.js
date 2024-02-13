import { LitElement, html, css } from 'lit';

export class Counter extends LitElement {

  static get tag() {
    return 'counter-app';
  }

  constructor() {
    super();
    this.title = "Counter";
    this.number = 10;
    this.button1 = '#';
    this.button2 = '#';
  }

  static get styles() {
    return css`
      :root, html, body {
    font-size: 16px; 
  --basic-color: #000;
      }

  .counter-card {
    font-size: 1em;
    display: block;
    width: 150px;
    padding: 4px;
    margin: 4px;
    opacity: .8;
    background-color: lightblue;
  }

  .main-number {
    font-size: 40px;
    text-align: center;
}

.button1 {
    font-size: 30px;
    width: 50px;
    margin-left: 20px;
}

.button2 {
    font-size: 30px;
    width: 50px;
    text-align: center;
}
  `
}

    render() {
    return html`
    <div class="counter-card">
        <p class="main-number">${this.number}</p>
        <button class="button1">${this.button1}</button>
        <button class="button2">${this.button2}</button>
    </div>
    `;

  }

  static get properties() {
    return {
      number: { type: Number},
      button1: { type: String },
      button2: {type: String },
    };
  }

}

globalThis.customElements.define(Counter.tag, Counter);
