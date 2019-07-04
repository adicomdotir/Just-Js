import { HangmanModule } from './hangman.module';

describe('HangmanModule', () => {
  let hangmanModule: HangmanModule;

  beforeEach(() => {
    hangmanModule = new HangmanModule();
  });

  it('should create an instance', () => {
    expect(hangmanModule).toBeTruthy();
  });
});
