import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Star2 = ({ onStarClick, submitted }) => {
  return (
    <>
      {submitted ? (
        <div className="star-div">
          <AiFillStar size={25} color="gold" />
          <AiFillStar size={25} color="gold" />
          <AiOutlineStar size={25} />
        </div>
      ) : (
        <div className="star-div">
          <AiFillStar
            size={25}
            onClick={() => onStarClick(1)}
            color="gold"
            style={{ cursor: "pointer" }}
          />
          <AiFillStar
            size={25}
            onClick={() => onStarClick(2)}
            color="gold"
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

export default Star2;
