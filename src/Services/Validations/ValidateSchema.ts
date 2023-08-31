import { ValidationErrorItem, Schema } from 'joi';
import HttpException from '../../Utils/HttpException';

/**
 * Classe responsável por realizar a validação de dados com base em um esquema Joi.
 */
export default class ValidateSchema {
  /**
   * Mapeia os erros de validação para códigos de status personalizados.
   * @param errors Os erros de validação a serem mapeados.
   * @returns O código de status correspondente ao erro de validação.
   */
  private static statusCode(details: ValidationErrorItem[]): number {
    const { type } = details[0];

    const errorStatus: Record<string, number> = {
      'any.required': 400,
      'boolean.base': 400,
      'number.base': 400,
      'string.empty': 422,
      'string.min': 400,
    };

    return errorStatus[type] || 400;
  }

  /**
   * Valida os dados fornecidos com base no esquema Joi especificado.
   * @param schema O esquema Joi a ser usado para validação.
   * @param data Os dados a serem validados.
   * @returns Os dados validados, se a validação for bem-sucedida.
   * @throws HttpException se ocorrer um erro de validação.
   */
  public static validate(schema: Schema, data: object): object | Error {
    const { error, value } = schema.validate(data);

    if (error) {
      const statusCode = this.statusCode(error.details);

      throw new HttpException(statusCode, error.message);
    }

    return value;
  }
}
