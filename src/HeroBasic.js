import React from "react";

import { fetchHero } from "./api";

class Hero extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      hero: null,
      loading: false,
      width: window.innerWidth
    };
  }

  componentDidMount() {
    this.fetch(this.state.id);
    window.addEventListener("resize", this.handleScreenResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleScreenResize);
  }

  fetch = async id => {
    this.setState({ loading: true });
    const hero = await fetchHero(id);
    this.setState({ hero, loading: false });
  };

  handleScreenResize = () => {
    this.setState({ width: window.innerWidth });
  };

  handleIDChange = value => {
    this.setState(
      {
        id: value
      },
      () => this.fetch(value)
    );
  };

  render() {
    const { id, hero, loading, width } = this.state;
    return (
      <div>
        <section>
          <span>ID: </span>
          <input
            value={id}
            onChange={e => this.handleIDChange(e.target.value)}
          />
        </section>
        {loading ? (
          <section>
            <div>loading...</div>
          </section>
        ) : hero ? (
          <section style={{ margin: "30px 0" }}>
            <img src={hero.source.uri} height="350" alt="alt" />
            <h2>{`screen width size is: ${width}`}</h2>
          </section>
        ) : (
          <div>No Hero :(</div>
        )}
      </div>
    );
  }
}

export default Hero;
