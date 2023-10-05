export function getRandomNumBetweenMinMax(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function fetchImage<T>(url: string): Promise<T> {
  let data;

  try {
    const res = await fetch(url);

    data = await res.json();
  } catch (error) {
    console.log(error);
  }

  return data;
}

export async function fetchValidImageUrl(
  imageUrl: string,
): Promise<string | null> {
  let image;
  try {
    image = await fetch(imageUrl, { method: 'HEAD' });
  } catch (error) {
    console.log(error);
  }

  if (image?.status !== 200) return null;

  return imageUrl;
}
