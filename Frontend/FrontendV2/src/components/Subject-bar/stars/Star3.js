import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Star3 = ({ onStarClick, submitted }) => {
  return (
    <>
      {submitted ? (
        <div className="star-div">
          <AiFillStar size={25} color="gold" />
          <AiFillStar size={25} color="gold" />
          <AiFillStar size={25} color="gold" />
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
            onClick={() => onStarClick(1)}
            color="gold"
            style={{ cursor: "pointer" }}
          />
          <AiFillStar
            size={25}
            onClick={() => onStarClick(1)}
            color="gold"
            style={{ cursor: "pointer" }}
          />
        </div>
      )}
    </>
  );
};

export default Star3;
