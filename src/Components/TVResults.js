import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';

const TVResults = ({ tvRes, showSearch }) => {
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
                                            <form>
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
                                        <option value="oranges">Oranges</option>
                                        <option value="apples">Apples</option>
                                        <option value="bananas">Bananas</option>
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

