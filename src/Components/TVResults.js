import Popup from 'reactjs-popup';
// Config
import { onValue, ref, push } from 'firebase/database';
import database from '../firebase';
import { useEffect } from 'react';
// import 'reactjs-popup/dist/index.css';

const TVResults = ({ tvRes, showSearch }) => {
  const handleListName = (e) => {
    e.preventDefault();
    const listName = e.target[0].value;
    //firebase
    push(ref(database), { listName });
    alert(`New list created: ${listName}`);
  };

  const loadLists = (response) => {
    const theSelect = document.querySelectorAll('.selectAList');
    const arrayOfSelects = Array.prototype.slice.call(theSelect);
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

  useEffect(() => {
    onValue(ref(database), (response) => {
      loadLists(response);
    });
  }, [tvRes]);

  const handleAddToList = (e) => {
    e.preventDefault();
    // query the selected option  
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
    // workableArray.push(tvRes[formId].show.genres);
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

                        {/* We will exclude genres for now. Stretch goal.
                         <p>
                          Genre(s):
                          {i.show.genres.map((g) => (
                            <span key={`${i.show.id}` + `${g}`}>{g} </span>
                          ))}
                        </p> */}
                        <p className="summary">
                          {i.show.summary === null
                            ? 'N/A'
                            : i.show.summary.replace(/<(.|\n)*?>/g, '')}
                        </p>
                      </div>
                      <button className="close" onClick={close}>
                        X
                      </button>
                    </div>
                  )}
                </Popup>
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
