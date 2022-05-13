import Popup from 'reactjs-popup';

const ListDisplay = ({ Array }) => {
  return (
    <>
      <div className="currentListContainer wrapper">
        {Array.map((i) => (
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
              <button>Upvote</button>
              <button>DownVote</button>
              <button>Remove from List</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ListDisplay;
