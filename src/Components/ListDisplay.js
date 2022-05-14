import Popup from 'reactjs-popup';
import { orderByValue } from 'firebase/database';

const ListDisplay = ({ Array }) => {
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
    console.log('index selection', rankChoice);
    const rankFormId = parseInt(e.target.id); //where we are in the array/list
    console.log('current index position', rankFormId);
    const showInfoSaved = arrayToChangeOrder[rankFormId];
    arrayToChangeOrder.splice(rankFormId, 1);
    arrayToChangeOrder.splice(rankChoice, 0, showInfoSaved);
    console.log(arrayToChangeOrder);

  }

  return (
    <>
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
                          // .replace(/<(.|\n)*?>/g, '')
                        }
                      </p>
                    </div>
                    <button className="close" onClick={close}>
                      X
                    </button>
                  </div>
                )}
              </Popup>
            <form >
              <select
              onChange={rankChangeHandler}
                name="rankSelect"
                className="rankSelect"
                defaultValue="rankSelect"
                id={index} //0, 1, 2, 3, 4 for as many shows in list
              >
                {Array.length < 2 ? null : <option value='1'>1</option> }                 
                {Array.length < 3 ? null : <option value='2'>2</option> }
                {Array.length < 4 ? null : <option value='3'>3</option> }
                {Array.length < 5 ? null : <option value='4'>4</option> }
                {Array.length < 6 ? null : <option value='5'>5</option> }
                {Array.length < 7 ? null : <option value='6'>6</option> }
                {Array.length < 8 ? null : <option value='7'>7</option> }
                {Array.length < 9 ? null : <option value='8'>8</option> }
                {Array.length < 10 ? null : <option value='9'>9</option> }
                {Array.length < 11 ? null : <option value='10'>10</option> }
                {/* <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option> */}
                {/* <option value='5'>5</option>
                <option value='6'>6</option>
                <option value='7'>7</option>
                <option value='8'>8</option>
                <option value='9'>9</option>
                <option value='10'>10</option> */}
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
