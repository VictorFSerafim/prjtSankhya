import { Component, h, Prop, State } from '@stencil/core';
import expenses from '../../repositories/expenses';

@Component({
  tag: 'sk-search',
  styleUrl: 'sk-search.scss',
  shadow: false,
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
    if (String(value.description).toLocaleLowerCase() === this.searchText.toLocaleLowerCase())
      return value.description;
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
      <div class="mainsearch">
        <div class="mainsearch__teste">
          <input class="my-input-textbox" type="text" name="campoBusca" value={this.searchText} onInput={this.onUserInput.bind(this)}></input>
          <button class="btn-react" name='botaoBusca' onClick={this.searchFromAPI.bind(this)}>
            Buscar
          </button>
        </div>

        <hr></hr>
        <br></br>

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
