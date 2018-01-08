const Beatmap = require('./Beatmap')
const Request = require('request-promise-native')

let testOsu
let testJson
/**
 * @type {Beatmap} beatmap
 */
let beatmap

before (async () => {
  testMapFile = await Request.get('https://osu.ppy.sh/osu/1262832')
})

describe ('Beatmap', () => {
  describe ('#fromOsu()', () => {
    it ('should return a new Beatmap instance', async () => {
      beatmap = await Beatmap.fromOsu(testMapFile)
      return beatmap instanceof Beatmap
    })

    after (() => {
      testJson = JSON.stringify(beatmap) // Used for 'fromJSON' function
    })
  })

  describe ('#fromJSON()', () => {
    it ('should return a new Beatmap instance', async () => {
      let testJsonBeatmap = await Beatmap.fromJSON(testJson)
      return testJsonBeatmap instanceof Beatmap
    })
  })
  
  describe ('#toOsu()', () => {
    it ('should return an osu formatted file', () => {
      let formatted = beatmap.toOsu()
      return typeof formatted === 'string' && formatted.includes('osu file format v14')
    })
  })
})