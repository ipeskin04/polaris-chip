import { html, css } from "lit";
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import "@lrnwebcomponents/rpg-character/rpg-character.js";
 
export class PartyUI extends DDD {

    static get tag() {
        return 'haxcms-party-ui';
      }

    constructor(){
        super();
        this.userArray = [];
        this.maxUsers = 4;
        this.tempUser = "";
        this.sideBarVisible = false;
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

      .everything-wrapper {
        display: inline-flex;
        flex-direction: row;
        padding: 8px;
        margin: 8px;
      }

      .sidebar {
        display: flex;
        width: 200px;
      }

      .party-ui-wrapper {
        text-align: center;
        display: block;
        background-color: var(--ddd-theme-default-beaver70);
        padding: 16px;
        border: 2px;
        margin: 8px;
        height: 400px;
        width: 700px;
      }

      .characters-wrapper {
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
        font-family: "Press Start 2P", system-ui;
      }

      .delete-button{
        color: green;
        font-family: "Press Start 2P", system-ui;
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
        font-family: "Press Start 2P", system-ui;
      }

      .user-name-text{
        text-align: center;
        display: flex;
        color: var(--ddd-theme-default-black);
        width: 95%;
        margin: auto;
        padding: 20px;
        align-items: center;
        font-weight: var(--ddd-font-primary-medium);
        margin: auto;
      }

      .vertical-wrapper{
        display:block;
      }

      .popUp {
            display: flex;
            flex-direction: column;
            background-color: var(--ddd-theme-default-potential0);
            border: var(--ddd-border-lg);
            color: var(--ddd-theme-default-keystoneYellow);
            
          }

        rpg-character
        {
          max-width: 100px;
          max-height: 100px;
          padding: 8px;
          margin: 8px;
          height:100%;
          width:100%;
        }

    `];
  }


  updateName(event)
  {
    this.tempUser = event.target.value;

  }


  addUser(event){
    if (this.tempUser.trim() !== "") {
    if (this.userArray.length < this.maxUsers) {
      this.userArray.push(this.tempUser);
      this.tempUser = "";
      this.shadowRoot.querySelector('.text-input').value = "";
      this.sideBarVisible = false;
      this.requestUpdate();
  }
}


}

deleteUser() {

  if (this.userArray.length > 0) {
      this.userArray.pop();
  }

  this.requestUpdate();
}

  characterView(name){
    // console.log(name + " is running")
    const hatList = [
      "bunny",
      "coffee",
      "construction",
      "cowboy",
      "education",
      "knight",
      "ninja",
      "party",
      "pirate",
      "watermelon",
    ];

    let number = name.charCodeAt(0) % hatList.length;
    

    return html`
    <div class="vertical-wrapper">
        <rpg-character id="rpg" hat=${hatList[number]} seed= ${name} style= "height: 100px; width: 100px;"></rpg-character>
        <div class="user-name-text">${name}</div>
      </div>
    `;
  }

  render() {
    
    return html`
    <div class="everything-wrapper">
    <div class="party-ui-wrapper">
      <div class="usernames-wrapper">
          <input class="text-input" type="text" value=${this.user} @input=${this.updateName} @keydown=${this.handleInput}>
          <button id="add-user-button" @click="${this.addUser}" ?disabled="${this.userArray.length >= this.maxUsers}">Add User</button>
      </div>
      <confetti-container id="confetti">
      <div class="characters-wrapper">
          ${this.userArray.map(element => 
            this.characterView(element)
          )}
      
        <!-- ${this.characterView(this.tempUser)} -->
        </div>
        </confetti-container>

          <div class="user"></div>
          

      <div class="save-wrapper"></div>
    
        <button id="save-button" @click="${this.makeItRain}" ?disabled="${this.userArray.length === 0}">Save</button>
        <button id="delete-button" @click="${this.deleteUser}" ?disabled="${this.userArray.length === 0}">Delete</button>
        <!-- </div>
      </div> -->
    </div>
    <div class="sidebar" style="${(!this.sideBarVisible) ? "display:none;" : ""}">
        <div class=popUp>
        
            
            ${this.characterView(this.tempUser)}
            
            
            
        </div>
  </div>
    
    `;
  }

  handleInput(event) {
    const inputValue = event.target.value;

    if(inputValue.length > -1){
      this.sideBarVisible = true;
    }
    else{
      this.sideBarVisible = false;
    }

    // Remove any characters that are not lowercase letters or numbers
    const sanitizedValue = inputValue.replace(/[^a-z0-9]/g, "");
    event.target.value = sanitizedValue.slice(0, 10); // Limit to 10 characters
  }

  makeItRain() {
    import("@lrnwebcomponents/multiple-choice/lib/confetti-container.js").then(
      (module) => {
        setTimeout(() => {
          this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
        }, 0);
      }
    );
  }
 
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      user: { type: String, reflect: true},
      userArray: { type: Array, reflect: true},
      maxUsers: { type: Number},
      tempUser: { type: String, reflect: true},
      sideBarVisible: {type: Boolean, reflect: true},
    }
  }
}

globalThis.customElements.define(PartyUI.tag, PartyUI);