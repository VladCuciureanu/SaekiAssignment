"use client";
export default function Home() {
  fetch("/api/status").then((res) => console.log(res.json()));
  return <main>Hello World</main>;
}
