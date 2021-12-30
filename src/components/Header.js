import TodayValue from "./TodayValue";

function Header() {
  return (
    <div className="header">
      <h2 className="header-text">Scrooge's Bitcoin</h2>
      <TodayValue />
    </div>
  );
}

export default Header