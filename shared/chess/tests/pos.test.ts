import Pos from '../model/Pos'
import { extractPos, sortPosArr } from './testHelpers'

describe('The Pos class', () => {
  describe('squaresBetween method', () => {
    test('returns correct Pos instances when positions are on the same diagonal', () => {
      const tests = [
        sortPosArr(new Pos(2, 3).squaresBetween(new Pos(5, 6))),
        sortPosArr(new Pos(0, 6).squaresBetween(new Pos(4, 2))),
        sortPosArr(new Pos(4, 5).squaresBetween(new Pos(5, 6)))
      ]
      console.log(tests)
      expect(tests[0]).toEqual(extractPos([[3, 4], [4, 5]]))
      expect(tests[1]).toEqual(extractPos([[1, 5], [2, 4], [3, 3]]))
      expect(tests[2]).toHaveLength(0)
    })
    test('returns correct Pos instances when positions are on the same file', () => {
      const tests = [
        sortPosArr(new Pos(2, 3).squaresBetween(new Pos(2, 7))),
        sortPosArr(new Pos(7, 5).squaresBetween(new Pos(7, 7))),
        sortPosArr(new Pos(4, 5).squaresBetween(new Pos(4, 6)))
      ]
      console.log(tests)
      expect(tests[0]).toEqual(extractPos([[2, 4], [2, 5], [2, 6]]))
      expect(tests[1]).toEqual(extractPos([[7, 6]]))
      expect(tests[2]).toHaveLength(0)
    })
    test('returns correct Pos instances when positions are on the same rank', () => {
      const tests = [
        sortPosArr(new Pos(0, 0).squaresBetween(new Pos(7, 0))),
        sortPosArr(new Pos(4, 6).squaresBetween(new Pos(4, 6)))
      ]
      console.log(tests)
      expect(tests[0]).toEqual(extractPos([[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0]]))
      expect(tests[1]).toHaveLength(0)
    })
  })
})