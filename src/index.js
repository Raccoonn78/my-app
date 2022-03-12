import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';





//=============================================================================
//=============================================================================
//=============================================================================

 class Index extends Component{
  constructor(props) {
      
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      value: 'q'
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.vacanc=this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.uurl=`https://api.hh.ru/vacancies?text=${this.vacanc}&area=1`
}

handleChange(event) {
  console.log("Вызов handle")
  this.setState({value: event.target.value});
  this.fetchData(this.state.value);
 }

// handleSubmit(vacanc) {
 
//   // console.log( this.state.value);
//   // vacanc= this.state.value;
//   // this.vacanc=vacanc;
//   // console.log(this.vacanc);
//   // this.vacanc= this.state.value;
//   this.fetchData(this.setState({value: vacanc.target.value}));
// }
// аааааааааааааааааааааа проблема в том что нужно передать как то это ебаную переменную и так чтобы каждый раз не вызывалась функция и не обновляла список ваканский
// и я так понял самое главное это дать переменной prevProps или как то присвоить значение, потому что там нулевое значение и я не еббу как его присвоить и вообще как задается 
//  значение этой ебаной переменной !!!!!!!!!!!!!!!
// <input value={this.state.value} onChange={this.handlechange} /><input type="text" value={this.state.value} onChange={this.handleChange} />


fetchData = vacanc =>{
  console.log("Вызов fetch")
  console.log(vacanc)
  fetch(`https://api.hh.ru/vacancies?text=${vacanc}&area=1`)  
  .then(res => res.json())
  .then(
    
    (result) => {
      this.setState({
        isLoaded:true,
        items: result.items
      });
    },
    (error) => {
      this.setState({
        isLoaded: true,
        error
      });
    }
  )
}

componentDidMount() { 
  console.log(this.vacanc)
  console.log("Вызов Mount")
  console.log(this.props.value);
  console.log(this.state.value)
  this.setState({value: this.props.value});
  this.fetchData(this.setState({value: this.props.value}));
}

componentDidUpdate(prevProps) {
  if(prevProps.vacanc !== this.props.vacanc){
    console.log("Вызов Update");
    this.fetchData(this.setState({value: this.props.value}));
    
  }
  
}

render() {
    
    const {error , isLoaded, items} = this.state;
    
    if (error) {
      return <p>Error eqweqweq {error.message}</p>
    }else if (!isLoaded){
      return <p>Loading...</p>
    } else {
      return (
      
        <div className='main' >
          <form onSubmit={this.handleSubmit}>
        <label>
          {/* Поиск: */}
          <input type="text" placeholder="Искать здесь..." value={this.state.value} onChange={this.handleChange} />
        </label>
        <button type="submit"></button>

        {/* <input type="submit" value="Отправить" /> */}
      </form>

        <div className='ul-center'><div className='ul-center-center'>
        <ul>
          {items.map(item => (
            <li >
              <div className='all-items' >
                  <div><p>Название вакансии:</p>{item.name}</div>
                  <div><p>Город:</p>{item.area.name}</div>
                  {/* <div>{item.salary.from}-{item.salary.to}</div> */}
                  <div><a href={item.alternate_url}>{item.alternate_url}</a></div>
                </div>
            </li>
          ))}
          
        </ul>
        </div></div>
        </div>
        
      )
    }
    
          }
}



ReactDOM.render(
  <Index />,
  document.getElementById('root')
);

