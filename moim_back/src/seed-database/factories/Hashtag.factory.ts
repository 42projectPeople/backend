import { setSeederFactory } from 'typeorm-extension'
import { Hashtag } from '../../entity/Hashtag.entity'

export default setSeederFactory(Hashtag, (faker) => {
  const fakeHashtag = new Hashtag()

  fakeHashtag.hashtagName = faker.word.adjective({
    length: {
      min: 5,
      max: 50,
    },
  })
  return fakeHashtag
})
