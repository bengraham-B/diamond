import { options } from "@/app/api/auth/[...nextauth]/options.js";
import styles from "./header.module.scss"
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Header() {
    const session = await getServerSession(options) // Should have a session... if we actually have a session
    console.log({session})
    return (
        <main className={styles.header}>
            <span>
                <h1>Diamond</h1>
            </span>
            <span className={styles.left}>
                <h3>Account</h3>
                <h3>{session?.diamond?.diamondUserEmail ?? "No Account"}</h3>
                {session ? <Link href="/api/auth/signout?callbackUrl=/">Logout</Link> : <Link href="/api/auth/signin">Login</Link>}
            </span>
        </main>
    );
}
