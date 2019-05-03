import React from "react";
import { withState, compose } from "recompose";

import { fetchHero } from "./api";

const withSubscribeHeroData = Comp => {
  return class SubscribeHeroData extends React.Component {
    render() {
      return <Comp {...this.props} />;
    }
  };
};

const withDetectScroller = Comp => {
  return class DetectScroller extends React.Component {
    render() {
      return <Comp {...this.props} />;
    }
  };
};

const withAnimatedLoading = Comp => {
  return class AnimatedLoading extends React.Component {
    render() {
      return <Comp {...this.props} />;
    }
  };
};

const withAuth = Comp => {
  return class Auth extends React.Component {
    render() {
      return <Comp {...this.props} />;
    }
  };
};

const withTracking = Comp => {
  return class Tracking extends React.Component {
    render() {
      return <Comp {...this.props} />;
    }
  };
};

const withIronManIsDead = Comp => {
  return class IronManIsDead extends React.Component {
    render() {
      return <Comp {...this.props} />;
    }
  };
};

const withYouForever = Comp => {
  return class YouForever extends React.Component {
    render() {
      return <Comp {...this.props} />;
    }
  };
};

const withHeroData = Comp => {
  return class HeroData extends React.Component {
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
      return (
        <Comp
          {...this.props}
          hero={this.state.hero}
          loading={this.state.loading}
        />
      );
    }
  };
};

const withScreenWidth = Comp => {
  return class ScreenWidth extends React.Component {
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
      return <Comp {...this.props} width={this.state.width} />;
    }
  };
};

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

export default compose(
  withState("id", "setID", 0),
  withScreenWidth,
  withSubscribeHeroData,
  withHeroData,
  withDetectScroller,
  withAnimatedLoading,
  withAuth,
  withTracking,
  withIronManIsDead,
  withYouForever
)(Hero);
