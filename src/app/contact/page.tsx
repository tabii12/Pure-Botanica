import styles from './contact.module.css';
export default function Home(){
    return (
        <div className={styles.page}>
        <main className={styles.main}>
            <h1>Contact</h1>
            <p>This is the contact page.</p>
        </main>
        </div>
    );
}