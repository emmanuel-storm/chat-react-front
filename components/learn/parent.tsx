"use client"
import Child from "@/components/learn/child";
import React, {useEffect, useState} from "react";

const Parent = () => {
    const [time, setTime] = useState<Date>();
    const [relativeTime, setRelativeTime] = useState(0)
    const [childCount, setChildCount] = useState(1)

    useEffect(() => {
        if (!time) {
            return;
        }

        setRelativeTime(0)
        const interval = setInterval(() => {
            setRelativeTime(previousTime => previousTime + 1);
        }, 1000);

        return () => {
            clearInterval(interval);
        };

    }, [time])


    return (
        <div>
            <h2>Parent</h2>
            {/*<Child nom="Pellegrin" prenom="Pierre" setTime={(date: Date) => setTime(date)}><p>coucou</p></Child>*/}
            {/*<Child nom="Hallyday" prenom="David" setTime={(date: Date) => setTime(date)}><p>coucou bis</p></Child>*/}

            <button onClick={() => setChildCount(childCount+1)} type="button">Increment</button>
            <button onClick={() => setChildCount(childCount-1)} type="button">Decrement</button>
            <p>{childCount}</p>

            <Child nom="Pellegrin" prenom="Pierre" setTime={(date: Date) => setTime(date)}>
                {new Array(childCount).fill(0).map((value, index) => (
                    <p key={index}>Children no {index} & {value}</p>
                ))}
            </Child>


        </div>
    )
}

export default Parent