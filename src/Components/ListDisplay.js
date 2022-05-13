const displayCustomList = (array) => {
  {array.map((i) => {
      <div className="currentListContainer">
  <div className="imgContainer">
    {i.show.image === null ? (
      <img
        src="./assets/no-img-portrait-text.png"
        alt="There is no image for this show"
      />
    ) : (
      <img
        src={i.show.image.original}
        alt={`TV poster for ${i.show.name}`}
      />
    )}
    <h5>TITLE OF SHOW HERE</h5>
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
            <p>Title: {i.show.name === null ? "N/A" : i.show.name}</p>
            <p>
              Network:{" "}
              {i.show.network === null
                ? "N/A"
                : i.show.network.name === null
                ? "N/A"
                : i.show.network.name}
            </p>
            <p>
              Country:{" "}
              {i.show.network === null
                ? "N/A"
                : i.show.network.country === null
                ? "N/A"
                : i.show.network.country.code === null
                ? "N/A"
                : i.show.network.country.code}
            </p>

            <p>
              Genre(s):
              {i.show.genres.map((g) => (
                <span key={`${i.show.id}` + `${g}`}>{g} </span>
              ))}
            </p>
            <p className="summary">
              {i.show.summary === null
                ? "N/A"
                : i.show.summary.replace(/<(.|\n)*?>/g, "")}
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
  })}
}