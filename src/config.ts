import "reflect-metadata"
import { ClassConstructor, Expose, Transform, plainToInstance } from 'class-transformer'
import { IsBoolean, IsInt, IsString, validateSync } from 'class-validator'
import { config } from 'dotenv'


/**
 * Loads a .env at filePath
 */
export const loadEnvFile = (filePath: string): void => {
  config({
    path: filePath,
  })
}


/**
 * Loads env vars and validates/transforms them with class-validator/class-transformer
 *
 */
export const load = <T extends object>(cls: ClassConstructor<T>, config: Record<string, string> = {}): T => {
    const cfg = {
      ...process.env,
      ...config,
    }
    const transformed = plainToInstance(cls, cfg, { exposeDefaultValues: true, excludeExtraneousValues: true })
    const errors = validateSync(transformed, { skipMissingProperties: false })
    if (errors.length > 0) {
      // Remap the errors to show the name of the environment variable in the error message
      const errMessage = errors.toString()
      throw new Error(errMessage)
    }

    return transformed
  }


export class DatabaseConfig {
  @IsString()
  @Expose()
  public DATABASE_HOST!: string 

  @IsString()
  @Expose()
  public DATABASE_DATABASE: string = "db1"

  @IsInt()
  @Expose()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  public DATABASE_PORT!: number

  @IsBoolean()
  @Expose()
  @Transform(({ value }) => ['1', 't', 'true'].includes(value.toLowerCase()), { toClassOnly: true })
  public DATABASE_SSL!: boolean

  @IsString()
  @Expose()
  public DATABASE_USER!: string

  @IsString()
  @Expose()
  public DATABASE_PASSWORD!: string
}
