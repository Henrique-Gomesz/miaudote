import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class TrimPipe implements PipeTransform {
  private isObject(obj: any): boolean {
    return obj !== null && typeof obj === 'object' && !Array.isArray(obj);
  }

  private trim(values: any): any {
    if (this.isObject(values)) {
      for (const key in values) {
        if (values.hasOwnProperty(key) && key !== 'password') {
          values[key] = this.trim(values[key]);
        }
      }
    } else if (Array.isArray(values)) {
      return values.map((item) => this.trim(item));
    } else if (typeof values === 'string') {
      return values.trim();
    }
    return values;
  }

  transform(values: any, metadata: ArgumentMetadata): any {
    if (this.isObject(values) && metadata.type === 'body') {
      return this.trim(values);
    }

    throw new BadRequestException(
      'Validation failed: input is not an object or metadata type is not "body".',
    );
  }
}
