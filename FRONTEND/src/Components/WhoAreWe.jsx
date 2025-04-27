import { data } from "../restApi.json";

const WhoAreWe = () => {
  return (
    <section className="who_are_we" id="who_are_we">
      <div className="container">
        {/* First Text Banner Section */}
        <div className="text_banner">
          {data[0].who_we_are.slice(0, 2).map((element) => (
            <div className="card" key={element.id}>
              <h1 className="heading">{element.number}</h1>
              <p>{element.title}</p>
            </div>
          ))}
        </div>

        {/* Image Banner Section */}
        <div className="image_banner">
          <img src="/center.svg" alt="center" className="gradient_bg" />
          <img src="/whoweare.png" alt="who we are" className="who_we_image" />
        </div>

        {/* Second Text Banner Section */}
        <div className="text_banner">
          {data[0].who_we_are.slice(2).map((element) => (
            <div className="card" key={element.id}>
              <h1 className="heading">{element.number}</h1>
              <p>{element.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoAreWe;
