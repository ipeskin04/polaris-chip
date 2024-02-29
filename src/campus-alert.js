import { LitElement, html, css } from 'lit';

export class Alert extends LitElement {

  static get tag() {
    return 'campus-alert';
  }

  constructor() {
    super();
    this.issueLevel = ""
    this.message = "This is a default message.";
    this.sticky = false;
    this.opened = true;
    if (localStorage.getItem('campus-alert-opened-state') == "false"){
      this.opened = false;

    }
    this.date = '';
  }

  static get styles() {
    return css`

      .sticky{
        position: sticky;
        top: 0;
        z-index: 100;
        opacity: 1.0;
      }

      .alert-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: lightblue;
        width: 100%;
        margin-bottom: 8px;
      }

      .message-wrap {
        background-color: white;
        transform: skew(20deg);
        
        text-align: center;
        width: 50%;
        height: 100%;
        
      }

      :host([date]){
        color: black;

      }

      .campus-alert {
        font-size: 1em;
        display: block;
        padding: 16px;
        width: 100%;
      }

      .message {
        font-size: 20px;
        color: white;
        transform: skew(-20deg);
      }

      .date {
        transform: skew(0deg);
        width: 15%;
        font-weight: bold;
        
      }

      .button-wrapper {
        width: 15%;
      }

      button {
        font-weight: bold;
        float: right;
        padding: 10px;
        margin: 4px;
    }

    .closed-toggle-button {
      display: flex;
      align-items: center;
      padding: 10px;
      font-size: 30px;
      
    }

    
    
    .closedContainer {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100px;
      background-color: lightblue;
    }

  `;
  }

  toggleAlert() { 
      this.opened =!this.opened; 
      localStorage.setItem("campus-alert-opened-state", this.opened);
    } 

    

    openedView(color){
        return html `
        <div class="alert-wrapper ${(this.sticky) ? "sticky" : ""}">
          <div class="date">${this.date}</div>

          <div class="message-wrap">
            <div class="campus-alert " style="background-color:${color}">
             <div class="message"><svg xmlns="http://www.w3.org/2000/svg" style="height: 30px; width: 30px; align-items: center;" viewBox="0 0 24 24"><title>alert-circle-outline</title><path d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" /></svg>
               ${this.message} </div>
              </div>
          </div>
          <div class="button-wrapper">
            <button @click="${this.toggleAlert}">X Close</button>
          </div>
        </div>
        `;
    }


    closedView(){
        return html `

        <div class="closedContainer ${(this.sticky) ? "sticky" : ""}">
          <div class ="closed-toggle-button" @click="${this.toggleAlert}">
            <svg xmlns="http://www.w3.org/2000/svg" style="height: 50px; width: 50px;" viewBox="0 0 24 24"><title>alert-circle-outline</title><path d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" /></svg>
            Alert!
            <svg xmlns="http://www.w3.org/2000/svg" style="height: 50px; width: 50px;" viewBox="0 0 24 24"><title>chevron-down</title><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
          </div>
        </div>
        `;
    }


    render() {
        let color = "white";
        if(this.issueLevel === "notice") color = "#0096FF";
        if(this.issueLevel === "warning") color = "orange";
        if(this.issueLevel === "alert") color = "red";
        if(this.issueLevel === "welcome") color = "grey";

        if(this.issueLevel === "welcome") (this.message) = "Welcome!";
        if(this.issueLevel === "notice") (this.message) = "Small notice: watch out for this today.";
        if(this.issueLevel === "warning") (this.message) = "This is a warning. Exceed some caution."
        if(this.issueLevel === "alert") (this.message) = "This is an alert. PROCEED WITH IMMENSE CAUTION!";
        

    return (this.opened) ? this.openedView(color) : this.closedView();
  }

  static get properties() {
    return {
      issueLevel: { type: String },
      message: { type: String },
      sticky: { type: Boolean },
      opened: { type: Boolean, Reflect: true },
      date: { type: String },
    };
  }

}

globalThis.customElements.define(Alert.tag, Alert);
