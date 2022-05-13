import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Star1 = ({ onStarClick, submitted }) => {
  return (
    <>
      {submitted ? (
        <div>
          <AiFillStar size={25} color="gold" />
          <AiOutlineStar size={25} />
          <AiOutlineStar size={25} />
        </div>
      ) : (
        <div>
          <AiFillStar
            size={25}
            onClick={() => onStarClick(1)}
            color="gold"
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

export default Star1;
