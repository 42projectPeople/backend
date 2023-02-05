import { setSeederFactory } from 'typeorm-extension'
import { Hashtag } from './Hashtag.entity'

export default setSeederFactory(Hashtag, (faker) => {
  const hashtag = new Hashtag()

  hashtag.hashtagName = faker.word.adjective({
    length: {
      min: 5,
      max: 50,
    },
  })
  return hashtag
})
