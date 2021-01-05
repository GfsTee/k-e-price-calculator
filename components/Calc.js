import { useState, useEffect } from 'react';
import InputComp from './InputComp';


const Calc = () => {
    const [inputs, setInputs] = useState([0]);
    const [rabatt, setRabatt] = useState(0);
    const [values, setValues] = useState({ pic0: "" });
    const [rahmen, setRahmen] = useState({ rahmen0: "" });
    // console.log(inputs)
    // const removeItem = (target) => {
    //     setInputs(inputs.filter(ele => ele != target.name))
    //     console.log("Inputs: ", inputs)
    //     console.log("Count: ", count)
    // }
    const handleAdd = () => {
        // const name
        setInputs(state => [...state, inputs.length])
        setValues(prevState => ({
            ...prevState,
            [`pic${inputs.length}`]: ""
        }))
        setRahmen(prevState => ({
            ...prevState,
            [`rahmen${inputs.length}`]: ""
        }))
    }

    return (
        <main>
            <div className="grid center">
                <button onClick={() => handleAdd()}>Add</button>
                <div>Brutto</div>
                <div>Netto</div>
                <div>MwSt.</div>
            </div>
            {/* map start */}
            {inputs.map(ele => <div key={ele}>
                <div className="grid">
                    <span>Bild {ele + 1}:</span>
                    <input
                        type="number"
                        name={`pic${ele}`}
                        onChange={({ target }) => setValues(state => ({ ...state, [target.name]: target.value }))}
                        value={values[`pic${ele}`]}
                    />
                    <div className="ergebnis">{(values[`pic${ele}`] / 1.07).toFixed(2)} €</div>
                    <div className="ergebnis">{(values[`pic${ele}`] - (values[`pic${ele}`] / 1.07)).toFixed(2)} €</div>
                </div>
                <div className="grid">
                    <span>Rahmen {ele + 1}:</span>
                    <input
                        type="number"
                        name={`rahmen${ele}`}
                        onChange={({ target }) => setRahmen(state => ({ ...state, [target.name]: target.value }))}
                        value={rahmen[ele]}
                    />
                    <div className="ergebnis">{(rahmen[`rahmen${ele}`] / 1.07).toFixed(2)} €</div>
                    <div className="ergebnis">{(rahmen[`rahmen${ele}`] - (rahmen[`rahmen${ele}`] / 1.07)).toFixed(2)} €</div>
                </div>
            </div>
            )}
            {/* map end */}

            <div className="grid">
                <div>Gesammt:</div>
                <div className="ergebnis">{((((Object.values(values)).reduce((prev, curr) => prev * 1 + curr * 1)) * 1).toFixed(2))} €</div>

                <div className="ergebnis">{((Object.values(values)).reduce((prev, curr) => (parseFloat(prev) + ((parseFloat(curr) / 1.07).toFixed(2) * 1)), 0))} €</div>

                <div className="ergebnis">{((Object.values(values)).reduce((prev, curr) => prev * 1 + curr * 1) - ((Object.values(values)).reduce((prev, curr) => prev * 1 + curr * 1) / 1.07)).toFixed(2)} €</div>
            </div>
            <span className="text">Rabatt:</span><input type="number" name="rabatt" onChange={({ target }) => setRabatt(target.value)} value={rabatt} />

            <style jsx>{`
            .grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, 75px);
                gap: 5px;
            }
            .grid.center {
                text-align: center;
            }
            .text, .ergebnis {
                display:inline-block;
                min-width: 75px;
            }
            .ergebnis {
                text-align: right;
            }
            [type="number"] {
                color: red;
                display: inline-block;
                width: 75px
            }
      `}</style>
        </main >
    );
}

export default Calc;