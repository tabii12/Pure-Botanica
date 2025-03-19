'use client'

import { useState } from 'react';
import styles from './state.module.css';

export default function Home(){
    const [count, setCount] = useState(0);
    const dec = () => setCount(count - 1);
    return (
        <div className={styles.page}>
            <h1>State</h1>
            <p>count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <button onClick={dec}>Decrement</button>
        </div>
    );
}