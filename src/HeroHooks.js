import React, { useState, useEffect } from "react";

import { fetchHero } from "./api";

const useHeroData = id => {
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    if (typeof id === "undefined" || id === "") return;
    setLoading(true);
    const response = await fetchHero(id);
    setHero(response);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, [id]);
  return { hero, loading };
};

const useScreenWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const handleScreenResize = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleScreenResize);
    return () => {
      window.removeEventListener("resize", handleScreenResize);
    };
  });

  return width;
};

const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);
  const handleValueChange = value => {
    setValue(value);
  };
  return {
    id: value,
    setID: handleValueChange
  };
};

const Hero = () => {
  const { id, setID } = useInput(0);
  const { hero, loading } = useHeroData(id);
  const width = useScreenWidth();

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

export default Hero;
