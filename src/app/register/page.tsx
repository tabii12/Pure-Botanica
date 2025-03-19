import styles from './register.module.css';
export default function Home(){
    return (
        <div className={styles.page}>
        <main className={styles.main}>
            <h1>Register</h1>
            <p>This is the register page.</p>
        </main>
        </div>
    );
}