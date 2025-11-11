// const dateBrokenDown1 = func.breakDownDate(new Date('2025-09-11'))

// console.log(dateBrokenDown1)

export const weekNumberPlay = (d: Date): number => {
    const dt:any = new Date(d); // Convert input string to Date object
    const ys:any = new Date(dt.getFullYear(), 0, 1); // Get January 1st of the same year
    const dp = Math.floor((dt - ys) / 86400000); // Calculate the days passed since January 1st (1000 * 60 * 60 * 24 = 86400000)
    const sw = ys.getDay();
    const so = (sw === 0) ? 6 : sw - 1;  // Adjust Sunday (0) to 6 (ISO starts Monday)
    const wn = Math.floor((dp + so) / 7) + 1;

    return wn;
}

