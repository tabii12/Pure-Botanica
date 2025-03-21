'use client'

import { useState } from 'react';
import styles from './state.module.css';
import { FaHeart } from 'react-icons/fa';

export default function Home(){
    const [count, setCount] = useState(0);
    const [liked, setLiked] = useState(false);

    const dec = () => setCount(count - 1);
    const toggleLike = () => setLiked(!liked);

    return (
        <div className={styles.page}>
            <h1>State</h1>
            <p>count: {count}</p>
            <button  onClick={() => setCount(count + 1)}>Increment</button>
            <button  onClick={dec}>Decrement</button>
            <button style={{ color: liked ? 'red' : 'gray' }} onClick={toggleLike}>
                <FaHeart />
            </button>

        </div>
    );
}
