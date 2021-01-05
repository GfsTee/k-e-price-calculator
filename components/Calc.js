import { useState, useEffect } from 'react';
import InputComp from './InputComp';


const Calc = () => {
    const [inputs, setInputs] = useState([0]);
    const [rabatt, setRabatt] = useState(0);
    const [values, setValues] = useState({ pic0: "0" });
    const [frame, setFrame] = useState({ frame0: "0" });
    const [mwSt, setMwSt] = useState("07");
    const [result, setResult] = useState({
        total: 0,
        picNetto: 0,
        picMwSt: 0,
        frameNetto: 0,
        frameMwSt: 0,
        mwStTotal: 0,
        nettoTotal: 0,
    });
    const handleAdd = () => {
        setInputs(state => [...state, inputs.length])
        setValues(prevState => ({
            ...prevState,
            [`pic${inputs.length}`]: "0"
        }))
        setFrame(prevState => ({
            ...prevState,
            [`frame${inputs.length}`]: "0"
        }))
    }
    useEffect(() => {
        calcAll()
    }, [inputs, rabatt, values, frame, mwSt]);
    const calcAll = () => {
        // Bild berechnen
        const picNetto = ((Object.values(values)).reduce((prev, curr) => (parseFloat(prev) + ((parseFloat(curr) / `1.${mwSt}`).toFixed(2) * 1)), 0)).toFixed(2)
        const picMwSt = ((Object.values(values)).reduce((prev, curr) => prev * 1 + curr * 1) - ((Object.values(values)).reduce((prev, curr) => prev * 1 + curr * 1) / `1.${mwSt}`)).toFixed(2)
        const picTotal = (picNetto * 1 + picMwSt * 1).toFixed(2)

        // Rahmen berechnen
        const frameNetto = ((Object.values(frame)).reduce((prev, curr) => (parseFloat(prev) + ((parseFloat(curr) / `1.${mwSt}`).toFixed(2) * 1)), 0)).toFixed(2)
        const frameMwSt = ((Object.values(frame)).reduce((prev, curr) => prev * 1 + curr * 1) - ((Object.values(frame)).reduce((prev, curr) => prev * 1 + curr * 1) / `1.${mwSt}`)).toFixed(2)
        const frameTotal = (frameNetto * 1 + frameMwSt * 1).toFixed(2)

        // Zusammenführen

        const mwStTotal = (picMwSt * 1 + frameMwSt * 1).toFixed(2)
        const nettoTotal = (picNetto * 1 + frameNetto * 1).toFixed(2)
        const total = (nettoTotal * 1 + mwStTotal * 1).toFixed(2)
        setResult({
            total,
            picNetto,
            picMwSt,
            frameNetto,
            frameMwSt,
            mwStTotal,
            nettoTotal,
        })
    }
    return (
        <main>
            <span> Steuersatz:</span>
            <select onChange={({ target }) => setMwSt(target.value)} value={mwSt}>
                <option value="05">5%</option>
                <option value="07" defaultValue>7%</option>
                <option value="19">19%</option>
            </select>
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
                    <div className="ergebnis">{(values[`pic${ele}`] / `1.${mwSt}`).toFixed(2)} €</div>
                    <div className="ergebnis">{(values[`pic${ele}`] - (values[`pic${ele}`] / `1.${mwSt}`)).toFixed(2)} €</div>
                </div>
                <div className="grid">
                    <span>Rahmen {ele + 1}:</span>
                    <input
                        type="number"
                        name={`frame${ele}`}
                        onChange={({ target }) => setFrame(state => ({ ...state, [target.name]: target.value }))}
                        value={frame[ele]}
                    />
                    <div className="ergebnis">{(frame[`frame${ele}`] / `1.${mwSt}`).toFixed(2)} €</div>
                    <div className="ergebnis">{(frame[`frame${ele}`] - (frame[`frame${ele}`] / `1.${mwSt}`)).toFixed(2)} €</div>
                </div>
            </div>
            )}
            {/* map end */}

            <div className="grid">
                <div>Gesammt:</div>
                {/* <div className="ergebnis">{((((Object.values(values)).reduce((prev, curr) => prev * 1 + curr * 1)) * 1).toFixed(2))} €</div> */}
                <div className="ergebnis">{
                    result.total
                } €</div>

                <div className="ergebnis">{result.nettoTotal} €</div>

                <div className="ergebnis">{result.mwStTotal} €</div>
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