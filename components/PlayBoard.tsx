'use client';

import { redirect } from 'next/navigation';
import { useEffect, useState, memo } from 'react';

import { getRandomNumBetweenMinMax } from 'utils';

import useLocalStorage, {
  LS_KEY_SCORE,
  LS_KEY_USER_NAME,
} from 'hooks/useLocalStorage';
import useCountdown from 'hooks/useCountdown';

import Grid from 'components/Grid';
import Header from 'components/Header';
import Loading from 'components/Loading';
import PreloadedImages from 'components/PreloadedImages';

import { Score } from 'types';
type Props = { winImages: string[]; loseImages: string[] };

export default function PlayBoard({ winImages, loseImages }: Props) {
  const [score, setScore] = useState(0);
  const [nextGrid, setNextGrid] = useState(0);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [totalImagesLoaded, setTotalImagesLoaded] = useState(0);
  const [grid, setGrid] = useState<{ type: string; src: string }[]>([]);

  const [timeLeft, startCountdown] = useCountdown(30);
  const [userName] = useLocalStorage(LS_KEY_USER_NAME, '');
  const [scoreLS, saveScoreLS] = useLocalStorage<Score[]>(LS_KEY_SCORE, []);

  const allImagesLength = winImages.length + loseImages.length;
  const allImagesLoaded = totalImagesLoaded > allImagesLength * 0.85;

  useEffect(() => {
    if (shouldRedirect) redirect('/scoreboard');
  }, [shouldRedirect]);

  useEffect(() => {
    if (timeLeft === 0) {
      saveScoreLS([
        ...scoreLS,
        {
          score,
          name: userName,
          date: Date.now(),
        },
      ]);

      setShouldRedirect(true);
    }
  }, [timeLeft, score, scoreLS, userName, saveScoreLS]);

  useEffect(() => {
    if (allImagesLoaded) startCountdown();
  }, [allImagesLoaded, startCountdown]);

  useEffect(() => {
    const grid = [
      {
        type: 'win',
        src: winImages[getRandomNumBetweenMinMax(0, winImages.length - 1)],
      },
      ...Array.from({ length: 8 }).map(() => {
        return {
          type: 'lose',
          src: loseImages[getRandomNumBetweenMinMax(0, loseImages.length - 1)],
        };
      }),
    ].sort(() => Math.random() - 0.5);

    setGrid(grid);
  }, [nextGrid, winImages, loseImages]);

  const handleClick = (type: string) => (): void => {
    setScore((prevScore) => {
      if (type === 'win') return prevScore + 1;

      return prevScore === 0 ? 0 : prevScore - 1;
    });

    setNextGrid((prev) => prev + 1);
  };

  const onLoad = () => {
    setTotalImagesLoaded((totalLoaded) => {
      if (totalLoaded >= allImagesLength) {
        return totalLoaded;
      }

      return totalLoaded + 1;
    });
  };

  return (
    <>
      <Header score={score} time={timeLeft} />
      <div className="relative w-full h-full mx-auto">
        <PreloadedImages
          onLoad={onLoad}
          listSrc={[...winImages, ...loseImages]}
        />
        <Loading isLoading={!allImagesLoaded} />
        <Grid grid={grid} onClick={handleClick} />
      </div>
    </>
  );
}
