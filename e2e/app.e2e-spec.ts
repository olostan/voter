import { VoterPage } from './app.po';

describe('voter App', () => {
  let page: VoterPage;

  beforeEach(() => {
    page = new VoterPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
