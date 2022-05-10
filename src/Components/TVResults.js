const TVResults = ({tvRes, showSearch}) => {
    console.log('TVResults tvRes', tvRes);
    return (
      <>
      {
        tvRes.length === 0 ?
        <p className="resultsTitle">Sorry nothing to be seen</p>
        :
        <div>
            <p className="resultsTitle">Results for {showSearch}</p>
            {tvRes.map((i) => ((
            <div key={i.show.id}>
                <div className="tvContainer">
                    <div className="imgContainer">
                        { 
                        i.show.image === null ?
                        <img src="./assets/no-img-portrait-text.png" />
                        :
                        <img src={i.show.image.original} alt={`TV poster for ${i.show.name}`} />
                        }
                    </div>
                    <h6>{i.show.name}</h6>
                    <button>Show Info</button>
                    <button>Add to List</button>
                    <button>Create New List</button>
                    <form>
                        <select name="selectAList" id="selectAList" defaultValue='selectAList'>
                            <option value="selectAList" disabled>Select A List...</option>
                            <option value="oranges">Oranges</option>
                            <option value="apples">Apples</option>
                            <option value="bananas">Bananas</option>

                            
                            {/* create new options with firebase */}
                        </select>
                    </form>
                </div>

            </div>
            )))}
        </div>
      }
    </>
    )
}

export default TVResults; 

