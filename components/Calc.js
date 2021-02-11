import { useState, useEffect } from 'react';

const Calc = () => {
    const toFixed = 4
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
        picTotal: 0
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
        // const picNetto = ((Object.values(values)).reduce((prev, curr) => (parseFloat(prev) + ((parseFloat(curr) / `1.${mwSt}`).toFixed(toFixed) * 1)), 0)) * ((100 - rabatt) / 100)
        const picNetto = ((Object.values(values)).reduce((prev, curr) => (parseFloat(prev) + ((parseFloat(curr) / `1.${mwSt}`).toFixed(toFixed) * 1)), 0))
        // const picNetto = ((Object.values(values)).reduce((prev, curr) => (parseFloat(prev) + ((parseFloat(curr) / `1.${mwSt}`).toFixed(toFixed) * 1)), 0)).toFixed(toFixed)
        const picMwSt = ((Object.values(values)).reduce((prev, curr) => prev * 1 + curr * 1) - ((Object.values(values)).reduce((prev, curr) => prev * 1 + curr * 1) / `1.${mwSt}`))
        const picTotal = (picNetto * 1 + picMwSt * 1).toFixed(toFixed)

        // Rahmen berechnen
        const frameNetto = ((Object.values(frame)).reduce((prev, curr) => (parseFloat(prev) + ((parseFloat(curr) / `1.${mwSt}`).toFixed(toFixed) * 1)), 0)).toFixed(toFixed)
        const frameMwSt = ((Object.values(frame)).reduce((prev, curr) => prev * 1 + curr * 1) - ((Object.values(frame)).reduce((prev, curr) => prev * 1 + curr * 1) / `1.${mwSt}`)).toFixed(toFixed)
        const frameTotal = (frameNetto * 1 + frameMwSt * 1).toFixed(toFixed)

        // Zusammenführen

        const mwStTotal = (picMwSt * 1 + frameMwSt * 1).toFixed(toFixed)
        const nettoTotal = (picNetto * 1 + frameNetto * 1).toFixed(toFixed)
        const total = (nettoTotal * 1 + mwStTotal * 1).toFixed(toFixed)
        const picNettoRabatt = ((Object.values(values)).reduce((prev, curr) => (parseFloat(prev) + ((parseFloat(curr) / `1.${mwSt}`).toFixed(toFixed) * 1)), 0)) * ((100 - rabatt) / 100)
        const picMwStRabatt = ((Object.values(values)).reduce((prev, curr) => prev * 1 + curr * 1) - ((Object.values(values)).reduce((prev, curr) => prev * 1 + curr * 1) / `1.${mwSt}`)) * ((100 - rabatt) / 100)
        const picRabatt = picTotal - (picNettoRabatt + picMwStRabatt)
        setResult({
            total,
            picNetto,
            picMwSt,
            frameNetto,
            frameMwSt,
            mwStTotal,
            nettoTotal,
            picRabatt,
            picTotal
        })
    }
    return (
        <main>
            <span className="steuersatz"> Steuersatz:</span>
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
                    <div className="ergebnis">{((values[`pic${ele}`] / `1.${mwSt}`)).toFixed(toFixed)} €</div>
                    <div className="ergebnis">{((values[`pic${ele}`] - (values[`pic${ele}`] / `1.${mwSt}`))).toFixed(toFixed)} €</div>
                </div>
                <div className="grid">
                    <span>Rahmen {ele + 1}:</span>
                    <input
                        type="number"
                        name={`frame${ele}`}
                        onChange={({ target }) => setFrame(state => ({ ...state, [target.name]: target.value }))}
                        value={frame[`frame${ele}`]}
                    />
                    <div className="ergebnis">{(frame[`frame${ele}`] / `1.${mwSt}`).toFixed(toFixed)} €</div>
                    <div className="ergebnis">{(frame[`frame${ele}`] - (frame[`frame${ele}`] / `1.${mwSt}`)).toFixed(toFixed)} €</div>
                </div>
            </div>
            )}
            {/* map end */}

            <div className="grid gesamt">
                <div>Gesamt:</div>
                <div className="ergebnis">{result.total} €</div>

                <div className="ergebnis">{result.nettoTotal} €</div>

                <div className="ergebnis">{result.mwStTotal} €</div>
            </div>
            <span className="text rabatt">Rabatt in %:</span>
            <input type="number" name="rabatt" onChange={({ target }) => setRabatt(target.value)} value={rabatt} /> <br />
            <div className="ergebnis-grid">
                <div>{rabatt}% Rabatt auf alle Bilder:</div>
                <div>{
                    (result.picNetto * 0.01 * rabatt).toFixed(toFixed)
                } €</div>

                <div>NettoBilder abzüglich Rabatt:</div>
                <div>{
                    (result.picNetto - ((result.picNetto * 0.01 * rabatt).toFixed(toFixed))).toFixed(toFixed)
                } €</div>
                <div>NettoRahmen gesamt:</div>
                <div>
                    {result.frameNetto} €
                </div>
                <div>Netto gesamt:</div>
                <div>
                    {
                        result.picNetto - ((result.picNetto * 0.01 * rabatt).toFixed(toFixed)) + result.frameNetto * 1
                    } €
                </div>
                <div>
                    MwSt:
                </div>
                <div>
                    {
                        ((result.picNetto - ((result.picNetto * 0.01 * rabatt).toFixed(toFixed)) + result.frameNetto * 1) * .01 * mwSt).toFixed(toFixed)
                    } €
                </div>
                <div>Brutto gesamt:</div>
                <div>
                    {
                        result.picNetto - ((result.picNetto * 0.01 * rabatt).toFixed(toFixed)) + result.frameNetto * 1
                        +
                        ((result.picNetto - ((result.picNetto * 0.01 * rabatt).toFixed(toFixed)) + result.frameNetto * 1) * .01 * mwSt).toFixed(toFixed) * 1
                    } €
                </div>
            </div>

            <style jsx>{`
            .steuersatz {
                margin-right: 10px;
            }
            .grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, 100px);
                gap: 5px;
            }
            .center {
                margin-top: 10px;
            }
            .grid.center {
                text-align: center;
            }
            .text, .ergebnis {
                display:inline-block;
                min-width: 100px;
            }
            .ergebnis {
                text-align: right;
            }
            .gesamt {
                margin-top: 5px;
                border-top: 1px solid #000;
                font-weight: 600;
            }
            [type="number"] {
                width: 100px
            }
            .ergebnis-grid {
                display: grid;
                grid-template-columns: repeat(2, max-content);
                column-gap: 10px
            }
            .ergebnis-grid div {
                align-self: end;
            }
            .ergebnis-grid div:nth-of-type(2n) {
                text-align: right;
            }
            .rabatt {
                margin-top: 20px;
            }
      `}</style>
        </main >
    );
}

export default Calc;