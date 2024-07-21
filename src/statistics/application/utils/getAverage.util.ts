import { FormatI } from 'src/statistics/domain/entities';

export const getAverage = (documents: FormatI[]) => {
  let sumT = 0;
  let sumH = 0;
  let sumUV = 0;

  documents.forEach((doc: any) => {
    sumT += doc.temperature.t_value;
    sumH += doc.humidity.h_value;
    sumUV += doc.uv.uv_value;
  });

  const avgT = sumT / documents.length;
  const avgH = sumH / documents.length;
  const avgUV = sumUV / documents.length;

  return {
    avgTemperature: avgT,
    avgHumidity: avgH,
    avgUV: avgUV,
  };
};
