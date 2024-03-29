import { LitElement, html, css } from 'lit';
import "@lrnwebcomponents/meme-maker/meme-maker.js";

/**
 * Now it's your turn. Here's what we need to try and do
 * 1. Get your HTML from your card working here
 * 2. Get your CSS rescoped as needed to work here
 */

export class MyCard extends LitElement {

  static get tag() {
    return 'my-card';
  }

  constructor() {
    super();
    this.title = "My card";
    this.buttonLink = '#';
    this.description = "This is a beautiful picture of Italy. This is a beautiful picture of Italy. This is a beautiful picture of Italy. This is a beautiful picture of Italy. This is a beautiful picture of Italy.";
    this.imageURL = "https://images.unsplash.com/photo-1543429853-e028e42251c2?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aXRhbGlhbiUyMGxhbmRzY2FwZXxlbnwwfHwwfHx8MA%3D%3D";
    this.fancy = false;
  }

  static get styles() {
    return css`
      :root, html, body {
    font-size: 16px; 
  --basic-color: #000;
      }
  :host([fancy]) {
  display: block;
  width: 560px;
  background-color: pink;
  border: 2px solid fuchsia;
  box-shadow: 10px 5px 5px red;
}

details summary {
    text-align: left;
    font-size: 20px;
    padding: 8px 0;
  }

  details[open] summary {
    font-weight: bold;
  }
  
  details div {
    border: 2px solid black;
    text-align: left;
    padding: 8px;
    height: 50px;
    overflow: auto;
  }

h1 {
  font-size: 2em;
  margin: 0;
  padding: 0;
}

h3,h4 {
  margin: 8px 0;
}

.card.change-color {
  background-color: #000;
}

#cardlist {
  display: flex;
}

.card {
  font-size: 1em;
  display: inline-flex;
  padding: 8px;
  margin: 8px;
  opacity: .8;
  background-color: lightblue;
  transition: .6s all ease-in-out;
}

.card-image {
  width: 200px;
  height: 100%;
}

.card-text {
  width: 300px;
  padding: 0 8px 8px 8px;
  color: black;
  background-color: white;
  margin: 0 0 0 8px;
  height: 300px;
  overflow: auto;
}

.card-title {
  position: sticky;
  top: 0;
  background-color: #eeeeee;
  text-align: center;
  font-size: 2em;
  padding: 8px 8px 16px;
  margin: 0 -8px;
}

ul {
  margin: 0;
  padding: 0 32px;
}
    `;
  }


  openChanged(e) {
    console.log(e.newState);
    if (e.newState === "open") {
      this.fancy = true;
    }
    else {
      this.fancy = false;
    }
  }

  render() {
    return html`
<div class="card" >
    <meme-maker alt="Landscape" image-url="${this.imageURL}" top-text="This is" bottom-text="landscape" class="card-image">
    </meme-maker>
    <div class="card-text">
      <h3 class="card-title">${this.title}</h3>
      <div class="card-details">
        <p>
        <details ?open="${this.fancy}" @toggle="${this.openChanged}">
        <summary>Description</summary>
          <div>
          <slot>${this.description}</slot>
          </div>
          </details>
        </p>
        <h4>Click below for more details</h4>
        <ul class="links">
          <li>
            <a href="${this.buttonLink}"/>
            Details</a>
          </li>
        </ul>
      </div>
    </div>
  </div>`;

  }

  static get properties() {
    return {
      title: { type: String },
      buttonLink: { type: String },
      imageURL: { type: String },
      description: {type: String },
      fancy: { type: Boolean, reflect: true },
    };
  }
}

globalThis.customElements.define(MyCard.tag, MyCard);
