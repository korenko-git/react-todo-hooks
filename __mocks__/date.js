const mockDate = new Date('2020-08-17T11:01:58.135Z');
jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
