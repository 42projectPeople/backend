import { setSeederFactory } from 'typeorm-extension'
import { User } from '../../entity/User.entity'

export default setSeederFactory(User, (faker) => {
  const fakeUser = new User()

  fakeUser.userName = faker.internet.email(
    faker.name.firstName(),
    faker.name.lastName(),
    'gmail.com'
  )
  fakeUser.userNickName = faker.name.fullName()
  fakeUser.userProfilePhoto = faker.internet.avatar()
  fakeUser.userLevel = faker.datatype.float({ min: 0, max: 21 })
  fakeUser.userTitle = faker.word.adjective({
    length: {
      min: 10,
      max: 200,
    },
  })
  return fakeUser
})
