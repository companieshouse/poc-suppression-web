import { ModelValidationExceptionFilter } from './model-validation-exception.filter';
import { NavigationControl } from 'app/common/navigation/navigation-control';

describe('ModelValidationExceptionFilter', () => {
  it('should be defined', () => {
    expect(
      new ModelValidationExceptionFilter({
        navigation: new NavigationControl('', ''),
        template: '',
      }),
    ).toBeDefined();
  });
});
