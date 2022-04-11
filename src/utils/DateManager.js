export default class DateManager {
  toLocale(date) {
    return new Date(date).toLocaleString("pt-BR", { timeZone: "UTC" });
  }
}
