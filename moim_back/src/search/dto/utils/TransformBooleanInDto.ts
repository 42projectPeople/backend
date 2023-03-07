import { applyDecorators } from '@nestjs/common'
import { Transform } from 'class-transformer'
import { ValidationError } from 'class-validator'

export function TransformBooleanInParam() {
  return applyDecorators(
    Transform(({ value }) => {
      if (value === 'true') return true
      if (value === 'false') return false
      return new ValidationError()
    })
  )
}
