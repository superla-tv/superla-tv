import Popup from 'reactjs-popup';
// Config
import { onValue, push } from 'firebase/database';
import dbRef from '../firebase';
import { useEffect } from 'react';
// import 'reactjs-popup/dist/index.css';

const TVResults = ({ tvRes, showSearch }) => {

    // // const premieredDate = tvRes[0].show.premiered;
    // console.log("tvRes", tvRes);
    // tvRes.map((i) => {
    //     console.log(i.show.premiered);
    //     console.log(i.show.ended);
    // })


    const handleListName = (e) => {
        e.preventDefault();
        const listName = e.target[0].value;
        //firebase
        push(dbRef, {listName});
        alert(`New list created: ${listName}`);
    }

    const loadLists = (response) => {
        const theSelect = document.querySelectorAll('.selectAList');
        const arrayOfSelects = Array.prototype.slice.call(theSelect);
            {arrayOfSelects.map((select) => {
                select.innerText = "";
                const disabledOption = document.createElement('option');
                disabledOption.setAttribute("value", "Select A List...");
                disabledOption.setAttribute("disabled", "");
                disabledOption.setAttribute("selected", "selected");
                disabledOption.innerText = "Select A List...";            
                select.appendChild(disabledOption);
                const data = response.val();
                for (let key in data) {
                    const displayedList = data[key].listName;
                    const theOption = document.createElement('option');
                    theOption.setAttribute('value', displayedList)
                    theOption.innerText = displayedList;            
                    select.appendChild(theOption);
                }
            })}
    }

    useEffect(() => {
        onValue(dbRef, (response) => {
            loadLists(response)
        });
    }, []);


    return (
        <>
            {tvRes.length === 0 ? (
                <p className="resultsTitle">Sorry nothing to be seen</p>
            ) : (
                <div>
                    <p className="resultsTitle">Results for {showSearch}</p>
                    {tvRes.map((i) => (
                        <div className="tvContainer wrapper" key={i.show.id}>
                            <div className="imgContainer">
                                {i.show.image === null ? (
                                    <img src="./assets/no-img-portrait-text.png" alt="stuff" />
                                ) : (
                                    <img
                                        src={i.show.image.original}
                                        alt={`TV poster for ${i.show.name}`}
                                    />
                                )}
                            </div>
                            <div className="flexContainer">
                                <h2>{i.show.name}</h2>
                                <p>Premiered: {i.show.premiered === null ? "N/A" : i.show.premiered} - Ended: {i.show.ended === null ? "N/A" : i.show.ended}</p>
                                <Popup
                                    trigger={
                                        <button className="button">Show Info</button>
                                    }
                                    modal
                                    nested
                                >
                                    {(close) => (
                                        <div className="infoModal modal">
                                            <div className="imgContainer">
                                                {i.show.image === null ? (
                                                    <img src="./assets/no-img-portrait-text.png" alt="stuff" />
                                                ) : (
                                                    <img
                                                        src={i.show.image.original}
                                                        alt={`TV poster for ${i.show.name}`}
                                                    />
                                                )}
                                            </div>
                                            <div className="textContainer">
                                                <p>Title: {i.show.name}</p>
                                                <p>Network: {i.show.network.name}</p>
                                                <p>Country: {i.show.network.country.code}</p>
                                                <p>Genre(s): {i.show.genre}</p>
                                                {/* BROKEN HERE COME BACK */}
                                                <p className="summary">{i.show.summary}</p>
                                            </div>
                                            <button className="close" onClick={close}>
                                                X
                                            </button>
                                        </div>
                                    )}
                                </Popup>
                                <Popup
                                    trigger={
                                        <button className="button">Create New List</button>
                                    }
                                    modal
                                    nested
                                >
                                    {(close) => (
                                        <div className="modal">
                                            <form onSubmit={handleListName}>
                                                <input type="text" placeholder="Name Your List" maxLength="40"/>
                                                <button className="submitList">Submit</button>
                                            </form>
                                            <button className="close" onClick={close}>
                                                X
                                            </button>
                                        </div>
                                    )}
                                </Popup>
                                <div className="addToListContainer">
                                    <button>Add to List</button>
                                    <form>
                                        <select
                                            name="selectAList"
                                            className="selectAList"
                                            defaultValue="selectAList"
                                        >
                                        </select>
                                    </form>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default TVResults;

