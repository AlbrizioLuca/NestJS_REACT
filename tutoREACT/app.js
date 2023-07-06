//  ------------- VERSION SANS JSX -----------------------
/* 
let n= 0

function render(){
    const title = React.createElement('h1', {},
        'Bonjour tout le monde ',
        React.createElement('span', {}, n)
    )
    ReactDOM.render(title, document.querySelector('#app'))
}

render() 

window.setInterval(()=> {
    n++
    render()
}, 1000 )

*/

//  ----------------- VERSION AVEC JSX 

/*
let n= 0

function NumberFormat(n) {
    return n.toString().padStart(2,'0')    
}

function render(){
    const items = [
        'Tache 1',
        'Tache 2',
        'Tache 3'
    ]

    const lis = items.map((item, k) => <li key={k}>{item}</li>)

    const title =
        <React.Fragment>
            <h1 className="title" id={"title" + n}>
                Bonjour tout le monde - <span>{NumberFormat(n)}</span>
            </h1>
            <ul>{lis}</ul>
        </React.Fragment>

    ReactDOM.render(title, document.querySelector('#app'))
}

render() 

window.setInterval(()=> {
    n++
    render()
}, 1000 )
*/

// ---------------------- AVEC DES COMPONENTS

function WelcomeFunction ({name, children}) {
    return <div>
        <h1> Bonjour {name}</h1>
        <p>{children}</p>
    </div>
}

class Welcome extends React.Component {
    render() {
        return <div>
            <h1>Bonjour {this.props.name} </h1>
            <p>{this.props.children}</p>
        </div>
    }
}

class Clock extends React.Component {
    constructor (props){
        super(props)
        this.state = {date: new Date()}
        this.timer = null
    }

    componentDidMount () {
        this.timer = window.setInterval(this.tick.bind(this), 1000)
    }

    componentwillUnmount () {
        window.clearInterval(this.timer)
    }


    tick () {
        this.setState({date:new Date()})
    }

    render () {
        const date = new Date()
        return <div>
            Nous sommes le : {this.state.date.toLocaleDateString()} et il est : {this.state.date.toLocaleTimeString()}
        </div>
    }
}

class Incrementer extends React.Component {
    constructor (props) {
        super(props)
        this.state = {n: props.start}
        this.timer = null
    }

    componentDidMount (){
        this.timer = window.setInterval(this.increment.bind(this), 1000)
    }

    componentwillUnmount () {
        window.clearInterval(this.timer)
    }

    increment () {
        this.setState((state, props) => ({n : state.n + props.step }))
    }

    render() {
        return <div> Valeur : {this.state.n}</div>
    }
}

Incrementer.defaultProps = {
    start: 0,
    step: 1
}

class ManualIncrementer extends React.Component {
    constructor(props){
        super(props)
        this.state = {n:0}
    }

    increment (e) {
        console.log(e)
        this.setState((state, props) => ({n : state.n + 1 }))
    }

    render () {
        return <div>
            Valeur: {this.state.n} <button onClick={this.increment.bind(this)}> Incrémenter </button>
        </div>
    }
}

function Home (){
    return <div>
        <Welcome name="Vinie" />
        <Welcome name="Luca" />
        <Clock />
        {/* <Incrementer start={10}/>
        <Incrementer start={100} step={10} /> */}
        <ManualIncrementer/>
    </div>
}

ReactDOM.render(<Home/>, document.querySelector('#app'))