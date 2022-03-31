const TopRow = () => {
  return (
    <div className="container mt-5 lead">
      <div className="row row-cols-1 row-cols-md-5 g-5 p-3">
        <div className="col-sm">Namn</div>
        <div className="col-sm">Senaste pris</div>
        <div className="col-sm">Börsvärde</div>
        <div className="col-sm">24 tim. ändring</div>
        <div className="col-sm"></div>
      </div>
    </div>
  );
};
export default TopRow;