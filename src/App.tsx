import React, { useCallback, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { toast } from "react-toastify";
import apiData, { PersonType } from "./api";
import { Spinner } from "./components/Spinner";
import { PersonInfo } from "./components/PersonInfo";
import { LoadMore } from "./components/LoadMore";

import "./App.css";

const MAX_ATTEMPT_COUNTER = 5;

function App() {
    const [data, setData] = React.useState<PersonType[]>([]);
    const [isLoading, setLoading] = React.useState<boolean>(false);
    const [selected, setSelected] = React.useState<string[]>([]);
    const callAttemptCounter = useRef<number>(0);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const newData = await apiData();
            ReactDOM.unstable_batchedUpdates(() => {
                setData((prev) => {
                    return [...prev, ...newData];
                });
                setLoading(false);
            });

            callAttemptCounter.current = 0;
            toast.success(`Success!`);
        } catch (e) {
            const error = new Error(e);
            setLoading(false);

            if (callAttemptCounter.current < MAX_ATTEMPT_COUNTER) {
                callAttemptCounter.current++;
                toast.error(`${error.message}: Attempt ${callAttemptCounter.current}`);
                fetchData();
            } else {
                callAttemptCounter.current = 0;
                toast.error(`Sorry, Try again later`);
            }
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleSelectPerson = useCallback(
        (id) => {
            const copySelected = [...selected];
            const index = copySelected.findIndex((s) => s === id);
            if (index > -1) {
                copySelected.splice(index, 1);
            } else {
                copySelected.push(id);
            }
            setSelected([...copySelected]);
        },
        [selected]
    );

    const sortData = useCallback(
        (dataA: PersonType, dataB: PersonType) => {
            const selectedSet = new Set([...selected]);
            if (selectedSet.has(dataA.id) && !selectedSet.has(dataB.id)) {
                return -1;
            } else if (!selectedSet.has(dataA.id) && selectedSet.has(dataB.id)) {
                return 1;
            }
            return 0;
        },
        [selected]
    );

    return (
        <>
            <div className="App">
                <div className="selected">Selected contacts: {selected.length}</div>
                <div className="list">
                    {data.sort(sortData).map((personInfo) => (
                        <PersonInfo
                            isSelected={selected.some((s) => s === personInfo.id)}
                            onClick={() => {
                                handleSelectPerson(personInfo.id);
                            }}
                            key={personInfo.id}
                            data={personInfo}
                        />
                    ))}
                </div>
                {data.length <= 1000 && <LoadMore onClick={fetchData} />}
            </div>
            {isLoading && (
                <div className="spinner">
                    <Spinner />
                </div>
            )}
        </>
    );
}

export default App;
