import { FormatI } from 'src/statistics/domain/entities';

export const getOne = (documents: FormatI[], today: Date) => {
  let closeDate: Date | null = null;
  let closeDoc: any = null;

  for (let i = 0; i < documents.length; i++) {
    const currentDate = new Date(documents[i].date);

    if (closeDate === null || currentDate < closeDate) {
      closeDate = currentDate;
      closeDoc = documents[i];
    }
  }

  return closeDoc;
};
