export const satisfiesRecord =
  <T>() =>
  <K extends PropertyKey>(rec: Record<K, T>) =>
    rec;
