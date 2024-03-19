import { html, css } from "lit";
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import "@lrnwebcomponents/rpg-character/rpg-character.js";
 
export class PartyUI extends DDD {

    static get tag() {
        return 'haxcms-party-ui';
      }

    constructor(){
        super();
        this.userArray = [""];
    }

  static get styles() {
    return [
      super.styles,
      css`
      :host {
        display: block;
      }
      .my-div {
        padding: var(--ddd-spacing-5);
        margin: var(--ddd-spacing-2) var(--ddd-spacing-0);
        color: var(--ddd-theme-default-keystoneYellow);
      }

      .party-ui-wrapper {
        text-align: center;
        display: block;
        background-color: var(--ddd-theme-default-beaver70);
        padding: 16px;
        border: 2px;
        margin: 8px;
        height: 500px;
        width: 500px;
      }

      .user-wrapper {
        padding: 20px;
        width: 350px;
        display: flex;
        margin: auto;
        margin-bottom: 10px;
        justify-content: center;
        align-items: center;
        border: 2px;
      }

      .user {
        color: white;
        font-size: 30px;
        text-align: center;
        padding: 0px;
        width: 50px;
      }

      .add-user-button{
        color: blue;
        font-size: 20px;
      }

      .delete-button{
        color: green;
      }

      .save-wrapper{
        padding: 20px;
        width: 250px;
        display: flex;
        flex-direction: column;
        margin: auto;
        margin-bottom: 20px;
        justify-content: center;
        align-items: center;
        border: 2px;

      }

      .save-button{
        color: green;
      }
    `];
  }

  updateName(event)
  {
    this.user = event.target.value;
    this.userArray[this.userArray.length - 1] = event.target.value;
  }

  addUser(event){
    this.userArray[this.userArray.length - 1];
    this.shadowRoot.querySelector('.text-input').value = "";
    this.userArray.push("");
  }
  

  characterView(name){
    // console.log(name + " is running")

    return html`
        <rpg-character id="rpg" hat="random" seed= ${name} style= "height: 100px; width: 100px;"></rpg-character>
    `;
  }

  render() {
    
    return html`
    <div class="party-ui-wrapper">
        <div class="user-wrapper"></div>
        <div class="user"></div>
        <input class="text-input" type="text" value=${this.user} @input=${this.updateName}>
        <button id="add-user-button"  @click="${this.addUser}">Add User</button>
        <div class="usernames-wrapper">
      </div>
      <div class="save-wrapper"></div>


      ${this.userArray.map(element => 
            this.characterView(element)
      )}

        <button id="save-button">Save</button>
      <button id="delete-button">Delete</button>
    </div>
    `;
  }
 
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      user: { type: String, reflect: true},
      userArray: {type: Array, reflect: true},
    }
  }
}

globalThis.customElements.define(PartyUI.tag, PartyUI);