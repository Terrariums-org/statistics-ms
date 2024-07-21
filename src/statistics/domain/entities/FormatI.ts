export interface FormatI {
  id: number;
  date: string;
  temperature: {
    t_max: number;
    t_min: number;
    t_value: number;
  };
  humidity: {
    h_max: number;
    h_min: number;
    h_value: number;
  };
  soil: {
    nitrogen: number;
    potassium: number;
    phosphorous: number;
  };
  uv: {
    uv_max: number;
    uv_min: number;
    uv_value: number;
  };
}
