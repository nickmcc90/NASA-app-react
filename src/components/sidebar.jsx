import '../styles/sidebar.css'

export default function Sidebar(props) {

  const { handleToggleModal } = props;

  return (
    <div className="sidebar">
      <div onClick={handleToggleModal} className="sidebar-overlay"></div>
      <div className="sidebar-contents">
        <h2>The Brutal Martian Landscape</h2>
        <div>
          <p>Description</p>
          <p>Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text </p>
        </div>
        <button onClick={handleToggleModal}>
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  )
}