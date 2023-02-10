import { Controller, Get } from '@nestjs/common'
import {
  HealthCheck,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus'

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator
  ) {}

  /*
   * @param response object
   * default healthcheck controller for LOADBALANCER
   * */
  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.db.pingCheck('database'), //백엔드 서버 데이터베이스의 상태를 확인합니다.
      //redis session database check line----
    ])
  }
}
