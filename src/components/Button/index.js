// @flow
import React from "react";
import styles from "./styles.module.scss";

type Props = {
    children: *,
};

const Button = ({ children }: Props) => {
    return <div className={styles.button}>{children}</div>;
};

export default Button;
