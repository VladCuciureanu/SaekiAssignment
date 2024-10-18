import { CameraOff } from "lucide-react";

export function NewsSection() {
  return (
    <section id="news-section" className="flex w-full flex-col gap-4">
      <h2 className="text-xl font-bold tracking-tight">News</h2>
      <NewsEntry />
      <NewsEntry />
      <NewsEntry />
    </section>
  );
}

function NewsEntry() {
  return (
    <div className="flex w-full flex-col gap-2 rounded-lg border p-4">
      <h2 className="text font-bold tracking-tight">Lorem Ipsum</h2>
      {/* <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tortor
        turpis, congue nec efficitur id, condimentum et nisi. Praesent vitae
        elit ante. Ut nunc nisl, dictum a dui in, elementum imperdiet magna.
        Suspendisse potenti. Phasellus ex libero, gravida eu orci in, bibendum
        consequat augue. Phasellus a iaculis eros. Proin fringilla consequat
        nisl at molestie.
      </p> */}
      <div className="relative h-[6.5rem] w-full">
        <div className="absolute inset-x-0 flex h-fit flex-row gap-2 overflow-x-scroll pb-5">
          <FakePhoto />
          <FakePhoto />
          <FakePhoto />
          <FakePhoto />
          <FakePhoto />
          <FakePhoto />
          <FakePhoto />
        </div>
      </div>
      <p className="text-sm">
        Morbi feugiat quis massa ut ornare. Quisque posuere, tortor vitae
        hendrerit semper, nisi tellus aliquam turpis, non tincidunt mauris
        tellus id purus. Etiam id mi nulla. Pellentesque vitae erat tincidunt,
        tincidunt elit a, facilisis nulla. Donec non nulla pellentesque,
        bibendum urna in, mollis ipsum. Donec non urna dolor. Donec scelerisque
        egestas leo, non varius metus fringilla id. Integer sit amet gravida
        dui. Aliquam pharetra sem vitae orci sagittis, eu venenatis neque
        venenatis. Quisque eget convallis metus. Pellentesque tincidunt
        scelerisque eleifend. Aliquam turpis leo, lobortis a auctor ut,
        imperdiet quis risus. Integer et lorem mollis magna consectetur
        porttitor.
      </p>
    </div>
  );
}

function FakePhoto() {
  return (
    <div className="fake-photo bg-foreground/10 border-foreground/10 flex aspect-[4/3] h-24 cursor-pointer items-center justify-center rounded-lg border">
      <CameraOff color="gray" />
    </div>
  );
}
