import { Component, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'my-card',
  styleUrl: 'my-card.css',
  shadow: true,
})
export class MyCard {

  @Prop({ mutable: true }) userName: string;
  @State() ApiData: string = "starting value";
  @State() showReactTab: boolean = false;
  @State() showStencilTab: boolean = false;

  @State() myStencilUsers: string;
  @State() myReactUsers: string;


  componentDidLoad() {
    this.ApiData = 'loading...';
    fetch('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo')
      .then(res => {
        return res.json();
      })
      .then(parsedRes => {
        var metaData = parsedRes['Meta Data'];
        var timeDateStencil = metaData['5. Output Size'];
        this.ApiData = timeDateStencil;
      });
  }

  getStencilUserFromAPI() {
    this.myStencilUsers = 'loading data...';
    fetch('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo')
      .then(res => {
        return res.json();
      })
      .then(parsedRes => {
        var timeSeries = parsedRes['Time Series (5min)'];
        var timeDateStencil = timeSeries['2022-04-07 19:45:00'];
        this.myStencilUsers = timeDateStencil['5. volume'];
      }).catch(ex => {console.log(ex)});

  }

  getReactUserFromAPI() {
    this.myReactUsers = 'loading data...';
    fetch('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo')
      .then(res => {
        return res.json();
      })
      .then(parsedRes => {
        var timeSeries = parsedRes['Time Series (5min)'];
        var timeDateReact = timeSeries['2022-04-07 19:45:00'];
        console.log(timeSeries);
        this.myReactUsers = timeDateReact['5. volume'];
      });
  }

  fetchMyDataFromAPI(contentType: string) {
    if (contentType == 'stencil') {
      this.getStencilUserFromAPI();
    } else {
      this.getReactUserFromAPI();
    }
  }

  onContentChange(content: string) {
    if (content == 'reacttab') {
      this.showReactTab = true;
      this.showStencilTab = false;
    } else if (content == 'stenciltab') {
      this.showStencilTab = true;
      this.showReactTab = false;
    } else {
      this.showReactTab = false;
      this.showStencilTab = false;
    }
  }

  onUserInput(event: Event) {
    this.userName = (event.target as HTMLInputElement).value;
  }
  render() {
    let reactContent = (
      <div>
        <div class="card-custom" id="react-div">
          Hello, from react <br /><br />Live Users <span>{this.myReactUsers}</span>

          {/* onClick={this.changeState.bind(this)} */}
          <button class="btn-react small-btn" onClick={this.fetchMyDataFromAPI.bind(this, 'react')}>Get React Users</button> <br></br>
        </div>
      </div>
    );
    let stencilContent = (
      <div>
        <div class="card-custom" id="stencill-div">
          Hello, from Stencil <br /><br />Live Users <span>{this.myStencilUsers}</span>
          <button class="btn-stencill small btn" onClick={this.fetchMyDataFromAPI.bind(this, 'stencil')}>Get React Users</button><br /><br />
        </div>
      </div>
    )

    let contentDisplay = '';
    if (this.showReactTab) {
      contentDisplay = reactContent;
    } else if (this.showStencilTab) {
      contentDisplay = stencilContent;
    }
    let mainContent = (
      <div class="mycardwrapper">

        <h1>Hi, I am {this.userName}</h1>

        <h5>{this.ApiData}</h5>
        <button class="btn-stencill" onClick={this.onContentChange.bind(this, 'stenciltab')}>Stencill</button>
        <button class="btn-react" onClick={this.onContentChange.bind(this, 'reacttab')}>React</button>

        {contentDisplay}
        <h></h>
        <h3>Two way data binding in Stencil</h3>
        <input type="text" class="my-input-textbox" onInput={this.onUserInput.bind(this)} value={this.userName} />
      </div>);

    return mainContent;
  }

}
