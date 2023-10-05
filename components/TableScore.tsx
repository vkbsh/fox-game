'use client';

import { Score } from 'types';

import useLocalStorage, { LS_KEY_SCORE } from 'hooks/useLocalStorage';

export default function TableScore() {
  const headings = ['Rank', 'Name', 'Date', 'Score'];
  const [scoreList] = useLocalStorage<Score[]>(LS_KEY_SCORE, []);

  return (
    <table className=" table-fixed w-full mx-auto border-collapse border border-white">
      <thead>
        <tr>
          {headings.map((h) => (
            <th
              key={h}
              className="border px-4 border-white text-white bg-gray-400"
            >
              {h}
            </th>
          ))}
        </tr>
        <tr className="h-1 bg-gray-400" />
      </thead>
      <tbody>
        {scoreList?.length == null
          ? null
          : scoreList
              .sort((a, b) => b.score - a.score)
              .map((item, i) => {
                const odd = i % 2 === 0;

                const date = new Date(item.date).toLocaleDateString('en', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                });

                // const date = new Intl.DateTimeFormat(undefined, {
                //   dateStyle: 'short',
                //   timeStyle: 'short',
                // }).format(new Date(item.date));

                return (
                  <tr
                    key={item.date}
                    className={odd ? 'bg-slate-200' : 'bg-gray-100'}
                  >
                    <td className="border border-white font-bold text-center text-white bg-gray-400">
                      {i + 1}
                    </td>
                    <td className="border border-white px-2 truncate">
                      {item.name}
                    </td>
                    <td className="border border-white px-2 truncate">
                      {date}
                    </td>
                    <td className="border border-white px-2 text-right">
                      {item.score}
                    </td>
                  </tr>
                );
              })}
      </tbody>
    </table>
  );
}
