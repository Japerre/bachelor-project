import Subjects from "../components/Subjects"

const Home = ({ subjects }) => {
  return (
    <div>
      <Subjects subjects={subjects} />
    </div>
  )
}

export default Home