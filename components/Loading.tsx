export default function Loading({ isLoading }: { isLoading: boolean }) {
  if (!isLoading) return null;

  return (
    <div className="z-20 absolute w-full h-full bg-orange-400 flex justify-center items-center ">
      Loading...
    </div>
  );
}
