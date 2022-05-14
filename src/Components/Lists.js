import Popup from 'reactjs-popup';
import database from '../firebase';
import { useEffect, useState } from 'react';
import { ref, onValue, push} from 'firebase/database';
import ListDisplay from './ListDisplay';

const Lists = () => {
  // reach into firebase
  // pull names of all lists
  // options to
  //create new list
  // delete a list
  // refresh list - showing updated vote counts
  //when list is selected
  //current list name displays
  // each show displays
  // poster
  //title
  //rank
  //show info
  //remove from list option
  //upvote
  //downvote
  const [listIdentifier, setListIdentifier] = useState('');
  const [listOfShows, setListOfShows] = useState([]);

  const chooseListHandler = (e) => {
    //take current key value of select
    setListIdentifier(e.target.selectedOptions[0].attributes.key.value);
  };

  const handleListName = (e) => {
    e.preventDefault();
    const listName = e.target[0].value;
    //firebase
    push(ref(database), {listName});
    alert(`New list created: ${listName}`);
  };

  const loadCustomLists = (response) => {
    const theSelect = document.querySelector('.selectAList');
    theSelect.innerText = '';
    const disabledOption = document.createElement('option');
    disabledOption.setAttribute('value', 'Select A List...');
    disabledOption.setAttribute('disabled', '');
    disabledOption.setAttribute('selected', 'selected');
    disabledOption.innerText = 'Select A List...';
    theSelect.appendChild(disabledOption);
    const data = response.val();
    for (let key in data) {
      const displayedList = data[key].listName;
      const theOption = document.createElement('option');
      theOption.setAttribute('value', displayedList);
      theOption.setAttribute('key', key);
      theOption.innerText = displayedList;
      theSelect.appendChild(theOption);
    }
  }; 
    useEffect(() => {
    const listInFirebase = ref(database, `/${listIdentifier}`)
    onValue(listInFirebase, (response) => {
      const customListResponse = response.val();
      const showArray = Object.entries(customListResponse);
      setListOfShows(showArray);
    });
  }, [listIdentifier]);

  useEffect(() => {
    onValue(ref(database), (response) => {
      loadCustomLists(response);
    });
  }, []);

  return (
    <>
      <h1>Superla-TV</h1>
      <div className="buttonsContainer">
        <div className="chooseListContainer">
          <form>
            <select
              onChange={chooseListHandler}
              name="selectAList"
              className="selectAList"
              defaultValue="selectAList"
            ></select>
          </form>
        </div>
        <Popup
          trigger={<button className="button">Create New List</button>}
          modal
          nested
        >
          {(close) => (
            <div className="modal">
              <form onSubmit={handleListName}>
                <input
                  type="text"
                  placeholder="Name Your List"
                  maxLength="40"
                />
                <button className="submitList">Submit</button>
              </form>
              <button className="close" onClick={close}>
                X
              </button>
            </div>
          )}
        </Popup>
        <button>Delete List</button>
        <button>Refresh List</button>
      </div>

      {/* ternary to be added */}
      <ListDisplay Array={listOfShows} />
    </>
  );
};

export default Lists;
