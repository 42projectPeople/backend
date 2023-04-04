import { ApiProperty } from '@nestjs/swagger'
import { Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class DeletedImage {
  @ApiProperty({
    description: '삭제된 이미지 Id',
    example: 1,
  })
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'pk_DeletedImg' })
  imageId: number

  @ApiProperty({
    description: '이미지 버킷주소',
    example: 1,
  })
  imageUrl: string
}
