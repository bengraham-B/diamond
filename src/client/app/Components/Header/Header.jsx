import variables from "../../styles/variables.module.scss"
import styles from "./header.module.scss"

export default function Header() {
    return (
        <main className={styles.header}>
            <span>
                <h1>Diamond</h1>
            </span>
            <span className={styles.left}>
                <h3>Account</h3>
            </span>
        </main>
    );
}
