const index = ({ board, clickHandler }) => {
  return (
    <div className="inline-block border border-black">
      {board.map((row, rowIndex) => (
        <div className="flex" key={rowIndex}>
          {row.map((cell, colIndex) => (
            <div
              className="w-14 h-14 flex justify-center items-center border border-black text-xl cursor-pointer"
              key={colIndex}
              onClick={() => clickHandler(rowIndex, colIndex)}
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default index;
