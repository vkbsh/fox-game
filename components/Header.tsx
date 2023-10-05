export default function Header({
  score,
  time,
}: {
  score: number;
  time: number;
}) {
  return (
    <div className="w-full max-w-sm mx-auto flex flex-row justify-around">
      <span className="text-lg leading-none font-semibold">Score: {score}</span>
      <span className="text-lg leading-none font-semibold">
        Time left: {time}
      </span>
    </div>
  );
}
