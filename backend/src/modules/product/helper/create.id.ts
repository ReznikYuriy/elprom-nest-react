const cyrillicToLatinic = (inputText: string): string => {
  const cyrillicMap: { [key: string]: string } = {
    а: 'a',
    б: 'b',
    в: 'v',
    г: 'g',
    д: 'd',
    е: 'e',
    ё: 'yo',
    ж: 'zh',
    з: 'z',
    и: 'i',
    й: 'y',
    к: 'k',
    л: 'l',
    м: 'm',
    н: 'n',
    о: 'o',
    п: 'p',
    р: 'r',
    с: 's',
    т: 't',
    у: 'u',
    ф: 'f',
    х: 'kh',
    ц: 'ts',
    ч: 'ch',
    ш: 'sh',
    щ: 'shch',
    ъ: '',
    ы: 'y',
    ь: '',
    э: 'e',
    ю: 'yu',
    я: 'ya',
    і: 'i',
    ї: 'i',
  };

  return inputText
    .toLowerCase()
    .split('')
    .map(function (char) {
      if (char === ' ') {
        return '_';
      } else {
        return cyrillicMap[char] || char;
      }
    })
    .join('');
};
const productIdCreator = (id: string, id_1c: number): string => {
  return `${cyrillicToLatinic(id)}_${id_1c}`;
};

export default productIdCreator;
