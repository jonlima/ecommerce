import { GetHealthStatusUseCase } from './get-health-status.use-case';

describe('GetHealthStatusUseCase', () => {
  let useCase: GetHealthStatusUseCase;

  beforeEach(() => {
    useCase = new GetHealthStatusUseCase();
  });

  it('should return a health status with message "Ok" and status code 200', () => {
    const expected = { message: 'Ok', statusCode: 200 };
    const result = useCase.execute();
    expect(result).toEqual(expected);
  });
});
