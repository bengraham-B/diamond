// const {Functions} from '../Class/Functions'
// const {Functions} = require('../dist/class/Functions')
const {weekNumberPlay} = require('../dist/playground/Week.play')
// const func = new Functions()
// const dateBrokenDown1 = func.breakDownDate(new Date('2025-09-11'))

test('Week 37: Sunday', () =>{
    expect(weekNumberPlay(new Date('2025-09-14'))).toBe(37)
})

test('Week 36: Sunday', () =>{
    expect(weekNumberPlay(new Date('2025-09-07'))).toBe(36)
})

test('Week 35: Sunday', () =>{
    expect(weekNumberPlay(new Date('2025-08-31'))).toBe(35)
})

test('Week 35: Monday', () =>{
    expect(weekNumberPlay(new Date('2025-08-25'))).toBe(35)
})

test('Week 34: Sunday', () =>{
    expect(weekNumberPlay(new Date('2025-08-24'))).toBe(34)
})

test('Week 34: Monday', () =>{
    expect(weekNumberPlay(new Date('2025-08-18'))).toBe(34)
})

