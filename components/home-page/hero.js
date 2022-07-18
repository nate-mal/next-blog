import classes from "./hero.module.css";
import Image from "next/image";
function Hero() {
  return (
    <section className={classes.hero}>
      <dvi>
        <Image
          className={classes.image}
          src="/images/site/nati.png"
          alt="An image showing Nati"
          width={300}
          height={300}
        />
      </dvi>
      <h1>Hi, I'm Nati</h1>
      <p>
        I blog about web development -- especially frontend framworks like
        Angular or React.
      </p>
    </section>
  );
}

export default Hero;
