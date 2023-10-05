import Link from 'next/link';

import Table from 'components/TableScore';

export default function ScoreboardPage() {
  return (
    <>
      <h2 className="font-semibold leading-none text-center uppercase">
        Scoreboard
      </h2>
      <Table />
      <div className="flex flex-row justify-center gap-4">
        <Link className="btn" href="/">
          Back to Home
        </Link>
        <Link className="btn" href="/play">
          Play Again!
        </Link>
      </div>
    </>
  );
}
