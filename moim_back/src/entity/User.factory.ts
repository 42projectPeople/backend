import { User } from './User.entity'
import { setSeederFactory } from 'typeorm-extension'

export default setSeederFactory(User, (faker) => {
  const user = new User()

  user.userName = faker.name.fullName()
  user.userNickName = faker.name.lastName('female')
  user.userProfilePhoto = faker.internet.avatar()
  user.userLevel = faker.datatype.float({ min: 0, max: 21 })
  user.userTitle = faker.word.adjective({
    length: {
      min: 10,
      max: 200,
    },
  })
  return user
})
