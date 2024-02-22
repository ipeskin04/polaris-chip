import { LitElement, html, css } from 'lit';

export class Counter extends LitElement {

  static get tag() {
    return 'counter-app';
  }

  constructor() {
    super();
    this.title = "Counter";
    this.number = 0;
    this.button1 = '-';
    this.button2 = '+';
    this.min = 0;
    this.max = 100;
  }

  static get styles() {
    return css`
      :root, html, body {
        font-size: 16px; 
      }
      :host([number="25"]){
        color: orange;
      }
      :host([number="10"]) .counter-card{
        color: blue;
      }
      :host([number="18"]) .counter-card{
        color: purple;
      }
      :host([number="21"]) .counter-card{
        color: yellow;
      }
      
      confetti-container{
        width: 150px;
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

increment(){
  if (this.number < this.max)
    this.number++;
}

decrement(){
  if (this.number > this.min)
  this.number--;
}

updated(changedProperties) {
  if (changedProperties.has('number') && this.number == 21) {
    this.makeItRain();
  }
}


    render() {
    return html`
    <confetti-container id="confetti">
    <div class="counter-card">
        <p class="main-number">${this.number}</p>
        <button class="button1" @click="${this.decrement}">${this.button1}</button>
        <button class="button2" @click="${this.increment}">${this.button2}</button>
    </div>
    </confetti-container>
    `;

  }

  static get properties() {
    return {
      number: { type: Number, reflect: true},
      button1: { type: String },
      button2: {type: String },
      min: {type: String },
      max: {type: String },
    };
  }

}

globalThis.customElements.define(Counter.tag, Counter);
