import React from "react";

interface Props {
    children: React.ReactNode;
    nom: string;
    prenom: string;
    setTime: (date: Date) => void;
}

const Child = ({children, nom, prenom, setTime}: Props) => {
// const Child = (props: any) => {

    return(
        <div>
            <h1>Child</h1>
            <p>{nom}</p>
            <p>{prenom}</p>
            <div style={{ border: '1px solid black', padding: '10px'}}>
                {children}
            </div>

            <button onClick={() => setTime(new Date())} type="button">Set time</button>

        </div>
    )
}

export default Child;