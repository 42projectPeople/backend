import { Test, TestingModule } from '@nestjs/testing'
import { UserService } from './user.service'

describe('UserService', () => {
  let service: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile()

    service = module.get<UserService>(UserService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('findUserById', () => {
    it('should be defined', () => {
      expect(service.findUserByUserId).toBeDefined()
    })

    it('Bad userId', () => {
      // expect BAD_REQUEST
      // userId is NaN or undefined
      // userId < 1
      // userId -> not exist
    })
    it('valid request', () => {
      // expect User object
    })
  })

  describe('findUsersByPage', () => {
    it('should be defined', () => {
      expect(service.findUsersByPage).toBeDefined()
    })

    it('Bad page', () => {
      // expect BAD_REQUEST
      // page < 1
      // page is NaN or undefined
    })
    it('valid request', () => {
      // expect Users object
    })
  })

  describe('findUserByNickName', () => {
    it('should be defined', () => {
      expect(service.findUserByNickName).toBeDefined()
    })

    it('Bad nickname', () => {
      // not exist nickname => 검증해야하는가?
    })
    it('valid request', () => {
      // expect User object
    })
  })

  describe('updateUser', () => {
    it('should be defined', () => {
      expect(service.updateUser).toBeDefined()
    })
    it('bad userId', () => {
      // expect bad request
    })
    it('bad userInfo', () => {
      // expect bad request
    })
    it('not exist userId', () => {
      // expect bad request => 논의 필요
    })
    it('valid request', () => {
      // expect no throw
      // data have to be saved
    })
  })

  describe('createUser', () => {
    it('should be defined', () => {
      expect(service.createUser).toBeDefined()
    })
    it('bad userInfo', () => {
      // expect bad request => 상위 레벨에서 잡아주긴합니다.
    })
    it('duplicate entry', () => {
      // expect conflict exception
      // duplicate userName or userNickName
    })
    it('valid request', () => {
      // expect no throw
      // data have to be saved
    })
  })

  describe('checkExistNickName', () => {
    it('should be defined', () => {
      expect(service.checkExistNickname).toBeDefined()
    })
    it('exist user nickname', () => {
      // expect return false
    })
    it('not exist user nickname', () => {
      // expect return true
    })
    it('user nickname is null | undefined', () => {
      // expect bad request
    })
  })

  describe('findAllUserGuestEvent', () => {
    it('should be defined', () => {
      expect(service.findAllUserGuestEvent).toBeDefined()
    })
    it('bad userId', () => {
      // expect throw bad request
    })
    it('valid request', () => {
      // expect Event array
    })
  })

  describe('registerEvent', () => {
    it('should be defined', () => {
      expect(service.registerEvent).toBeDefined()
    })
    it('bad userId', () => {
      // expect throw bad request
    })
    it('bad registerEventDto', () => {
      // expect throw bad request
    })
    it('valid request', () => {
      // expect user event is saved and event curParticipant incremented
    })
  })

  describe('unregisterEvent', () => {
    it('should be defined', () => {
      expect(service.unregisterEvent).toBeDefined()
    })
    it('bad userId', () => {
      // expect throw bad request
    })
    it('bad unregisterEventDto', () => {
      // expect throw bad request
    })
    it('valid request', () => {
      // expect user event is soft deleted and event curParticipant decremented
    })
  })
})
