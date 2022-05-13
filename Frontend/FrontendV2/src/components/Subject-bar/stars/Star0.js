import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Star0 = ({ onStarClick, submitted }) => {
  return (
    <>
      {submitted ? (
        <div>
          <AiOutlineStar size={25} />
          <AiOutlineStar size={25} />
          <AiOutlineStar size={25} />
        </div>
      ) : (
        <div>
          <AiOutlineStar
            size={25}
            onClick={() => onStarClick(1)}
            style={{ cursor: "pointer" }}
          />
          <AiOutlineStar
            size={25}
            onClick={() => onStarClick(2)}
            style={{ cursor: "pointer" }}
          />
          <AiOutlineStar
            size={25}
            onClick={() => onStarClick(3)}
            style={{ cursor: "pointer" }}
          />
        </div>
      )}
    </>
  );
};

export default Star0;
