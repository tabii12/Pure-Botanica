import styles from './login.module.css';
export default function Home(){
    return (
        <div className={styles.page}>
        <main className={styles.main}>
            <h1>Login</h1>
            <p>This is the login page.</p>
        </main>
        </div>
    );
}