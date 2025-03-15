import React from "react";
import styles from "./Swap.module.css";

const Swap = () => {
  return (
    <section className={styles.swap}>
      <div className={styles.content}>
        <h1 className={styles.title}>UK Risk Summary</h1>
        <p className={styles.subtitle}><i>Estimated reading time: 2 min</i></p>
        <p className={styles.paragraph}>
          Due to the potential for losses, the Financial Conduct Authority (FCA) considers this investment to be high risk.
        </p>

        <h2 className={styles.title}>What are the key risks?</h2>
        <p className={styles.paragraph}>
          <strong>1. You could lose all the money you invest</strong> <br />
          • The performance of most cryptoassets can be highly volatile, with their value dropping as quickly as it can rise. You should be prepared to lose all the money you invest in cryptoassets. <br />
          • The cryptoasset market is largely unregulated. There is a risk of losing money or any cryptoassets you purchase due to risks such as cyber-attacks, financial crime, and firm failure.
        </p>

        <p className={styles.paragraph}>
          <strong>2. You should not expect to be protected if something goes wrong</strong> <br />
          The Financial Services Compensation Scheme (FSCS) doesn’t protect this type of investment because it’s not a ‘specified investment’ under the UK regulatory regime. Learn more by using the FSCS investment protection checker. <br />
          The Financial Ombudsman Service (FOS) will not be able to consider complaints related to this firm. Learn more about FOS protection.
        </p>

        <p className={styles.paragraph}>
          <strong>3. You may not be able to sell your investment when you want to</strong> <br />
          There is no guarantee that investments in cryptoassets can be easily sold at any given time. The ability to sell a cryptoasset depends on various factors, including the supply and demand in the market at that time.
        </p>

        <p className={styles.paragraph}>
          <strong>4. Cryptoasset investments can be complex</strong> <br />
          Investments in cryptoassets can be complex, making it difficult to understand the risks associated with the investment. <br />
          You should do your own research before investing. If something sounds too good to be true, it probably is.
        </p>

        <p className={styles.paragraph}>
          <strong>5. Don’t put all your eggs in one basket</strong> <br />
          Putting all your money into a single type of investment is risky. Spreading your money across different investments makes you less dependent on any one to do well. <br />
          A good rule of thumb is <a href="#" className={styles.link}>not to invest more than 10% of your money into high-risk investments</a>.
        </p>

        <p className={styles.paragraph}>
          If you are interested in learning more about how to protect yourself, visit the FCA’s website <a href="https://www.fca.org.uk/investsmart" className={styles.link}>here</a>. <br />
          For further information about cryptoassets, visit the FCA’s website <a href="https://www.fca.org.uk/investsmart" className={styles.link}>here</a>.
        </p>
      </div>
    </section>
  );
};

export default Swap;
