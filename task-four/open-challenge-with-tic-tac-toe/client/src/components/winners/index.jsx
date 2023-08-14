const index = ({ allWinners }) => {
  return (
    <div className="mt-10">
      <p className="text-xl">All Winners</p>
      <div className="space-y-2 mt-2">
        {allWinners.map((winner) => (
          <div key={winner._id} className="border">
            <p>{winner.winnerName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default index;
