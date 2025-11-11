const breakDownDate = (userDate: Date): object => {
    let day = userDate.getDay()
    let year = userDate.getFullYear()
    let month = userDate.getMonth()
    let week = (userDate.getUTCDay() / 7)
    return {day, month, year, week}
}

console.log(breakDownDate(new Date("2025-8-17")))

function add(num1: number, num2:number): number {
    return num1 + num2
}

console.log(add(34, 34))