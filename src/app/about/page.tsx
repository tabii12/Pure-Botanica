import styles from './about.module.css';
export default function Home(){
    return (
        <div className={styles.page}>
        <main className={styles.main}>
            <h1>About</h1>
            <p>This is the about page.</p>
        </main>
        </div>
    );
}