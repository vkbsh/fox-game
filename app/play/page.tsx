const TIMER_IN_SEC = 30;
const BOARD_IMAGES_LENGTH = 9;
const WIN_IMAGES_PER_BOARD = 1;
const LOSE_IMAGES_PER_BOARD = BOARD_IMAGES_LENGTH - WIN_IMAGES_PER_BOARD;
const TOTAL_WIN_IMAGES = WIN_IMAGES_PER_BOARD * TIMER_IN_SEC;
const TOTAL_LOSE_IMAGES = LOSE_IMAGES_PER_BOARD * TIMER_IN_SEC;

import PlayBoard from 'components/PlayBoard';

import { fetchImage, fetchValidImageUrl } from 'utils';

const winImageUrl = 'https://randomfox.ca/floof';
const loseImageUrl = 'https://dog.ceo/api/breeds/image/random';

export default async function PlayPage() {
  let _winImages: string[] = [];
  let _loseImages: (string | null)[] = [];

  try {
    _winImages = await Promise.all(
      Array.from({
        length: TOTAL_WIN_IMAGES,
      }).map(async (_, i) => {
        const data = await fetchImage<{ image: string }>(winImageUrl + '?' + i);

        return data?.image;
      }),
    );
  } catch (error) {
    console.log(error);
  }

  try {
    _loseImages = await Promise.all(
      Array.from({
        length: TOTAL_LOSE_IMAGES,
      }).map(async (_, i) => {
        const data = await fetchImage<{ message: string }>(
          loseImageUrl + '?' + i,
        );
        const src = await fetchValidImageUrl(data?.message);

        return src;
      }),
    );
  } catch (error) {
    console.log(error);
  }

  const winImages = _winImages.filter((src) => src);
  const loseImages = _loseImages.filter((src) => src) as string[];

  return <PlayBoard winImages={winImages} loseImages={loseImages} />;
}
