export class Functions {

    weekNumber(d: Date): number {
        const dt:any = new Date(d); // Convert input string to Date object
        const ys:any = new Date(dt.getFullYear(), 0, 1); // Get January 1st of the same year
        const dp = Math.floor((dt - ys) / 86400000); // Calculate the days passed since January 1st (1000 * 60 * 60 * 24 = 86400000)
        const sw = ys.getDay();
        const so = (sw === 0) ? 6 : sw - 1;  // Adjust Sunday (0) to 6 (ISO starts Monday)
        const wn = Math.floor((dp + so) / 7) + 1;
        return wn;
    }

    breakDownDate(userDate: Date) {
        const monthNames: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
        const date: Date = new Date(userDate)
        const day: number = date.getDate()
        const week:number = this.weekNumber(date)
        const month: number = date.getMonth() + 1
        const monthName: string = monthNames[month - 1]
        const year: number = date.getFullYear()
        return {day, week, month, monthName, year}
    }
}

const func = new Functions()
// const weekNumber = func.weekNumber(new Date("2025-04-17"))
const sillyDate = func.breakDownDate(new Date("2025-08-01"))

// console.log(sillyDate)