import { Test, TestingModule } from '@nestjs/testing'
import { UserController } from './user.controller'

describe('UserController', () => {
  let controller: UserController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
    }).compile()

    controller = module.get<UserController>(UserController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('createUser', () => {
    it('should be defined', () => {
      expect(controller.createUser).toBeDefined()
    })
    it('valid dto -> CREATED', () => {})
    it('invalid dto -> FAIL', () => {})
    it('duplicate id/name/nickname -> CONFLICT', () => {})
  })

  describe('checkValidUserNickName', () => {
    it('should be defined', () => {
      expect(controller.checkValidUserNickName).toBeDefined()
    })
    it('valid nickname -> return valid', () => {})
    it('invalid nickname -> return invalid', () => {})
  })

  describe('getUserByUserId', () => {
    it('should be defined', () => {
      expect(controller.getUserByUserId).toBeDefined()
    })
    it('valid request -> OK', () => {})
    it('invalid parameter -> BAD_REQUEST', () => {})
    it('not exist user -> NO_CONTENT', () => {})
    it('invalid authorization (no session) -> UNAUTHORIZED', () => {})
    it('invalid authorization (user) -> UNAUTHORIZED', () => {})
  })

  describe('getUsersByPage', () => {
    it('should be defined', () => {
      expect(controller.getUsersByPage).toBeDefined()
    })
    it('valid request -> return Users', () => {})
    it('invalid query -> BAD_REQUEST', () => {})
    it('invalid authorization (no session) -> UNAUTHORIZED', () => {})
    it('invalid authorization (user) -> UNAUTHORIZED', () => {})
  })

  describe('getUserByNickName', () => {
    it('should be defined', () => {
      expect(controller.getUserByNickName).toBeDefined()
    })
    it('valid request -> return User', () => {})
    it('invalid parameter -> NO_CONTENT', () => {})
    it('invalid authorization (no session) -> UNAUTHORIZED', () => {})
  })

  describe('updateUser', () => {
    it('should be defined', () => {
      expect(controller.updateUser).toBeDefined()
    })
    it('valid request (owner) -> OK', () => {})
    it('valid request (admin) -> OK', () => {})
    it('invalid parameter -> BAD_REQUEST', () => {})
    it('invalid payload -> BAD_REQUEST', () => {})
    it('invalid authorization (no session) -> UNAUTHORIZED', () => {})
    it('invalid authorization (not mine) -> UNAUTHORIZED', () => {})
  })

  describe('getUserEvents', () => {
    it('should be defined', () => {
      expect(controller.getUserEvents).toBeDefined()
    })
    it('valid request (HOST) -> return Events', () => {})
    it('valid request (GUEST) -> return Events', () => {})
    it('invalid parameter -> BAD_REQUEST', () => {})
    it('invalid query -> BAD_REQUEST', () => {})
    it('invalid authorization (no session) -> UNAUTHORIZED', () => {})
    it('invalid authorization (not mine) -> UNAUTHORIZED', () => {})
  })

  describe('registerEvent', () => {
    it('should be defined', () => {
      expect(controller.registerEvent).toBeDefined()
    })
    it('valid request -> OK', () => {})
    it('invalid parameter -> BAD_REQUEST', () => {})
    it('invalid payload -> BAD_REQUEST', () => {})
    it('invalid authorization (no session) -> UNAUTHORIZED', () => {})
    it('invalid authorization (not mine) -> UNAUTHORIZED', () => {})
  })

  describe('unregisterEvent', () => {
    it('should be defined', () => {
      expect(controller.unregisterEvent).toBeDefined()
    })
    it('valid request -> OK', () => {})
    it('invalid parameter -> BAD_REQUEST', () => {})
    it('invalid payload -> BAD_REQUEST', () => {})
    it('invalid authorization (no session) -> UNAUTHORIZED', () => {})
    it('invalid authorization (not mine) -> UNAUTHORIZED', () => {})
  })
})
