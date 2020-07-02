import { JoiValidationExceptionFilter } from './joi-validation-exception.filter';
import { NavigationControl } from 'app/common/navigation/navigation-control';

describe('JoiValidationExceptionFilter', () => {
  it('should be defined', () => {
    expect(
      new JoiValidationExceptionFilter({
        navigation: new NavigationControl('', ''),
        template: '',
      }),
    ).toBeDefined();
  });
});
