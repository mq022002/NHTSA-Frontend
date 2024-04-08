import Image from 'next/image';

function HomePage() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-100px)] p-0 m-0">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 place-items-center">
        <div className="p-4 text-black">
          <p className="text-4xl font-bold underline">
            MAHA Insurance Calculator
          </p>
          <p>We&apos;ll get you where you want to go, with rates that keep you
            moving forward</p>
        </div>
        <div className="w-full h-auto p-4">
          <Image
            src="/Navigator.svg"
            alt="car driving to checkpoint"
            layout="responsive"
            width={500}
            height={300}
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
