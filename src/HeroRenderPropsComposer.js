import React from "react";
import Composer from "react-composer";

import { fetchHero } from "./api";

class SubscribeHeroData extends React.Component {
  render() {
    return this.props.children();
  }
}

class DetectScroller extends React.Component {
  render() {
    return this.props.children();
  }
}

class AnimatedLoading extends React.Component {
  render() {
    return this.props.children();
  }
}

class Auth extends React.Component {
  render() {
    return this.props.children();
  }
}

class Tracking extends React.Component {
  render() {
    return this.props.children();
  }
}

class ThanosIsDead extends React.Component {
  render() {
    return this.props.children();
  }
}

class HeroData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hero: null,
      loading: false
    };
  }

  componentDidMount() {
    this.fetch();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.fetch();
    }
  }

  fetch = async () => {
    this.setState({ loading: true });
    const hero = await fetchHero(this.props.id);
    this.setState({ hero, loading: false });
  };

  render() {
    return this.props.children({
      hero: this.state.hero,
      loading: this.state.loading
    });
  }
}

class ScreenWidth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleScreenResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleScreenResize);
  }

  handleScreenResize = () => {
    this.setState({ width: window.innerWidth });
  };

  render() {
    return this.props.children({
      width: this.state.width
    });
  }
}

class ValueHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.initialValue
    };
  }

  render() {
    return this.props.children({
      value: this.state.value,
      setValue: value => this.setState({ value })
    });
  }
}

const Hero = props => {
  const { hero, loading, width, id, setID } = props;
  return (
    <div>
      <section>
        <span>ID: </span>
        <input value={id} onChange={e => setID(e.target.value)} />
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
};

export default props => (
  <Composer
    components={[
      <ValueHandler initialValue={0} />,
      ({ results: [valueHandler], render }) => (
        <HeroData id={valueHandler.value} children={render} />
      ),
      <ScreenWidth />,
      <SubscribeHeroData />,
      <DetectScroller />,
      <AnimatedLoading />,
      <Auth />,
      <Tracking />,
      <ThanosIsDead />
    ]}
  >
    {([valueHandler, heroData, screenWidth, ...args]) => (
      <Hero
        id={valueHandler.value}
        setID={valueHandler.setValue}
        hero={heroData.hero}
        loading={heroData.loading}
        width={screenWidth.width}
      />
    )}
  </Composer>
);
