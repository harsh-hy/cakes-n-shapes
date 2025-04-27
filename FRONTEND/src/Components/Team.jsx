import { data } from "../restApi.json";

const Team = () => {
  return (
    <section className='team' id='team'>
      <div className="container">
        <div className="heading_section">
          <h1 className="heading">OUR TEAM</h1>
          <p>Meet the talented individuals who make up our dedicated team. Each member brings unique skills and experiences to ensure exceptional service and quality.</p>
        </div>
        <div className="team_container">
          {data[0].team.map((member) => (
            <div className="card" key={member.id}>
              <img src={member.image} alt={member.name} />
              <h3>{member.name}</h3>
              <p>{member.designation}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
