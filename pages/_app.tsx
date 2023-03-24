import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <nav style={navStyle}>
        <Link href="/" style={linkStyle}>
          Home
        </Link>
        <Link href="/createPost" style={linkStyle}>
          Create Post
        </Link>
      </nav>
      <Component {...pageProps} />
    </div>
  );
}

const navStyle = {
  padding: "30px 100px",
};

const linkStyle = {
  marginRight: "30px",
};
