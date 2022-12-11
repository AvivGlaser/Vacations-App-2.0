
export default function timeFormat(){
  // formatting the time for API verification logger 
    const time = new Date()
    const locale: string = "en";
    const displayTime: string = time.toLocaleTimeString(locale, {
      hour: "numeric",
      hour12: false,
      minute: "numeric",
      second: `2-digit`,
    });
    return displayTime
}
