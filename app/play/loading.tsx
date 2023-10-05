export default function LoadingPage() {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full max-w-sm mx-auto flex flex-row justify-around">
        <span className="text-lg leading-none font-semibold">
          Fetching images...
        </span>
      </div>
      <p className="w-full mx-auto h-grid bg-orange-400 flex justify-center items-center">
        Loading...
      </p>
    </div>
  );
}
