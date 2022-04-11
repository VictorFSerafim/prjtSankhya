import { Component, h, Prop, State } from '@stencil/core';
import expenses from '../../repositories/expenses';

@Component({
  tag: 'sk-search',
  styleUrl: 'sk-search.scss',
  shadow: true,
})
export class SkSearch {
  @Prop({ mutable: true }) searchText: string;
  @State() searchResult: { descricao: string; valor: string }[] = [];
  @State() userInput: string;

  onUserInput(event: Event) {
    this.userInput = (event.target as HTMLInputElement).value;
    this.searchText = this.userInput;
  }

  buscarRegistros(value) {
    if (value.description === this.searchText)
      return value;
  }

  searchFromAPI() {

    var registros = expenses.filter(this.buscarRegistros.bind(this));

    this.searchResult = registros.map(d => {
      return {
        descricao: d['description'],
        valor: d['amount'],
      };
    });

  }

  render() {
    return (
      <div class="main-search-div">
        <input class="my-input-textbox" type="text" value={this.searchText} onInput={this.onUserInput.bind(this)}></input>
        <button class="btn-react" onClick={this.searchFromAPI.bind(this)}>
          Buscar
        </button>
        <hr></hr>
        <br></br> <br></br>

        <table id="api-table">
          {this.searchResult.map(r => (
            <tr class="resulLine">
              <td>{r.descricao}</td>
              <td>{r.valor}</td>
            </tr>
          ))}
        </table>
      </div>
    );
  }

}
