import '../styles/footer.css'

export default function Footer(props) {

  const { handleToggleModal, data } = props;

  return (
    <div className="footer-container">
      <div className="background-gradient"></div>
      <div>
        <h2>The Brutal Martian Landscape</h2>
        <h1>APOD PROJECT</h1>
      </div>
      <button className="info-button" onClick={handleToggleModal}>
        <i className="fa-solid fa-circle-info"></i>
      </button>
    </div>
  )
}