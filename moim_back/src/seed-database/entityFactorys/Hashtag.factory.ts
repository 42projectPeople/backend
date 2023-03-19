import { Hashtag } from '../../entity/Hashtag.entity'
import { faker } from '@faker-js/faker'

const HashtagFactory = (): Hashtag => {
  const fakeHashtag = new Hashtag()

  fakeHashtag.hashtagName = faker.word.adjective({
    length: {
      min: 5,
      max: 50,
    },
  })
  return fakeHashtag
}

export default HashtagFactory
