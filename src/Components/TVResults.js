import Popup from 'reactjs-popup';
// Config
import { onValue, push, remove, update, set } from 'firebase/database';
import dbRef from '../firebase';
import { useEffect } from 'react';

// import 'reactjs-popup/dist/index.css';

const TVResults = ({ tvRes, showSearch }) => {
    const handleListName = (e) => {
        e.preventDefault();
        const listName = e.target[0].value;
        //firebase
        push(dbRef, {listName});
        alert(`New list created: ${listName}`);
    }

    useEffect(() => {
        onValue(dbRef, (response) => {
            const data = response.val();

            for (let key in data) {
            const displayedList = data[key].listName;
            const theSelect = document.querySelector('#selectAList');
            const theOption = document.createElement('option');
            theOption.setAttribute('value', displayedList);
            theOption.innerText = displayedList;
            theSelect.appendChild(theOption);
            }

          // response.map((id) => {
          //     const displayedList = id.listName.value
          //     const theSelect = document.querySelector('#selectAList');
          //     const theOption = document.createElement('option');
          //     theOption.setAttribute('value', displayedList);
          //     theOption.innerText = displayedList;
          //     theSelect.appendChild(theOption);
          // })
          // const values = response.val();

          // if (values?.data) {
          // 	setShows(values.data);
          // }
        });
    }, []);

    // onValue(dbRef, (response) => {
    //     // variable to store converted state value
    //     const newStateArray = [];
    //     const data = response.val();
  
    //     for(let key in data) {
    //       newStateArray.push({key: key, name: data[key]});
    //     }
  
    //     // setting the state
    //     setBananas(newStateArray)
    //   })
    // }, []) //only when rendered to the page

    	// const addShow = (Show) => {
		// const newData = [...Shows, Show];
		// setShows(newData);
		// update(dbRef, { data: newData });
	// };


 
    
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
                                <button>Show Info</button>
                                <button>Add to List</button>
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
                                                <input type="text" placeholder="Name Your List" />
                                                <button className="submitList">Submit</button>
                                            </form>
                                            <button className="close" onClick={close}>
                                                X
                                            </button>
                                        </div>
                                    )}
                                </Popup>
                                <form>
                                    <select
                                        name="selectAList"
                                        id="selectAList"
                                        defaultValue="selectAList"
                                    >
                                        <option value="selectAList" disabled>
                                            Select A List...
                                        </option>
                                        {/* <option value="oranges">Oranges</option>
                                        <option value="apples">Apples</option>
                                        <option value="bananas">Bananas</option> */}
                                        {/* create new options with firebase */}
                                    </select>
                                </form>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default TVResults;

