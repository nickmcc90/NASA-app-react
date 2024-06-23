import '../styles/footer.css'

export default function Footer(props) {

  const { handleToggleModal, data } = props;

  return (
    <div className="footer-container">
      <div className="background-gradient"></div>
      <div>
        <h1>APOD PROJECT</h1>
        <h2>{data?.title}</h2>
      </div>
      <button className="info-button" onClick={handleToggleModal}>
        <i className="fa-solid fa-circle-info"></i>
      </button>
    </div>
  )
}