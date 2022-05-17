import Popup from 'reactjs-popup';
// Config
// import database from '../firebase';
// Modules
// import { ref, push, set, update, remove } from 'firebase/database';
// import { useEffect, useState } from 'react';

const ListDisplay = ({ Array, ListKey }) => {
  //const [ updatedArray, setUpdatedArray ] = useState([]);
  // retrieve the score from the API and push it to firebase
  // convert score (decimal) to whole number
  // upvotes/downvotes on click, run a function to update this new score
  //  create logic /function to arrange show by score and not order it was added in
  // refresh button functionality to rerender page with shows in order of updated show
  const arrayToChangeOrder = [...Array];

  //how we pushed listName in before
  // const handleListName = (e) => {
  //   e.preventDefault();
  //   const listName = e.target[0].value;
  //   //firebase
  //   push(ref(database), { listName });
  //   alert(`New list created: ${listName}`);
  // };

  //arrayToChangeOrder // take the value -1 from select for new array index
  //splice information to that place
  // push/set/update arrayToChangeOrder to firebase

  // pass in the show information as value to splice in (with index)
  //use rankChoice for the position to splice in

  //store info at index where event occurred (rankFormId)
  //splice(old index, 1); remove the show info from the old spot (the current index)
  //splice(rankChoice, 0 to delete nothing at that point, new info inserted)

  // array = [A, e, b, c, d, f]

  const rankChangeHandler = (e) => {
    const rank = e.target.value; // 1-10
    const rankChoice = rank - 1; //which index to place it at 0-9
    const rankFormId = parseInt(e.target.id); //where we are in the array/list
    const showInfoSaved = arrayToChangeOrder[rankFormId]; //saving the show info to move
    //const changingTheOrder = [...updatingChangeOrder];
    //changingTheOrder.splice(rankFormId, 1); //delete in old spot
    //changingTheOrder.splice(rankChoice, 0, showInfoSaved); //replace in new spot
    //setUpdatingChangeOrder(arrayToChangeOrder);
    arrayToChangeOrder.splice(rankFormId, 1); //delete in old spot
    arrayToChangeOrder.splice(rankChoice, 0, showInfoSaved); //replace in new spot
    //setUpdatedArray(arrayToChangeOrder); //set to state for updateListHandler function
    // updateListHandler();
    console.log(arrayToChangeOrder);
    // set(ref(database, `/${ListKey}`), arrayToChangeOrder)
  };
  // const keyRef = ref(database, `/${currentKey}`); TVResults.js

  // const testingLoop = (array) => {
  //   array.forEach((index) => {
  //     //0
  //     const newShowArray = index[1];
  //     console.log(newShowArray);
  //     const listInDb = ref(database, `/${ListKey}`);
      // push(listInDb, { newKey });
    // });
//  };

  // const showArray = Object.entries(customListResponse);
  // setListOfShows(showArray);

  // const handleListName = (e) => {
  //   e.preventDefault();
  //   // pull the value from input for list name
  //   const listName = e.target[0].value;
  //   // push into firebase and alert user
  //   push(ref(database), {listName});
  //   alert(`New list created: ${listName}`);
  // };

  // const updateListHandler = () => {
  //   // const testPushListKey = ref(database)
  //   // push(testPushListKey, updatedArray);
  //   // const currentListKey = ref(database, `/${ListKey}`);
  //   // remove(currentListKey);
  //   // console.log(updatedArray);
  //   // updatedArray.forEach((index) => {
  //   //   console.log(index, index[0], index[1]);
  //   // })
  // }

  return (
    <>
      <div className="newButtons">
        <button>Delete List</button>
        <button>Update List</button>
      </div>
      <div className="currentListContainer wrapper">
        {Array.map((i, index) => (
          <div className="showContainer" key={i[0]}>
            <div className="imgContainer">
              {i[1][2] === null ? (
                <img
                  src="./assets/no-img-portrait-text.png"
                  alt="Nothing to show"
                />
              ) : (
                <img src={i[1][2]} alt={`TV poster for ${i[1][0]}`} />
              )}
              <h2>{`Rank: #${index + 1}`}</h2>
              <h2>{i[1][0]}</h2>
              <p>
                Premiered: {i[1][3] === null ? 'N/A' : i[1][3]} - Ended:{' '}
                {i[1][4] === null ? 'N/A' : i[1][4]}
              </p>
            </div>

            <div className="currentListButtons">
              <Popup
                trigger={<button className="button">Show Info</button>}
                modal
                nested
              >
                {(close) => (
                  <div className="infoModal modal">
                    <div className="imgContainer">
                      {i[1][2] === null ? (
                        <img
                          src="./assets/no-img-portrait-text.png"
                          alt="Nothing to show"
                        />
                      ) : (
                        <img src={i[1][2]} alt={`TV poster for ${i[1][0]}`} />
                      )}
                    </div>

                    <div className="textContainer">
                      <p>Title: {i[1][0] === null ? 'N/A' : i[1][0]}</p>
                      <p>
                        Network:
                        {i[1][6] === null
                          ? 'N/A'
                          : i[1][6] === null
                          ? 'N/A'
                          : i[1][6]}
                      </p>
                      <p>
                        Country:
                        {i[1][7] === null
                          ? 'N/A'
                          : i[1][7] === null
                          ? 'N/A'
                          : i[1][7] === null
                          ? 'N/A'
                          : i[1][7]}
                      </p>

                      <p className="summary">
                        {
                          i[1][5] === null ? 'N/A' : i[1][5]
                        }
                      </p>
                    </div>
                    <button className="close" onClick={close}>
                      X
                    </button>
                  </div>
                )}
              </Popup>
              <form>
                <select
                  onChange={rankChangeHandler}
                  name="rankSelect"
                  className="rankSelect"
                  defaultValue={index + 1}
                  id={index} //0, 1, 2, 3, 4 for as many shows in list
                >
                  {Array.length < 2 ? null : <option value="1">1</option>}
                  {Array.length < 3 ? null : <option value="2">2</option>}
                  {Array.length < 4 ? null : <option value="3">3</option>}
                  {Array.length < 5 ? null : <option value="4">4</option>}
                  {Array.length < 6 ? null : <option value="5">5</option>}
                  {Array.length < 7 ? null : <option value="6">6</option>}
                  {Array.length < 8 ? null : <option value="7">7</option>}
                  {Array.length < 9 ? null : <option value="8">8</option>}
                  {Array.length < 10 ? null : <option value="9">9</option>}
                  {Array.length < 11 ? null : <option value="10">10</option>}
                </select>
              </form>
              <button>Remove from List</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ListDisplay;
