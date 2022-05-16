import Popup from 'reactjs-popup';
// Config
import database from '../firebase';
// Modules 
import { onValue, ref, push } from 'firebase/database';
import { useEffect } from 'react';

// passing in the API response and search query to render 
const TVResults = ({ tvRes, showSearch }) => {
  // Naming a new list
  const handleListName = (e) => {
    e.preventDefault();
    // pull the value from input for list name
    const listName = e.target[0].value;
    // push into firebase and alert user
    push(ref(database), { listName });
    alert(`New list created: ${listName}`);
  };

  // Pulling all list names from firebase for 'add to list' select
  const loadLists = (response) => {
    // grab all 'add to list' selects and change from nodelist to array
    const theSelect = document.querySelectorAll('.selectAList');
    const arrayOfSelects = Array.prototype.slice.call(theSelect);
    // map through all selects to append list names
    arrayOfSelects.map((select) => {
      select.innerText = '';
      const disabledOption = document.createElement('option');
      disabledOption.setAttribute('value', 'Select A List...');
      disabledOption.setAttribute('disabled', '');
      disabledOption.setAttribute('selected', 'selected');
      disabledOption.innerText = 'Select A List...';
      select.appendChild(disabledOption);
      const data = response.val();
      for (let key in data) {
        const displayedList = data[key].listName;
        const theOption = document.createElement('option');
        theOption.setAttribute('value', displayedList);
        theOption.setAttribute('key', key);
        theOption.innerText = displayedList;
        select.appendChild(theOption);
      }
    });
  };

  // When a tv response comes through, load the lists created
  useEffect(() => {
    onValue(ref(database), (response) => {
      loadLists(response);
    });
  }, [tvRes]);

  // Handle adding shows to a list
  const handleAddToList = (e) => {
    e.preventDefault();
    // query the selected list (option)  
    const currentKey =
      e.target.lastElementChild.selectedOptions[0].attributes.key.value;
    // the event, the form, the select, current option, attributes, key, the value of the key
    const formId = parseInt(e.target.id);
    // pull the key and use it to reference the dbRef
    const keyRef = ref(database, `/${currentKey}`);
    const workableArray = [];
    // push the show info
    workableArray.push(tvRes[formId].show.name);
    workableArray.push(tvRes[formId].show.id);
    workableArray.push(tvRes[formId].show.image.original);
    workableArray.push(tvRes[formId].show.premiered);
    workableArray.push(tvRes[formId].show.ended);
    workableArray.push(tvRes[formId].show.summary);
    workableArray.push(tvRes[formId].show.network.name);
    workableArray.push(tvRes[formId].show.network.country.code);
    // push the info to firebase
    push(keyRef, workableArray);
  };


  return (
    <>
      {tvRes.length === 0 ? (
        <p className="resultsTitle">Sorry nothing to be seen</p>
      ) : (
        <div>
          <p className="resultsTitle">Results for {showSearch}</p>
          {tvRes.map((i, index) => (
            <div className="tvContainer wrapper" key={i.show.id}>
              <div className="imgContainer">
                {i.show.image === null ? (
                  <img
                    src="./assets/no-img-portrait-text.png"
                    alt="nothing was found"
                  />
                ) : (
                  <img
                    src={i.show.image.original}
                    alt={`TV poster for ${i.show.name}`}
                  />
                )}
              </div>
              <div className="flexContainer">
                <h2>{i.show.name}</h2>
                <p>
                  Premiered:{' '}
                  {i.show.premiered === null ? 'N/A' : i.show.premiered} -
                  Ended: {i.show.ended === null ? 'N/A' : i.show.ended}
                </p>
                <Popup
                  trigger={<button className="button">Show Info</button>}
                  modal
                  nested
                >
                  {(close) => (
                    <div className="infoModal modal">

                        <button className="close" onClick={close}>
                        X
                        </button>
                      <div className="imgContainer">
                        {i.show.image === null ? (
                          <img
                            src="./assets/no-img-portrait-text.png"
                            alt="stuff"
                          />
                        ) : (
                          <img
                            src={i.show.image.original}
                            alt={`TV poster for ${i.show.name}`}
                          />
                        )}
                      </div>

                      <div className="textContainer">
                        <p>
                          Title: {i.show.name === null ? 'N/A' : i.show.name}
                        </p>
                        <p>
                          Network:{' '}
                          {i.show.network === null
                            ? 'N/A'
                            : i.show.network.name === null
                            ? 'N/A'
                            : i.show.network.name}
                        </p>
                        <p>
                          Country:{' '}
                          {i.show.network === null
                            ? 'N/A'
                            : i.show.network.country === null
                            ? 'N/A'
                            : i.show.network.country.code === null
                            ? 'N/A'
                            : i.show.network.country.code}
                        </p>

                        <p className="summary">
                          {i.show.summary === null
                            ? 'N/A'
                            : i.show.summary.replace(/<(.|\n)*?>/g, '')}
                        </p>
                      </div>
                    </div>
                  )}
                </Popup>
                <Popup
                  trigger={<button className="button">Create New List</button>}
                  modal
                  nested
                >
                  {(close) => (
                    <div className="newListModal modal">
                      <button className="close" onClick={close}>
                        X
                      </button>
                      <form className="newListForm" onSubmit={handleListName}>
                        <input
                          type="text"
                          placeholder="Name Your List"
                          maxLength="40"
                          className='newListQuery'
                        />
                        <button className="submitList">Submit</button>
                      </form>
                    </div>
                  )}
                </Popup>
                <div className="addToListContainer">
                  <form onSubmit={handleAddToList} id={index}>
                    <button>Add to List</button>
                    <select
                      name="selectAList"
                      className="selectAList"
                      defaultValue="selectAList"
                    ></select>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default TVResults;
